const components = {
    navbar: `
    <nav class="fixed top-0 left-0 w-full z-[100] transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/[0.05]" id="main-nav">
        <div class="max-w-[1024px] mx-auto px-6 h-11 flex items-center justify-between">
            
            <div class="flex items-center cursor-pointer group" onclick="window.location.href='index.html'">
                <span class="font-display font-bold text-[14px] tracking-tight text-white opacity-90 group-hover:opacity-100 transition-opacity">
                    STADIA<span class="font-light text-zinc-500">STUDIOS</span>
                </span>
            </div>

            <div class="hidden md:flex items-center gap-8">
                <a href="index.html" class="text-[12px] font-normal text-zinc-400 hover:text-white transition-colors">Home</a>
                <a href="index.html#games" class="text-[12px] font-normal text-zinc-400 hover:text-white transition-colors">Games</a>
                <a href="store.html" class="text-[12px] font-normal text-zinc-400 hover:text-white transition-colors">App Store</a>
                <a href="https://discord.gg/UGBFVrcKKx" class="text-[12px] font-normal text-zinc-400 hover:text-white transition-colors">Community</a>
            </div>

            <div class="flex items-center gap-5">
                <button class="text-zinc-400 hover:text-white transition-colors">
                    <i class="fas fa-search text-[13px]"></i>
                </button>
                <button id="mobile-menu-button" class="md:hidden text-zinc-400 hover:text-white transition-colors">
                    <i class="fa-solid fa-bars-staggered text-[14px]"></i>
                </button>
            </div>
        </div>
    </nav>

    <div id="mobile-menu" class="fixed inset-0 z-[110] invisible opacity-0 transition-all duration-300">
        <div id="mobile-menu-backdrop" class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
        
        <div id="mobile-menu-panel" class="absolute top-0 left-0 w-full h-full p-12 flex flex-col items-center justify-center gap-8">
            <button id="mobile-menu-close" class="absolute top-6 right-6 text-zinc-400 text-2xl hover:text-white">&times;</button>
            <a href="index.html" class="mobile-nav-link text-3xl font-semibold text-white">Home</a>
            <a href="index.html#games" class="mobile-nav-link text-3xl font-semibold text-white">Games</a>
            <a href="store.html" class="mobile-nav-link text-3xl font-semibold text-white">App Store</a>
            <a href="https://discord.gg/UGBFVrcKKx" class="mobile-nav-link text-3xl font-semibold text-zinc-500">Discord</a>
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
                        <li><a href="https://drive.google.com/file/d/14gJk2N3nFoSUFlROreiqdDq7NsEqcGUF/view?usp=sharing" class="hover:underline hover:text-white">Jet Surfers Classic</a></li>
                        <li><a href="https://stadiastudios.github.io/JetSurfers2/" class="hover:underline hover:text-white">Jet Surfers II</a></li>
                        <li><a href="https://stadiastudios.github.io/stadia/details-lumbertycoon.html" class="hover:underline hover:text-white">LumberTycoon</a></li>
                        <li><a href="https://stadiastudios.github.io/candyswap" class="hover:underline hover:text-white">CandySwap</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold text-white mb-4 text-[15px]">Applications</h4>
                    <ul class="space-y-3">
                        <li><a href="https://stadiabeta.github.io/tool-panel/" class="hover:underline hover:text-white">StadiaTool Panel</a></li>
                        <li><a href="https://stadiastudios.github.io/passpro/" class="hover:underline hover:text-white">PassPro</a></li>
                        <li><a href="https://stadiastudios.github.io/GameDrive/" class="hover:underline hover:text-white">GameDrive</a></li>
                        <li><a href="https://stadiastudios.github.io/ourjourney/splash" class="hover:underline hover:text-white">Our Journey</a></li>
                        <li><a href="details-recorderpro.html" class="hover:underline hover:text-white">RecorderPRO</a></li>
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
    const menuBackdrop = document.getElementById('mobile-menu-backdrop');
    const openBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('invisible', 'opacity-0');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('opacity-0');
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
            nav.classList.add('bg-black/95', 'shadow-2xl');
            nav.classList.remove('bg-black/80');
        } else {
            nav.classList.add('bg-black/80');
            nav.classList.remove('bg-black/95', 'shadow-2xl');
        }
    });
}

window.addEventListener('DOMContentLoaded', initLayout);