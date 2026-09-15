/**
 * THE NEXT INTERNET — IT IN 2030
 * Page 01: IT in 2030 Architectural Systems
 * Rich Deep Navy & Midnight Canvas Renderers
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. HERO ARCHITECTURAL VISUALIZER (DARK NAVY / COBALT / ORANGE / GOLD)
  // =========================================================================

  const heroCanvas = document.getElementById('heroCanvas');
  const heroScrubber = document.getElementById('heroScrubber');
  const scrubberLabels = document.querySelectorAll('.scrubber-labels span');

  let heroCtx = null;
  let scrubberValue = 0;
  let particles = [];

  function initHeroCanvas() {
    if (!heroCanvas) return;
    heroCtx = heroCanvas.getContext('2d');
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    particles = [];
    const count = 55;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: i % 3 === 0 ? '#315CFF' : (i % 3 === 1 ? '#FF6B35' : '#F4B942')
      });
    }

    if (heroScrubber) {
      heroScrubber.addEventListener('input', (e) => {
        scrubberValue = parseFloat(e.target.value);
        updateScrubberLabels(scrubberValue);
        if (window.soundEngine) window.soundEngine.playClick();
      });
    }

    renderHeroScene();
  }

  function resizeHeroCanvas() {
    if (!heroCanvas) return;
    const rect = heroCanvas.getBoundingClientRect();
    heroCanvas.width = rect.width * (window.devicePixelRatio || 1);
    heroCanvas.height = rect.height * (window.devicePixelRatio || 1);
    if (heroCtx) heroCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function updateScrubberLabels(val) {
    scrubberLabels.forEach(label => label.classList.remove('active'));
    if (val < 25) {
      scrubberLabels[0]?.classList.add('active');
    } else if (val < 55) {
      scrubberLabels[1]?.classList.add('active');
    } else if (val < 85) {
      scrubberLabels[2]?.classList.add('active');
    } else {
      scrubberLabels[3]?.classList.add('active');
    }
  }

  function renderHeroScene() {
    if (!heroCanvas || !heroCtx) return;
    const width = heroCanvas.width / (window.devicePixelRatio || 1);
    const height = heroCanvas.height / (window.devicePixelRatio || 1);

    // Deep Navy Canvas Clear
    heroCtx.fillStyle = '#070C16';
    heroCtx.fillRect(0, 0, width, height);

    const stage = scrubberValue / 100;

    heroCtx.save();
    
    // Grid Lines
    heroCtx.strokeStyle = 'rgba(247, 244, 237, 0.05)';
    heroCtx.lineWidth = 1;

    const gridSize = 32;
    for (let x = 0; x < width; x += gridSize) {
      heroCtx.beginPath();
      heroCtx.moveTo(x, 0);
      heroCtx.lineTo(x, height);
      heroCtx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      heroCtx.beginPath();
      heroCtx.moveTo(0, y);
      heroCtx.lineTo(width, y);
      heroCtx.stroke();
    }

    const cx = width / 2;
    const cy = height / 2;
    const t = Date.now() * 0.0014;

    if (stage < 0.3) {
      // WEB: Wireframe browser in Cobalt & White
      const morph = stage / 0.3;
      heroCtx.strokeStyle = '#315CFF';
      heroCtx.lineWidth = 1.5;

      const bw = 180 + morph * 30;
      const bh = 120 + morph * 20;

      heroCtx.strokeRect(cx - bw / 2, cy - bh / 2, bw, bh);

      heroCtx.beginPath();
      heroCtx.moveTo(cx - bw / 2, cy - bh / 2 + 22);
      heroCtx.lineTo(cx + bw / 2, cy - bh / 2 + 22);
      heroCtx.stroke();

      for (let i = 0; i < 3; i++) {
        heroCtx.fillStyle = i === 0 ? '#FF6B35' : (i === 1 ? '#F4B942' : '#315CFF');
        heroCtx.beginPath();
        heroCtx.arc(cx - bw / 2 + 12 + i * 10, cy - bh / 2 + 11, 2.5, 0, Math.PI * 2);
        heroCtx.fill();
      }

      heroCtx.fillStyle = 'rgba(49, 92, 255, 0.25)';
      heroCtx.fillRect(cx - bw / 2 + 16, cy - bh / 2 + 36, bw - 32, 8);
      heroCtx.fillStyle = 'rgba(247, 244, 237, 0.15)';
      heroCtx.fillRect(cx - bw / 2 + 16, cy - bh / 2 + 52, bw - 60, 6);
      heroCtx.fillRect(cx - bw / 2 + 16, cy - bh / 2 + 64, bw - 80, 6);
      heroCtx.fillRect(cx - bw / 2 + 16, cy - bh / 2 + 76, bw - 45, 6);

      heroCtx.fillStyle = '#315CFF';
      heroCtx.font = '600 10px IBM Plex Mono';
      heroCtx.fillText('ERA 01 // STATIC HYPERTEXT (READ)', cx - bw / 2, cy + bh / 2 + 24);

    } else if (stage < 0.7) {
      // AI: Neural topology matrix with Cobalt, Orange, and Gold
      const morph = (stage - 0.3) / 0.4;
      const radius = 85 + Math.sin(t) * 6;

      const nodes = 9;
      const points = [];
      for (let i = 0; i < nodes; i++) {
        const angle = (i / nodes) * Math.PI * 2 + t * 0.4;
        const px = cx + Math.cos(angle) * (radius * (0.6 + Math.sin(t + i) * 0.3));
        const py = cy + Math.sin(angle) * (radius * (0.6 + Math.cos(t + i) * 0.3));
        points.push({ x: px, y: py });
      }

      heroCtx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          heroCtx.strokeStyle = `rgba(49, 92, 255, ${0.15 + morph * 0.35})`;
          heroCtx.beginPath();
          heroCtx.moveTo(points[i].x, points[i].y);
          heroCtx.lineTo(points[j].x, points[j].y);
          heroCtx.stroke();
        }
      }

      points.forEach((p, idx) => {
        heroCtx.fillStyle = idx % 3 === 0 ? '#FF6B35' : (idx % 3 === 1 ? '#F4B942' : '#315CFF');
        heroCtx.beginPath();
        heroCtx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        heroCtx.fill();

        heroCtx.strokeStyle = '#070C16';
        heroCtx.lineWidth = 1.5;
        heroCtx.stroke();
      });

      heroCtx.fillStyle = '#F4B942';
      heroCtx.font = '600 10px IBM Plex Mono';
      heroCtx.fillText('ERA 02 // NEURAL LATENT MATRIX (UNDERSTAND)', cx - 120, cy + radius + 32);

    } else {
      // AGENTS & WORLD: Cyber-Physical globe with orbiting beacons
      const sphereR = 80;

      heroCtx.strokeStyle = 'rgba(49, 92, 255, 0.6)';
      heroCtx.lineWidth = 1.2;

      for (let i = -2; i <= 2; i++) {
        const latY = cy + (i * sphereR) / 2.8;
        const rx = Math.sqrt(Math.max(0, sphereR * sphereR - Math.pow(latY - cy, 2)));
        heroCtx.beginPath();
        heroCtx.ellipse(cx, latY, rx, rx * 0.3, 0, 0, Math.PI * 2);
        heroCtx.stroke();
      }

      heroCtx.strokeStyle = '#F7F4ED';
      heroCtx.lineWidth = 1;
      heroCtx.beginPath();
      heroCtx.ellipse(cx, cy, sphereR * Math.abs(Math.cos(t * 0.6)), sphereR, 0, 0, Math.PI * 2);
      heroCtx.stroke();

      const agentCount = 4;
      for (let i = 0; i < agentCount; i++) {
        const theta = t * 1.1 + (i * Math.PI * 2) / agentCount;
        const ax = cx + Math.cos(theta) * (sphereR + 24);
        const ay = cy + Math.sin(theta) * (sphereR * 0.45);

        heroCtx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
        heroCtx.lineWidth = 1;
        heroCtx.beginPath();
        heroCtx.moveTo(cx, cy);
        heroCtx.lineTo(ax, ay);
        heroCtx.stroke();

        heroCtx.fillStyle = i % 2 === 0 ? '#FF6B35' : '#F4B942';
        heroCtx.beginPath();
        heroCtx.arc(ax, ay, 4, 0, Math.PI * 2);
        heroCtx.fill();

        heroCtx.fillStyle = '#F7F4ED';
        heroCtx.font = '600 8px IBM Plex Mono';
        heroCtx.fillText(`AGT.0${i + 1}`, ax + 6, ay - 3);
      }

      heroCtx.fillStyle = '#FF6B35';
      heroCtx.font = '600 10px IBM Plex Mono';
      heroCtx.fillText('ERA 03 // CYBER-PHYSICAL ACTUATION (ACT)', cx - 120, cy + sphereR + 36);
    }

    // Drifting coordinate particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      heroCtx.fillStyle = p.color;
      heroCtx.globalAlpha = p.alpha;
      heroCtx.beginPath();
      heroCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      heroCtx.fill();
    });
    heroCtx.globalAlpha = 1;

    heroCtx.restore();
    requestAnimationFrame(renderHeroScene);
  }

  // =========================================================================
  // 2. TIMELINE INTERACTION
  // =========================================================================

  const timelineNodes = document.querySelectorAll('.timeline-node');

  function initTimeline() {
    timelineNodes.forEach(node => {
      node.addEventListener('click', () => {
        timelineNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        if (window.soundEngine) window.soundEngine.playNodeSelect();
      });
    });
  }

  // =========================================================================
  // 3. TECHNOLOGY CONSTELLATION (CATEGORIZED COLORS: BLUE/ORANGE/GOLD/WHITE)
  // =========================================================================

  const constellationCanvas = document.getElementById('constellationCanvas');
  const techDossierDrawer = document.getElementById('techDossierDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Categorized tech dataset:
  // INTELLIGENCE = blue (#315CFF)
  // AUTONOMY = orange (#FF6B35)
  // INFRASTRUCTURE = gold (#F4B942)
  // TRUST = white (#F7F4ED)
  const technologies = [
    {
      id: 'AI_AGENTS',
      name: 'AI Agents',
      category: 'AUTONOMY',
      color: '#FF6B35',
      classification: 'EMERGING',
      x: 0.22, y: 0.28,
      connections: ['MULTIMODAL_AI', 'AUTONOMOUS_SYS', 'CYBERSECURITY'],
      tagline: 'Goal-directed software entities with persistent state and tool orchestration',
      protocols: ['MCP (Model Context Protocol)', 'A2A Swarm Protocol', 'LangGraph', 'Function Calling'],
      architecture: 'Perception → Memory Index → Planning Engine → Execution Runtime → Verification Loop',
      details: 'Autonomous software systems capable of decomposing complex goals into sequential sub-tasks, invoking external APIs, handling error states, and completing real-world workflows without step-by-step human intervention.'
    },
    {
      id: 'MULTIMODAL_AI',
      name: 'Multimodal AI',
      category: 'INTELLIGENCE',
      color: '#315CFF',
      classification: 'CURRENT',
      x: 0.38, y: 0.22,
      connections: ['AI_AGENTS', 'SPATIAL_COMPUTING', 'DIGITAL_TWINS'],
      tagline: 'Unified sensory understanding spanning text, audio, high-speed vision, and spatial maps',
      protocols: ['Gemini 2.0 Native Audio/Vision', 'CLIP Encoders', 'Diffusion Transformers', 'WebRTC Stream'],
      architecture: 'Cross-Attention Multimodal Encoders → Unified Latent Tokenizer → Auto-Regressive Diffusion',
      details: 'Models that natively process and interleave audio, image, video, and code tokens simultaneously with sub-100ms conversational latency and omni-directional reasoning.'
    },
    {
      id: 'SPATIAL_COMPUTING',
      name: 'Spatial Computing',
      category: 'INFRASTRUCTURE',
      color: '#F4B942',
      classification: 'EMERGING',
      x: 0.56, y: 0.25,
      connections: ['AR_VR_XR', 'DIGITAL_TWINS', 'EDGE_COMPUTING'],
      tagline: 'Merging digital data with physical geometry through real-time 3D spatial mapping',
      protocols: ['OpenXR', 'WebXR', 'glTF 2.0', 'Spatial Audio API', '6-DOF SLAM Tracking'],
      architecture: 'LiDAR Telemetry → 6-DOF SLAM Tracking → Spatial Anchoring → Occlusion Renderer',
      details: 'Computing interfaces that treat the physical room, factory floor, or city street as the display surface, pinning interactive contextual data directly onto 3D physical coordinates.'
    },
    {
      id: 'AR_VR_XR',
      name: 'AR / VR / XR',
      category: 'INFRASTRUCTURE',
      color: '#F4B942',
      classification: 'CURRENT',
      x: 0.74, y: 0.30,
      connections: ['SPATIAL_COMPUTING', 'DIGITAL_TWINS', 'BCI'],
      tagline: 'High-fidelity sensory immersion and contextual holographic heads-up displays',
      protocols: ['WebXR Device API', 'Vulkan Mobile', 'Direct-to-Eye MicroLED', 'Eye-Tracking Foveation'],
      architecture: 'Foveated Neural Rendering → Asynchronous Time-Warp → Low-Persistence MicroOLED Displays',
      details: 'Wearable optical systems providing continuous ambient contextual overlays, telepresence workspaces, and synthetic training simulators.'
    },
    {
      id: 'ROBOTICS',
      name: 'Robotics',
      category: 'AUTONOMY',
      color: '#FF6B35',
      classification: 'EMERGING',
      x: 0.18, y: 0.52,
      connections: ['AI_AGENTS', 'AUTONOMOUS_SYS', 'IOT', 'EDGE_COMPUTING'],
      tagline: 'Embodied artificial intelligence actuating physical torque, manipulation, and locomotion',
      protocols: ['ROS 2 (Robot OS)', 'DDS Middleware', 'URDF', 'CAN Bus 2.0B', 'EtherCAT'],
      architecture: 'Vision-Language-Action Models (VLA) → Kinematic Solvers → Actuator PD Controllers',
      details: 'Robotic manipulation and mobile platforms driven by multimodal foundation models that translate natural instructions into physical manipulation skills without hardcoded motion routines.'
    },
    {
      id: 'IOT',
      name: 'IoT (Internet of Things)',
      category: 'INFRASTRUCTURE',
      color: '#F4B942',
      classification: 'CURRENT',
      x: 0.32, y: 0.65,
      connections: ['EDGE_COMPUTING', 'DIGITAL_TWINS', 'ROBOTICS'],
      tagline: 'Ambient sensor fabric instrumenting civil infrastructure, power grids, and environments',
      protocols: ['MQTT v5.0', 'CoAP', 'Matter over Thread', 'LoRaWAN', 'BLE 5.4'],
      architecture: 'Micro-Sensors → Microcontroller (ESP32/Zephyr) → Local Mesh Gateway → Telemetry Broker',
      details: 'Ubiquitous low-power silicon embedded in pipes, roads, power lines, and biological systems, continuously streaming atmospheric and physical telemetry.'
    },
    {
      id: 'EDGE_COMPUTING',
      name: 'Edge Computing',
      category: 'INFRASTRUCTURE',
      color: '#F4B942',
      classification: 'CURRENT',
      x: 0.50, y: 0.55,
      connections: ['IOT', 'DIGITAL_TWINS', 'AUTONOMOUS_SYS', 'CYBERSECURITY'],
      tagline: 'Sub-millisecond inference and decision execution located physically on-premise',
      protocols: ['QUIC / HTTP/3', 'K3s Kubernetes', 'ONNX Runtime', 'WebAssembly (WASI)'],
      architecture: 'Edge Micro-Datacenter → NPU Inference Accelerator → Zero-Latency Local Fallback Node',
      details: 'Distributed micro-clusters positioned at cellular base stations and industrial gateways, processing sensor telemetry in single-digit milliseconds without relying on centralized cloud roundtrips.'
    },
    {
      id: 'DIGITAL_TWINS',
      name: 'Digital Twins',
      category: 'INTELLIGENCE',
      color: '#315CFF',
      classification: 'EMERGING',
      x: 0.68, y: 0.58,
      connections: ['IOT', 'EDGE_COMPUTING', 'SPATIAL_COMPUTING', 'AI_AGENTS'],
      tagline: 'Live, physics-accurate computational simulations synchronizing with real physical assets',
      protocols: ['OpenUSD', 'OPC UA', 'MQTT Sparkplug B', 'Physics Engine API'],
      architecture: 'Real-Time Sensor Ingestion → Physics Simulation Solver → Discrepancy Detector → Actuation',
      details: 'Virtual clones of wind turbines, hospital wards, factories, or municipal storm drainage systems that run predictive simulations hours ahead of physical reality.'
    },
    {
      id: 'AUTONOMOUS_SYS',
      name: 'Autonomous Systems',
      category: 'AUTONOMY',
      color: '#FF6B35',
      classification: 'EMERGING',
      x: 0.82, y: 0.52,
      connections: ['ROBOTICS', 'AI_AGENTS', 'EDGE_COMPUTING', 'CYBERSECURITY'],
      tagline: 'Self-regulating vehicular, industrial, and electrical grids operating with closed-loop governance',
      protocols: ['V2X (Vehicle-to-Everything)', 'ISO 26262 ASIL-D', 'Time-Sensitive Networking (TSN)'],
      architecture: 'Sensor Fusion (Radar/Camera/LiDAR) → World Model → Path Planner → Fail-Operational Drive-by-Wire',
      details: 'Closed-loop machines capable of dynamic obstacle avoidance, automatic power rerouting, and self-healing operations under unpredictable environmental disturbances.'
    },
    {
      id: 'QUANTUM_COMPUTING',
      name: 'Quantum Computing',
      category: 'INTELLIGENCE',
      color: '#315CFF',
      classification: 'RESEARCH',
      x: 0.28, y: 0.82,
      connections: ['CYBERSECURITY', 'AI_AGENTS'],
      tagline: 'Qubit superposition and entanglement solving combinatorial optimization and material physics',
      protocols: ['QASM 3.0', 'Qiskit Runtime', 'Post-Quantum Cryptography (NIST FIPS 203/204)'],
      architecture: 'Dilution Refrigerator (<15mK) → Transmon Qubit Array → Microwave Pulse Control → Error Correction (Surface Code)',
      details: 'Specialized computing clusters executing quantum algorithms for molecular drug discovery, battery chemical simulations, and logistics routing beyond classical supercomputers.'
    },
    {
      id: 'BCI',
      name: 'Brain-Computer Interfaces',
      category: 'INTELLIGENCE',
      color: '#315CFF',
      classification: 'RESEARCH',
      x: 0.52, y: 0.85,
      connections: ['AR_VR_XR', 'CYBERSECURITY'],
      tagline: 'Direct bidirectional neural interfaces translating motor cortex intent into digital commands',
      protocols: ['Lab Streaming Layer (LSL)', 'Ultra-Low Power Neural Telemetry', 'Spike Sorting Engine'],
      architecture: 'Biocompatible Micro-Electrode Array → Sub-dural Signal Amplifier → Spike Classifier → Neural Decoder',
      details: 'High-bandwidth non-invasive and minimally invasive neural implants enabling speech synthesis for locked-in patients and frictionless intentional control of assistive robotics.'
    },
    {
      id: 'CYBERSECURITY',
      name: 'Cybersecurity & Post-Quantum',
      category: 'TRUST',
      color: '#F7F4ED',
      classification: 'CURRENT',
      x: 0.72, y: 0.82,
      connections: ['QUANTUM_COMPUTING', 'EDGE_COMPUTING', 'AI_AGENTS', 'AUTONOMOUS_SYS'],
      tagline: 'Cryptographic zero-trust architecture, automated threat hunting, and post-quantum lattices',
      protocols: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'eBPF Kernel Probing', 'Zero-Trust SPIFFE/SPIRE'],
      architecture: 'Continuous Identity Attestation → Hardware Root of Trust (TPM/HSM) → Agentic Threat Containment',
      details: 'Self-defending digital immunology systems that continuously attest memory integrity, isolate compromised container micro-segments, and deploy lattice-based cryptography immune to quantum decryption.'
    }
  ];

  let activeFilter = 'ALL';
  let hoveredNode = null;
  let selectedNode = null;
  let constellationCtx = null;

  function initConstellation() {
    if (!constellationCanvas) return;
    constellationCtx = constellationCanvas.getContext('2d');
    resizeConstellationCanvas();
    window.addEventListener('resize', resizeConstellationCanvas);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'ALL';
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });

    constellationCanvas.addEventListener('mousemove', handleConstellationMouseMove);
    constellationCanvas.addEventListener('click', handleConstellationClick);

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDossierDrawer);
    }

    renderConstellationScene();
  }

  function resizeConstellationCanvas() {
    if (!constellationCanvas) return;
    const rect = constellationCanvas.getBoundingClientRect();
    constellationCanvas.width = rect.width * (window.devicePixelRatio || 1);
    constellationCanvas.height = rect.height * (window.devicePixelRatio || 1);
    if (constellationCtx) constellationCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function handleConstellationMouseMove(e) {
    const rect = constellationCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    let found = null;
    technologies.forEach(tech => {
      const tx = tech.x * width;
      const ty = tech.y * height;
      const dist = Math.hypot(mx - tx, my - ty);
      if (dist < 26) {
        found = tech;
      }
    });

    if (found !== hoveredNode) {
      hoveredNode = found;
      constellationCanvas.style.cursor = found ? 'pointer' : 'default';
      if (found && window.soundEngine) window.soundEngine.playClick();
    }
  }

  function handleConstellationClick() {
    if (hoveredNode) {
      selectedNode = hoveredNode;
      openDossierDrawer(hoveredNode);
      if (window.soundEngine) window.soundEngine.playNodeSelect();
    }
  }

  function openDossierDrawer(tech) {
    if (!techDossierDrawer) return;

    document.getElementById('dossierId').textContent = `SYS.TECH // ${tech.id}`;
    document.getElementById('dossierTitle').textContent = tech.name;

    const maturityBadge = document.getElementById('dossierMaturity');
    maturityBadge.textContent = tech.classification;
    maturityBadge.className = `class-tag class-${tech.classification.toLowerCase().replace(' ', '-')}`;

    document.getElementById('dossierTagline').textContent = `“${tech.tagline}”`;
    document.getElementById('dossierDesc').textContent = tech.details;
    document.getElementById('dossierArch').textContent = tech.architecture;

    const protocolsContainer = document.getElementById('dossierProtocols');
    protocolsContainer.innerHTML = '';
    tech.protocols.forEach(p => {
      const chip = document.createElement('span');
      chip.className = 'protocol-chip';
      chip.textContent = p;
      protocolsContainer.appendChild(chip);
    });

    techDossierDrawer.classList.add('active');
  }

  function closeDossierDrawer() {
    if (techDossierDrawer) {
      techDossierDrawer.classList.remove('active');
      selectedNode = null;
    }
  }

  function renderConstellationScene() {
    if (!constellationCanvas || !constellationCtx) return;
    const rect = constellationCanvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Deep Midnight Clear
    constellationCtx.fillStyle = '#0B1220';
    constellationCtx.fillRect(0, 0, width, height);

    // Blue coordinate grid
    constellationCtx.strokeStyle = 'rgba(49, 92, 255, 0.08)';
    constellationCtx.lineWidth = 1;
    const step = 44;
    for (let x = 0; x < width; x += step) {
      constellationCtx.beginPath();
      constellationCtx.moveTo(x, 0);
      constellationCtx.lineTo(x, height);
      constellationCtx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      constellationCtx.beginPath();
      constellationCtx.moveTo(0, y);
      constellationCtx.lineTo(width, y);
      constellationCtx.stroke();
    }

    // Central Node: IT 2030 in Cobalt and Gold
    const cx = width / 2;
    const cy = height / 2;
    constellationCtx.fillStyle = '#111C32';
    constellationCtx.strokeStyle = '#315CFF';
    constellationCtx.lineWidth = 2;
    constellationCtx.fillRect(cx - 50, cy - 18, 100, 36);
    constellationCtx.strokeRect(cx - 50, cy - 18, 100, 36);

    constellationCtx.fillStyle = '#F4B942';
    constellationCtx.font = '700 12px Space Grotesk';
    constellationCtx.textAlign = 'center';
    constellationCtx.fillText('IT 2030', cx, cy + 4);
    constellationCtx.textAlign = 'left';

    const visibleTechs = technologies.filter(tech => {
      if (activeFilter === 'ALL') return true;
      return tech.classification.toUpperCase().includes(activeFilter.toUpperCase());
    });

    const now = Date.now() * 0.0018;

    // Draw connecting edges with pulse points
    visibleTechs.forEach(t1 => {
      t1.connections.forEach(connId => {
        const t2 = visibleTechs.find(item => item.id === connId);
        if (t2) {
          const x1 = t1.x * width;
          const y1 = t1.y * height;
          const x2 = t2.x * width;
          const y2 = t2.y * height;

          const isHighlighted = (hoveredNode && (hoveredNode.id === t1.id || hoveredNode.id === t2.id));
          constellationCtx.strokeStyle = isHighlighted ? '#315CFF' : 'rgba(247, 244, 237, 0.12)';
          constellationCtx.lineWidth = isHighlighted ? 1.5 : 1;
          constellationCtx.beginPath();
          constellationCtx.moveTo(x1, y1);
          constellationCtx.lineTo(x2, y2);
          constellationCtx.stroke();

          // Animated pulse point on active lines
          if (isHighlighted) {
            const progress = (now * 1.5) % 1;
            const px = x1 + (x2 - x1) * progress;
            const py = y1 + (y2 - y1) * progress;
            constellationCtx.fillStyle = '#FF6B35';
            constellationCtx.beginPath();
            constellationCtx.arc(px, py, 3, 0, Math.PI * 2);
            constellationCtx.fill();
          }
        }
      });
    });

    // Draw nodes with rich category colors
    visibleTechs.forEach(tech => {
      const tx = tech.x * width;
      const ty = tech.y * height;
      const isHovered = hoveredNode && hoveredNode.id === tech.id;
      const isSelected = selectedNode && selectedNode.id === tech.id;

      const nodeColor = tech.color;

      if (isHovered || isSelected) {
        constellationCtx.strokeStyle = nodeColor;
        constellationCtx.lineWidth = 2;
        constellationCtx.beginPath();
        constellationCtx.arc(tx, ty, 16, 0, Math.PI * 2);
        constellationCtx.stroke();
      }

      constellationCtx.fillStyle = isHovered ? nodeColor : '#111C32';
      constellationCtx.strokeStyle = nodeColor;
      constellationCtx.lineWidth = 2.5;

      constellationCtx.beginPath();
      constellationCtx.arc(tx, ty, isHovered ? 8 : 6, 0, Math.PI * 2);
      constellationCtx.fill();
      constellationCtx.stroke();

      constellationCtx.fillStyle = isHovered ? '#FFFFFF' : '#F7F4ED';
      constellationCtx.font = `${isHovered ? '700' : '600'} 11px Space Grotesk`;
      constellationCtx.fillText(tech.name, tx + 14, ty + 4);

      if (isHovered) {
        constellationCtx.fillStyle = nodeColor;
        constellationCtx.font = '600 8px IBM Plex Mono';
        constellationCtx.fillText(`[${tech.category} // ${tech.classification}]`, tx + 14, ty + 16);
      }
    });

    requestAnimationFrame(renderConstellationScene);
  }

  // =========================================================================
  // 4. BUILD YOUR 2030 SYSTEM ENGINE
  // =========================================================================

  const pillarCards = document.querySelectorAll('.pillar-toggle-card');
  const pipelineNodes = {
    sense: document.getElementById('pipeSense'),
    understand: document.getElementById('pipeUnderstand'),
    predict: document.getElementById('pipePredict'),
    decide: document.getElementById('pipeDecide'),
    act: document.getElementById('pipeAct')
  };
  const arrows = {
    a1: document.getElementById('arrow1'),
    a2: document.getElementById('arrow2'),
    a3: document.getElementById('arrow3'),
    a4: document.getElementById('arrow4')
  };

  const metricLatency = document.getElementById('metricLatency');
  const metricAutonomy = document.getElementById('metricAutonomy');
  const metricEfficiency = document.getElementById('metricEfficiency');
  const metricThroughput = document.getElementById('metricThroughput');
  const terminalFeed = document.getElementById('terminalFeed');

  const activePillars = new Set(['ai', 'iot']);

  function initSystemEngine() {
    pillarCards.forEach(card => {
      const pillarKey = card.getAttribute('data-pillar');
      if (activePillars.has(pillarKey)) {
        card.classList.add('active');
      }

      card.addEventListener('click', () => {
        if (activePillars.has(pillarKey)) {
          activePillars.delete(pillarKey);
          card.classList.remove('active');
          if (window.soundEngine) window.soundEngine.playPillarToggle(false);
          logTerminal(`DE-ALLOCATED PILLAR: [${pillarKey.toUpperCase()}]`);
        } else {
          activePillars.add(pillarKey);
          card.classList.add('active');
          if (window.soundEngine) window.soundEngine.playPillarToggle(true);
          logTerminal(`ALLOCATED PILLAR: [${pillarKey.toUpperCase()}] -> SYNCHRONIZING BUS`);
        }
        recalculateEngineState();
      });
    });

    recalculateEngineState();
  }

  function recalculateEngineState() {
    const hasAI = activePillars.has('ai');
    const hasIoT = activePillars.has('iot');
    const hasEdge = activePillars.has('edge');
    const hasRobotics = activePillars.has('robotics');
    const hasSpatial = activePillars.has('spatial');
    const hasTwins = activePillars.has('twins');

    const isSenseActive = hasIoT || hasSpatial;
    const isUnderstandActive = hasAI || hasTwins;
    const isPredictActive = hasAI && (hasTwins || hasEdge);
    const isDecideActive = hasAI && (hasEdge || hasRobotics);
    const isActActive = hasRobotics || (hasEdge && hasIoT);

    setNodeActive(pipelineNodes.sense, isSenseActive);
    setNodeActive(pipelineNodes.understand, isUnderstandActive);
    setNodeActive(pipelineNodes.predict, isPredictActive);
    setNodeActive(pipelineNodes.decide, isDecideActive);
    setNodeActive(pipelineNodes.act, isActActive);

    setArrowActive(arrows.a1, isSenseActive && isUnderstandActive);
    setArrowActive(arrows.a2, isUnderstandActive && isPredictActive);
    setArrowActive(arrows.a3, isPredictActive && isDecideActive);
    setArrowActive(arrows.a4, isDecideActive && isActActive);

    let latency = 240;
    if (hasEdge) latency -= 180;
    if (hasIoT) latency -= 20;
    if (hasRobotics && !hasEdge) latency += 50;
    if (latency < 4) latency = 4;

    let autonomyLevel = 'L0 (MANUAL)';
    const count = activePillars.size;
    if (count === 1) autonomyLevel = 'L1 (ASSISTED)';
    else if (count === 2) autonomyLevel = 'L2 (PARTIAL)';
    else if (count === 3) autonomyLevel = 'L3 (CONDITIONAL)';
    else if (count >= 4 && count < 6) autonomyLevel = 'L4 (HIGH AUTO)';
    else if (count === 6) autonomyLevel = 'L5 (AMBIENT)';

    let efficiency = (count * 16.4 + (hasEdge ? 24 : 0)).toFixed(1);
    let throughput = (count * 4.8 + (hasAI ? 12.5 : 0)).toFixed(1);

    if (metricLatency) metricLatency.innerHTML = `${latency}<span class="metric-unit">ms</span>`;
    if (metricAutonomy) metricAutonomy.innerHTML = `${autonomyLevel}`;
    if (metricEfficiency) metricEfficiency.innerHTML = `${efficiency}<span class="metric-unit">TOPS/W</span>`;
    if (metricThroughput) metricThroughput.innerHTML = `${throughput}<span class="metric-unit">GB/s</span>`;
  }

  function setNodeActive(nodeEl, active) {
    if (!nodeEl) return;
    if (active) nodeEl.classList.add('active');
    else nodeEl.classList.remove('active');
  }

  function setArrowActive(arrowEl, active) {
    if (!arrowEl) return;
    if (active) arrowEl.classList.add('active');
    else arrowEl.classList.remove('active');
  }

  function logTerminal(message) {
    if (!terminalFeed) return;
    const time = new Date().toTimeString().split(' ')[0];
    const line = document.createElement('div');
    line.className = 'feed-line';
    line.innerHTML = `<span class="feed-time">[${time}]</span> <span class="feed-msg">${message}</span>`;
    terminalFeed.appendChild(line);
    terminalFeed.scrollTop = terminalFeed.scrollHeight;
  }

  function init() {
    initHeroCanvas();
    initTimeline();
    initConstellation();
    initSystemEngine();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
