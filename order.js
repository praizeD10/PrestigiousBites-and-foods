const cardCategory = document.querySelectorAll('.product-card');
const categoryButtons = document.querySelectorAll('.category-btn');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links, .navbar nav');
const navBackdrop = document.querySelector('.nav-backdrop');

const closeNav = () => {
    if (navMenu) navMenu.classList.remove('active');

    if (navToggle) {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navBackdrop) navBackdrop.classList.remove('active');
};

if (navToggle && navMenu) {
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = !navMenu.classList.contains('active');

        navMenu.classList.toggle('active', shouldOpen);
        navToggle.classList.toggle('active', shouldOpen);
        navToggle.setAttribute('aria-expanded', String(shouldOpen));

        if (navBackdrop) {
            navBackdrop.classList.toggle('active', shouldOpen);
        }
    });

    document.addEventListener('click', (event) => {
        const clickedNav = navMenu.contains(event.target) || navToggle.contains(event.target);

        if (!clickedNav) {
            closeNav();
        }
    });

    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeNav);
    });

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeNav);
    }
}

categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        categoryButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.getAttribute('data-category');

        cardCategory.forEach((card) => {
            const category = card.getAttribute('data-category');
            if (selectedCategory === 'all' || category === selectedCategory) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
