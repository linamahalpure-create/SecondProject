
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryImages = document.querySelectorAll(".gallery-image");
const noResults = document.getElementById("no-results");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentIndex = 0;

// Filter images
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        let visibleCount = 0;

        galleryItems.forEach(function (item) {
            const category = item.dataset.category;

            if (selectedFilter === "all" || category === selectedFilter) {
                item.classList.remove("hidden");
                visibleCount++;
            } else {
                item.classList.add("hidden");
            }
        });

        noResults.hidden = visibleCount !== 0;
    });
});

// Get visible images
function getVisibleImages() {
    currentImages = [];

    galleryItems.forEach(function (item) {
        if (!item.classList.contains("hidden")) {
            const image = item.querySelector(".gallery-image");
            const title = item.querySelector("h2");

            currentImages.push({
                src: image.src,
                alt: image.alt,
                title: title.textContent
            });
        }
    });
}

// Open lightbox
galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
        getVisibleImages();

        currentIndex = currentImages.findIndex(function (item) {
            return item.src === image.src;
        });

        if (currentIndex !== -1) {
            showImage();
            lightbox.classList.add("show");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            closeBtn.focus();
        }
    });

    // Show message if an image path is incorrect
    image.addEventListener("error", function () {
        console.error("Image not found:", image.getAttribute("src"));
        image.alt = "Image not found - check photos folder and filename";
    });
});

// Display current image
function showImage() {
    if (currentImages.length === 0) {
        return;
    }

    lightboxImage.src = currentImages[currentIndex].src;
    lightboxImage.alt = currentImages[currentIndex].alt;
    lightboxCaption.textContent = currentImages[currentIndex].title;
}

// Next image
nextBtn.addEventListener("click", function () {
    if (currentImages.length === 0) return;

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    showImage();
});

// Previous image
prevBtn.addEventListener("click", function () {
    if (currentImages.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    showImage();
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

closeBtn.addEventListener("click", closeLightbox);

// Close when clicking the dark background
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        nextBtn.click();
    } else if (event.key === "ArrowLeft") {
        prevBtn.click();
    }
});
