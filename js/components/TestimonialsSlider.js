class TestimonialsSlider {
  constructor() {
    this.slider = document.getElementById('testimonials-track');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('sliderDots');
    
    if (!this.slider) return;
    
    this.cards = this.slider.querySelectorAll('.testimonial-card');
    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
    
    this.init();
  }

  init() {
    this.createDots();
    this.updateSlider();
    this.bindEvents();
    
    // Update cards per view on resize
    window.addEventListener('resize', () => {
      const newCardsPerView = this.getCardsPerView();
      if (newCardsPerView !== this.cardsPerView) {
        this.cardsPerView = newCardsPerView;
        this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
        this.createDots();
        this.updateSlider();
      }
    });
  }

  getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    this.dotsContainer.innerHTML = '';
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === this.currentIndex) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        this.goToSlide(i);
      });
      
      this.dotsContainer.appendChild(dot);
    }
  }

  updateSlider() {
    if (!this.slider) return;
    
    const cardWidth = 100 / this.cardsPerView;
    const translateX = -this.currentIndex * 100;
    
    // Update card flex-basis
    this.cards.forEach(card => {
      if (this.cardsPerView === 1) {
        card.style.flexBasis = '100%';
      } else {
        card.style.flexBasis = 'calc(50% - 12px)';
      }
    });
    
    this.slider.style.transform = `translateX(${translateX}%)`;
    
    // Update navigation buttons
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= this.totalSlides - 1;
    }
    
    // Update dots
    this.updateDots();
  }

  updateDots() {
    if (!this.dotsContainer) return;
    
    const dots = this.dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;
    
    this.currentIndex = index;
    this.updateSlider();
  }

  nextSlide() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  bindEvents() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }

    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    this.slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.touches[0].clientX;
    });

    this.slider.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      
      const diff = startX - currentX;
      const threshold = 50;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });

    // Mouse drag support for desktop
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseCurrentX = 0;

    this.slider.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      mouseStartX = e.clientX;
      this.slider.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      mouseCurrentX = e.clientX;
    });

    document.addEventListener('mouseup', () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      this.slider.style.cursor = 'grab';
      
      const diff = mouseStartX - mouseCurrentX;
      const threshold = 50;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TestimonialsSlider();
});

export default TestimonialsSlider;
