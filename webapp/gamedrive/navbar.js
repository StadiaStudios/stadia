/**
 * Archive+ Navigation Component
 * This script injects the shared navbar and handles its logic.
 * To use: Include <script src="navbar.js"></script> in any HTML file.
 */

(function() {
    const navbarHTML = `
    <nav class="fixed top-0 left-0 right-0 z-40 bg-[#0a0000]/90 backdrop-blur-md border-b border-[#330f0f]">
        <div class="container mx-auto flex justify-between items-center h-20 px-6 lg:px-12 max-w-7xl">
            <!-- Logo -->
            <div class="flex items-center space-x-3 cursor-pointer select-none group" onclick="window.location.href='index.html'">
                <div class="h-10 w-10 bg-brand rounded-none skew-x-[-10deg] flex items-center justify-center shadow-glow group-hover:bg-white transition-colors duration-300">
                    <img src="resources/icons/favicon.png" alt="Logo" onerror="this.style.display='none'">
                </div>
                <h1 class="text-2xl font-display font-bold text-white tracking-tight italic group-hover:text-brand transition-colors">
                    ARCHIVE+
                </h1>
            </div>
            
            <!-- Navigation -->
            <div class="flex items-center space-x-4">
                <div class="hidden md:flex items-center space-x-1">
                    <a href="guide.html" class="btn-gaming-ghost px-6 py-2 text-sm font-bold text-gray-400 uppercase tracking-wide"><span>Guide</span></a>
                    <a href="index.html#upload-form" class="btn-gaming-ghost px-6 py-2 text-sm font-bold text-gray-400 uppercase tracking-wide"><span>Upload</span></a>
                    <a href="index.html#save-directory" class="btn-gaming-ghost px-6 py-2 text-sm font-bold text-gray-400 uppercase tracking-wide"><span>My Files</span></a>
                </div>

                <div class="h-8 w-px bg-[#333] mx-2 hidden md:block skew-x-[-10deg]"></div>

                <!-- Settings Button -->
                <button id="openSettingsBtn" class="p-2 text-gray-400 hover:text-white hover:bg-[#330f0f] rounded-sm transition-all duration-200" title="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.5.342 1.107.452 1.636.326z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
    `;

    // Initialize Navbar
    function initNavbar() {
        const body = document.body;
        const navContainer = document.createElement('div');
        navContainer.innerHTML = navbarHTML;
        
        // Prepend to body so it's at the top
        body.insertBefore(navContainer.firstElementChild, body.firstChild);

        // Setup Settings Modal Logic (re-attached to elements in current DOM)
        const openBtn = document.getElementById('openSettingsBtn');
        const modal = document.getElementById('settingsModal');
        const closeBtn = document.getElementById('closeSettingsBtn');

        if (openBtn && modal) {
            openBtn.onclick = () => {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            };
        }

        if (closeBtn && modal) {
            closeBtn.onclick = () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            };
            
            // Close on backdrop
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }
            };
        }
    }

    // Run on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();