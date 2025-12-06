document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    if (!lightbox || !lightboxImg) {
        console.warn('Lightbox or lightbox image element not found.');
        return;
    }

    document.querySelectorAll('.school-gallery .gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Optional: close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
});

document.querySelectorAll(".readMore").forEach(function(button) {
  button.addEventListener("click", function(event) {
    event.preventDefault();
    let card = button.previousElementSibling;
    card.classList.toggle("show-more");

    if (card.classList.contains("show-more")) {
      button.textContent = "Read Less";
    } else {
      button.textContent = "Read More";
    }
  });
});
