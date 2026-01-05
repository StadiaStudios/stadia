/**
 * StadiaStudios Shared Components - Microsoft Style Dark Edition
 * This script injects a Microsoft-inspired Navbar and Footer with a dark theme.
 */

const components = {
    navbar: `
    <nav class="fixed w-full z-50 bg-[#111] text-white border-b border-white/10 font-sans h-[54px] flex items-center backdrop-blur-md" id="navbar">
        <div class="max-w-[1600px] mx-auto w-full px-4 md:px-6 lg:px-10 flex items-center justify-between">
            
            <!-- Left Side: Logo & Primary Nav -->
            <div class="flex items-center space-x-2 lg:space-x-8">
                <!-- Mobile Menu Trigger -->
                <button id="mobile-menu-button" class="md:hidden p-2 text-xl text-gray-400 hover:text-white">
                    <i class="fa-solid fa-bars"></i>
                </button>

                <!-- Original StadiaStudios Logo -->
                <div class="flex items-center cursor-pointer shrink-0" onclick="window.location.href='index.html'">
                    <span class="font-display font-bold text-xl tracking-tighter uppercase">Stadia<span class="text-zinc-500">Studios</span></span>
                </div>

                <!-- Desktop Primary Links -->
                <div class="hidden md:flex items-center space-x-6 text-[13px] text-gray-300">
                    <a href="index.html" class="hover:text-white hover:underline underline-offset-[6px] decoration-2 transition-colors">Home</a>
                    <a href="index.html#games" class="hover:text-white hover:underline underline-offset-[6px] decoration-2 transition-colors">Games</a>
                    <a href="store.html" class="hover:text-white hover:underline underline-offset-[6px] decoration-2 transition-colors">Store</a>
                </div>
            </div>

        </div>
    </nav>

    <!-- Mobile Navigation Menu (Dark) -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-[#111] transform translate-x-full transition-transform duration-300 md:hidden">
        <div class="flex items-center justify-between p-4 border-b border-white/10 bg-black">
             <div class="flex items-center font-bold text-lg uppercase tracking-tighter">
                Stadia<span class="text-zinc-500">Studios</span>
            </div>
            <button id="mobile-menu-close" class="p-2 text-xl text-gray-400 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="flex flex-col text-gray-300">
            <a href="index.html" class="mobile-nav-link p-4 border-b border-white/5 hover:bg-white/5 hover:text-white transition-colors">Home</a>
            <a href="index.html#games" class="mobile-nav-link p-4 border-b border-white/5 hover:bg-white/5 hover:text-white transition-colors">Games</a>
            <a href="store.html" class="mobile-nav-link p-4 border-b border-white/5 hover:bg-white/5 hover:text-white transition-colors">Store</a>
            <a href="https://discord.gg/UGBFVrcKKx" class="mobile-nav-link p-4 border-b border-white/5 hover:bg-white/5 hover:text-white font-semibold">Join Stadia</a>
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
                        <li><a href="https://stadiastudios.github.io/passpro" class="hover:underline hover:text-white">PassPro</a></li>
                        <li><a href="webapp/gamedrive/index.html" class="hover:underline hover:text-white">GameDrive</a></li>
                        <li><a href="https://stadiastudios.github.io/ourjourney/splash" class="hover:underline hover:text-white">Our Journey</a></li>
                        <li><a href="https://stadiastudios.github.io/themegram/" class="hover:underline hover:text-white">ThemeGram</a></li>
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
    const openBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = 'auto';
        }
    };

    if (openBtn) openBtn.onclick = () => toggleMenu(true);
    if (closeBtn) closeBtn.onclick = () => toggleMenu(false);
    mobileLinks.forEach(link => link.onclick = () => toggleMenu(false));
}

window.addEventListener('DOMContentLoaded', initLayout);