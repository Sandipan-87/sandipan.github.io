document.addEventListener('DOMContentLoaded', function() {

    const typingText = "Welcome to My Story";
    const typingElement = document.getElementById('typing-effect');
    let charIndex = 0;

    function type() {
        if (charIndex < typingText.length) {
            typingElement.textContent += typingText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            typingElement.style.borderRight = 'none';
        }
    }
    type();

    const slideshows = document.querySelectorAll('.slideshow-container');

    slideshows.forEach(slideshow => {
        let slideIndex = 0;
        let autoSlideTimer;
        const slides = slideshow.querySelectorAll('.slide');
        const prevBtn = slideshow.querySelector('.prev');
        const nextBtn = slideshow.querySelector('.next');

        function showSlide(n) {
            if (n >= slides.length) { slideIndex = 0; }
            if (n < 0) { slideIndex = slides.length - 1; }
            slides.forEach(slide => slide.style.display = "none");
            slides[slideIndex].style.display = "block";
        }

        function advanceSlide() {
            showSlide(slideIndex += 1);
        }

        function resetTimer() {
            clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(advanceSlide, 2000);
        }

        prevBtn.addEventListener('click', () => {
            showSlide(slideIndex -= 1);
            resetTimer();
        });

        nextBtn.addEventListener('click', () => {
            showSlide(slideIndex += 1);
            resetTimer();
        });
        
        showSlide(slideIndex);
        autoSlideTimer = setInterval(advanceSlide, 2000);
    });

        
    const guestbookForm = document.getElementById('guestbook-form');
    const entriesContainer = document.getElementById('guestbook-entries');
    const confirmationMessageDiv = document.getElementById('confirmation-message'); // Get the new div

    guestbookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('guest-name');
        const messageInput = document.getElementById('guest-message');
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name === '' || message === '') {
            alert('Please fill out both your name and message.');
            return;
        }

        const entryDiv = document.createElement('div');
        entryDiv.classList.add('guestbook-entry');
        const entryName = document.createElement('strong');
        entryName.textContent = name;
        const entryMessage = document.createElement('p');
        entryMessage.textContent = message;
        
        entryDiv.appendChild(entryName);
        entryDiv.appendChild(entryMessage);

        entriesContainer.insertBefore(entryDiv, entriesContainer.children[1]);
        guestbookForm.reset();

       
        confirmationMessageDiv.textContent = 'Thank you for your message!';
        confirmationMessageDiv.style.display = 'block'; 

        
        setTimeout(() => {
            confirmationMessageDiv.textContent = '';
            confirmationMessageDiv.style.display = 'none'; 
        }, 3000);
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 70) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const galleryImages = document.querySelectorAll('#gallery .gallery-grid img');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeButton = document.querySelector('.close-button');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    let currentImageIndex;
    let allGalleryFigures = Array.from(document.querySelectorAll('#gallery .gallery-grid figure'));

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        const figure = allGalleryFigures[currentImageIndex];
        const img = figure.querySelector('img');
        const caption = figure.querySelector('figcaption');

        lightboxModal.style.display = 'block';
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : img.alt;
    }

    closeButton.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
    });

    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.style.display = 'none';
        }
    });

    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + allGalleryFigures.length) % allGalleryFigures.length;
        openLightbox(currentImageIndex);
    });

    modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % allGalleryFigures.length;
        openLightbox(currentImageIndex);
    });

    document.addEventListener('keydown', (e) => {
        if (lightboxModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                modalPrev.click();
            } else if (e.key === 'ArrowRight') {
                modalNext.click();
            } else if (e.key === 'Escape') {
                closeButton.click();
            }
        }
    });

    const revealElements = document.querySelectorAll('.reveal');
    const revealItems = document.querySelectorAll('.reveal-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    const itemObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children).filter(child => child.classList.contains('reveal-item'));
                const index = siblings.indexOf(entry.target);
                
                if (!entry.target.classList.contains('reveal')) {
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
                
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach(item => {
        itemObserver.observe(item);
    });

});



