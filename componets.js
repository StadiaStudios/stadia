const components = {
    navbar: `
    <nav class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/[0.08]" id="main-nav">
        <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
            
            <div class="flex items-center gap-8">
                <div class="flex items-center cursor-pointer group" onclick="window.location.href='index.html'">
                    <span class="font-display font-black text-xl tracking-[0.1em] uppercase text-white group-hover:text-zinc-300 transition-colors">
                        Stadia<span class="text-zinc-500 group-hover:text-zinc-400">Studios</span>
                    </span>
                </div>

                <div class="hidden md:flex items-center gap-2">
                    <a href="index.html" class="relative overflow-hidden px-5 py-2 text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-full border border-transparent hover:border-white/80 transition-all duration-300 group">
                        <span class="relative z-10 transition-colors">Home</span>
                        <div class="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:left-[100%] transition-all duration-500 ease-out z-0"></div>
                    </a>
                    <a href="index.html#games" class="relative overflow-hidden px-5 py-2 text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-full border border-transparent hover:border-white/80 transition-all duration-300 group">
                        <span class="relative z-10 transition-colors">Games</span>
                        <div class="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:left-[100%] transition-all duration-500 ease-out z-0"></div>
                    </a>
                    <a href="store.html" class="relative overflow-hidden px-5 py-2 text-[13px] font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-full border border-transparent hover:border-white/80 transition-all duration-300 group">
                        <span class="relative z-10 transition-colors">App Store</span>
                        <div class="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:left-[100%] transition-all duration-500 ease-out z-0"></div>
                    </a>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <a href="https://discord.gg/UGBFVrcKKx" class="hidden sm:block px-5 py-2 bg-white text-black text-[12px] font-bold uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-colors">
                    Join Community
                </a>
                
                <button id="mobile-menu-button" class="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors">
                    <i class="fa-solid fa-bars-staggered text-lg"></i>
                </button>
            </div>
        </div>
    </nav>

    <div id="mobile-menu" class="fixed inset-0 z-[110] invisible opacity-0 transition-all duration-300">
        <div id="mobile-menu-backdrop" class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        
        <div id="mobile-menu-panel" class="absolute top-0 right-0 w-[300px] h-full bg-[#0a0a0a] border-l border-white/10 translate-x-full transition-transform duration-500 ease-out p-8 flex flex-col">
            <div class="flex items-center justify-between mb-12">
                <span class="font-black text-lg tracking-tighter uppercase text-white">Menu</span>
                <button id="mobile-menu-close" class="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            
            <div class="flex flex-col gap-2">
                <a href="index.html" class="mobile-nav-link text-2xl font-bold text-zinc-500 hover:text-white transition-colors py-2">Home</a>
                <a href="index.html#games" class="mobile-nav-link text-2xl font-bold text-zinc-500 hover:text-white transition-colors py-2">Games</a>
                <a href="store.html" class="mobile-nav-link text-2xl font-bold text-zinc-500 hover:text-white transition-colors py-2">App Store</a>
                <div class="h-px bg-white/10 my-4"></div>
                <a href="https://discord.gg/UGBFVrcKKx" class="mobile-nav-link text-sm font-bold text-white uppercase tracking-widest pt-4 flex items-center gap-2">
                    Discord <i class="fa-brands fa-discord"></i>
                </a>
            </div>

            <div class="mt-auto">
                <p class="text-[10px] text-zinc-600 uppercase tracking-[0.2em]">© StadiaStudios Project</p>
            </div>
        </div>
    </div>
    `,
    footer: `
    <footer class="bg-black text-gray-400 pt-12 pb-6 font-sans text-[12px] border-t border-white/5">
        <div class="max-w-[1600px] mx-auto px-4 md:px-10">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
                <div>
                    <h4 class="font-semibold text-white mb-4 text-[15px]">Games</h4>
                    <ul class="space-y-3">
                        <li><a href="details-armory-legends.html" class="hover:underline hover:text-white">Armory Legends</a></li>
                        <li><a href="https://drive.google.com/file/d/14gJk2N3nFoSUFlROreiqdDq7NsEqcGUF/view?usp=sharing" class="hover:underline hover:text-white">Jet Surfers Classic</a></li>
                        <li><a href="https://stadiastudios.github.io/JetSurfers2/" class="hover:underline hover:text-white">Jet Surfers II</a></li>
                        <li><a href="https://stadiastudios.github.io/stadia/details-lumbertycoon.html" class="hover:underline hover:text-white">LumberTycoon</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-white mb-4 text-[15px]">Applications</h4>
                    <ul class="space-y-3">
                        <li><a href="webapp/imgextracter/index.html" class="hover:underline hover:text-white">IMG EXTRACTER</a></li>
                        <li><a href="https://stadiastudios.github.io/passpro/" class="hover:underline hover:text-white">PassPro</a></li>
                        <li><a href="https://stadiastudios.github.io/GameDrive/" class="hover:underline hover:text-white">GameDrive</a></li>
                        <li><a href="https://stadiastudios.github.io/ourjourney/splash" class="hover:underline hover:text-white">Our Journey</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-white mb-4 text-[15px]">Stadia</h4>
                    <ul class="space-y-3">
                        <li><a href="tos.pdf" class="hover:underline hover:text-white">Terms Of Service</a></li>
                        <li><a href="server-rules-and-guidelines.pdf" class="hover:underline hover:text-white">Server Guidelines</a></li>
                        <li><a href="store.html" class="hover:underline hover:text-white">Stadia App Store</a></li>
                    </ul>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 space-y-4 lg:space-y-0 border-t border-white/5">
                <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a href="tos.pdf" class="hover:underline hover:text-white">Terms Of Service</a>
                    <a href="store.html" class="hover:underline hover:text-white">Stadia Store</a>
                </div>
                <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a href="index.html#games" class="hover:underline hover:text-white">More Games</a>
                    <a href="https://discord.gg/UGBFVrcKKx" class="hover:underline hover:text-white">Discord Community</a>
                    <span>&copy; StadiaStudios ${new Date().getFullYear()}</span>
                </div>
            </div>
        </div>
    </footer>
    `
};

function initLayout() {
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = components.navbar;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = components.footer;

    setupEvents();
}

function setupEvents() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuPanel = document.getElementById('mobile-menu-panel');
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');
    const openBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('invisible', 'opacity-0');
            menuPanel.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0');
            menuPanel.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('invisible');
            }, 300);
            document.body.style.overflow = 'auto';
        }
    };

    if (openBtn) openBtn.onclick = () => toggleMenu(true);
    if (closeBtn) closeBtn.onclick = () => toggleMenu(false);
    if (menuBackdrop) menuBackdrop.onclick = () => toggleMenu(false);
    
    mobileLinks.forEach(link => {
        link.onclick = () => toggleMenu(false);
    });

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (!nav) return;
        if (window.scrollY > 20) {
            nav.classList.add('h-14', 'bg-black/95');
            nav.classList.remove('h-16', 'bg-black/80');
        } else {
            nav.classList.add('h-16', 'bg-black/80');
            nav.classList.remove('h-14', 'bg-black/95');
        }
    });
}

window.addEventListener('DOMContentLoaded', initLayout);