/**
 * Main Application Entry Point
 */
import { Sidebar } from './components/Sidebar.js';
import { Navigation } from './components/Navigation.js';
import { Portfolio } from './components/Portfolio.js';
import { ContactForm } from './components/ContactForm.js';
import { TestimonialModal } from './components/TestimonialModal.js';
import { CVViewer } from './components/CVViewer.js';

/**
 * Application Class
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
      });
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize all components
      this.components.sidebar = new Sidebar();
      this.components.navigation = new Navigation();
      this.components.portfolio = new Portfolio();
      this.components.contactForm = new ContactForm();
      this.components.testimonialModal = new TestimonialModal();
      this.components.cvViewer = new CVViewer();

      console.log('Portfolio application initialized successfully');
    } catch (error) {
      console.error('Error initializing portfolio application:', error);
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