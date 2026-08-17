/**
 * AETHER // OBSERVATORY — CORE APPLICATION CONTROLLER
 * Architecture: Living Neural Field, Orbital Graph Engine, Intent Vector Engine,
 * Laboratory Radar Comparator, Classified Dossier Engine, Command Palette, Web Audio Synthesizer.
 */

// Global Application State
const AppState = {
  activeIntent: 'intent-all',
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'capability',
  arenaSystemA: 'chatgpt',
  arenaSystemB: 'claude',
  bookmarks: JSON.parse(localStorage.getItem('aether_bookmarks') || '["chatgpt", "claude", "deepseek"]'),
  soundEnabled: localStorage.getItem('aether_sound') !== 'false',
  isCommandPaletteOpen: false,
  selectedCommandIndex: 0,
  activeDossierId: null
};

// ==========================================================================
// TACTILE CYBER ACOUSTIC SYNTHESIZER (WEB AUDIO API)
// ==========================================================================
class CyberSynthesizer {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  play(type = 'click') {
    if (!AppState.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.start(now);
        osc.stop(now + 0.02);
      } else if (type === 'signal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(783.99, now + 0.06); // G5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'warp') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'declassify') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.16);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (e) {
      // Audio context policy safe ignore
    }
  }
}

const sfx = new CyberSynthesizer();

// ==========================================================================
// TOAST NOTIFICATION HUD
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-3 px-4 py-2.5 rounded-sm bg-[#0a0f18]/95 border border-[#00f2fe]/40 text-slate-100 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md transform translate-y-3 opacity-0 transition-all duration-300 pointer-events-auto font-mono text-xs z-50';
  
  let iconHtml = '<i data-lucide="info" class="w-4 h-4 text-[#00f2fe] shrink-0"></i>';
  if (type === 'bookmark') {
    iconHtml = '<i data-lucide="bookmark" class="w-4 h-4 text-[#f59e0b] shrink-0"></i>';
  } else if (type === 'arena') {
    iconHtml = '<i data-lucide="swords" class="w-4 h-4 text-[#8b5cf6] shrink-0"></i>';
  }

  toast.innerHTML = `${iconHtml}<span>${message}</span>`;
  container.appendChild(toast);
  lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  sfx.play('signal');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ==========================================================================
// HARDWARE PRECISION CURSOR CONTROLLER
// ==========================================================================
function initHardwareCursor() {
  const dot = document.getElementById('aether-cursor-dot');
  const ring = document.getElementById('aether-cursor-ring');
  const label = document.getElementById('aether-cursor-label');

  if (!dot || !ring || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Attach hover cursor labels to interactive elements
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-cursor]');
    if (target) {
      const cursorText = target.getAttribute('data-cursor') || 'EXPLORE';
      label.textContent = cursorText;
      ring.classList.add('active-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-cursor]');
    if (target) {
      ring.classList.remove('active-hover');
    }
  });
}

// ==========================================================================
// LIVING NEURAL CANVAS BACKGROUND ENGINE
// ==========================================================================
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  // Check reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 32 : 75;
  const maxDistance = isMobile ? 90 : 135;

  let mouse = { x: -1000, y: -1000, radius: 150 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.8;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse Proximity Vortex
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.x -= (dx / dist) * force * 1.2;
        this.y -= (dy / dist) * force * 1.2;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let scanLineY = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Subtle sweeping scan wave
    scanLineY = (scanLineY + 0.8) % height;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, scanLineY);
    ctx.lineTo(width, scanLineY);
    ctx.stroke();

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Proximity connection lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================================================
// SECTION 01: AI UNIVERSE ORBITAL GRAPH CONTROLLER
// ==========================================================================
function renderAIUniverse() {
  const container = document.getElementById('universe-nodes-container');
  const hudPanel = document.getElementById('universe-hud-panel');
  const hudCode = document.getElementById('hud-node-code');
  const hudTitle = document.getElementById('hud-node-title');
  const hudDesc = document.getElementById('hud-node-desc');
  const hudCount = document.getElementById('hud-node-count');

  if (!container) return;
  container.innerHTML = '';

  const orbitalCategories = AI_CATEGORIES.filter(c => c.id !== 'all');
  const rect = container.getBoundingClientRect();
  const cx = 50; // percentage
  const cy = 50; // percentage

  orbitalCategories.forEach((cat, index) => {
    // Trigonometric positioning
    const angleRad = (cat.angle * Math.PI) / 180;
    const radiusPercent = (cat.orbitRadius / 600) * 80;
    
    // Scale for responsive layout
    const left = 50 + Math.cos(angleRad) * (radiusPercent * 0.85);
    const top = 50 + Math.sin(angleRad) * (radiusPercent * 0.75);

    const nodeEl = document.createElement('div');
    nodeEl.className = 'universe-node';
    nodeEl.style.left = `${left}%`;
    nodeEl.style.top = `${top}%`;
    nodeEl.setAttribute('data-cursor', `ENTER // ${cat.name.toUpperCase()}`);

    nodeEl.innerHTML = `
      <div class="universe-node-disc" style="border-color: ${cat.accent}55;">
        <i data-lucide="${cat.icon}" class="w-5 h-5" style="color: ${cat.accent};"></i>
      </div>
      <div class="universe-node-tag">${cat.name.split(' ')[0]}</div>
    `;

    // Hover Interaction
    nodeEl.addEventListener('mouseenter', () => {
      sfx.play('hover');
      hudCode.textContent = cat.code;
      hudCode.style.color = cat.accent;
      hudTitle.textContent = cat.name;
      hudDesc.textContent = cat.description;
      hudCount.textContent = `${cat.count} VERIFIED`;
      hudCount.style.color = cat.accent;
      hudPanel.style.opacity = '1';
    });

    nodeEl.addEventListener('mouseleave', () => {
      hudPanel.style.opacity = '0';
    });

    // Click to focus category
    nodeEl.addEventListener('click', () => {
      sfx.play('warp');
      AppState.activeCategory = cat.id;
      AppState.activeIntent = 'intent-all';
      updateIntentChips();
      renderCatalog();
      
      const catalogEl = document.getElementById('catalog-observatory');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Focused Orbit: ${cat.name}`, 'info');
    });

    container.appendChild(nodeEl);
  });

  lucide.createIcons();
}

// ==========================================================================
// SECTION 02: INTENT VECTOR MATRIX CONTROLLER
// ==========================================================================
function initIntentMatrix() {
  const container = document.getElementById('intent-chips-container');
  if (!container) return;

  container.innerHTML = '';

  AI_INTENTS.forEach(intent => {
    const btn = document.createElement('button');
    btn.className = `intent-button ${AppState.activeIntent === intent.id ? 'active' : ''}`;
    btn.setAttribute('data-intent-id', intent.id);
    btn.setAttribute('data-cursor', 'ALIGN');
    btn.innerHTML = `<span>${intent.label}</span>`;

    btn.addEventListener('click', () => {
      sfx.play('click');
      AppState.activeIntent = intent.id;
      AppState.activeCategory = 'all';
      updateIntentChips();
      renderCatalog();
      showToast(`Aligned Intent: ${intent.label}`, 'info');
    });

    container.appendChild(btn);
  });

  updateIntentTelemetry();
}

function updateIntentChips() {
  const buttons = document.querySelectorAll('.intent-button');
  buttons.forEach(btn => {
    const id = btn.getAttribute('data-intent-id');
    if (id === AppState.activeIntent) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  updateIntentTelemetry();
}

function updateIntentTelemetry() {
  const nameEl = document.getElementById('active-intent-name');
  const countEl = document.getElementById('active-intent-count');
  if (!nameEl || !countEl) return;

  const currentIntent = AI_INTENTS.find(i => i.id === AppState.activeIntent) || AI_INTENTS[0];
  nameEl.textContent = currentIntent.label;
  
  if (currentIntent.id === 'intent-all') {
    countEl.textContent = AI_TOOLS.length;
  } else {
    countEl.textContent = currentIntent.toolIds.length;
  }
}

// ==========================================================================
// SECTION 03: OBSERVATORY INTELLIGENCE CATALOG (CLASSIFIED DOSSIERS)
// ==========================================================================
function renderCatalog() {
  const container = document.getElementById('catalog-grid-container');
  const emptyState = document.getElementById('catalog-empty-state');
  if (!container) return;

  let filtered = [...AI_TOOLS];

  // 1. Intent Filter
  if (AppState.activeIntent !== 'intent-all') {
    const currentIntent = AI_INTENTS.find(i => i.id === AppState.activeIntent);
    if (currentIntent) {
      filtered = filtered.filter(t => currentIntent.toolIds.includes(t.id));
    }
  }

  // 2. Category Filter (if active)
  if (AppState.activeCategory !== 'all') {
    filtered = filtered.filter(t => t.categoryId === AppState.activeCategory);
  }

  // 3. Search Query Filter
  if (AppState.searchQuery.trim() !== '') {
    const q = AppState.searchQuery.toLowerCase();
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.developer.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.classification.toLowerCase().includes(q)
    );
  }

  // 4. Sorting Algorithm
  if (AppState.sortBy === 'capability') {
    filtered.sort((a, b) => (b.radarCapabilities.reasoning + b.radarCapabilities.coding) - (a.radarCapabilities.reasoning + a.radarCapabilities.coding));
  } else if (AppState.sortBy === 'coding') {
    filtered.sort((a, b) => b.radarCapabilities.coding - a.radarCapabilities.coding);
  } else if (AppState.sortBy === 'context') {
    filtered.sort((a, b) => b.radarCapabilities.context - a.radarCapabilities.context);
  } else if (AppState.sortBy === 'alphabetical') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  container.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  filtered.forEach((tool, index) => {
    const isBookmarked = AppState.bookmarks.includes(tool.id);
    const card = document.createElement('div');
    card.className = 'tool-dossier-card rounded-sm';
    card.setAttribute('data-tool-id', tool.id);

    card.innerHTML = `
      <!-- Card Header: Telemetry Index & Bookmark -->
      <div>
        <div class="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-[#00f2fe]">DOSSIER // ${String(index + 1).padStart(3, '0')}</span>
            <span>•</span>
            <span class="text-slate-500 uppercase">${tool.category}</span>
          </div>
          <button class="bookmark-btn hover:text-[#f59e0b] transition-colors p-1" data-tool-id="${tool.id}" title="${isBookmarked ? 'Remove Pin' : 'Pin System'}" data-cursor="PIN">
            <i data-lucide="bookmark" class="w-3.5 h-3.5 ${isBookmarked ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-slate-400'}"></i>
          </button>
        </div>

        <!-- Tool Identity & Classification -->
        <div class="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 class="font-syne font-bold text-2xl text-white hover:text-[#00f2fe] transition-colors cursor-pointer open-dossier-trigger" data-tool-id="${tool.id}">
              ${tool.name}
            </h3>
            <div class="font-mono text-xs text-slate-400 mt-0.5">${tool.developer}</div>
          </div>
          <div class="w-8 h-8 rounded-sm bg-[#030508] border border-white/10 flex items-center justify-center text-xs font-mono font-bold" style="color: ${tool.accentColor};">
            ${tool.name.substring(0, 2).toUpperCase()}
          </div>
        </div>

        <div class="font-mono text-[9px] text-[#00f2fe] tracking-wider uppercase mb-3 px-2 py-0.5 bg-[#00f2fe]/5 border border-[#00f2fe]/20 inline-block">
          ${tool.classification}
        </div>

        <p class="text-xs text-slate-300 leading-relaxed mb-4">
          ${tool.tagline}
        </p>

        <!-- Signature SIGNAL vs NOISE Preview -->
        <div class="space-y-2 mb-5">
          <div class="signal-box text-[11px] leading-snug">
            <div class="font-mono text-[9px] text-[#10b981] font-bold tracking-widest uppercase mb-0.5 flex items-center gap-1">
              <i data-lucide="zap" class="w-3 h-3"></i>
              <span>SIGNAL</span>
            </div>
            <div class="text-slate-200">${tool.signal[0]}</div>
          </div>
          
          <div class="noise-box text-[11px] leading-snug">
            <div class="font-mono text-[9px] text-[#f59e0b] font-bold tracking-widest uppercase mb-0.5 flex items-center gap-1">
              <i data-lucide="alert-triangle" class="w-3 h-3"></i>
              <span>NOISE</span>
            </div>
            <div class="text-slate-400">${tool.noise[0]}</div>
          </div>
        </div>

        <!-- Capability Mini Metrics -->
        <div class="grid grid-cols-3 gap-2 py-3 border-y border-white/5 font-mono text-[10px] text-slate-400 mb-5">
          <div>
            <div class="text-slate-500">REASONING</div>
            <div class="text-white font-bold text-xs mt-0.5">${tool.radarCapabilities.reasoning}/100</div>
          </div>
          <div>
            <div class="text-slate-500">CODING</div>
            <div class="text-white font-bold text-xs mt-0.5">${tool.radarCapabilities.coding}/100</div>
          </div>
          <div>
            <div class="text-slate-500">CONTEXT</div>
            <div class="text-white font-bold text-xs mt-0.5">${tool.radarCapabilities.context}/100</div>
          </div>
        </div>
      </div>

      <!-- Card Action Footer -->
      <div class="flex items-center justify-between gap-2 pt-2">
        <button class="open-dossier-btn flex-1 py-2 px-3 bg-[#00f2fe]/10 hover:bg-[#00f2fe] border border-[#00f2fe]/50 text-[#00f2fe] hover:text-black font-mono text-xs font-semibold tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5" data-tool-id="${tool.id}" data-cursor="DEEP DIVE">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
          <span>OPEN DOSSIER</span>
        </button>
        <button class="load-arena-btn p-2 bg-[#0a0f18] hover:bg-[#8b5cf6]/20 border border-white/10 hover:border-[#8b5cf6] text-slate-300 hover:text-[#8b5cf6] rounded-sm transition-all" data-tool-id="${tool.id}" title="Subject to Arena Radar" data-cursor="ARENA">
          <i data-lucide="swords" class="w-4 h-4"></i>
        </button>
        <a href="${tool.officialUrl}" target="_blank" rel="noopener noreferrer" class="p-2 bg-[#0a0f18] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-sm transition-all" title="Visit Verified URL" data-cursor="VISIT">
          <i data-lucide="external-link" class="w-4 h-4"></i>
        </a>
      </div>
    `;

    container.appendChild(card);
  });

  lucide.createIcons();
  attachCatalogEventListeners();
}

function attachCatalogEventListeners() {
  // Open Dossier Trigger
  document.querySelectorAll('.open-dossier-btn, .open-dossier-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const toolId = btn.getAttribute('data-tool-id');
      openDossierModal(toolId);
    });
  });

  // Bookmark Toggle
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const toolId = btn.getAttribute('data-tool-id');
      toggleBookmark(toolId);
    });
  });

  // Load into Arena
  document.querySelectorAll('.load-arena-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const toolId = btn.getAttribute('data-tool-id');
      AppState.arenaSystemB = toolId;
      updateArenaSelectors();
      renderArenaRadar();
      
      const arenaEl = document.getElementById('ai-arena');
      if (arenaEl) {
        arenaEl.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Subjected ${toolId.toUpperCase()} to AI Arena`, 'arena');
    });
  });
}

function toggleBookmark(toolId) {
  const idx = AppState.bookmarks.indexOf(toolId);
  if (idx > -1) {
    AppState.bookmarks.splice(idx, 1);
    showToast(`Unpinned ${toolId.toUpperCase()}`, 'info');
  } else {
    AppState.bookmarks.push(toolId);
    showToast(`Pinned ${toolId.toUpperCase()} to Memory`, 'bookmark');
  }
  localStorage.setItem('aether_bookmarks', JSON.stringify(AppState.bookmarks));
  updateBookmarksBadge();
  renderBookmarksList();
  renderCatalog();
}

function updateBookmarksBadge() {
  const badge = document.getElementById('bookmarks-count-badge');
  if (badge) {
    badge.textContent = AppState.bookmarks.length;
  }
}

// ==========================================================================
// SECTION 04: AI ARENA — 8-AXIS LABORATORY RADAR CONTROLLER
// ==========================================================================
function initAIArena() {
  const selectA = document.getElementById('arena-select-a');
  const selectB = document.getElementById('arena-select-b');
  if (!selectA || !selectB) return;

  selectA.innerHTML = '';
  selectB.innerHTML = '';

  AI_TOOLS.forEach(tool => {
    const optA = document.createElement('option');
    optA.value = tool.id;
    optA.textContent = `${tool.name} (${tool.developer})`;
    if (tool.id === AppState.arenaSystemA) optA.selected = true;
    selectA.appendChild(optA);

    const optB = document.createElement('option');
    optB.value = tool.id;
    optB.textContent = `${tool.name} (${tool.developer})`;
    if (tool.id === AppState.arenaSystemB) optB.selected = true;
    selectB.appendChild(optB);
  });

  selectA.addEventListener('change', (e) => {
    AppState.arenaSystemA = e.target.value;
    sfx.play('click');
    renderArenaRadar();
  });

  selectB.addEventListener('change', (e) => {
    AppState.arenaSystemB = e.target.value;
    sfx.play('click');
    renderArenaRadar();
  });

  renderArenaRadar();
}

function updateArenaSelectors() {
  const selectA = document.getElementById('arena-select-a');
  const selectB = document.getElementById('arena-select-b');
  if (selectA) selectA.value = AppState.arenaSystemA;
  if (selectB) selectB.value = AppState.arenaSystemB;
}

function renderArenaRadar() {
  const toolA = AI_TOOLS.find(t => t.id === AppState.arenaSystemA) || AI_TOOLS[0];
  const toolB = AI_TOOLS.find(t => t.id === AppState.arenaSystemB) || AI_TOOLS[1];

  // Update Legend Labels
  const legendA = document.getElementById('arena-legend-a');
  const legendB = document.getElementById('arena-legend-b');
  if (legendA) legendA.textContent = `${toolA.name.toUpperCase()} (ALPHA)`;
  if (legendB) legendB.textContent = `${toolB.name.toUpperCase()} (BETA)`;

  // Radar Dimensions (8 axes)
  const dimensions = [
    { key: 'reasoning', label: 'REASONING' },
    { key: 'coding', label: 'CODING' },
    { key: 'writing', label: 'WRITING' },
    { key: 'research', label: 'RESEARCH' },
    { key: 'creativity', label: 'CREATIVITY' },
    { key: 'vision', label: 'VISION' },
    { key: 'context', label: 'CONTEXT' },
    { key: 'agents', label: 'AGENTS' }
  ];

  const svg = document.getElementById('arena-radar-svg');
  if (!svg) return;

  const cx = 190;
  const cy = 190;
  const maxR = 130;
  const totalAxes = dimensions.length;

  let svgHtml = '';

  // Background Concentric Octagons (Grid levels 25%, 50%, 75%, 100%)
  [0.25, 0.5, 0.75, 1.0].forEach(level => {
    let polyPoints = '';
    for (let i = 0; i < totalAxes; i++) {
      const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
      const r = maxR * level;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      polyPoints += `${x.toFixed(1)},${y.toFixed(1)} `;
    }
    svgHtml += `<polygon points="${polyPoints.trim()}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />`;
  });

  // Axis Spokes & Labels
  dimensions.forEach((dim, i) => {
    const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const x = cx + maxR * Math.cos(angle);
    const y = cy + maxR * Math.sin(angle);
    
    // Line spoke
    svgHtml += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.12)" stroke-width="1" />`;

    // Label Placement
    const labelR = maxR + 24;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle) + 4;
    svgHtml += `<text x="${lx}" y="${ly}" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8" text-anchor="middle" letter-spacing="0.1em">${dim.label}</text>`;
  });

  // System A Polygon (Cyan)
  let pointsA = '';
  dimensions.forEach((dim, i) => {
    const val = (toolA.radarCapabilities[dim.key] || 50) / 100;
    const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const r = maxR * val;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    pointsA += `${x.toFixed(1)},${y.toFixed(1)} `;
  });
  svgHtml += `<polygon points="${pointsA.trim()}" fill="rgba(0, 242, 254, 0.22)" stroke="#00f2fe" stroke-width="2" />`;

  // System B Polygon (Purple)
  let pointsB = '';
  dimensions.forEach((dim, i) => {
    const val = (toolB.radarCapabilities[dim.key] || 50) / 100;
    const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const r = maxR * val;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    pointsB += `${x.toFixed(1)},${y.toFixed(1)} `;
  });
  svgHtml += `<polygon points="${pointsB.trim()}" fill="rgba(139, 92, 246, 0.22)" stroke="#8b5cf6" stroke-width="2" />`;

  svg.innerHTML = svgHtml;

  // Render Comparative Dimension Metric Bars
  const barsContainer = document.getElementById('arena-capability-bars-container');
  if (barsContainer) {
    barsContainer.innerHTML = '';
    dimensions.forEach(dim => {
      const scoreA = toolA.radarCapabilities[dim.key] || 50;
      const scoreB = toolB.radarCapabilities[dim.key] || 50;

      const barRow = document.createElement('div');
      barRow.className = 'space-y-1 font-mono text-xs';
      barRow.innerHTML = `
        <div class="flex items-center justify-between text-slate-300">
          <span class="text-[#00f2fe] font-bold">${scoreA}%</span>
          <span class="text-slate-400 text-[10px] tracking-widest">${dim.label}</span>
          <span class="text-[#8b5cf6] font-bold">${scoreB}%</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="capability-bar-track flex justify-end">
            <div class="capability-bar-fill-a rounded-r" style="width: ${scoreA}%;"></div>
          </div>
          <div class="capability-bar-track">
            <div class="capability-bar-fill-b rounded-r" style="width: ${scoreB}%;"></div>
          </div>
        </div>
      `;
      barsContainer.appendChild(barRow);
    });
  }

  // Render Head-to-Head Signal/Noise Sheets
  const dossierA = document.getElementById('arena-dossier-a');
  const dossierB = document.getElementById('arena-dossier-b');

  if (dossierA) {
    dossierA.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
        <div>
          <div class="text-[#00f2fe] text-xs font-bold">${toolA.name.toUpperCase()}</div>
          <div class="text-slate-400 text-[10px]">${toolA.developer}</div>
        </div>
        <div class="text-[10px] text-slate-500">${toolA.specs.contextWindow}</div>
      </div>
      <div class="space-y-2 text-xs">
        <div class="text-[#10b981] font-mono text-[10px] font-bold uppercase tracking-wider">PRIMARY SIGNALS:</div>
        <ul class="space-y-1 text-slate-300 list-disc list-inside">
          ${toolA.signal.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div class="space-y-2 text-xs pt-2 border-t border-white/5">
        <div class="text-[#f59e0b] font-mono text-[10px] font-bold uppercase tracking-wider">CAVEATS & NOISE:</div>
        <ul class="space-y-1 text-slate-400 list-disc list-inside">
          ${toolA.noise.slice(0, 2).map(n => `<li>${n}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  if (dossierB) {
    dossierB.innerHTML = `
      <div class="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
        <div>
          <div class="text-[#8b5cf6] text-xs font-bold">${toolB.name.toUpperCase()}</div>
          <div class="text-slate-400 text-[10px]">${toolB.developer}</div>
        </div>
        <div class="text-[10px] text-slate-500">${toolB.specs.contextWindow}</div>
      </div>
      <div class="space-y-2 text-xs">
        <div class="text-[#10b981] font-mono text-[10px] font-bold uppercase tracking-wider">PRIMARY SIGNALS:</div>
        <ul class="space-y-1 text-slate-300 list-disc list-inside">
          ${toolB.signal.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div class="space-y-2 text-xs pt-2 border-t border-white/5">
        <div class="text-[#f59e0b] font-mono text-[10px] font-bold uppercase tracking-wider">CAVEATS & NOISE:</div>
        <ul class="space-y-1 text-slate-400 list-disc list-inside">
          ${toolB.noise.slice(0, 2).map(n => `<li>${n}</li>`).join('')}
        </ul>
      </div>
    `;
  }
}

// ==========================================================================
// SECTION 05: THE EVOLUTION CONTINUUM (MUSEUM EXHIBIT)
// ==========================================================================
function renderEvolutionContinuum() {
  const container = document.getElementById('evolution-container');
  if (!container) return;

  container.innerHTML = '';

  EVOLUTION_STEPS.forEach(step => {
    const stepEl = document.createElement('div');
    stepEl.className = 'evolution-step rounded-sm flex flex-col justify-between';
    stepEl.setAttribute('data-cursor', `EPOCH // ${step.step}`);

    stepEl.innerHTML = `
      <div>
        <div class="evolution-number mb-2">${step.step}</div>
        <div class="font-mono text-[10px] text-[#00f2fe] tracking-widest uppercase mb-1">${step.era}</div>
        <h4 class="font-syne font-bold text-lg text-white mb-2">${step.phase}</h4>
        <div class="font-mono text-xs text-slate-300 font-semibold mb-3">${step.title}</div>
        <p class="text-xs text-slate-400 leading-relaxed mb-4">${step.desc}</p>
      </div>

      <div class="pt-3 border-t border-white/10 space-y-1">
        ${step.attributes.map(attr => `
          <div class="font-mono text-[10px] text-slate-500 flex items-center gap-1.5">
            <span class="w-1 h-1 rounded-full bg-[#00f2fe]"></span>
            <span>${attr}</span>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(stepEl);
  });
}

// ==========================================================================
// SECTION 06: INTELLIGENCE REPORTS (EDITORIAL TECH MAGAZINE)
// ==========================================================================
function renderIntelligenceReports() {
  const container = document.getElementById('reports-grid-container');
  if (!container) return;

  container.innerHTML = '';

  INTELLIGENCE_REPORTS.forEach(report => {
    const reportCard = document.createElement('div');
    reportCard.className = 'report-feature-card rounded-sm flex flex-col justify-between';
    reportCard.setAttribute('data-cursor', 'READ PAPER');

    reportCard.innerHTML = `
      <div>
        <div class="flex items-center justify-between font-mono text-xs text-slate-400 mb-4">
          <span class="text-[#ec4899] font-bold">${report.number}</span>
          <span>${report.year} // ${report.readTime}</span>
        </div>

        <div class="font-mono text-[10px] text-[#00f2fe] tracking-widest uppercase mb-2">
          ${report.category}
        </div>

        <h3 class="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-4 leading-snug">
          ${report.title}
        </h3>

        <p class="text-sm text-slate-300 leading-relaxed mb-6">
          ${report.summary}
        </p>
      </div>

      <div class="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
        <span class="text-slate-500">AUTHOR: ${report.author}</span>
        <button class="read-report-btn text-[#00f2fe] hover:text-white flex items-center gap-1.5 font-bold transition-colors" data-report-id="${report.id}">
          <span>READ DISPATCH</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    container.appendChild(reportCard);
  });

  lucide.createIcons();

  // Attach read report triggers
  document.querySelectorAll('.read-report-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const repId = btn.getAttribute('data-report-id');
      const rep = INTELLIGENCE_REPORTS.find(r => r.id === repId);
      if (rep) {
        openReportModal(rep);
      }
    });
  });
}

function openReportModal(report) {
  const backdrop = document.getElementById('dossier-modal-backdrop');
  const content = document.getElementById('dossier-modal-content');
  if (!backdrop || !content) return;

  sfx.play('declassify');

  content.innerHTML = `
    <div class="space-y-6">
      <div class="flex items-center justify-between font-mono text-xs text-slate-400 border-b border-white/10 pb-4">
        <span class="text-[#ec4899] font-bold">${report.number} // ${report.category}</span>
        <span>${report.year} // ${report.readTime}</span>
      </div>

      <h2 class="font-syne font-extrabold text-3xl sm:text-4xl text-white leading-tight">
        ${report.title}
      </h2>

      <div class="font-mono text-xs text-[#00f2fe]">
        AUTHORED BY: ${report.author}
      </div>

      <div class="prose prose-invert max-w-none text-slate-300 font-sans text-sm sm:text-base leading-relaxed space-y-4 pt-4 border-t border-white/10">
        ${report.content.trim().split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
    </div>
  `;

  backdrop.classList.add('open');
  lucide.createIcons();
}

// ==========================================================================
// CLASSIFIED DOSSIER MODAL ENGINE (TOOL PROFILE)
// ==========================================================================
function openDossierModal(toolId) {
  const tool = AI_TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  const backdrop = document.getElementById('dossier-modal-backdrop');
  const content = document.getElementById('dossier-modal-content');
  if (!backdrop || !content) return;

  AppState.activeDossierId = toolId;
  sfx.play('declassify');

  const isBookmarked = AppState.bookmarks.includes(tool.id);

  content.innerHTML = `
    <div class="space-y-8 font-sans">
      
      <!-- Dossier Classification Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-xs">
        <div class="flex items-center gap-3">
          <span class="px-2.5 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] uppercase tracking-wider font-bold">
            CLASSIFIED // FRONTIER DOSSIER
          </span>
          <span class="text-slate-400">ID: AETHER-DOC-${tool.id.toUpperCase()}</span>
        </div>
        <div class="flex items-center gap-3 text-slate-400">
          <span>VERIFIED: ${tool.verifiedAt}</span>
          <span class="text-[#10b981]">● ${tool.verificationStatus}</span>
        </div>
      </div>

      <!-- Main Profile Hero -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div class="md:col-span-8 space-y-2">
          <div class="font-mono text-xs text-[#00f2fe] uppercase tracking-widest">${tool.developer}</div>
          <h2 class="font-syne font-extrabold text-4xl sm:text-5xl text-white tracking-tight">${tool.name}</h2>
          <div class="font-mono text-xs text-slate-300 font-semibold">${tool.classification}</div>
          <p class="text-sm text-slate-300 leading-relaxed pt-2">${tool.tagline}</p>
        </div>

        <div class="md:col-span-4 flex flex-col gap-2">
          <a href="${tool.officialUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-3 bg-[#00f2fe] text-black font-mono font-bold text-xs uppercase tracking-widest text-center hover:bg-white transition-all flex items-center justify-center gap-2">
            <span>VISIT OFFICIAL PORTAL</span>
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
          <button id="modal-bookmark-toggle" class="w-full py-2.5 bg-[#0a0f18] border border-white/10 hover:border-[#f59e0b] font-mono text-xs text-slate-300 hover:text-[#f59e0b] transition-all flex items-center justify-center gap-2">
            <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'text-[#f59e0b] fill-[#f59e0b]' : ''}"></i>
            <span>${isBookmarked ? 'REMOVE FROM PINNED' : 'PIN TO OBSERVATORY'}</span>
          </button>
        </div>
      </div>

      <!-- Core Technical Specifications Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-[#06090e] border border-white/10 font-mono text-xs">
        <div>
          <div class="text-slate-500 text-[10px] uppercase">Core Engine</div>
          <div class="text-white font-bold mt-0.5">${tool.specs.coreModel}</div>
        </div>
        <div>
          <div class="text-slate-500 text-[10px] uppercase">Context Window</div>
          <div class="text-[#00f2fe] font-bold mt-0.5">${tool.specs.contextWindow}</div>
        </div>
        <div>
          <div class="text-slate-500 text-[10px] uppercase">Modalities</div>
          <div class="text-white font-bold mt-0.5">${tool.specs.modalities}</div>
        </div>
        <div>
          <div class="text-slate-500 text-[10px] uppercase">Developer HQ</div>
          <div class="text-white font-bold mt-0.5">${tool.specs.developer}</div>
        </div>
        <div>
          <div class="text-slate-500 text-[10px] uppercase">Release Epoch</div>
          <div class="text-white font-bold mt-0.5">${tool.specs.release}</div>
        </div>
        <div>
          <div class="text-slate-500 text-[10px] uppercase">API Availability</div>
          <div class="text-[#10b981] font-bold mt-0.5">${tool.specs.apiAvailable}</div>
        </div>
      </div>

      <!-- Signature SIGNAL vs NOISE Deep Dive -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- SIGNAL PANEL -->
        <div class="p-5 bg-[#0a0f18] border border-[#10b981]/30 rounded-sm space-y-3">
          <div class="font-mono text-xs font-bold text-[#10b981] uppercase tracking-widest flex items-center gap-2">
            <i data-lucide="zap" class="w-4 h-4"></i>
            <span>HIGH-LEVERAGE SIGNALS</span>
          </div>
          <ul class="space-y-2 text-xs text-slate-200">
            ${tool.signal.map(s => `
              <li class="flex items-start gap-2">
                <span class="text-[#10b981] font-bold mt-0.5">✓</span>
                <span>${s}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- NOISE PANEL -->
        <div class="p-5 bg-[#0a0f18] border border-[#f59e0b]/30 rounded-sm space-y-3">
          <div class="font-mono text-xs font-bold text-[#f59e0b] uppercase tracking-widest flex items-center gap-2">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
            <span>LIMITATIONS & NOISE VECTORS</span>
          </div>
          <ul class="space-y-2 text-xs text-slate-400">
            ${tool.noise.map(n => `
              <li class="flex items-start gap-2">
                <span class="text-[#f59e0b] font-bold mt-0.5">!</span>
                <span>${n}</span>
              </li>
            `).join('')}
          </ul>
        </div>

      </div>

      <!-- What It Does Grid -->
      <div class="space-y-4">
        <h3 class="font-syne font-bold text-xl text-white flex items-center gap-2">
          <i data-lucide="cpu" class="w-5 h-5 text-[#00f2fe]"></i>
          <span>CAPABILITY MATRIX & FUNCTIONS</span>
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${tool.whatItDoes.map(feat => `
            <div class="p-4 bg-[#0a0f18] border border-white/10 rounded-sm space-y-1">
              <div class="font-mono text-xs font-bold text-white flex items-center gap-2">
                <i data-lucide="${feat.icon || 'check'}" class="w-4 h-4 text-[#00f2fe]"></i>
                <span>${feat.title}</span>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">${feat.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Verified Pricing Tiers -->
      <div class="space-y-4 pt-4 border-t border-white/10">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 class="font-syne font-bold text-xl text-white flex items-center gap-2">
            <i data-lucide="credit-card" class="w-5 h-5 text-[#10b981]"></i>
            <span>VERIFIED PRICING TIERS</span>
          </h3>
          <div class="font-mono text-[10px] text-slate-500">${tool.pricing.disclaimer}</div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${tool.pricing.tiers.map(tier => `
            <div class="p-4 bg-[#0a0f18] border border-white/10 rounded-sm space-y-2">
              <div class="font-syne font-bold text-sm text-white">${tier.name}</div>
              <div class="font-mono font-bold text-xl text-[#00f2fe]">${tier.price}</div>
              <p class="text-xs text-slate-400 leading-snug">${tier.desc}</p>
              <ul class="pt-2 border-t border-white/5 space-y-1 font-mono text-[10px] text-slate-400">
                ${tier.features.map(f => `<li class="flex items-center gap-1.5"><span class="text-[#00f2fe]">›</span> ${f}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  backdrop.classList.add('open');
  lucide.createIcons();

  // Attach modal bookmark toggle
  const modalBm = document.getElementById('modal-bookmark-toggle');
  if (modalBm) {
    modalBm.addEventListener('click', () => {
      toggleBookmark(tool.id);
      openDossierModal(tool.id); // Refresh modal view
    });
  }
}

function closeDossierModal() {
  const backdrop = document.getElementById('dossier-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    AppState.activeDossierId = null;
  }
}

// ==========================================================================
// AETHER COMMAND PALETTE CONTROLLER (CTRL + K / '/')
// ==========================================================================
function initCommandPalette() {
  const backdrop = document.getElementById('command-palette-backdrop');
  const input = document.getElementById('command-input');
  const triggerBtn = document.getElementById('cmd-palette-btn');

  if (!backdrop || !input) return;

  function openPalette() {
    AppState.isCommandPaletteOpen = true;
    backdrop.classList.add('open');
    input.value = '';
    AppState.selectedCommandIndex = 0;
    renderCommandResults('');
    sfx.play('warp');
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    AppState.isCommandPaletteOpen = false;
    backdrop.classList.remove('open');
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openPalette);
  }

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (AppState.isCommandPaletteOpen) closePalette();
      else openPalette();
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openPalette();
    } else if (e.key === 'Escape') {
      if (AppState.isCommandPaletteOpen) closePalette();
      if (AppState.activeDossierId) closeDossierModal();
      closeBookmarksDrawer();
    }
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  input.addEventListener('input', (e) => {
    AppState.selectedCommandIndex = 0;
    renderCommandResults(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    const items = document.querySelectorAll('.command-result-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      AppState.selectedCommandIndex = (AppState.selectedCommandIndex + 1) % items.length;
      updateCommandSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      AppState.selectedCommandIndex = (AppState.selectedCommandIndex - 1 + items.length) % items.length;
      updateCommandSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = items[AppState.selectedCommandIndex];
      if (selected) selected.click();
    }
  });
}

function updateCommandSelection(items) {
  items.forEach((item, i) => {
    if (i === AppState.selectedCommandIndex) {
      item.classList.add('bg-[#00f2fe]/15', 'text-[#00f2fe]');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('bg-[#00f2fe]/15', 'text-[#00f2fe]');
    }
  });
}

function renderCommandResults(query) {
  const container = document.getElementById('command-results-list');
  if (!container) return;

  const q = query.toLowerCase().trim();
  container.innerHTML = '';

  let results = [];

  // Match Tools
  AI_TOOLS.forEach(tool => {
    if (q === '' || tool.name.toLowerCase().includes(q) || tool.developer.toLowerCase().includes(q) || tool.classification.toLowerCase().includes(q)) {
      results.push({
        type: 'TOOL DOSSIER',
        title: tool.name,
        subtitle: `${tool.developer} • ${tool.specs.coreModel}`,
        action: () => {
          document.getElementById('command-palette-backdrop').classList.remove('open');
          openDossierModal(tool.id);
        }
      });
    }
  });

  // Match Intents
  AI_INTENTS.forEach(intent => {
    if (q !== '' && (intent.label.toLowerCase().includes(q) || intent.prompt.toLowerCase().includes(q))) {
      results.push({
        type: 'INTENT VECTOR',
        title: intent.label,
        subtitle: intent.prompt,
        action: () => {
          document.getElementById('command-palette-backdrop').classList.remove('open');
          AppState.activeIntent = intent.id;
          updateIntentChips();
          renderCatalog();
          document.getElementById('intent-matrix').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // Match Reports
  INTELLIGENCE_REPORTS.forEach(report => {
    if (q !== '' && (report.title.toLowerCase().includes(q) || report.category.toLowerCase().includes(q))) {
      results.push({
        type: 'RESEARCH DISPATCH',
        title: report.title,
        subtitle: `${report.number} • ${report.category}`,
        action: () => {
          document.getElementById('command-palette-backdrop').classList.remove('open');
          openReportModal(report);
        }
      });
    }
  });

  if (results.length === 0) {
    container.innerHTML = '<div class="p-6 text-center text-slate-500 font-mono">NO ALIGNED SIGNALS LOCATED</div>';
    return;
  }

  results.slice(0, 8).forEach((res, i) => {
    const item = document.createElement('div');
    item.className = `command-result-item p-3 rounded-sm flex items-center justify-between cursor-pointer transition-all ${i === AppState.selectedCommandIndex ? 'bg-[#00f2fe]/15 text-[#00f2fe]' : 'hover:bg-white/5 text-slate-200'}`;
    
    item.innerHTML = `
      <div>
        <div class="font-syne font-bold text-sm">${res.title}</div>
        <div class="font-mono text-[10px] text-slate-400 mt-0.5">${res.subtitle}</div>
      </div>
      <span class="font-mono text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 uppercase text-slate-400">
        ${res.type}
      </span>
    `;

    item.addEventListener('click', () => {
      sfx.play('click');
      res.action();
    });

    container.appendChild(item);
  });
}

// ==========================================================================
// BOOKMARKS DRAWER CONTROLLER
// ==========================================================================
function initBookmarksDrawer() {
  const drawer = document.getElementById('bookmarks-drawer');
  const overlay = document.getElementById('bookmarks-overlay');
  const triggerBtn = document.getElementById('bookmarks-trigger-btn');
  const closeBtn = document.getElementById('bookmarks-close-btn');
  const clearBtn = document.getElementById('bookmarks-clear-btn');

  function openDrawer() {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
    renderBookmarksList();
    sfx.play('signal');
  }

  function closeDrawer() {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      AppState.bookmarks = [];
      localStorage.setItem('aether_bookmarks', JSON.stringify([]));
      updateBookmarksBadge();
      renderBookmarksList();
      renderCatalog();
      showToast('Cleared all pinned intelligence', 'info');
    });
  }

  updateBookmarksBadge();
}

function closeBookmarksDrawer() {
  const drawer = document.getElementById('bookmarks-drawer');
  const overlay = document.getElementById('bookmarks-overlay');
  if (drawer && overlay) {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  }
}

function renderBookmarksList() {
  const container = document.getElementById('bookmarks-list-container');
  if (!container) return;

  container.innerHTML = '';

  if (AppState.bookmarks.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-500 font-mono text-xs">
        <i data-lucide="bookmark" class="w-8 h-8 mx-auto mb-2 opacity-40"></i>
        <div>NO PINNED SYSTEMS</div>
        <p class="text-[10px] text-slate-600 mt-1">Pin intelligence dossiers for instant retrieval.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  AppState.bookmarks.forEach(toolId => {
    const tool = AI_TOOLS.find(t => t.id === toolId);
    if (!tool) return;

    const item = document.createElement('div');
    item.className = 'p-3 bg-[#06090e] border border-white/10 rounded-sm flex items-center justify-between gap-3';

    item.innerHTML = `
      <div class="flex-1 cursor-pointer" onclick="openDossierModal('${tool.id}'); closeBookmarksDrawer();">
        <div class="font-syne font-bold text-sm text-white hover:text-[#00f2fe] transition-colors">${tool.name}</div>
        <div class="font-mono text-[10px] text-slate-400">${tool.developer} • ${tool.specs.contextWindow}</div>
      </div>
      <div class="flex items-center gap-1">
        <button class="p-1.5 hover:text-[#00f2fe] text-slate-400 transition-colors" onclick="openDossierModal('${tool.id}'); closeBookmarksDrawer();" title="Open Dossier">
          <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
        </button>
        <button class="p-1.5 hover:text-[#ef4444] text-slate-400 transition-colors" onclick="toggleBookmark('${tool.id}');" title="Remove Pin">
          <i data-lucide="x" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    `;

    container.appendChild(item);
  });

  lucide.createIcons();
}

// ==========================================================================
// SEARCH & SORT CATALOG CONTROLLERS
// ==========================================================================
function initCatalogFilters() {
  const searchInput = document.getElementById('catalog-search-input');
  const sortSelect = document.getElementById('catalog-sort-select');
  const resetBtn = document.getElementById('catalog-reset-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      sfx.play('click');
      renderCatalog();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      AppState.activeIntent = 'intent-all';
      AppState.activeCategory = 'all';
      AppState.searchQuery = '';
      if (searchInput) searchInput.value = '';
      updateIntentChips();
      renderCatalog();
    });
  }
}

// Sound Toggle Button
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  const icon = document.getElementById('sound-icon');
  if (!btn || !icon) return;

  function updateIcon() {
    if (AppState.soundEnabled) {
      icon.setAttribute('data-lucide', 'volume-2');
      btn.classList.add('text-[#00f2fe]');
    } else {
      icon.setAttribute('data-lucide', 'volume-x');
      btn.classList.remove('text-[#00f2fe]');
    }
    lucide.createIcons();
  }

  btn.addEventListener('click', () => {
    AppState.soundEnabled = !AppState.soundEnabled;
    localStorage.setItem('aether_sound', AppState.soundEnabled);
    updateIcon();
    if (AppState.soundEnabled) sfx.play('signal');
    showToast(AppState.soundEnabled ? 'Acoustic UI Feedback: ACTIVE' : 'Acoustic UI Feedback: MUTED', 'info');
  });

  updateIcon();
}

// Close Dossier Modal Handler
function initDossierModalControls() {
  const closeBtn = document.getElementById('dossier-close-btn');
  const backdrop = document.getElementById('dossier-modal-backdrop');

  if (closeBtn) closeBtn.addEventListener('click', closeDossierModal);
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDossierModal();
    });
  }
}

// ==========================================================================
// APPLICATION INITIALIZATION ENTRY POINT
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initHardwareCursor();
  initNeuralCanvas();
  renderAIUniverse();
  initIntentMatrix();
  initCatalogFilters();
  renderCatalog();
  initAIArena();
  renderEvolutionContinuum();
  renderIntelligenceReports();
  initCommandPalette();
  initBookmarksDrawer();
  initSoundToggle();
  initDossierModalControls();

  // Create all lucide icons
  lucide.createIcons();
});
