// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.visibility = 'hidden';
    }, 500);
});

// Hero Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        init: function() {
            this.el.addEventListener('mouseenter', () => {
                this.autoplay.stop();
            });
            this.el.addEventListener('mouseleave', () => {
                this.autoplay.start();
            });
        },
    },
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
    });
});

// Fade-in animation for elements
const fadeInElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    observer.observe(element);
});

// Reservation form handling
const reservationForm = document.getElementById('reservation-form');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(reservationForm);
    
    // Validate dates
    const checkIn = new Date(formData.get('check-in'));
    const checkOut = new Date(formData.get('check-out'));
    
    if (checkOut <= checkIn) {
        alert('La fecha de salida debe ser posterior a la fecha de llegada.');
        return;
    }

    // Prepare WhatsApp message
    const message = `Hola, me gustaría hacer una reserva:
- Fecha de llegada: ${formData.get('check-in')}
- Fecha de salida: ${formData.get('check-out')}
- Tipo de habitación: ${formData.get('room-type')}
- Número de huéspedes: ${formData.get('guests')}
- Solicitudes especiales: ${formData.get('special-requests') || 'Ninguna'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5491112345678?text=${encodedMessage}`, '_blank');

    reservationForm.reset();
});

// Google Maps initialization
function initMap() {
    const hotelLocation = { lat: -31.6512, lng: -65.0074 }; // Example coordinates
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: hotelLocation,
        styles: [
            {
                featureType: 'all',
                elementType: 'all',
                stylers: [
                    { saturation: -100 },
                    { gamma: 0.5 }
                ]
            }
        ]
    });
    const marker = new google.maps.Marker({
        position: hotelLocation,
        map: map,
        title: 'Hotel Hualum'
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach((lazyImage) => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach((lazyImage) => {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove('lazy');
        });
    }
});