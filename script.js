const hoverImages = {
    "google": "./assets/google-hover.svg",
    "apple": "./assets/apple-hover.svg",
    "pix": "./assets/pix-hover.svg"
};

document.querySelectorAll(".icons.img").forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = hoverImages[img.id];

    if (hoverSrc) {
        img.addEventListener("mouseenter", () => {
            img.src = hoverSrc;
        });

        img.addEventListener("mouseleave", () => {
            img.src = originalSrc;
        });
    }
});