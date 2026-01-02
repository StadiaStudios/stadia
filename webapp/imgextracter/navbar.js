document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Styles for the Backdrop and specific navbar needs
    const style = document.createElement('style');
    style.innerHTML = `
        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 40;
            transition: opacity 0.3s ease-in-out;
            opacity: 0;
            visibility: hidden;
        }
        .backdrop.visible {
            opacity: 1;
            visibility: visible;
        }
    `;
    document.head.appendChild(style);

    // 2. Define the Navbar HTML Structure
    const navbarHTML = `
    <!-- Mobile Menu Button -->
    <button id="menu-button" class="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
    </button>

    <!-- Side Navigation Bar -->
    <nav id="side-navbar" class="fixed top-0 left-0 bottom-0 w-64 bg-[#111] text-white p-6 shadow-2xl z-50 transform -translate-x-full transition-transform duration-300 ease-in-out sm:translate-x-0">
        <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-bold">IMG Extracter</h2>
            <button id="close-menu-button" class="sm:hidden text-gray-400 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <ul class="space-y-4">
            <li>
                <a href="index.html" id="home-link" class="block p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    Dashboard
                </a>
            </li>
            <li>
                <a href="more-tools.html" id="more-tools-link" class="block p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    Tool Panel
                </a>
            </li>
            <li>
                <a href="settings.html" id="settings-link" class="block p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    Settings
                </a>
            </li>
            <li>
                <a href="https://stadiastudios.github.io/stadia" rel="noopener noreferrer" class="block p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    StadiaStudios
                </a>
            </li>
        </ul>
    </nav>
    
    <!-- Mobile menu backdrop -->
    <div id="backdrop" class="backdrop"></div>
    `;

    // 3. Inject Navbar HTML at the start of the body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 4. Initialize Navbar Logic (Toggle functionality)
    const menuButton = document.getElementById('menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const sideNavbar = document.getElementById('side-navbar');
    const backdrop = document.getElementById('backdrop');

    const toggleMenu = (open) => {
        if (!sideNavbar || !backdrop) return;
        
        if (open) {
            sideNavbar.classList.remove('-translate-x-full');
            backdrop.classList.add('visible');
            document.body.style.overflow = 'hidden';
        } else {
            sideNavbar.classList.add('-translate-x-full');
            backdrop.classList.remove('visible');
            document.body.style.overflow = '';
        }
    };

    if (menuButton) menuButton.addEventListener('click', () => toggleMenu(true));
    if (closeMenuButton) closeMenuButton.addEventListener('click', () => toggleMenu(false));
    if (backdrop) backdrop.addEventListener('click', () => toggleMenu(false));
});