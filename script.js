document.addEventListener('DOMContentLoaded', () => {
  // Lightbox functionality (for gallery pages)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');

  if (lightbox && lightboxImg) {
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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    });
  }

  // Read More functionality (for about.html and similar pages)
  document.querySelectorAll(".readMore").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      // Find the nearest parent element with the 'toggle-content' class
      const content = button.closest('.toggle-content');

      if (!content) {
        return; // Exit if no toggle-content parent is found
      }

      content.classList.toggle("show-more");

      if (content.classList.contains("show-more")) {
        button.textContent = "Read Less";
      } else {
        button.textContent = "Read More";
      }
    });
  });

  // Admission Form Handling (for admission.html page)
  const form = document.getElementById('admission-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default submission
      
      // Basic validation (HTML5 handles most, but add custom if needed)
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = '#ccc';
        }
      });
      
      if (isValid) {
        // Simulate submission (replace with actual AJAX or form action)
        alert('Application submitted successfully! We will contact you soon.');
        form.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }

  // Download Form Data Functionality (Updated to download PNG image without buttons, with validation)
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const form = document.getElementById('admission-form');
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      let missingFields = [];

      // Validate required fields
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          missingFields.push(field.name || field.id); // Collect names for feedback
          field.style.borderColor = 'red'; // Highlight empty fields
        } else {
          field.style.borderColor = '#ccc'; // Reset border
        }
      });

      if (!isValid) {
        alert('Please fill in all required fields before downloading.');
        return; // Stop download
      }

      // If valid, capture the form content (excluding buttons)
      const formContent = document.getElementById('form-content');
      html2canvas(formContent).then(canvas => {
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Shine_Mission_School_Admission_Form.png';
          document.body.appendChild(a);
          a.click();
          
          // Clean up
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 'image/png');
      }).catch(error => {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
      });
    });
  }

  // Hero Slider Control with JavaScript (Controls background images via opacity)
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideDuration = 5000; // 5 seconds per slide

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.pointerEvents = i === index ? 'auto' : 'none'; // Enable clicks only on active slide
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  // Start the slider
  showSlide(currentSlide);
  setInterval(nextSlide, slideDuration);
});

// Gallery Animation on Scroll (Triggers Every Time Section Enters View)
const gallerySection = document.querySelector('.gallery-preview');
if (gallerySection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add class to trigger animation when entering view
        gallerySection.classList.add('animate-gallery');
      } else {
        // Remove class to reset animation when leaving view
        gallerySection.classList.remove('animate-gallery');
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

  observer.observe(gallerySection);

  // On page load (including refresh), check if the section is in view and trigger animation if so
  const addAnimationIfInView = () => {
    const rect = gallerySection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      gallerySection.classList.add('animate-gallery');
    } else {
      gallerySection.classList.remove('animate-gallery');
    }
  };

  window.addEventListener('load', addAnimationIfInView);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (hamburger && navLinks && 
      !hamburger.contains(e.target) && 
      !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});