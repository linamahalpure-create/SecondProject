
const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");

let currentIndex = 0;

galleryImages.forEach(function(image, index) {
    image.addEventListener("click", function() {
        currentIndex = index;
        showImage();
        lightbox.style.display = "flex";
    });
});

function showImage() {
    largeImage.src = galleryImages[currentIndex].src;
    largeImage.alt = galleryImages[currentIndex].alt;
}

function changeImage(direction) {
    currentIndex = currentIndex + direction;

    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }

    showImage();
}

function closeLightbox() {
    lightbox.style.display = "none";
}

lightbox.addEventListener("click", function(event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function(event) {
    if (lightbox.style.display === "flex") {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        }
    }
});

function filterImages(category) {
    document.querySelectorAll(".gallery-item").forEach(function(item) {
        if (category === "all" || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
