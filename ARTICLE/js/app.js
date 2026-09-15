/**
 * THE NEXT INTERNET — IT IN 2030
 * Master Application Controller & Presentation Mode
 */

(function () {
  'use strict';

  // State Management
  const state = {
    isPresentation: localStorage.getItem('it2030_presentation') === 'true',
    audioMuted: localStorage.getItem('it2030_audio_muted') === 'true',
    pages: ['index.html', 'without-it.html', 'chennai-2030.html'],
    currentPage: window.location.pathname.split('/').pop() || 'index.html'
  };

  // DOM Elements
  const readingProgressBar = document.getElementById('readingProgress');
  const presentationBtn = document.getElementById('btnPresentation');
  const presentationBanner = document.getElementById('presentationBanner');
  const audioBtn = document.getElementById('btnAudio');
  const customCursor = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('cursorFollower');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  // Initialize UI & Listeners
  function init() {
    setupReadingProgress();
    setupPresentationMode();
    setupAudioToggle();
    setupCustomCursor();
    setupKeyboardNavigation();
    setupMobileMenu();
    highlightCurrentNavLink();
  }

  // 1. Reading Progress Bar & Header Compacting
  function setupReadingProgress() {
    const header = document.querySelector('.global-header');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      if (readingProgressBar) readingProgressBar.style.width = `${progress}%`;

      if (header) {
        if (scrollTop > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  // 2. Presentation Mode (For Judges & Evaluators)
  function setupPresentationMode() {
    applyPresentationState();

    if (presentationBtn) {
      presentationBtn.addEventListener('click', () => {
        togglePresentationMode();
      });
    }
  }

  function togglePresentationMode() {
    state.isPresentation = !state.isPresentation;
    localStorage.setItem('it2030_presentation', state.isPresentation);
    applyPresentationState();
    if (window.soundEngine) window.soundEngine.playNodeSelect();
  }

  function applyPresentationState() {
    if (state.isPresentation) {
      document.body.classList.add('presentation-active');
      if (presentationBtn) presentationBtn.classList.add('active');
      if (presentationBanner) presentationBanner.classList.add('active');
    } else {
      document.body.classList.remove('presentation-active');
      if (presentationBtn) presentationBtn.classList.remove('active');
      if (presentationBanner) presentationBanner.classList.remove('active');
    }
  }

  // 3. Audio Toggle
  function setupAudioToggle() {
    if (!audioBtn) return;
    updateAudioBtnIcon();

    audioBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const isMuted = window.soundEngine.toggleMute();
        state.audioMuted = isMuted;
        updateAudioBtnIcon();
        if (!isMuted) window.soundEngine.playClick();
      }
    });
  }

  function updateAudioBtnIcon() {
    if (!audioBtn) return;
    if (state.audioMuted) {
      audioBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      audioBtn.title = "Unmute Audio Feedback";
      audioBtn.classList.remove('active');
    } else {
      audioBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
      audioBtn.title = "Mute Audio Feedback";
      audioBtn.classList.add('active');
    }
  }

  // 4. Custom Cursor with Reticle
  function setupCustomCursor() {
    if (!customCursor || !cursorFollower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      customCursor.style.left = `${mouseX}px`;
      customCursor.style.top = `${mouseY}px`;
    }, { passive: true });

    function renderFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(renderFollower);
    }
    requestAnimationFrame(renderFollower);

    // Interactive element hover detection
    const interactiveElements = document.querySelectorAll('a, button, input, .timeline-node, .pillar-toggle-card, .stack-layer-card, .zone-item-btn, .master-stack-item, .master-toggle-box');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        if (window.soundEngine) window.soundEngine.playClick();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 5. Global Keyboard Navigation
  function setupKeyboardNavigation() {
    window.addEventListener('keydown', (e) => {
      // Toggle presentation mode with 'P' or 'p'
      if ((e.key === 'p' || e.key === 'P') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        togglePresentationMode();
        return;
      }

      // Page switching shortcuts
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === '1') {
        navigateTo('index.html');
      } else if (e.key === '2') {
        navigateTo('without-it.html');
      } else if (e.key === '3') {
        navigateTo('chennai-2030.html');
      } else if (e.key === 'ArrowRight' && e.altKey) {
        navigateNext();
      } else if (e.key === 'ArrowLeft' && e.altKey) {
        navigatePrev();
      }
    });
  }

  function navigateTo(pageUrl) {
    if (!state.currentPage.includes(pageUrl)) {
      if (window.soundEngine) window.soundEngine.playNodeSelect();
      window.location.href = pageUrl;
    }
  }

  function navigateNext() {
    let curIdx = state.pages.findIndex(p => state.currentPage.includes(p));
    if (curIdx === -1) curIdx = 0;
    const nextIdx = (curIdx + 1) % state.pages.length;
    navigateTo(state.pages[nextIdx]);
  }

  function navigatePrev() {
    let curIdx = state.pages.findIndex(p => state.currentPage.includes(p));
    if (curIdx === -1) curIdx = 0;
    const prevIdx = (curIdx - 1 + state.pages.length) % state.pages.length;
    navigateTo(state.pages[prevIdx]);
  }

  // 6. Mobile Menu
  function setupMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
    });
  }

  // 7. Active Nav Link Detection
  function highlightCurrentNavLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && state.currentPage.includes(href)) {
        link.classList.add('active');
      } else if (state.currentPage === '' && href === 'index.html') {
        link.classList.add('active');
      }
    });
  }

  // Run on DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export helper for window
  window.appGlobal = {
    togglePresentation: togglePresentationMode,
    navigateTo: navigateTo
  };
})();
