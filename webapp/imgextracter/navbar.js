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

    // 2. Define the Navbar HTML Structure (Added SVG Favicon/Logo)
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
            <div class="flex items-center space-x-3">
                <!-- Favicon / Logo SVG -->
                <div class="bg-[none] p-2 rounded-lg">
                    <img src="assets/favicon.png">
                </div>
                <h2 class="text-xl font-bold tracking-tight">IMG Extracter</h2>
            </div>
            <button id="close-menu-button" class="sm:hidden text-gray-400 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <ul class="space-y-4">
            <li>
                <a href="index.html" id="home-link" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Dashboard</span>
                </a>
            </li>
            <li>
                <a href="more-tools.html" id="more-tools-link" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                    <span>Tool Panel</span>
                </a>
            </li>
            <li>
                <a href="settings.html" id="settings-link" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                </a>
            </li>
            <li>
                <a href="https://stadiastudios.github.io/stadia" rel="noopener noreferrer" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#333] transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span>StadiaStudios</span>
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