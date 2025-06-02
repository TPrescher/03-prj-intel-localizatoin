// This script auto-detects the user's language and sets RTL or LTR layout accordingly.
// It also toggles Bootstrap alignment classes, offcanvas, and carousel controls for RTL/LTR support.
document.addEventListener('DOMContentLoaded', function() {
  // 1. List of RTL language codes
  var rtlLangs = ['ar', 'he', 'fa', 'ur'];
  // 2. Get the user's language (e.g., 'en-US', 'ar', etc.)
  var userLang = navigator.language || navigator.userLanguage || '';
  var isRTL = rtlLangs.some(function(code) {
    return userLang.toLowerCase().startsWith(code);
  });

  // 3. Set <html dir="rtl"> or "ltr" and set lang attribute for accessibility
  var html = document.documentElement;
  html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  // Set lang attribute to user's language (e.g., 'en', 'ar')
  if (userLang) {
    // Use only the language code (e.g., 'en' from 'en-US')
    html.setAttribute('lang', userLang.split('-')[0]);
  }

  // 4. Toggle alignment classes on .auto-align elements
  document.querySelectorAll('.auto-align').forEach(function(el) {
    if (isRTL) {
      el.classList.add('text-end', 'ms-auto'); // text to end, margin start auto
      el.classList.remove('text-start', 'me-auto');
    } else {
      el.classList.add('text-start', 'me-auto'); // text to start, margin end auto
      el.classList.remove('text-end', 'ms-auto');
    }
  });

  // 5. Flip all .offcanvas to .offcanvas-end (RTL) or .offcanvas-start (LTR)
  document.querySelectorAll('.offcanvas').forEach(function(el) {
    el.classList.remove('offcanvas-start', 'offcanvas-end');
    el.classList.add(isRTL ? 'offcanvas-end' : 'offcanvas-start');
  });

  // 6. Swap Bootstrap carousel control classes for RTL/LTR
  document.querySelectorAll('.carousel').forEach(function(carousel) {
    var prev = carousel.querySelector('.carousel-control-prev');
    var next = carousel.querySelector('.carousel-control-next');
    if (isRTL) {
      // In RTL, swap the classes so arrows point correctly
      if (prev && next) {
        prev.classList.remove('carousel-control-prev');
        prev.classList.add('carousel-control-next');
        next.classList.remove('carousel-control-next');
        next.classList.add('carousel-control-prev');
      }
    } else {
      // In LTR, ensure correct classes
      if (prev && next) {
        prev.classList.add('carousel-control-prev');
        prev.classList.remove('carousel-control-next');
        next.classList.add('carousel-control-next');
        next.classList.remove('carousel-control-prev');
      }
    }
  });

  // 7. Shrink header on scroll: add 'small' class when scrolled 50px or more
  window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('small');
    } else {
      header.classList.remove('small');
    }
  });

  // 8. Force timeline carousel text to RTL and right-align in RTL mode (JS fallback for dynamic content)
  if (isRTL) {
    document.querySelectorAll('#timelineCarousel .carousel-item').forEach(function(item) {
      item.style.direction = 'rtl';
      item.style.textAlign = 'right';
      item.querySelectorAll('h4, h5, p').forEach(function(child) {
        child.style.direction = 'rtl';
        child.style.textAlign = 'right';
      });
    });
  } else {
    document.querySelectorAll('#timelineCarousel .carousel-item').forEach(function(item) {
      item.style.direction = 'ltr';
      item.style.textAlign = 'left';
      item.querySelectorAll('h4, h5, p').forEach(function(child) {
        child.style.direction = 'ltr';
        child.style.textAlign = 'left';
      });
    });
  }
});
