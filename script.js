
// script.js - adds basic interactivity across the landing page
document.addEventListener('DOMContentLoaded', function () {
  // GetApp radio + share button behavior
  const emailRadio = document.getElementById('email');
  const phoneRadio = document.getElementById('phone');
  const contactInput = document.getElementById('contactInput');
  const shareBtn = document.getElementById('shareBtn');

  function updatePlaceholder() {
    if (!contactInput) return;
    if (emailRadio && emailRadio.checked) {
      contactInput.placeholder = 'Enter your email';
      contactInput.type = 'email';
    } else {
      contactInput.placeholder = 'Enter your phone number';
      contactInput.type = 'tel';
    }
  }

  if (emailRadio) emailRadio.addEventListener('change', updatePlaceholder);
  if (phoneRadio) phoneRadio.addEventListener('change', updatePlaceholder);

  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      const value = contactInput ? contactInput.value.trim() : '';
      if (!value) {
        alert('Please provide your email or phone to receive the app link.');
        return;
      }

      if (emailRadio && emailRadio.checked) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          alert('Please enter a valid email address.');
          return;
        }
        alert('App link will be sent to ' + value);
      } else {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          alert('Please enter a valid phone number (10 digits).');
          return;
        }
        alert('App link will be sent to ' + value);
      }
      if (contactInput) contactInput.value = '';
    });
  }

  // Search box: pressing Enter triggers a fake search
  const searchBox = document.querySelector('.search .search-content2 input');
  if (searchBox) {
    searchBox.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const q = searchBox.value.trim();
        if (!q) {
          alert('Type something to search for restaurants, cuisines or dish');
        } else {
          alert('Searching for: ' + q);
        }
      }
    });
  }

  // Navbar visual change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-sticky');
    } else {
      navbar.classList.remove('navbar-sticky');
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Allow clicking cards in main2 to mark them as selected (visual feedback)
  const cardImages = document.querySelectorAll('.main2-card [class^="card-image"]');
  if (cardImages.length) {
    cardImages.forEach(function (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () {
        cardImages.forEach(function (s) { s.classList.remove('selected'); });
        el.classList.add('selected');
      });
      // Accessible activation via Enter key
      el.setAttribute('tabindex', '0');
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          el.click();
        }
      });
    });
  }

  // Minor enhancement: clicking Playstore/Appstore logos shows an alert
  const storeImgs = document.querySelectorAll('.stores img');
  storeImgs.forEach(function (img) {
    img.addEventListener('click', function () {
      alert('Place the store image files in the Images folder (playstore.png / appstore.png) and link them here.');
    });
  });

  // Initialize placeholders
  updatePlaceholder();
});
