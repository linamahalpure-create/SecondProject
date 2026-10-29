
const filterButtons = document.querySelectorAll(".filter-buttons button");
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentImageIndex = 0;

const images = Array.from(galleryItems).map(item => {
    return item.querySelector("img");
});

// Filter buttons
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        const filter = this.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        galleryItems.forEach(item => {
            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add("show");
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove("show");
}

// Next and previous images
function changeImage(direction) {
    currentImageIndex =
        (currentImageIndex + direction + images.length) % images.length;

    lightboxImg.src = images[currentImageIndex].src;
    lightboxImg.alt = images[currentImageIndex].alt;
}

// Close when clicking outside the image
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard controls
document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") {
        closeLightbox();
    } else if (event.key === "ArrowRight") {
        changeImage(1);
    } else if (event.key === "ArrowLeft") {
        changeImage(-1);
    }
});
