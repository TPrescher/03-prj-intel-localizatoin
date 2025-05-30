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

  // 3. Set <html dir="rtl"> or "ltr"
  var html = document.documentElement;
  html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  // 4. Toggle alignment classes on .auto-align elements
  document.querySelectorAll('.auto-align').forEach(function(el) {
    if (isRTL) {
      el.classList.add('text-end', 'ms-auto');
      el.classList.remove('text-start', 'me-auto');
    } else {
      el.classList.add('text-start', 'me-auto');
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
      // Swap classes so arrows point correctly in RTL
      if (prev) prev.classList.replace('carousel-control-prev', 'carousel-control-next');
      if (next) next.classList.replace('carousel-control-next', 'carousel-control-prev');
    } else {
      // Ensure correct classes in LTR
      if (prev) {
        prev.classList.add('carousel-control-prev');
        prev.classList.remove('carousel-control-next');
      }
      if (next) {
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

  // Force timeline carousel text to RTL and right-align in RTL mode (JS fallback for dynamic content)
  if (document.documentElement.dir === 'rtl') {
    document.querySelectorAll('#timelineCarousel .carousel-item').forEach(function(item) {
      item.style.direction = 'rtl';
      item.style.textAlign = 'right';
      item.querySelectorAll('h4, h5, p').forEach(function(child) {
        child.style.direction = 'rtl';
        child.style.textAlign = 'right';
      });
    });
  }
});
