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