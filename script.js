// Scroll Reveal Animation Logic
document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksList = document.getElementById('nav-links');
    
    if(mobileMenu && navLinksList) {
        mobileMenu.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
            });
        });
    }

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // ── Collection Slider: fade-in section when scrolled into view ──
    const sliderWrapper = document.querySelector('.collection-slider-wrapper');
    if (sliderWrapper) {
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    sliderObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sliderObserver.observe(sliderWrapper);
    }

    // ── Category Cards: staggered slide-up when each enters view ──
    const categoryCards = document.querySelectorAll('.category-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // stagger each card by 100ms
                const idx = Array.from(categoryCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, idx * 120);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    categoryCards.forEach(card => cardObserver.observe(card));



    // Dynamic Category Photo Swap Logic
    const categoryImages = {
        'shoes': ['col_sf.png', 'col_sd.png', 'col_shoes.png', 'shoes.png'],
        'bags': ['col_bags.png', 'col_wallets.png', 'col_bb.png', 'col_sb.png', 'store.png'],
        'belts': ['col_belts.png', 'col_b2.png', 'col_b3.png', 'main_storefront.png'], // Alternative fallback view
        'jackets': ['col_ja.png', 'col_jackets.png', 'col_j2.png']
    };

    const catWrappers = document.querySelectorAll('.cat-img-wrapper[data-category]');
    
    catWrappers.forEach(wrapper => {
        const category = wrapper.getAttribute('data-category');
        const images = categoryImages[category];
        if (!images) return;
        
        let currentIndex = 0;
        const imgEl = wrapper.querySelector('img');
        const nextBtn = wrapper.querySelector('.next');
        const prevBtn = wrapper.querySelector('.prev');

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent zooming/clicking card globally if needed
            currentIndex = (currentIndex + 1) % images.length;
            imgEl.src = images[currentIndex];
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            imgEl.src = images[currentIndex];
        });
    });
});
