const slides = document.querySelectorAll(".pano-slide");
const slider = document.querySelector(".panorama-cylinder");

let current = 4;
let isDragging = false;
let startX = 0;
let currentOffset = 0;

const slideWidth = 220;
const outerGap = 34;
const centerGap = 18;
const maxIndex = slides.length - 1;

function updateSlides(offset = 0) {
    slides.forEach((slide, i) => {
        const visualOffset = i - current + offset;

        let rotateY = 0;
        let translateZ = 0;
        let spacing;

        if (Math.abs(visualOffset) <= 1) {
            rotateY = 0;
            translateZ = 0;
            spacing = slideWidth + centerGap;
        } else {
            const curveStrength = 12;
            rotateY = -Math.sign(visualOffset) * (Math.pow(Math.abs(visualOffset), 1.15) * curveStrength);
            translateZ = -Math.pow(Math.abs(visualOffset), 1.25) * 95;
            spacing = slideWidth + outerGap;
        }

        const translateX = visualOffset * spacing;

        slide.style.transform = `
            translate(-50%, -50%)
            translateX(${translateX}px)
            translateZ(${translateZ}px)
            rotateY(${rotateY}deg)
        `;

        slide.style.zIndex = 100 - Math.abs(visualOffset);
        slide.style.opacity = Math.abs(visualOffset) > 6 ? 0 : 1;
    });
}

updateSlides();

/* ---------- MOUSE ---------- */
slider.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
    slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseup", () => {
    isDragging = false;
    current += Math.round(currentOffset);
    current = Math.max(0, Math.min(maxIndex, current));
    currentOffset = 0;
    updateSlides();
    slider.style.cursor = "grab";
});

slider.addEventListener("mouseleave", () => {
    isDragging = false;
    currentOffset = 0;
});

slider.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    currentOffset = dx / 180;
    updateSlides(-currentOffset);
});

/* ---------- TOUCH ---------- */
slider.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
    isDragging = false;
    current += Math.round(currentOffset);
    current = Math.max(0, Math.min(maxIndex, current));
    currentOffset = 0;
    updateSlides();
});

slider.addEventListener("touchmove", e => {
    if (!isDragging) return;

    const dx = e.touches[0].clientX - startX;
    currentOffset = dx / 180;
    updateSlides(-currentOffset);
});
