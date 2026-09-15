/**
 * THE NEXT INTERNET — IT IN 2030
 * Page 02: WHAT IF IT DISAPPEARED? (Degradation & Hidden Infrastructure)
 * Architectural Blueprint Logic & Failure Cascade
 */

(function () {
  'use strict';

  let isITActive = true;

  const masterToggle = document.getElementById('masterToggle');
  const toggleStatus = document.getElementById('toggleStatus');
  const progressionSteps = document.querySelectorAll('.progression-step');
  const dependencyCards = document.querySelectorAll('.stack-layer-card');
  const infraNodes = document.querySelectorAll('.infra-card');
  const infraDetailView = document.getElementById('infraDetailView');

  function initPage2() {
    setupMasterToggle();
    setupDependencyStack();
    setupHiddenInfrastructure();
  }

  // =========================================================================
  // 1. MASTER IT [ON / OFF] MINIMAL TOGGLE & DEGRADATION
  // =========================================================================

  function setupMasterToggle() {
    if (!masterToggle) return;

    masterToggle.addEventListener('click', () => {
      isITActive = !isITActive;
      applyITState(isITActive);
    });
  }

  function applyITState(active) {
    if (active) {
      document.body.classList.remove('state-degraded');
      masterToggle.classList.remove('state-off');
      if (toggleStatus) toggleStatus.textContent = 'ON';
      if (window.soundEngine) window.soundEngine.playRestoreChime();
      updateProgressionStep('CONNECTED');
    } else {
      document.body.classList.add('state-degraded');
      masterToggle.classList.add('state-off');
      if (toggleStatus) toggleStatus.textContent = 'OFF';
      if (window.soundEngine) window.soundEngine.playDegradeAlarm();
      simulateDegradationCascade();
    }
  }

  function updateProgressionStep(stepName) {
    progressionSteps.forEach(step => {
      const stepData = step.getAttribute('data-step');
      if (stepData === stepName) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  function simulateDegradationCascade() {
    updateProgressionStep('FRAGMENTED');

    setTimeout(() => {
      if (!isITActive) updateProgressionStep('MANUAL');
    }, 500);

    setTimeout(() => {
      if (!isITActive) updateProgressionStep('DISCONNECTED');
    }, 1100);
  }

  // =========================================================================
  // 2. HOW DEEP IS IT? (9-LAYER DEPENDENCY BLUEPRINT)
  // =========================================================================

  function setupDependencyStack() {
    dependencyCards.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        highlightLayer(index);
        if (window.soundEngine) window.soundEngine.playClick();
      });

      card.addEventListener('mouseleave', () => {
        clearHighlights();
      });
    });
  }

  function highlightLayer(targetIdx) {
    dependencyCards.forEach((card, idx) => {
      if (idx === targetIdx) {
        card.classList.add('highlighted');
      } else if (idx > targetIdx) {
        card.style.opacity = '1';
        card.style.borderColor = 'var(--cobalt-primary)';
      } else {
        card.style.opacity = '0.35';
        card.style.borderColor = 'var(--border-solid)';
      }
    });
  }

  function clearHighlights() {
    dependencyCards.forEach(card => {
      card.classList.remove('highlighted');
      card.style.opacity = '1';
      card.style.borderColor = 'var(--border-solid)';
    });
  }

  // =========================================================================
  // 3. THE HIDDEN INFRASTRUCTURE (ARCHITECTURAL BLUEPRINT)
  // =========================================================================

  const infraDetails = {
    subsea: {
      title: 'Subsea Fiber-Optic Arteries',
      role: 'Intercontinental Data Backbones',
      metrics: '550+ Active Cables // 1.4M+ Kilometers // 99.4% Global Internet Traffic',
      arch: 'Transoceanic armored glass cables carrying DWDM (Dense Wavelength Division Multiplexing) laser signals powered by high-voltage repeaters every 70km on the ocean floor.',
      vulnerability: 'Physical ship anchor drags, seismic undersea landslides, and single points of landing-station failure.'
    },
    datacenters: {
      title: 'Hyperscale Data Centers',
      role: 'Industrialized Compute & Memory Pools',
      metrics: 'Tier-IV Redundancy // 99.995% Uptime SLA // 40-100MW Power Envelopes',
      arch: 'Massive climate-controlled server halls with dual-bus uninterruptible power supplies (UPS), backup diesel turbine generators, closed-loop evaporative water cooling, and biometrics.',
      vulnerability: 'Municipal grid blackout, regional water depletion, cryogenic cooling circuit failure.'
    },
    bgp: {
      title: 'BGP Routing & Anycast Root DNS',
      role: 'Global Autonomous System (AS) Peering',
      metrics: '95,000+ AS Networks // 13 Root DNS Identifiers // 1,000,000+ BGP Routes',
      arch: 'Decentralized routing protocol enabling independent telecommunications backbones to dynamically calculate shortest autonomous path hops across the globe.',
      vulnerability: 'Route hijacking, misconfiguration blackholing, malicious route leaks.'
    },
    databases: {
      title: 'Distributed Consensus Databases',
      role: 'Atomic State & Transaction Truth',
      metrics: 'Raft / Paxos Quorum // ACID Multi-Region // Nanosecond TrueTime',
      arch: 'Globally replicated state machines that guarantee atomic transaction consistency across multi-continental nodes using atomic clocks and consensus quorums.',
      vulnerability: 'Network split-brain partitions, quorum loss under fiber cut, data corruption cascades.'
    },
    hsm: {
      title: 'Hardware Security Modules (HSM)',
      role: 'Root of Cryptographic Trust',
      metrics: 'FIPS 140-3 Level 4 // Physical Tamper-Zeroization // PKI Roots',
      arch: 'Hardened cryptographic coprocessors that generate, store, and execute digital signature operations for root certificates without allowing secret keys to leak into system memory.',
      vulnerability: 'Cryptographic algorithm break via Shor algorithm (mitigated by Post-Quantum lattice transition).'
    },
    inference: {
      title: 'Foundation Model Inference Clusters',
      role: 'Real-Time Neural Cognition Fabric',
      metrics: '8x H100/B200 NVLink 3.2TB/s // INT8 Tensor Cores // FP8 Matrix Engines',
      arch: 'Ultra-high-bandwidth computing nodes connected via non-blocking InfiniBand fabrics to execute trillion-parameter neural forward passes with sub-10ms latency.',
      vulnerability: 'Silicon manufacturing concentration, extreme thermal throttling, electrical peak surges.'
    }
  };

  function setupHiddenInfrastructure() {
    infraNodes.forEach(card => {
      card.addEventListener('click', () => {
        infraNodes.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const infraKey = card.getAttribute('data-infra');
        const data = infraDetails[infraKey];
        if (data && infraDetailView) {
          renderInfraDetail(data);
          if (window.soundEngine) window.soundEngine.playNodeSelect();
        }
      });
    });
  }

  function renderInfraDetail(data) {
    infraDetailView.innerHTML = `
      <div class="infra-detail-box" style="background: rgba(18,16,38,0.92); border: 1px solid var(--border-dark); padding: 2rem;">
        <div style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600; color: var(--cobalt-primary); margin-bottom: 0.5rem;">SYS.INFRASTRUCTURE // ARCHITECTURAL DOSSIER</div>
        <h3 style="font-family: var(--font-display); font-size: 1.65rem; font-weight: 700; margin-bottom: 0.25rem;">${data.title}</h3>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; color: #0E9F6E; margin-bottom: 1.5rem;">${data.metrics}</div>
        
        <div style="margin-bottom: 1.5rem;">
          <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; color: var(--text-primary); text-transform: uppercase; margin-bottom: 0.4rem;">Operational Architecture</div>
          <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.65;">${data.arch}</p>
        </div>

        <div>
          <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 600; color: var(--orange-secondary); text-transform: uppercase; margin-bottom: 0.4rem;">Critical Failure Vulnerability</div>
          <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.65;">${data.vulnerability}</p>
        </div>
      </div>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage2);
  } else {
    initPage2();
  }
})();
