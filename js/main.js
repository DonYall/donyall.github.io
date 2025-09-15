// Modern Portfolio JavaScript - Vanilla JS with performance optimizations
'use strict';

// Performance optimization: Use passive event listeners where appropriate
const passiveEventOptions = { passive: true };

// Theme Management
class ThemeManager {
  constructor() {
    this.init();
  }

  init() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.getElementById('theme-icon');
    this.currentTheme = this.getTheme();
    
    this.updateTheme();
    this.bindEvents();
  }

  getTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPreference ? 'dark' : 'light';
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateThemeIcon();
  }

  updateTheme() {
    this.setTheme(this.currentTheme);
  }

  updateThemeIcon() {
    const isDark = this.currentTheme === 'dark';
    this.themeIcon.innerHTML = isDark
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`;
  }

  toggle() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  bindEvents() {
    this.themeToggle?.addEventListener('click', () => this.toggle());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Header Management
class HeaderManager {
  constructor() {
    this.init();
  }

  init() {
    this.header = document.getElementById('header');
    this.menuToggle = document.querySelector('.header__menu-toggle');
    this.mobileMenu = document.querySelector('.header__mobile-menu');
    this.mobileMenuLinks = document.querySelectorAll('.header__mobile-nav-link');
    this.desktopMenuLinks = document.querySelectorAll('.header__nav-link');
    this.isMenuOpen = false;
    
    this.bindEvents();
  }

  handleScroll() {
    const scrolled = window.scrollY > 10;
    this.header?.classList.toggle('scrolled', scrolled);
  }

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle?.setAttribute('aria-expanded', this.isMenuOpen.toString());
    this.mobileMenu?.setAttribute('data-open', this.isMenuOpen.toString());
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    if (this.isMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  handleNavClick(href) {
    this.closeMobileMenu();
    
    // Smooth scroll to section
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = this.header?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  bindEvents() {
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          this.handleScroll();
          scrollTimeout = null;
        }, 16); // ~60fps
      }
    }, passiveEventOptions);

    // Mobile menu toggle
    this.menuToggle?.addEventListener('click', () => this.toggleMobileMenu());

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.mobileMenu?.contains(e.target) && 
          !this.menuToggle?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Handle navigation clicks
    [...this.mobileMenuLinks, ...this.desktopMenuLinks].forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          this.handleNavClick(href);
        }
      });
    });
  }
}

// Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.init();
  }

  init() {
    // Check if user prefers reduced motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!this.prefersReducedMotion) {
      this.setupIntersectionObserver();
    }
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .stagger > *');
    animatedElements.forEach(el => {
      // Set initial state
      if (!this.prefersReducedMotion) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      }
      
      this.observer.observe(el);
    });
  }
}

// Contact Form Manager
class ContactFormManager {
  constructor() {
    this.init();
  }

  init() {
    this.form = document.querySelector('form[action*="formspree"]');
    if (this.form) {
      this.bindEvents();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Add loading state
    submitButton.classList.add('btn--loading');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      const formData = new FormData(this.form);
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        this.showSuccess();
        this.form.reset();
      } else {
        this.showError();
      }
    } catch (error) {
      this.showError();
    } finally {
      // Remove loading state
      submitButton.classList.remove('btn--loading');
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  showSuccess() {
    this.showMessage('Thank you! Your message has been sent successfully.', 'success');
  }

  showError() {
    this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
  }

  showMessage(text, type) {
    // Remove existing messages
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and show new message
    const message = document.createElement('div');
    message.className = `form-message form-${type}`;
    message.textContent = text;
    message.style.cssText = `
      padding: var(--space-md);
      border-radius: var(--radius-md);
      margin-top: var(--space-md);
      background-color: var(--color-${type === 'success' ? 'success' : 'error'});
      color: white;
      font-weight: var(--font-weight-medium);
    `;
    
    this.form.appendChild(message);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      message.remove();
    }, 5000);
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }
}

// Discord Username Copy Manager
class DiscordManager {
  constructor() {
    this.init();
  }

  init() {
    this.discordButton = document.getElementById('discord-btn');
    this.username = 'donyall.';
    
    if (this.discordButton) {
      this.bindEvents();
    }
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.username);
      this.showCopySuccess();
    } catch (error) {
      // Fallback for older browsers
      this.fallbackCopy();
    }
  }

  fallbackCopy() {
    const textArea = document.createElement('textarea');
    textArea.value = this.username;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess();
    } catch (error) {
      this.showCopyError();
    } finally {
      document.body.removeChild(textArea);
    }
  }

  showCopySuccess() {
    const originalTitle = this.discordButton.getAttribute('aria-label');
    this.discordButton.setAttribute('aria-label', 'Copied to clipboard!');
    
    // Visual feedback
    this.discordButton.style.transform = 'scale(1.1)';
    this.discordButton.style.backgroundColor = 'var(--color-success)';
    
    setTimeout(() => {
      this.discordButton.setAttribute('aria-label', originalTitle);
      this.discordButton.style.transform = '';
      this.discordButton.style.backgroundColor = '';
    }, 2000);
  }

  showCopyError() {
    alert(`Please copy manually: ${this.username}`);
  }

  bindEvents() {
    this.discordButton.addEventListener('click', () => this.copyToClipboard());
  }
}

// Performance optimizations
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    // Lazy load images
    this.setupLazyLoading();
    
    // Preload critical resources
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      // Observe all images with loading="lazy"
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  preloadCriticalResources() {
    // Preload hero image
    const heroImage = document.querySelector('.hero__avatar');
    if (heroImage && heroImage.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }
  }
}

// Initialize everything when DOM is ready
class App {
  constructor() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    // Initialize all managers
    this.themeManager = new ThemeManager();
    this.headerManager = new HeaderManager();
    this.scrollAnimationManager = new ScrollAnimationManager();
    this.contactFormManager = new ContactFormManager();
    this.discordManager = new DiscordManager();
    this.performanceManager = new PerformanceManager();
    
    // Initial scroll position handling
    this.headerManager.handleScroll();
    
    console.log('🚀 Portfolio initialized successfully!');
  }
}

// Start the application
new App();