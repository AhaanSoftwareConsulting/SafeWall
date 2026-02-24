const scrollSections = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px"
});

scrollSections.forEach(section => {
    observer.observe(section);
});

/* Mobile fallback */
if (window.innerWidth < 768) {
    scrollSections.forEach(el => el.classList.add('active'));
}