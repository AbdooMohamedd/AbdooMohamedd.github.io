import { DOMUtils } from '../utils/dom.js';
import { APP_CONFIG } from '../config/constants.js';

/**
 * CV Viewer Component Handler
 */
export class CVViewer {
  constructor() {
    this.init();
  }

  init() {
    this.createCVButton();
  }

  createCVButton() {
    // Find the sidebar info section
    const sidebarInfo = DOMUtils.querySelector('.sidebar-info');
    if (!sidebarInfo) return;

    // Create CV button as a link
    const cvButton = DOMUtils.createElement('a', {
      className: 'cv-btn',
      href: 'https://drive.google.com/file/d/15kdd6MYIb7xi1j2NnvOaeWIt39egN7Sn/view',
      target: '_blank',
      rel: 'noopener noreferrer',
      title: 'View CV'
    });

    cvButton.innerHTML = `
      <ion-icon name="document-text-outline"></ion-icon>
      <span>View CV</span>
    `;

    // Insert after the info_more-btn
    const moreBtn = sidebarInfo.querySelector('.info_more-btn');
    if (moreBtn) {
      moreBtn.insertAdjacentElement('afterend', cvButton);
    }
  }

  createCVModal() {
    // Create modal HTML
    const modalHTML = `
      <div class="cv-modal-container" data-cv-modal-container>
        <div class="cv-overlay" data-cv-overlay></div>
        <div class="cv-modal">
          <div class="cv-modal-header">
            <h3>Abdelrahman Mohamed - CV</h3>
            <div class="cv-modal-actions">
              <a href="${APP_CONFIG.PERSONAL_INFO.CV_URL}" 
                 download="Abdelrahman_Mohamed_CV.pdf" 
                 class="cv-download-btn"
                 title="Download CV">
                <ion-icon name="download-outline"></ion-icon>
                Download
              </a>
              <button class="cv-close-btn" data-cv-close-btn title="Close">
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
          </div>
          <div class="cv-modal-content">
            <iframe src="${APP_CONFIG.PERSONAL_INFO.CV_URL}" 
                    frameborder="0" 
                    width="100%" 
                    height="100%"
                    title="Abdelrahman Mohamed CV">
            </iframe>
          </div>
        </div>
      </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Bind events
    this.bindModalEvents();
  }

  bindModalEvents() {
    const modalContainer = DOMUtils.querySelector('[data-cv-modal-container]');
    const overlay = DOMUtils.querySelector('[data-cv-overlay]');
    const closeBtn = DOMUtils.querySelector('[data-cv-close-btn]');

    // Close modal events
    [overlay, closeBtn].forEach(element => {
      if (element) {
        element.addEventListener('click', () => {
          this.closeCVModal();
        });
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer?.classList.contains('active')) {
        this.closeCVModal();
      }
    });
  }

  openCVModal() {
    const modalContainer = DOMUtils.querySelector('[data-cv-modal-container]');
    const overlay = DOMUtils.querySelector('[data-cv-overlay]');

    if (modalContainer && overlay) {
      DOMUtils.addClass(modalContainer, 'active');
      DOMUtils.addClass(overlay, 'active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCVModal() {
    const modalContainer = DOMUtils.querySelector('[data-cv-modal-container]');
    const overlay = DOMUtils.querySelector('[data-cv-overlay]');

    if (modalContainer && overlay) {
      DOMUtils.removeClass(modalContainer, 'active');
      DOMUtils.removeClass(overlay, 'active');
      document.body.style.overflow = '';
    }
  }
}