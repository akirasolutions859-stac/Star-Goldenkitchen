document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     STICKY HEADER & NAV ACTIVE STATES ON SCROLL
     ========================================================================== */
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header Scroll Styling
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Link Tracking
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     MOBILE DRAWER TOGGLE
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop page scroll
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore page scroll
  }

  mobileToggle.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });


  /* ==========================================================================
     HERO IMAGE SLIDER
     ========================================================================== */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Event Listeners for Slider
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'));
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  // Autoplay
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  startAutoplay();


  /* ==========================================================================
     SERVICES TABS SWITCHER
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabTarget = button.getAttribute('data-tab');

      // Update active button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show matching panel
      tabPanels.forEach(panel => {
        if (panel.id === tabTarget) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });


  /* ==========================================================================
     SERVICE SELECTION HOOK (Pre-fill Form)
     ========================================================================== */
  const serviceCtaButtons = document.querySelectorAll('.service-cta-btn');
  const serviceSelect = document.getElementById('serviceType');

  serviceCtaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service');
      
      // Find matching option in select menu
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.includes(serviceName) || serviceName.includes(serviceSelect.options[i].value)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    });
  });


  /* ==========================================================================
     GALLERY LIGHTBOX VIEW
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox-modal');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('.gallery-img').getAttribute('src');
      const title = item.getAttribute('data-title');
      
      lightboxImg.setAttribute('src', imgSrc);
      lightboxImg.setAttribute('alt', title);
      lightboxTitle.textContent = title;
      
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content-box')) {
      closeLightbox();
    }
  });

  // Close lightbox on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });


  /* ==========================================================================
     LEAD CAPTURE FORM HANDLER
     ========================================================================== */
  const leadForm = document.getElementById('leadForm');
  const formSuccess = document.getElementById('formSuccess');
  const successName = document.getElementById('successName');
  const successPhone = document.getElementById('successPhone');

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = leadForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show Loading/Submission State
    submitBtn.textContent = 'Submitting Request...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate Server Request Timeout
    setTimeout(() => {
      const formData = new FormData(leadForm);
      const name = formData.get('fullName');
      const phone = formData.get('phoneNumber');
      const service = formData.get('serviceType');
      const address = formData.get('address');
      const message = formData.get('message');
      
      // Store inquiry in LocalStorage for persistence demonstration
      const inquiries = JSON.parse(localStorage.getItem('star_golden_inquiries') || '[]');
      inquiries.push({
        name,
        phone,
        service,
        address,
        message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('star_golden_inquiries', JSON.stringify(inquiries));
      
      // Construct WhatsApp message content
      const waNumber = '7044584730';
      const waText = `*NEW INQUIRY REPORT - STAR GOLDEN*\n\n` +
                     `👤 *Name:* ${name}\n` +
                     `📞 *Phone:* ${phone}\n` +
                     `🛠️ *Service:* ${service}\n` +
                     `📍 *Location:* ${address}\n` +
                     `💬 *Details:* ${message || 'No additional details provided.'}`;
      
      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
      
      // Open WhatsApp in a new tab to send inquiry
      window.open(whatsappUrl, '_blank');
      
      // Update success alert elements
      successName.textContent = name;
      successPhone.textContent = phone;
      
      // Reset Form & show success state
      leadForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      
      leadForm.style.display = 'none';
      formSuccess.style.display = 'flex';
      
      // Auto-hide success after 10 seconds and show form again
      setTimeout(() => {
        formSuccess.style.display = 'none';
        leadForm.style.display = 'flex';
      }, 10000);
      
    }, 1500);
  });
});
