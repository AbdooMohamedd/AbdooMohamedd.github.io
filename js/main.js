/**
 * Main Application Entry Point - Multi-Page Portfolio
 */
import { CVViewer } from './components/CVViewer.js';
import TestimonialsSlider from './components/TestimonialsSlider.js';

/**
 * Application Class for Multi-Page Portfolio
 */
class PortfolioApp {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeComponents();
        this.initializeBasicFunctionality();
      });
    } else {
      this.initializeComponents();
      this.initializeBasicFunctionality();
    }
  }

  initializeComponents() {
    try {
      // Initialize existing components
      this.components.cvViewer = new CVViewer();
      
      // Initialize testimonials slider only if elements exist
      if (document.getElementById('testimonials-track')) {
        this.components.testimonialsSlider = new TestimonialsSlider();
      }

      console.log('Portfolio components initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio components:', error);
    }
  }

  initializeBasicFunctionality() {
    // Initialize sidebar functionality
    this.initSidebar();
    // Initialize navigation active states
    this.initNavigationStates();
    // Initialize portfolio filters (if on portfolio page)
    this.initPortfolioFilters();
    // Initialize contact form (if on contact page)
    this.initContactForm();
    // Initialize project modal functionality
    this.initProjectModal();
    // Initialize fullscreen image viewer
    this.initFullscreenImageViewer();
    // Initialize back to top button
    this.initBackToTop();
    // Initialize toast notifications
    this.initToastNotifications();
    // Initialize image lazy loading
    this.initImageLazyLoading();
  }

  initSidebar() {
    const sidebarBtn = document.querySelector('[data-sidebar-btn]');
    const sidebar = document.querySelector('[data-sidebar]');

    if (sidebarBtn && sidebar) {
      sidebarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.classList.toggle('active');
        console.log('Sidebar toggled');
      });
    } else {
      console.warn('Sidebar button or sidebar element not found');
    }

    // Initialize mobile sidebar functionality
    this.initMobileSidebar();
  }

  initMobileSidebar() {
    // Check if on mobile
    const isMobile = () => window.innerWidth <= 580;
    
    if (!isMobile()) return;

    const sidebar = document.querySelector('[data-sidebar]');
    if (!sidebar) return;

    // Create mobile header if it doesn't exist
    this.createMobileHeader();
    
    // Create overlay
    this.createSidebarOverlay();
    
    // Create close button inside sidebar
    this.createMobileCloseBtn();
    
    // Create swipe indicator
    this.createSwipeIndicator();

    // Handle swipe gestures
    this.initSwipeGestures();

    // Prevent clicks inside sidebar from closing it
    sidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Prevent touchend inside sidebar from triggering close
    sidebar.addEventListener('touchend', (e) => {
      e.stopPropagation();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      if (!isMobile()) {
        this.closeMobileSidebar();
      }
    });
  }

  createMobileHeader() {
    // Check if mobile header already exists
    if (document.querySelector('.mobile-header')) return;

    const main = document.querySelector('main');
    if (!main) return;

    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'mobile-header';
    mobileHeader.innerHTML = `
      <div class="mobile-header-info">
        <span class="mobile-header-name">Abdelrahman Mohamed</span>
        <span class="mobile-header-title">GenAI/ML & Automation Engineer</span>
      </div>
      <button class="mobile-menu-btn" aria-label="Open menu" type="button">
        <ion-icon name="menu-outline"></ion-icon>
      </button>
    `;

    // Insert at the beginning of main
    main.insertBefore(mobileHeader, main.firstChild);

    // Add click event to menu button
    const menuBtn = mobileHeader.querySelector('.mobile-menu-btn');
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openMobileSidebar();
    });
    
    // Also handle touch for better mobile response
    menuBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.openMobileSidebar();
    });
  }

  createSidebarOverlay() {
    if (document.querySelector('.sidebar-overlay')) return;

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Close sidebar when clicking overlay
    overlay.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeMobileSidebar();
    });
    
    overlay.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeMobileSidebar();
    });
  }

  createMobileCloseBtn() {
    const sidebar = document.querySelector('[data-sidebar]');
    if (!sidebar || sidebar.querySelector('.mobile-sidebar-close')) return;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-sidebar-close';
    closeBtn.setAttribute('aria-label', 'Close sidebar');
    closeBtn.setAttribute('type', 'button');
    closeBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
    
    sidebar.insertBefore(closeBtn, sidebar.firstChild);

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeMobileSidebar();
    });
    
    closeBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeMobileSidebar();
    });
  }

  createSwipeIndicator() {
    if (document.querySelector('.swipe-indicator')) return;

    const indicator = document.createElement('div');
    indicator.className = 'swipe-indicator';
    document.body.appendChild(indicator);
    
    // Hide indicator after 8 seconds
    setTimeout(() => {
      if (indicator && indicator.parentNode) {
        indicator.style.opacity = '0';
        setTimeout(() => {
          if (indicator && indicator.parentNode) {
            indicator.remove();
          }
        }, 300);
      }
    }, 8000);
  }

  initSwipeGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    const sidebar = document.querySelector('[data-sidebar]');
    const swipeThreshold = 60;
    const edgeThreshold = 40; // Start swipe within 40px from left edge
    const maxSwipeTime = 300; // Max time for swipe gesture

    // Only handle swipes on document, not inside sidebar
    document.addEventListener('touchstart', (e) => {
      // Ignore if touch is inside sidebar
      if (sidebar && sidebar.contains(e.target)) return;
      
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      // Ignore if touch started inside sidebar
      if (sidebar && sidebar.contains(e.target)) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      
      const diffX = touchEndX - touchStartX;
      const diffY = Math.abs(touchEndY - touchStartY);
      const timeDiff = touchEndTime - touchStartTime;
      
      // Only handle quick horizontal swipes (not slow drags or vertical scrolls)
      if (timeDiff > maxSwipeTime) return;
      if (diffY > Math.abs(diffX)) return;
      
      // Swipe right from left edge to open
      if (diffX > swipeThreshold && touchStartX < edgeThreshold && !sidebar.classList.contains('mobile-open')) {
        this.openMobileSidebar();
      }
      
      // Swipe left anywhere to close (when sidebar is open)
      if (diffX < -swipeThreshold && sidebar.classList.contains('mobile-open')) {
        this.closeMobileSidebar();
      }
    }, { passive: true });
  }

  openMobileSidebar() {
    const sidebar = document.querySelector('[data-sidebar]');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.add('mobile-open');
      document.body.classList.add('sidebar-open');
      document.body.style.overflow = 'hidden';
    }
    if (overlay) {
      overlay.classList.add('active');
    }
  }

  closeMobileSidebar() {
    const sidebar = document.querySelector('[data-sidebar]');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.remove('mobile-open');
      document.body.classList.remove('sidebar-open');
      document.body.style.overflow = '';
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  initNavigationStates() {
    // Set active navigation state based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'about.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === 'index.html' && href === 'about.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  initPortfolioFilters() {
    // Only initialize if we're on the portfolio page
    const filterBtns = document.querySelectorAll('[data-filter-btn]');
    const projectItems = document.querySelectorAll('[data-filter-item]');
    
    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filterValue = btn.textContent.trim().toLowerCase();
        
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter project items
        projectItems.forEach(item => {
          const category = item.getAttribute('data-category').toLowerCase();
          let shouldShow = false;
          
          if (filterValue === 'all') {
            shouldShow = true;
          } else if (filterValue === category) {
            shouldShow = true;
          } else if (filterValue === 'data analysis' && category === 'data analysis') {
            shouldShow = true;
          } else if (filterValue === 'data science' && category === 'data science') {
            shouldShow = true;
          } else if (filterValue === 'ai engineering' && category === 'ai engineering') {
            shouldShow = true;
          } else if (filterValue === 'web scraping' && category === 'web scraping') {
            shouldShow = true;
          } else if (filterValue === 'machine learning' && category === 'machine learning') {
            shouldShow = true;
          } else if (filterValue === 'python software engineering' && category === 'python software engineering') {
            shouldShow = true;
          }
          
          if (shouldShow) {
            item.style.display = 'block';
            item.classList.add('active');
          } else {
            item.style.display = 'none';
            item.classList.remove('active');
          }
        });
      });
    });

    // Initialize mobile filter select
    const filterSelect = document.querySelector('[data-select]');
    const selectList = document.querySelector('.select-list');
    const selectItems = document.querySelectorAll('[data-select-item]');
    
    if (filterSelect && selectList) {
      filterSelect.addEventListener('click', () => {
        selectList.classList.toggle('active');
        filterSelect.classList.toggle('active');
      });

      selectItems.forEach(item => {
        item.addEventListener('click', () => {
          const filterValue = item.textContent.trim();
          const selectValue = document.querySelector('[data-selecct-value]');
          
          // Update select display
          selectValue.textContent = filterValue;
          selectList.classList.remove('active');
          filterSelect.classList.remove('active');
          
          // Trigger filter by finding the corresponding button
          const correspondingBtn = Array.from(filterBtns).find(btn => 
            btn.textContent.trim().toLowerCase() === filterValue.toLowerCase()
          );
          if (correspondingBtn) {
            correspondingBtn.click();
          }
        });
      });
    }
  }

  initProjectModal() {
    // Get modal elements
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');
    const modalButton = document.getElementById('modalButton');

    // Get all project links
    const projectLinks = document.querySelectorAll('.project-link');

    if (!modal || projectLinks.length === 0) return;

    // Add click event to each project link
    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get project data from attributes
        const title = link.getAttribute('data-title');
        const category = link.getAttribute('data-category');
        const description = link.getAttribute('data-description');
        const image = link.getAttribute('data-image');
        const url = link.getAttribute('href');

        // Populate modal content
        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalDescription.textContent = description;
        modalImage.src = image;
        modalImage.alt = title;
        modalButton.href = url;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      });
    });

    // Close modal functionality
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    };

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  initContactForm() {
    const form = document.querySelector('[data-form]');
    const formBtn = document.querySelector('[data-form-btn]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    
    if (!form) return;

    // Form validation and submission
    form.addEventListener('submit', (e) => {
      let isValid = true;
      
      formInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
        return;
      }

      // Show loading state
      formBtn.disabled = true;
      formBtn.textContent = 'Sending...';
    });

    // Remove error class on input
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
      });
    });
  }

  /**
   * Initialize fullscreen image viewer for profile pictures
   */
  initFullscreenImageViewer() {
    // Create fullscreen modal if it doesn't exist
    if (!document.querySelector('.fullscreen-image-modal')) {
      this.createFullscreenModal();
    }

    // Add click listeners to all profile images
    const profileImages = document.querySelectorAll('.avatar-box img[src*="IMG_8337.JPG"]');
    const modal = document.querySelector('.fullscreen-image-modal');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const closeBtn = document.querySelector('.fullscreen-close-btn');

    if (profileImages.length > 0 && modal && fullscreenImage && closeBtn) {
      // Add click listeners to profile images
      profileImages.forEach(img => {
        img.addEventListener('click', (e) => {
          e.preventDefault();
          fullscreenImage.src = img.src;
          fullscreenImage.alt = img.alt;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      // Close modal when close button is clicked
      closeBtn.addEventListener('click', () => {
        this.closeFullscreenModal();
      });

      // Close modal when clicking outside the image
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeFullscreenModal();
        }
      });

      // Close modal with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          this.closeFullscreenModal();
        }
      });
    }
  }

  /**
   * Create fullscreen modal HTML structure
   */
  createFullscreenModal() {
    const modalHTML = `
      <div class="fullscreen-image-modal">
        <div class="fullscreen-image-container">
          <img src="" alt="" class="fullscreen-image">
          <button class="fullscreen-close-btn" aria-label="Close fullscreen image">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  /**
   * Close fullscreen modal
   */
  closeFullscreenModal() {
    const modal = document.querySelector('.fullscreen-image-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Initialize Back to Top Button
   */
  initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Initialize Toast Notifications
   */
  initToastNotifications() {
    // Handle CV download button
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    if (downloadCvBtn) {
      downloadCvBtn.addEventListener('click', (e) => {
        this.showToast('CV download started!');
      });
    }
  }

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {number} duration - Duration in milliseconds (default: 3000)
   */
  showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    // Update message if span exists
    const messageSpan = toast.querySelector('span');
    if (messageSpan) {
      messageSpan.textContent = message;
    }

    // Show toast
    toast.classList.add('show');

    // Hide after duration
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  /**
   * Initialize Image Lazy Loading with fade-in effect
   */
  initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('fade-in');
      });
    });

    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            // Image will load naturally due to loading="lazy"
            img.classList.add('fade-in');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Get component instance
   * @param {string} componentName 
   * @returns {Object|null}
   */
  getComponent(componentName) {
    return this.components[componentName] || null;
  }
}

// Initialize application
const app = new PortfolioApp();

// Make app globally available for debugging
window.portfolioApp = app;