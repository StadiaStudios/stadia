/**
 * StadiaStudios Shared Components
 * This script injects the Navbar and Footer into the page automatically.
 * It also handles the logic for the mobile menu and scroll effects.
 */

const components = {
    navbar: `
    <nav class="fixed w-full z-50 bg-stadia-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center cursor-pointer" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
                    <a href="index.html"><span class="font-display font-bold text-2xl tracking-tighter uppercase">Stadia<span class="text-white">Studios</span></span></a>
                </div>

                <!-- Desktop Menu -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="index.html" class="nav-item text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Home</a>
                        <a href="index.html#games" class="nav-item text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Games</a>
                        <a href="store.html" class="nav-item text-sm font-semibold uppercase tracking-widest text-gray-300 hover:text-white transition-colors">Store</a>
                    </div>
                </div>

                <!-- Right Icons -->
                <div class="hidden md:flex items-center space-x-6">
                    <button class="text-gray-400 hover:text-white transition-colors"><i class="fa-solid fa-magnifying-glass"></i></button>
                    <a href="https://discord.gg/UGBFVrcKKx" class="text-xs font-bold border border-white/30 px-4 py-2 rounded hover:bg-white hover:text-black transition-all uppercase">JOIN STADIA</a>
                </div>

                <!-- Mobile menu button -->
                <div class="-mr-2 flex md:hidden">
                    <button type="button" id="mobile-menu-button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#111] focus:outline-none">
                        <i class="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 z-[60] bg-stadia-black flex flex-col pt-20 px-6 space-y-6 md:hidden transition-transform duration-300 translate-x-full">
        <button id="mobile-menu-close" class="absolute top-5 right-5 text-gray-400 hover:text-white">
            <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
        <a href="index.html" class="mobile-nav-link text-2xl font-display font-bold text-white hover:text-stadia-accent">HOME</a>
        <a href="index.html#games" class="mobile-nav-link text-2xl font-display font-bold text-white hover:text-stadia-accent">GAMES</a>
        <a href="store.html" class="mobile-nav-link text-2xl font-display font-bold text-white hover:text-stadia-accent">STORE</a>
        <div class="border-t border-gray-800 pt-6 mt-auto mb-10 flex flex-col space-y-4">
            <a href="https://discord.gg/UGBFVrcKKx" class="w-full text-center py-3 border border-white text-white font-bold uppercase hover:bg-white hover:text-black transition-colors">JOIN STADIA</a>
        </div>
    </div>
    `,
    footer: `
    <footer class="bg-black text-white pt-20 pb-10 border-t border-zinc-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                <!-- Brand -->
                <div class="lg:col-span-2">
                    <div class="flex items-center mb-6">
                        <img style="width:30px; border-radius: 14px;" src="assets/favicon.png">
                        <span class="font-display font-bold text-3xl uppercase tracking-tighter">Stadia<span class="text-zinc-500">Studios</span></span>
                    </div>
                    <p class="text-gray-500 mb-8 max-w-xs">Your one-stop destination for developer utilities, fun games, and essential productivity tools.</p>
                    <div class="flex space-x-4">
                        <a href="https://discord.gg/UGBFVrcKKx" class="w-10 h-10 flex items-center justify-center bg-[#222] rounded-full hover:bg-blue-500 transition-colors"><i class="fa-brands fa-discord"></i></a>
                    </div>
                </div>

                <!-- Links -->
                <div>
                    <h4 class="font-bold uppercase mb-6 text-sm tracking-wider">Games</h4>
                    <ul class="space-y-3 text-gray-400 text-sm">
                        <li><a href="details-armory-legends.html" class="hover:text-white transition-colors">Armory Legends BETA</a></li>
                        <li><a href="https://drive.google.com/file/d/14gJk2N3nFoSUFlROreiqdDq7NsEqcGUF/view?usp=sharing" class="hover:text-white transition-colors">Jet Surfers Classic</a></li>
                        <li><a href="https://stadiastudios.github.io/JetSurfers2/" class="hover:text-white transition-colors">Jet Surfers II</a></li>
                        <li><a href="details-lumbertycoon.html" class="hover:text-white transition-colors">LumberTycoon</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold uppercase mb-6 text-sm tracking-wider">Applications</h4>
                    <ul class="space-y-3 text-gray-400 text-sm">
                        <li><a href="webapp/imgextracter/index.html" class="hover:text-white transition-colors">IMG EXTRACTER</a></li>
                        <li><a href="https://stadiastudios.github.io/passpro/" class="hover:text-white transition-colors">PassPro</a></li>
                        <li><a href="webapp/gamedrive/index.html" class="hover:text-white transition-colors">GameDrive</a></li>
                        <li><a href="https://stadiastudios.github.io/ourjourney/splash" class="hover:text-white transition-colors">Our Journey</a></li>
                        <li><a href="https://stadiastudios.github.io/themegram/" class="hover:text-white transition-colors">ThemeGram</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold uppercase mb-6 text-sm tracking-wider">Support</h4>
                    <ul class="space-y-3 text-gray-400 text-sm">
                        <li><a href="https://discord.gg/UGBFVrcKKx" class="hover:text-white transition-colors">Discord Support Ticket</a></li>
                        <li><a href="tos.pdf" class="hover:text-white transition-colors">Terms Of Service</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                <p>&copy; ${new Date().getFullYear()} StadiaStudios Entertainment. All rights reserved.</p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <img src="https://www.esrb.org/wp-content/uploads/2019/04/Category.svg" class="h-10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all" alt="ESRB Rating">
                </div>
            </div>
        </div>
    </footer>
    `
};

function initLayout() {
    // Inject Navbar
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) navPlaceholder.innerHTML = components.navbar;

    // Inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.innerHTML = components.footer;

    setupEvents();
}

function setupEvents() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('mobile-menu-button');
    const closeBtn = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('py-0', 'shadow-lg');
            } else {
                navbar.classList.remove('py-0', 'shadow-lg');
            }
        }
    });

    // Mobile Menu Toggle
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

// Run on load

window.addEventListener('DOMContentLoaded', initLayout);
