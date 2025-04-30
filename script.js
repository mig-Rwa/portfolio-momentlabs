// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize gallery
    populateGallery();
    
    // Add scroll event listener for navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
    });
});

// Gallery images
const galleryImages = [
    {
        src: '/portfolio-momentlabs/public/images/photosample1.JPG',
        title: 'Urban Exploration',
        description: 'Capturing the essence of city life'
    },
    {
        src: '/portfolio-momentlabs/public/images/photosample2.JPG',
        title: 'Natural Beauty',
        description: 'The wonders of nature through our lens'
    },
    {
        src: '/portfolio-momentlabs/public/images/photosample3.JPG',
        title: 'Portrait Excellence',
        description: 'Professional portrait photography'
    },
    {
        src: '/portfolio-momentlabs/public/images/weddings/wedsample1.JPG',
        title: 'Wedding Memories',
        description: 'Capturing love stories'
    },
    {
        src: '/portfolio-momentlabs/public/images/weddings/engagement.JPG',
        title: 'Engagement Session',
        description: 'The beginning of forever'
    },
    {
        src: '/portfolio-momentlabs/public/images/weddings/wedsample2.JPG',
        title: 'Wedding Day',
        description: 'Celebrating love and commitment'
    },
    {
        src: '/portfolio-momentlabs/public/images/photosample4.JPG',
        title: 'Creative Vision',
        description: 'Artistic photography at its finest'
    },
    {
        src: '/portfolio-momentlabs/public/images/photosample5.JPG',
        title: 'Moment in Time',
        description: 'Capturing life\'s precious moments'
    },
    {
        src: '/portfolio-momentlabs/public/images/me.JPG',
        title: 'Studio Portrait',
        description: 'Professional studio photography'
    }
];

// Populate gallery with loading states
function populateGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = ''; // Clear existing content
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-aos', 'fade-up');
        galleryItem.setAttribute('data-aos-delay', index * 100);
        
        // Create loading placeholder
        const loadingPlaceholder = document.createElement('div');
        loadingPlaceholder.className = 'loading-placeholder';
        loadingPlaceholder.innerHTML = '<div class="loading-spinner"></div>';
        
        // Create image element
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Create overlay content
        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        overlay.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
        `;
        
        // Add elements to gallery item
        galleryItem.appendChild(loadingPlaceholder);
        galleryItem.appendChild(img);
        galleryItem.appendChild(overlay);
        
        // Handle image load
        img.onload = () => {
            loadingPlaceholder.style.display = 'none';
            img.style.opacity = '1';
        };
        
        // Handle image error
        img.onerror = () => {
            loadingPlaceholder.style.display = 'none';
            galleryItem.innerHTML = `
                <div style="height: 300px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;">
                    Image not available
                </div>
            `;
        };
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add smooth scroll behavior to the page
document.documentElement.style.scrollBehavior = 'smooth'; 