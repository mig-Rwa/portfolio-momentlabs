document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const expandBtns = document.querySelectorAll('.expand-btn');
    let currentImageIndex = 0;
    let visibleItems = [];

    function updateVisibleItems() {
        visibleItems = Array.from(galleryItems).filter(item => 
            window.getComputedStyle(item).display !== 'none'
        );
    }

    function showImage(index) {
        const item = visibleItems[index];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        currentImageIndex = index;

        // Update navigation buttons
        prevBtn.style.display = index > 0 ? 'flex' : 'none';
        nextBtn.style.display = index < visibleItems.length - 1 ? 'flex' : 'none';
    }

    expandBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateVisibleItems();
            const item = btn.closest('.gallery-item');
            const index = visibleItems.indexOf(item);
            showImage(index);
            lightbox.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < visibleItems.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight' && currentImageIndex < visibleItems.length - 1) {
            showImage(currentImageIndex + 1);
        }
    });

    // Initialize masonry layout
    function initMasonry() {
        const gallery = document.querySelector('.gallery-masonry');
        const items = gallery.querySelectorAll('.gallery-item');
        let maxHeight = 0;

        items.forEach(item => {
            const height = item.offsetHeight;
            maxHeight = Math.max(maxHeight, height);
        });

        gallery.style.gridAutoRows = maxHeight + 'px';
    }

    // Initialize masonry after images are loaded
    window.addEventListener('load', initMasonry);
    window.addEventListener('resize', initMasonry);
}); 