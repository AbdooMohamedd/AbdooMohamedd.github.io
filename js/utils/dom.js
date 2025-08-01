/**
 * DOM Utility Functions
 */
export class DOMUtils {
  /**
   * Safely query a single element
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {Element|null}
   */
  static querySelector(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return null;
    }
  }

  /**
   * Safely query multiple elements
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (default: document)
   * @returns {NodeList}
   */
  static querySelectorAll(selector, context = document) {
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.warn(`Invalid selector: ${selector}`, error);
      return [];
    }
  }

  /**
   * Create an element with attributes
   * @param {string} tag - Element tag name
   * @param {Object} attributes - Element attributes
   * @returns {Element}
   */
  static createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    
    return element;
  }

  /**
   * Add class to element
   * @param {Element} element - Target element
   * @param {string} className - Class name to add
   */
  static addClass(element, className) {
    if (element && className) {
      element.classList.add(className);
    }
  }

  /**
   * Remove class from element
   * @param {Element} element - Target element
   * @param {string} className - Class name to remove
   */
  static removeClass(element, className) {
    if (element && className) {
      element.classList.remove(className);
    }
  }

  /**
   * Toggle class on element
   * @param {Element} element - Target element
   * @param {string} className - Class name to toggle
   */
  static toggleClass(element, className) {
    if (element && className) {
      element.classList.toggle(className);
    }
  }

  /**
   * Check if element has class
   * @param {Element} element - Target element
   * @param {string} className - Class name to check
   * @returns {boolean}
   */
  static hasClass(element, className) {
    return element && className ? element.classList.contains(className) : false;
  }
}
