/**
 * StadiaStudios Navbar Component
 * A self-contained, responsive navbar with search and mobile menu support.
 */

const Navbar = {
    settings: {
        containerId: 'navbar-root',
        onSearch: (query) => console.log('Search:', query),
        links: [
            { text: 'Home', href: 'index.html', icon: 'fa-solid fa-house' },
            { text: 'Terms of Service', href: 'tos.pdf', icon: 'fa-solid fa-file-contract' }
        ],
        tools: [
            { text: 'YT ID Finder', href: 'webapp/imgextracter/idfinder.html', icon: 'fa-brands fa-youtube', color: 'text-red-500' },
            { text: 'IMG Extractor', href: 'webapp/imgextracter/index.html', icon: 'fa-solid fa-image', color: 'text-blue-500' },
            { text: 'Contact Support', href: 'https://discord.gg/UGBFVrcKKx', icon: 'fa-brands fa-discord', color: 'text-indigo-500' }
        ]
    },

    init(config = {}) {
        // Merge settings
        this.settings = { ...this.settings, ...config };
        this.render();
        this.attachListeners();
        this.handleScroll();
    },

    render() {
        const container = document.getElementById(this.settings.containerId);
        if (!container) {
            console.error(`Navbar container #${this.settings.containerId} not found.`);
            return;
        }

        const toolsDropdownHtml = this.settings.tools.map(tool => `
            <a href="${tool.href}" class="flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors group">
                <i class="${tool.icon} w-6 ${tool.color} group-hover:scale-110 transition-transform"></i>
                ${tool.text}
            </a>
        `).join('');

        const linksHtml = this.settings.links.map(link => `
            <a href="${link.href}" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
                ${link.text}
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full"></span>
            </a>
        `).join('');

        const mobileLinksHtml = this.settings.links.map(link => `
            <a href="${link.href}" class="block px-4 py-3 rounded-xl text-base font-medium text-gray-200 hover:bg-white/5 hover:text-white transition-all">
                <i class="${link.icon} w-6 text-gray-500"></i> ${link.text}
            </a>
        `).join('');

        const mobileToolsHtml = this.settings.tools.map(tool => `
            <a href="${tool.href}" class="block px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all pl-10">
                <i class="${tool.icon} w-6 ${tool.color}"></i> ${tool.text}
            </a>
        `).join('');

        container.innerHTML = `
            <nav class="fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent" id="main-nav">
                <!-- Glass Background Layer -->
                <div class="absolute inset-0 bg-dark-950/80 backdrop-blur-xl transition-opacity duration-300" id="nav-bg"></div>

                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div class="flex items-center justify-between h-20">
                        
                        <!-- Logo Area -->
                        <div class="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                            <div class="relative w-10 h-10">
                                <div class="absolute inset-0 bg-brand blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                                <img src="assets/favicon.png" class="relative w-full h-full rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300" 
                                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\'w-10 h-10 bg-dark-800 rounded-xl flex items-center justify-center text-brand\'><i class=\'fa-solid fa-gamepad\'></i></div>'">
                            </div>
                            <span class="text-xl font-bold tracking-tight text-white group-hover:text-gray-100 transition-colors">
                                Stadia<span class="text-brand">Studios</span>
                            </span>
                        </div>

                        <!-- Desktop Navigation -->
                        <div class="hidden md:flex items-center gap-8">
                            <!-- Links -->
                            <div class="flex items-center gap-6">
                                ${linksHtml}
                                
                                <!-- Tools Dropdown -->
                                <div class="relative group">
                                    <button class="flex items-center gap-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors focus:outline-none py-2">
                                        Tools
                                        <i class="fa-solid fa-chevron-down text-[10px] text-gray-500 transition-transform duration-300 group-hover:rotate-180"></i>
                                    </button>
                                    
                                    <!-- Dropdown Menu -->
                                    <div class="absolute right-0 top-full mt-2 w-56 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                                        <div class="bg-dark-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5">
                                            <div class="py-1">
                                                ${toolsDropdownHtml}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Search Bar -->
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <i class="fa-solid fa-search text-gray-500 group-focus-within:text-brand transition-colors"></i>
                                </div>
                                <input type="text" id="navbar-search-desktop" 
                                    class="bg-white/5 border border-white/10 text-gray-200 text-sm rounded-full focus:ring-2 focus:ring-brand/50 focus:border-brand/50 focus:bg-dark-900 block w-48 pl-10 pr-4 py-2.5 transition-all duration-300 focus:w-64 outline-none placeholder-gray-500 hover:bg-white/10" 
                                    placeholder="Search apps...">
                            </div>
                        </div>

                        <!-- Mobile Menu Button -->
                        <div class="md:hidden">
                            <button id="navbar-mobile-toggle" class="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand/50">
                                <i class="fa-solid fa-bars text-lg transition-transform duration-300" id="navbar-burger-icon"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Overlay -->
                <div id="navbar-mobile-menu" class="hidden md:hidden bg-dark-950/95 backdrop-blur-xl border-t border-white/5 absolute w-full shadow-2xl overflow-hidden transition-all duration-300 origin-top">
                    <div class="px-4 py-6 space-y-4">
                        <!-- Mobile Search -->
                        <div class="relative">
                            <i class="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                            <input type="text" id="navbar-search-mobile" 
                                class="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 pl-11 py-3 focus:ring-2 focus:ring-brand/50 outline-none placeholder-gray-500" 
                                placeholder="Find an app...">
                        </div>
                        
                        <div class="space-y-1">
                            ${mobileLinksHtml}
                        </div>
                        
                        <div class="pt-4 border-t border-white/5">
                            <p class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tools</p>
                            <div class="space-y-1">
                                ${mobileToolsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="h-20"></div> <!-- Spacer for fixed navbar -->
        `;
    },

    attachListeners() {
        // Search Inputs
        const desktopSearch = document.getElementById('navbar-search-desktop');
        const mobileSearch = document.getElementById('navbar-search-mobile');

        const handleInput = (e) => {
            const val = e.target.value;
            // Sync values
            if (e.target === desktopSearch && mobileSearch) mobileSearch.value = val;
            if (e.target === mobileSearch && desktopSearch) desktopSearch.value = val;
            
            this.settings.onSearch(val);
        };

        if (desktopSearch) desktopSearch.addEventListener('input', handleInput);
        if (mobileSearch) mobileSearch.addEventListener('input', handleInput);

        // Mobile Menu Toggle
        const btn = document.getElementById('navbar-mobile-toggle');
        const menu = document.getElementById('navbar-mobile-menu');
        const icon = document.getElementById('navbar-burger-icon');

        if (btn && menu && icon) {
            btn.addEventListener('click', () => {
                const isHidden = menu.classList.contains('hidden');
                
                if (isHidden) {
                    menu.classList.remove('hidden');
                    // Small timeout for animation entry if we added specific CSS animations
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark', 'rotate-90');
                } else {
                    menu.classList.add('hidden');
                    icon.classList.remove('fa-xmark', 'rotate-90');
                    icon.classList.add('fa-bars');
                }
            });
        }
    },

    handleScroll() {
        const nav = document.getElementById('main-nav');
        const bg = document.getElementById('nav-bg');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('shadow-lg', 'shadow-brand/5');
                bg.classList.replace('bg-dark-950/80', 'bg-dark-950/95');
                nav.classList.add('border-white/5');
                nav.classList.remove('border-transparent');
            } else {
                nav.classList.remove('shadow-lg', 'shadow-brand/5');
                bg.classList.replace('bg-dark-950/95', 'bg-dark-950/80');
                nav.classList.remove('border-white/5');
                nav.classList.add('border-transparent');
            }
        });
    }
};