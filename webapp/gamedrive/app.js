// --- Configuration and State Variables ---
const DB_NAME = 'GameSavesDB';
const SAVES_STORE = 'saves'; 
const GAMES_STORE = 'games'; 
const DB_VERSION = 2; 
const DEFAULT_GAMES = ["GRAND THEFT AUTO V", "GRAND THEFT AUTO SAN ANDREAS", "GRAND THEFT AUTO VICE CITY", "GRAND THEFT AUTO: THE DEFINITIVE EDITION", "SCHEDULE 1", "The Elder Scrolls IV: Oblivion", "The Elder Scrolls V: Skyrim Special Edition", "Marvels Spiderman: Miles Morales", "Watch Dogs", "Watch Dogs 2", "Minecraft: Java Edition", "Red Dead Redemption 2", "Red Dead Redemption 1", "The Elder Scrolls V: Skyrim Anniversary Edition"];

let db;
let allGameNames = []; 
let currentlySelectedGame = ''; 
let selectedFile = null;
let selectedImportFile = null;

// --- DOM Element References ---\
// Note: These need to be accessed after the DOM is fully loaded, but are declared globally for scope.
const fileInput = document.getElementById('fileInput');
const gameSearchInput = document.getElementById('gameSearchInput');
const gameDropdownList = document.getElementById('gameDropdownList');
const newGameNameInput = document.getElementById('newGameNameInput');
const addNewGameButton = document.getElementById('addNewGameButton');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const uploadButton = document.getElementById('uploadButton');
const saveListContainer = document.getElementById('saveList');
const emptyState = document.getElementById('emptyState');
const settingsModal = document.getElementById('settingsModal');
const importFileInput = document.getElementById('importFileInput');
const importFileNameDisplay = document.getElementById('importFileNameDisplay');
const importDataBtn = document.getElementById('importDataBtn');
const modalOkBtn = document.getElementById('modalOkBtn');
const modalSpinner = document.getElementById('modalSpinner');
// New DOM reference for storage display
const storageUsageDisplay = document.getElementById('storageUsageDisplay');


// --- Utility Functions ---

/**
 * Shows the custom message modal with dynamic content and loading state.
 * @param {string} title - The title of the modal.
 * @param {string} message - The message content.
 * @param {boolean} [isLoading=false] - If true, hides the OK button and shows a spinner.
 */
const showMessage = (title, message, isLoading = false) => {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').innerHTML = message; // Use innerHTML for markdown/bolding
    modalOkBtn.style.display = isLoading ? 'none' : 'block';
    modalSpinner.classList.toggle('hidden', !isLoading);
    document.getElementById('messageModal').classList.remove('hidden');
    document.getElementById('messageModal').classList.add('flex');
    // Allow closing only if not loading
    if (!isLoading) {
        modalOkBtn.onclick = () => {
            document.getElementById('messageModal').classList.add('hidden');
            document.getElementById('messageModal').classList.remove('flex');
        };
    }
};

/**
 * Hides the custom message modal.
 */
const hideMessage = () => {
    document.getElementById('messageModal').classList.add('hidden');
    document.getElementById('messageModal').classList.remove('flex');
    modalSpinner.classList.add('hidden');
    modalOkBtn.style.display = 'block';
};

/**
 * Formats bytes into a human-readable string (KB, MB, GB).
 * @param {number} bytes - The number of bytes.
 * @param {number} [decimals=2] - The number of decimal places.
 * @returns {string} The formatted size string.
 */
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Checks if a game is selected and a file is chosen, enabling/disabling the upload button.
 */
const checkUploadReadiness = () => {
    uploadButton.disabled = !(currentlySelectedGame.trim() && selectedFile);
};

/**
 * Converts a Blob object to a Base64 string for export.
 * @param {Blob} blob - The Blob to convert.
 * @returns {Promise<string>} The Base64 string.
 */
const blobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        // Only return the base64 part of the data URL (after the comma)
        const base64String = reader.result.split(',')[1]; 
        resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
});

/**
 * Converts a Base64 string back to a Blob object for import.
 * @param {string} base64 - The Base64 string.
 * @param {string} [mimeType='application/octet-stream'] - The MIME type of the original file.
 * @returns {Blob} The created Blob object.
 */
const base64ToBlob = (base64, mimeType = 'application/octet-stream') => {
    const byteCharacters = atob(base64);
    const byteArrays = [];
    // Chunk size increased for better performance on large files
    const chunkSize = 1024 * 1024; // 1MB chunks
    for (let offset = 0; offset < byteCharacters.length; offset += chunkSize) {
        const slice = byteCharacters.slice(offset, offset + chunkSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: mimeType });
};


// --- IndexedDB Core Functions ---

/**
 * Opens and initializes the IndexedDB database.
 * @returns {Promise<IDBDatabase>} The IDBDatabase instance.
 */
const openDB = () => new Promise((resolve, reject) => {
    if (db) { resolve(db); return; } // Return existing instance if available
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => (console.error("IndexedDB Error:", e.target.error), showMessage('DB Error', 'Failed to open local database.'), reject(e.target.error));
    request.onupgradeneeded = (e) => {
        db = e.target.result;
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(SAVES_STORE)) db.createObjectStore(SAVES_STORE, { keyPath: 'id' });
        if (!db.objectStoreNames.contains(GAMES_STORE)) db.createObjectStore(GAMES_STORE, { keyPath: 'name' });
    };
    request.onsuccess = (e) => (db = e.target.result, resolve(db));
});

/**
 * Executes an IndexedDB transaction.
 * @param {string} storeName - The name of the object store.
 * @param {'readonly'|'readwrite'} mode - The transaction mode.
 * @param {function(IDBObjectStore, function, function): void} callback - The logic to execute within the transaction.
 * @returns {Promise<void>} Resolves when the transaction is complete.
 */
const transact = (storeName, mode, callback) => new Promise(async (resolve, reject) => {
    try {
        const dbInstance = await openDB();
        const tx = dbInstance.transaction(storeName, mode);
        tx.oncomplete = () => resolve();
        tx.onerror = (e) => {
            if (e.target.error.name === 'QuotaExceededError') {
                showMessage('Storage Full', 'Exceeded browser storage limit. Delete old saves.');
            }
            const errorMsg = e.target.error ? e.target.error.name + ': ' + e.target.error.message : 'Unknown IndexedDB Error';
            console.error("IndexedDB Transaction Error:", e.target.error);
            reject(e.target.error);
        };
        callback(tx.objectStore(storeName), resolve, reject);
    } catch (e) {
        reject(e);
    }
});

// --- IndexedDB API Wrapper ---
const DB = {
    addGame: (name) => transact(GAMES_STORE, 'readwrite', (store, resolve, reject) => {
        // Attempt to add. If name exists (ConstraintError), it's okay, just resolve.
        const req = store.add({ name });
        req.onsuccess = resolve;
        req.onerror = (e) => (e.target.error.name === 'ConstraintError' ? resolve() : reject(e.target.error));
    }),
    clearStore: (storeName) => transact(storeName, 'readwrite', (store, resolve) => {
        store.clear().onsuccess = resolve;
    }),
    getAllGames: () => transact(GAMES_STORE, 'readonly', (store, resolve) => {
        const req = store.getAll();
        // Return sorted list of game names
        req.onsuccess = (e) => resolve(e.target.result.map(g => g.name).sort((a, b) => a.localeCompare(b)));
    }),
    getAllSaves: () => transact(SAVES_STORE, 'readonly', (store, resolve) => {
        store.getAll().onsuccess = (e) => resolve(e.target.result);
    }),
    addSave: (save) => transact(SAVES_STORE, 'readwrite', (store, resolve) => {
        store.add(save).onsuccess = resolve;
    }),
    deleteSave: (id) => transact(SAVES_STORE, 'readwrite', (store, resolve) => {
        store.delete(id).onsuccess = resolve;
    }),
    getSave: (id) => transact(SAVES_STORE, 'readonly', (store, resolve) => {
        store.get(id).onsuccess = (e) => resolve(e.target.result);
    }),
};


// --- Storage Logic ---

/**
 * Calculates the total size of all save files stored in IndexedDB.
 * @returns {Promise<number>} The total size in bytes.
 */
const calculateTotalStorageUsage = async () => {
    try {
        const saves = await DB.getAllSaves();
        // Sum the 'size' property of all saves
        const totalBytes = saves.reduce((sum, save) => sum + (save.size || 0), 0);
        return totalBytes;
    } catch (e) {
        console.error("Failed to calculate storage usage:", e);
        return 0;
    }
};

/**
 * Fetches the current usage and updates the display in the settings modal.
 */
const updateStorageDisplay = async () => {
    // Check if the element exists before attempting to update (ensures robustness)
    const displayElement = document.getElementById('storageUsageDisplay');
    if (!displayElement) return;

    displayElement.textContent = '...'; // Show loading state
    const usageBytes = await calculateTotalStorageUsage();
    displayElement.textContent = formatBytes(usageBytes);
};


// --- UI and Data Loading Logic ---

/**
 * Ensures the default games are in the database if the game list is empty.
 */
const initializeGamesStore = async () => {
    allGameNames = await DB.getAllGames();
    if (allGameNames.length === 0) {
        // Add default games
        await transact(GAMES_STORE, 'readwrite', (store, resolve) => {
            DEFAULT_GAMES.forEach(name => store.add({ name }));
            resolve();
        });
        allGameNames = await DB.getAllGames(); // Re-fetch all games
    }
};

/**
 * Populates the game dropdown list based on the search term.
 * @param {string} [searchTerm=''] - The text to filter the game names by.
 */
const filterGameOptions = (searchTerm = '') => {
    const normalizedTerm = searchTerm.toLowerCase();
    gameDropdownList.innerHTML = '';
    
    const filteredGames = allGameNames.filter(name => name.toLowerCase().includes(normalizedTerm));

    if (filteredGames.length === 0) {
        gameDropdownList.innerHTML = `<div class="p-3 text-gray-400">No matching games found.</div>`;
        return;
    }

    filteredGames.forEach(gameName => {
        const option = document.createElement('div');
        option.className = 'p-3 cursor-pointer text-white hover:bg-teal-600 transition duration-100 truncate';
        
        // Highlight matching text
        const index = gameName.toLowerCase().indexOf(normalizedTerm);
        if (index !== -1) {
            const before = gameName.substring(0, index);
            const match = gameName.substring(index, index + normalizedTerm.length);
            const after = gameName.substring(index + normalizedTerm.length);
            option.innerHTML = `${before}<span class="font-bold text-teal-300">${match}</span>${after}`;
        } else {
            option.textContent = gameName;
        }

        option.addEventListener('click', () => handleGameSelection(gameName));
        gameDropdownList.appendChild(option);
    });
};

/**
 * Handles selection of a game from the dropdown, updating state and UI.
 * @param {string} gameName - The name of the selected game.
 */
const handleGameSelection = (gameName) => {
    currentlySelectedGame = gameName;
    gameSearchInput.value = gameName;
    gameDropdownList.classList.add('hidden');
    checkUploadReadiness();
};

/**
 * Fetches all saves and renders them in the SaveBase Directory list.
 */
const renderSaves = async () => {
    try {
        const saves = await DB.getAllSaves();
        saveListContainer.innerHTML = ''; 

        if (saves.length === 0) {
            emptyState.classList.remove('hidden');
            saveListContainer.appendChild(emptyState);
            return;
        }
        emptyState.classList.add('hidden');

        // Sort by upload date, newest first
        saves.sort((a, b) => b.uploadDate - a.uploadDate).forEach(save => {
            const item = document.createElement('div');
            item.className = 'file-list-item flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#111] rounded-md transition border border-gray-600 hover:border-blue-500 hover:bg-[#222]';
            item.innerHTML = `
                <div class="flex-1 w-full sm:w-auto mb-2 sm:mb-0">
                    <h3 class="text-lg font-bold text-teal-300 truncate">${save.gameName}</h3>
                    <p class="text-sm text-gray-400 truncate">${save.fileName}</p>
                    <p class="text-xs text-gray-500 mt-1">
                        Size: <span class="font-mono text-gray-300">${formatBytes(save.size)}</span> | 
                        Uploaded: ${new Date(save.uploadDate).toLocaleDateString()}
                    </p>
                </div>
                <div class="actions flex space-x-2 opacity-100 sm:opacity-70 transition-opacity">
                    <button data-id="${save.id}" class="download-btn px-3 py-1 bg-[none] text-white text-sm rounded-md hover:bg-[blue] hover:text-white transition">Download</button>
                    <button data-id="${save.id}" class="delete-btn px-3 py-1 bg-bg-[none] text-white text-sm rounded-md hover:bg-[red] transition">Delete Local</button>
                </div>
            `;
            saveListContainer.appendChild(item);
        });
        
        // Attach event listeners to dynamically created buttons
        document.querySelectorAll('.download-btn').forEach(btn => btn.addEventListener('click', handleDownload));
        document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDelete));

    } catch (error) {
        console.error("Failed to render saves:", error);
        showMessage('Render Error', 'Could not load saved files.');
    }
};


// --- Action Handlers ---

/**
 * Handles the click event for downloading a save file.
 * @param {Event} event - The click event.
 */
const handleDownload = async (event) => {
    const id = event.target.dataset.id;
    const originalText = event.target.textContent;
    event.target.textContent = 'Preparing...';
    event.target.disabled = true;

    try {
        const save = await DB.getSave(id);
        if (save && save.data instanceof Blob) {
            const url = URL.createObjectURL(save.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = save.fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showMessage('Download Initiated', `Downloading "${save.fileName}".`);
        } else {
            showMessage('Error', 'File data not found.');
        }
    } catch (e) {
        console.error("Download failed:", e);
        showMessage('Download Failed', 'Could not retrieve file.');
    } finally {
        event.target.textContent = originalText;
        event.target.disabled = false;
    }
};

/**
 * Handles the click event for deleting a save file.
 * @param {Event} event - The click event.
 */
const handleDelete = async (event) => {
    const id = event.target.dataset.id;
    const confirmed = await window.customConfirm("Are you sure you want to permanently delete this save file? This action cannot be undone.");

    if (!confirmed) return;

    try {
        await DB.deleteSave(id);
        showMessage('Deleted', 'The save file has been permanently removed.');
        await renderSaves(); 
        await updateStorageDisplay(); // Update storage usage after deletion
        allGameNames = await DB.getAllGames(); // Refresh game list in case this save was the only one for a game
    } catch (e) {
        console.error("Delete failed:", e);
        showMessage('Deletion Failed', 'An error occurred while deleting the file.');
    }
};

/**
 * Handles the export of all data (games and saves) to a single JSON backup file.
 */
const handleExport = async () => {
    settingsModal.classList.add('hidden'); 
    showMessage('Exporting Vault...', 'Starting data preparation. This may take time for large files.', true);

    try {
        const saves = await DB.getAllSaves();
        const games = await DB.getAllGames();

        const totalSaves = saves.length;
        const encodedSaves = [];
        
        // Process saves sequentially to prevent massive concurrent memory spike.
        for (let i = 0; i < totalSaves; i++) {
            const save = saves[i];
            showMessage('Exporting Vault...', 
                `Converting save file ${i + 1} of ${totalSaves}: "${save.fileName}" (${formatBytes(save.size)}).`, 
                true);
            
            // Memory intensive step: converting Blob to Base64
            const base64Data = await blobToBase64(save.data); 
            
            encodedSaves.push({
                id: save.id,
                gameName: save.gameName,
                fileName: save.fileName,
                uploadDate: save.uploadDate,
                size: save.size,
                type: save.data.type, // Required for converting back to Blob during import
                data: base64Data
            });
        }
        
        showMessage('Exporting Vault...', 'Finalizing JSON data.', true);

        const backupData = {
            version: DB_VERSION,
            timestamp: new Date().toISOString(),
            games: games.map(name => ({ name })),
            saves: encodedSaves
        };

        // Stringify is also memory intensive for large data
        const json = JSON.stringify(backupData, null, 2); 
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `gamedrive${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        hideMessage(); // Hide loading modal
        showMessage('Success!', `Vault backup file downloaded successfully. Total saves: ${totalSaves}.`);

    } catch (error) {
        hideMessage();
        console.error("Export failed:", error);
        showMessage('Export Failed', 'An error occurred during data export. Check console for details. (Likely memory exhaustion from very large files).');
    }
};

/**
 * Handles the import of data from a JSON backup file.
 */
const handleImport = async () => {
    if (!selectedImportFile) {
        showMessage('Error', 'Please select a backup file to import.');
        return;
    }

    const confirmed = await window.customConfirm("Are you absolutely sure you want to import this file? **This will erase all current local data.**");
    if (!confirmed) return;

    settingsModal.classList.add('hidden');
    showMessage('Importing Vault...', 'Reading backup file into memory. Do not close your browser.', true);

    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            let data;
            try {
                data = JSON.parse(e.target.result); // Memory intensive for large JSON
            } catch (parseError) {
                hideMessage();
                console.error("JSON Parsing failed:", parseError);
                showMessage('Import Error', 'Failed to parse JSON file. The file might be corrupted.');
                return;
            }


            if (data.version !== DB_VERSION) {
                hideMessage();
                showMessage('Import Error', `Backup version mismatch. Expected ${DB_VERSION}, found ${data.version}. Aborting.`);
                return;
            }

            showMessage('Importing Vault...', 'Clearing existing data stores...', true);
            // 1. Clear existing data
            await DB.clearStore(SAVES_STORE);
            await DB.clearStore(GAMES_STORE);
            
            // 2. Restore Games
            showMessage('Importing Vault...', 'Restoring game list.', true);
            await transact(GAMES_STORE, 'readwrite', (store, resolve) => {
                data.games.forEach(game => store.add(game));
                resolve();
            });
            
            // 3. Restore Saves Sequentially
            const totalSaves = data.saves.length;
            for (let i = 0; i < totalSaves; i++) {
                const save = data.saves[i];
                
                showMessage('Importing Vault...', 
                    `Converting and restoring save ${i + 1} of ${totalSaves}: "${save.fileName}" (${formatBytes(save.size)}).`, 
                    true); 

                // Convert Base64 back to Blob (chunked implementation helps memory)
                const saveBlob = base64ToBlob(save.data, save.type);
                
                const decodedSave = {
                    id: save.id,
                    gameName: save.gameName,
                    fileName: save.fileName,
                    uploadDate: save.uploadDate,
                    size: save.size,
                    data: saveBlob // Store the Blob in IndexedDB
                };
                
                // Add saves sequentially
                await DB.addSave(decodedSave); 
            }
            
            // 4. Reset UI state and reload
            selectedImportFile = null;
            importFileInput.value = null;
            importFileNameDisplay.textContent = 'No file selected.';
            importDataBtn.disabled = true;

            await initializeGamesStore();
            await renderSaves();
            await updateStorageDisplay(); // Update storage usage after successful import
            
            hideMessage();
            showMessage('Success!', `Vault successfully restored! ${totalSaves} saves imported.`);
        };
        reader.readAsText(selectedImportFile);

    } catch (error) {
        hideMessage();
        console.error("Import failed:", error);
        showMessage('Import Failed', `An error occurred during import. The file might be corrupted or too large to process.`);
    }
};

/**
 * Handles the upload process of a new save file.
 */
const handleUpload = async () => {
    const gameName = currentlySelectedGame.trim();
    if (!selectedFile || !gameName) { showMessage('Missing Info', 'Select a game and a file.'); return; }
    
    // Warning for large files during upload
    if (selectedFile.size > 1024 * 1024 * 500) { // 500MB limit
        const confirmed = await window.customConfirm(
            `The selected file is **${formatBytes(selectedFile.size)}**. Very large files can cause memory issues on export/import. Proceed with upload?`
        );
        if (!confirmed) return;
    }
    if (selectedFile.size > 2 * 1024 * 1024 * 1024) { 
        showMessage('File Too Large', 'File size exceeds 2 GB. This will almost certainly fail on export/import.'); 
        return;
    }


    uploadButton.textContent = 'Uploading...';
    uploadButton.disabled = true;

    try {
        // Ensure the game exists in the games list
        await DB.addGame(gameName); 
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            const newSave = {
                id: crypto.randomUUID(), 
                gameName: gameName, 
                fileName: selectedFile.name,
                uploadDate: new Date().getTime(),
                size: selectedFile.size,
                // Store the Blob directly in IndexedDB (most efficient)
                data: new Blob([e.target.result], { type: selectedFile.type })
            };

            await DB.addSave(newSave);
            
            // Reset UI state after successful upload
            currentlySelectedGame = '';
            gameSearchInput.value = '';
            fileInput.value = null;
            selectedFile = null;
            fileNameDisplay.textContent = 'No file selected.';
            
            showMessage('Success!', `"${newSave.fileName}" for ${newSave.gameName} has been saved.`);
            await renderSaves();
            await updateStorageDisplay(); // Update storage usage after successful upload
            checkUploadReadiness();
        };
        reader.readAsArrayBuffer(selectedFile);
        
    } catch (error) {
        console.error("Upload failed:", error);
        showMessage('Upload Failed', 'An error occurred during upload. Check console for details.');
    } finally {
        uploadButton.textContent = 'Upload Save to Local Directory';
    }
};


// --- Custom Confirmation Modal ---

/**
 * Displays a custom confirmation modal (replaces window.confirm).
 * @param {string} message - The confirmation message (can contain markdown for emphasis).
 * @returns {Promise<boolean>} True if confirmed, false if cancelled.
 */
window.customConfirm = (message) => {
    return new Promise((resolve) => {
        const tempModal = document.createElement('div');
        tempModal.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50';
        tempModal.innerHTML = `
            <div class="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-sm border-t-4 border-red-500">
                <h3 class="text-xl font-bold mb-3 text-red-400">Confirmation Required</h3>
                <p class="text-gray-300 mb-6">${message}</p>
                <div class="flex justify-end space-x-3">
                    <button id="cancelBtn" class="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-500 transition">Cancel</button>
                    <button id="okBtn" class="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition">Confirm Action</button>
                </div>
            </div>
        `;
        document.body.appendChild(tempModal);

        const cleanup = (result) => {
            document.body.removeChild(tempModal);
            resolve(result);
        };

        tempModal.querySelector('#okBtn').addEventListener('click', () => cleanup(true));
        tempModal.querySelector('#cancelBtn').addEventListener('click', () => cleanup(false));
    });
};


// --- Event Listener Initialization ---
const attachEventListeners = () => {
    document.getElementById('modalOkBtn').addEventListener('click', hideMessage);
    
    // Settings button logic
    document.getElementById('openSettingsBtn').addEventListener('click', () => {
        updateStorageDisplay(); // Update storage display immediately on open
        settingsModal.classList.remove('hidden');
    });
    document.getElementById('closeSettingsBtn').addEventListener('click', () => settingsModal.classList.add('hidden'));
    
    document.getElementById('exportDataBtn').addEventListener('click', handleExport);
    document.getElementById('importDataBtn').addEventListener('click', handleImport);

    document.getElementById('selectImportFileBtn').addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', (event) => {
        selectedImportFile = event.target.files[0];
        if (selectedImportFile) {
            importFileNameDisplay.textContent = selectedImportFile.name;
            importDataBtn.disabled = false;
        } else {
            importFileNameDisplay.textContent = 'No file selected.';
            importDataBtn.disabled = true;
        }
    });
    
    // Game Search Input listeners
    gameSearchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.trim();
        currentlySelectedGame = ''; 
        checkUploadReadiness();
        filterGameOptions(searchTerm);
        gameDropdownList.classList.remove('hidden');
    });
    gameSearchInput.addEventListener('focus', (event) => {
        if (event.target.value.trim() === '') filterGameOptions('');
        gameDropdownList.classList.remove('hidden');
    });
    document.addEventListener('click', (event) => {
        if (!document.getElementById('gameDropdownList').parentNode.contains(event.target)) {
            gameDropdownList.classList.add('hidden');
            const inputVal = gameSearchInput.value.trim();
            if (allGameNames.includes(inputVal)) {
                currentlySelectedGame = inputVal;
            } else if (currentlySelectedGame !== inputVal) {
                currentlySelectedGame = '';
            }
            checkUploadReadiness();
        }
    });

    // Add New Game listeners
    newGameNameInput.addEventListener('input', () => addNewGameButton.disabled = !newGameNameInput.value.trim());
    addNewGameButton.addEventListener('click', async () => {
        const newGameName = newGameNameInput.value.trim();
        if (newGameName) {
            try {
                await DB.addGame(newGameName);
                allGameNames = await DB.getAllGames();
                handleGameSelection(newGameName); 
                newGameNameInput.value = ''; 
                addNewGameButton.disabled = true;
                showMessage('Game Added', `"${newGameName}" is now available and selected.`);
            } catch (e) {
                showMessage('Error', 'Could not add game.');
            }
        }
    });

    // File Upload listeners
    fileInput.addEventListener('change', (event) => {
        selectedFile = event.target.files[0];
        fileNameDisplay.textContent = selectedFile ? selectedFile.name : 'No file selected.';
        checkUploadReadiness();
    });
    document.getElementById('selectFileButton').addEventListener('click', () => fileInput.click());
    uploadButton.addEventListener('click', handleUpload);
};


// --- Initialization ---

/**
 * Main initialization function called when the window loads.
 */
window.onload = async () => {
    try {
        // We ensure all DOM elements are available before attaching listeners
        attachEventListeners(); 
        await openDB(); // Open IndexedDB
        await initializeGamesStore(); // Load/populate game list
        await renderSaves(); // Load and display saved files
        await updateStorageDisplay(); // Initial storage usage calculation

        // Hide the loading screen with a fade-out effect
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
    } catch (error) {
        showMessage('Initialization Error', 'Application failed to start.');
    }
};
