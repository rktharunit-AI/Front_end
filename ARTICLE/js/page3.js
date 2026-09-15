/**
 * THE NEXT INTERNET — IT IN 2030
 * Page 03: CHENNAI 2030 (Future City Masterplan)
 * Ivory Base / Deep Navy Roads / Cobalt Data Routes / Orange Infrastructure / Gold AI Nodes
 */

(function () {
  'use strict';

  function initPage3() {
    setupChennaiZones();
    setupCityGraph();
    setupPriorityMatrix();
    setupMasterStack();
  }

  // =========================================================================
  // 1. CHENNAI CIVIC ZONES (11 DOMAINS & ARCHITECTURAL INSPECTOR)
  // =========================================================================

  const zonesData = [
    {
      id: 'flood',
      name: 'Flood Prediction & Waterways',
      category: 'Civic Resilience',
      location: 'Adyar River, Cooum & Chembarambakkam Reservoir',
      input: 'Ultrasonic water level gauges, Doppler weather radar feeds, soil moisture sensors across catchment basins, satellite precipitation rasters.',
      data: 'Continuous time-series telemetry streamed via MQTT over LoRaWAN to Tamil Nadu Disaster Management state data lake.',
      edgeCloud: 'Edge micro-clusters at reservoir sluices running hydrodynamic stormwater run-off models; hybrid cloud for multi-basin flood routing.',
      ai: 'Physics-informed neural networks (PINNs) predicting inundation contours 6 to 18 hours in advance of tropical depression landfall.',
      decision: 'Automated flood alert thresholds; computed optimal discharge rate to prevent bank breaches without inundating residential lowlands.',
      action: 'Automated electric servo actuation of Chembarambakkam sluice gates; targeted SMS geolocation evacuation warnings to riverbank wards.'
    },
    {
      id: 'transport',
      name: 'Smart Transport & MRTS Integration',
      category: 'Mobility',
      location: 'Anna Salai, OMR Corridor & Chennai Metro Phase 2',
      input: 'Inductive vehicle loop detectors, optical bus fleet GPS transponders, Metro automatic fare gates, AI CCTV intersection cameras.',
      data: 'High-velocity GTFS-Realtime streams, Bluetooth MAC probe densities, and automated vehicle monitoring packets.',
      edgeCloud: 'Edge vision processors embedded in traffic light controllers running YOLO inference at 60 FPS.',
      ai: 'Reinforcement learning traffic flow optimizers dynamically prioritizing high-occupancy MTC electric buses and emergency vehicles.',
      decision: 'Real-time adaptive green-wave signal timing; automated dispatch of supplementary autonomous feeder shuttles to Alandur/Central hubs.',
      action: 'Dynamic digital road signs update diversion advisories; traffic signal phases extend by 14 seconds to clear arterial choke points.'
    },
    {
      id: 'healthcare',
      name: 'AI Healthcare & Medical Triage',
      category: 'Public Health',
      location: 'Rajiv Gandhi Govt General Hospital & Apollo Corridor',
      input: 'Wearable pulse oximeters, digital stethoscope acoustics, portable ultrasound scans, continuous vital telemetry from ambulances.',
      data: 'HL7 FHIR compliant encrypted patient telemetry streams with end-to-end zero-knowledge proofs.',
      edgeCloud: 'Hospital on-premise GPU clusters ensuring patient data never leaves regional healthcare borders.',
      ai: 'Multimodal clinical diagnostic models detecting sepsis risk, acute intracranial hemorrhage, and diabetic retinopathy.',
      decision: 'Algorithmic urgency score calculated before ambulance arrives at trauma center; automatic allocation of ICU beds.',
      action: 'Operation theater robotics pre-calibrated; targeted specialist on-call alerts dispatched to surgeon mobile heads-up displays.'
    },
    {
      id: 'water',
      name: 'Smart Water & Desalination Grid',
      category: 'Utilities',
      location: 'Minjur & Nemmeli Desalination Plants, Kilpauk Water Works',
      input: 'Acoustic leak hydrophones on trunk mains, water pressure transducers, chlorine residual sensors, reverse-osmosis membrane differential pressure.',
      data: 'SCADA telemetry streams ingested into digital water utility twin via secure industrial gateways.',
      edgeCloud: 'Edge telemetry units deployed at distribution balancing reservoirs with localized valve automation.',
      ai: 'Transient hydraulic pressure models detecting subterranean pipeline fractures within 5 meters.',
      decision: 'Predictive pump scheduling aligned with off-peak electrical tariff hours; automatic pressure reduction to mitigate leakage during night hours.',
      action: 'Electromagnetic isolation valves adjust aperture; repair crews receive geo-coordinates for proactive maintenance before road subsidence occurs.'
    },
    {
      id: 'waste',
      name: 'Intelligent Waste & Circular Economy',
      category: 'Environment',
      location: 'Perungudi & Kodungaiyur Transfer Facilities',
      input: 'Ultrasonic bin fill-level sensors, optical sorting cameras on conveyor belts, pneumatic weight sensors on collection trucks.',
      data: 'Spatial GIS bin capacity reports uploaded every 15 minutes via NB-IoT cellular links.',
      edgeCloud: 'Robotic sorting arms equipped with edge neural accelerators running hyperspectral plastics classification.',
      ai: 'Dynamic vehicle routing algorithms optimizing garbage collection fleet fuel consumption and route sequencing.',
      decision: 'Route optimization that eliminates empty bin pickups; automated redirection of recyclables to specialized recovery units.',
      action: 'Autonomous pneumatic sorting air-jets separate PET, HDPE, and organic waste at 98% accuracy; truck driver navigation routes re-sequenced.'
    },
    {
      id: 'education',
      name: 'AI Education & Regional Skill Scaling',
      category: 'Human Capital',
      location: 'Anna University, IIT Madras Research Park Corridor',
      input: 'Interactive student coding IDE interactions, voice synthesis cadence in Tamil and English, micro-comprehension quizzes.',
      data: 'Anonymized learning graph metrics and code AST (Abstract Syntax Tree) error vectors.',
      edgeCloud: 'State educational servers distributed across district centers for ultra-low latency interactive learning.',
      ai: 'Adaptive cognitive pedagogical models customizing coding curriculum pacing based on individual student problem-solving patterns.',
      decision: 'Real-time generation of contextual programming hints; automated identification of students needing supplemental foundational tutorials.',
      action: 'Bespoke step-by-step interactive debugger visualizations generated directly in student web browser; personalized practice problem sets assigned.'
    },
    {
      id: 'industry',
      name: 'Automated Industrial Corridors',
      category: 'Manufacturing',
      location: 'Sriperumbudur & Oragadam Automotive/Electronics Hubs',
      input: 'High-speed line-scan industrial cameras, vibrational accelerometer sensors on CNC spindle bearings, 3D laser profilometers.',
      data: 'Deterministic Time-Sensitive Networking (TSN) industrial Ethernet packets communicating over OPC UA.',
      edgeCloud: 'Shopfloor edge servers running real-time robotic kinematic feedback loops under 2 millisecond cycle times.',
      ai: 'Unsupervised visual anomaly detection spotting micro-defects in PCB solder joints and EV battery welding spots.',
      decision: 'Immediate quarantine of defective sub-assemblies; dynamic adjustment of robotic torque parameters to compensate for tool wear.',
      action: 'High-speed pneumatic reject actuators divert defective battery cells; automated maintenance work order triggered for spindle bearing lubrication.'
    },
    {
      id: 'governance',
      name: 'Digital Government & Unified e-Sevai 2.0',
      category: 'Public Services',
      location: 'Ripon Building & Statewide CSC (Common Service Centers)',
      input: 'Biometric verification endpoints, land registry spatial surveys, digital birth and property deed records.',
      data: 'State Wide Area Network (TNSWAN) with quantum-resistant encrypted data transit.',
      edgeCloud: 'State sovereign data cloud running immutable distributed ledger for tamper-evident land record certification.',
      ai: 'Automated administrative verification agents cross-referencing entitlement eligibility across welfare schemes.',
      decision: 'Instant automated qualification for welfare entitlements and business permits without human bureaucratic bottlenecks.',
      action: 'Cryptographically signed digital caste, income, and encumbrance certificates issued to citizen digital wallets in under 60 seconds.'
    },
    {
      id: 'drone',
      name: 'Drone Emergency Response & Coastal Patrol',
      category: 'Public Safety',
      location: 'Marina Beach to Kovalam Coastal Flight Corridor',
      input: 'Thermal infrared aerial cameras, marine VHF distress monitoring, LiDAR coastal topography scans.',
      data: 'Encrypted 5G/6G ultra-reliable low-latency (URLLC) video and drone telemetry downlinks.',
      edgeCloud: 'Drone docking stations equipped with localized charging pads and edge obstacle avoidance computers.',
      ai: 'Computer vision algorithms identifying rip current entrapment, unauthorized coastal dumping, and maritime distress flares.',
      decision: 'Autonomous launch authorization for life-saving flotation payload drops; optimal flight corridor calculation avoiding helicopter paths.',
      action: 'Autonomous electric drone deploys from Marina station, navigates to distressed swimmer coordinates, and drops inflatable flotation ring within 180 seconds.'
    },
    {
      id: 'energy',
      name: 'Smart Grid & Coastal Renewable Integration',
      category: 'Energy',
      location: 'TANGEDCO North Chennai Grid, Coastal Wind Turbines',
      input: 'Phasor Measurement Units (PMUs) recording 50Hz grid frequency 60 times/sec, rooftop solar inverter telemetry, substation transformer temps.',
      data: 'High-precision microsecond-synchronized synchrophasor data streams.',
      edgeCloud: 'Substation automation controllers running IEC 61850 protocol stacks with automated failover logic.',
      ai: 'Deep probabilistic neural networks forecasting coastal wind gust generation and industrial peak load curves.',
      decision: 'Automated battery energy storage system (BESS) charging/discharging to stabilize grid frequency and avoid spinning reserve fossil dispatch.',
      action: 'Mega-watt battery arrays inject reactive power within 16 milliseconds; solar export throttled dynamically to prevent distribution transformer overheating.'
    },
    {
      id: 'infrastructure',
      name: 'Connected Civic Infrastructure',
      category: 'Urban Fabric',
      location: 'Metropolitan Area Underground Utility Grid',
      input: 'Sub-surface acoustic ground radar, smart streetlamp ambient light sensors, bridge strain gauges on Napier and Kathipara bridges.',
      data: 'Mesh radio networks aggregating civic health metrics to municipal engineering command centers.',
      edgeCloud: 'Distributed civic micro-nodes embedded within street furniture powering local mesh repeaters.',
      ai: 'Structural health degradation models computing bridge fatigue and subterranean utility subsidence before structural cracks appear.',
      decision: 'Scheduled predictive resurfacing and structural reinforcement before safety limits are breached.',
      action: 'Smart streetlamps dim to 40% during zero-pedestrian hours saving 350 MWh; automated work permit issued for cathodic pipe rust prevention.'
    }
  ];

  let activeZone = zonesData[0];

  function setupChennaiZones() {
    const zonesList = document.getElementById('chennaiZonesList');
    if (!zonesList) return;

    zonesList.innerHTML = '';
    zonesData.forEach((zone, index) => {
      const btn = document.createElement('div');
      btn.className = `zone-item-btn ${index === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="zone-btn-name">${zone.name}</span>
        <span class="zone-btn-category">${zone.category}</span>
      `;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.zone-item-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeZone = zone;
        renderZoneInspector(zone);
        if (window.soundEngine) window.soundEngine.playNodeSelect();
      });

      zonesList.appendChild(btn);
    });

    renderZoneInspector(activeZone);
  }

  function renderZoneInspector(zone) {
    document.getElementById('zoneInspectorTitle').textContent = zone.name;
    document.getElementById('zoneInspectorLocation').textContent = `// LOCATION: ${zone.location.toUpperCase()}`;

    document.getElementById('flowInput').textContent = zone.input;
    document.getElementById('flowData').textContent = zone.data;
    document.getElementById('flowEdgeCloud').textContent = zone.edgeCloud;
    document.getElementById('flowAI').textContent = zone.ai;
    document.getElementById('flowDecision').textContent = zone.decision;
    document.getElementById('flowAction').textContent = zone.action;
  }

  // =========================================================================
  // 2. CHENNAI 2030 URBAN TOPOLOGY (2D/2.5D FUTURE MASTERPLAN CARTOGRAPHY)
  // =========================================================================

  const cityGraphCanvas = document.getElementById('cityGraphCanvas');
  let cityGraphCtx = null;

  // Categorized city systems:
  // AI Systems = Gold (#F4B942)
  // Infrastructure = Orange (#FF6B35)
  // Data / Transport = Cobalt Blue (#315CFF)
  const citySystems = [
    { id: 'traffic', name: 'Smart Traffic', type: 'DATA', color: '#315CFF', active: true, x: 0.35, y: 0.45 },
    { id: 'flood', name: 'Flood AI', type: 'AI', color: '#F4B942', active: true, x: 0.55, y: 0.35 },
    { id: 'hospitals', name: 'AI Hospitals', type: 'AI', color: '#F4B942', active: true, x: 0.65, y: 0.60 },
    { id: 'water', name: 'Smart Water', type: 'INFRA', color: '#FF6B35', active: true, x: 0.45, y: 0.25 },
    { id: 'transport', name: 'Autonomous Feeder', type: 'DATA', color: '#315CFF', active: false, x: 0.25, y: 0.60 },
    { id: 'gov', name: 'Digital e-Sevai', type: 'DATA', color: '#315CFF', active: true, x: 0.50, y: 0.50 },
    { id: 'energy', name: 'Coastal Renewable', type: 'INFRA', color: '#FF6B35', active: true, x: 0.70, y: 0.30 },
    { id: 'robotics', name: 'Oragadam Robotics', type: 'INFRA', color: '#FF6B35', active: false, x: 0.20, y: 0.35 },
    { id: 'infra', name: 'Civic Sensor Mesh', type: 'DATA', color: '#315CFF', active: true, x: 0.40, y: 0.75 }
  ];

  function setupCityGraph() {
    if (!cityGraphCanvas) return;
    cityGraphCtx = cityGraphCanvas.getContext('2d');
    resizeCityGraphCanvas();
    window.addEventListener('resize', resizeCityGraphCanvas);

    const citySwitches = document.querySelectorAll('.city-switch-toggle');
    citySwitches.forEach(sw => {
      sw.addEventListener('click', () => {
        const sysId = sw.getAttribute('data-system');
        const sys = citySystems.find(s => s.id === sysId);
        if (sys) {
          sys.active = !sys.active;
          sw.classList.toggle('active', sys.active);
          if (window.soundEngine) window.soundEngine.playPillarToggle(sys.active);
          updateCityTelemetry();
        }
      });
    });

    updateCityTelemetry();
    renderCityGraph();
  }

  function resizeCityGraphCanvas() {
    if (!cityGraphCanvas) return;
    const rect = cityGraphCanvas.getBoundingClientRect();
    cityGraphCanvas.width = rect.width * (window.devicePixelRatio || 1);
    cityGraphCanvas.height = rect.height * (window.devicePixelRatio || 1);
    if (cityGraphCtx) cityGraphCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function updateCityTelemetry() {
    const activeCount = citySystems.filter(s => s.active).length;
    const resilience = Math.min(99, Math.round(activeCount * 10.5 + 5));
    const efficiency = Math.min(98, Math.round(activeCount * 9.8 + 12));
    const latency = Math.max(3, Math.round(65 - activeCount * 5.8));

    const resEl = document.getElementById('cityResilience');
    const effEl = document.getElementById('cityEfficiency');
    const latEl = document.getElementById('cityLatency');

    if (resEl) resEl.textContent = `${resilience}%`;
    if (effEl) effEl.textContent = `${efficiency}%`;
    if (latEl) latEl.textContent = `${latency}ms`;
  }

  function renderCityGraph() {
    if (!cityGraphCanvas || !cityGraphCtx) return;
    const width = cityGraphCanvas.width / (window.devicePixelRatio || 1);
    const height = cityGraphCanvas.height / (window.devicePixelRatio || 1);

    // Warm Ivory Canvas Base
    cityGraphCtx.fillStyle = '#121026';
    cityGraphCtx.fillRect(0, 0, width, height);

    cityGraphCtx.save();

    // Architectural Arterial Roads in Deep Navy
    cityGraphCtx.strokeStyle = 'rgba(245, 242, 255, 0.12)';
    cityGraphCtx.lineWidth = 3;
    
    // Arterial 1: Anna Salai to GST Road
    cityGraphCtx.beginPath();
    cityGraphCtx.moveTo(width * 0.5, 0);
    cityGraphCtx.bezierCurveTo(width * 0.45, height * 0.4, width * 0.35, height * 0.6, width * 0.2, height);
    cityGraphCtx.stroke();

    // Arterial 2: OMR IT Expressway Corridor
    cityGraphCtx.strokeStyle = 'rgba(245, 242, 255, 0.08)';
    cityGraphCtx.lineWidth = 2.5;
    cityGraphCtx.beginPath();
    cityGraphCtx.moveTo(width * 0.65, height * 0.2);
    cityGraphCtx.lineTo(width * 0.68, height);
    cityGraphCtx.stroke();

    // Coastline: Bay of Bengal (Navy line with subtle turquoise tint)
    cityGraphCtx.strokeStyle = '#F5F2FF';
    cityGraphCtx.lineWidth = 2;
    cityGraphCtx.setLineDash([8, 4]);
    cityGraphCtx.beginPath();
    cityGraphCtx.moveTo(width * 0.84, 0);
    cityGraphCtx.bezierCurveTo(width * 0.79, height * 0.35, width * 0.81, height * 0.7, width * 0.77, height);
    cityGraphCtx.stroke();
    cityGraphCtx.setLineDash([]);

    cityGraphCtx.fillStyle = 'rgba(245, 242, 255, 0.45)';
    cityGraphCtx.font = '600 8px IBM Plex Mono';
    cityGraphCtx.fillText('// BAY OF BENGAL COASTAL RADAR LINE', width * 0.78, 20);

    const activeNodes = citySystems.filter(s => s.active);
    const now = Date.now() * 0.0018;

    // Blue & Orange Data Routes connecting active nodes
    for (let i = 0; i < activeNodes.length; i++) {
      for (let j = i + 1; j < activeNodes.length; j++) {
        const n1 = activeNodes[i];
        const n2 = activeNodes[j];
        const x1 = n1.x * width;
        const y1 = n1.y * height;
        const x2 = n2.x * width;
        const y2 = n2.y * height;

        // Data route
        cityGraphCtx.strokeStyle = 'rgba(49, 92, 255, 0.35)';
        cityGraphCtx.lineWidth = 1.2;
        cityGraphCtx.beginPath();
        cityGraphCtx.moveTo(x1, y1);
        cityGraphCtx.lineTo(x2, y2);
        cityGraphCtx.stroke();

        // Data flow packets: SENSORS -> EDGE -> AI -> ACTION
        const pulseProgress = (now + (i + j) * 0.35) % 1;
        const px = x1 + (x2 - x1) * pulseProgress;
        const py = y1 + (y2 - y1) * pulseProgress;

        cityGraphCtx.fillStyle = (i % 2 === 0) ? '#FF6B35' : '#315CFF';
        cityGraphCtx.beginPath();
        cityGraphCtx.arc(px, py, 2.5, 0, Math.PI * 2);
        cityGraphCtx.fill();
      }
    }

    // Draw nodes categorized by colors
    citySystems.forEach(sys => {
      const sx = sys.x * width;
      const sy = sys.y * height;

      if (sys.active) {
        // Outer halo
        cityGraphCtx.strokeStyle = sys.color;
        cityGraphCtx.fillStyle = '#F5F2FF';
        cityGraphCtx.lineWidth = 2.5;
        cityGraphCtx.beginPath();
        cityGraphCtx.arc(sx, sy, 8, 0, Math.PI * 2);
        cityGraphCtx.fill();
        cityGraphCtx.stroke();

        // Core dot
        cityGraphCtx.fillStyle = sys.color;
        cityGraphCtx.beginPath();
        cityGraphCtx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        cityGraphCtx.fill();

        cityGraphCtx.fillStyle = '#F5F2FF';
        cityGraphCtx.font = '700 10px Space Grotesk';
        cityGraphCtx.fillText(sys.name, sx + 13, sy + 3);

        cityGraphCtx.fillStyle = sys.color;
        cityGraphCtx.font = '600 7px IBM Plex Mono';
        cityGraphCtx.fillText(`[${sys.type}]`, sx + 13, sy + 13);
      } else {
        cityGraphCtx.strokeStyle = 'rgba(245, 242, 255, 0.14)';
        cityGraphCtx.fillStyle = '#1D1945';
        cityGraphCtx.lineWidth = 1;
        cityGraphCtx.beginPath();
        cityGraphCtx.arc(sx, sy, 5, 0, Math.PI * 2);
        cityGraphCtx.fill();
        cityGraphCtx.stroke();

        cityGraphCtx.fillStyle = '#B8B3CC';
        cityGraphCtx.font = '400 9px Space Grotesk';
        cityGraphCtx.fillText(sys.name, sx + 10, sy + 3);
      }
    });

    cityGraphCtx.restore();
    requestAnimationFrame(renderCityGraph);
  }

  // =========================================================================
  // 3. WHAT WOULD YOU PRIORITIZE? (TRADE-OFF RADAR)
  // =========================================================================

  const priorities = [
    { id: 'security', name: 'Security', value: 85, angle: 0 },
    { id: 'privacy', name: 'Privacy', value: 80, angle: (Math.PI * 2) / 7 },
    { id: 'accessibility', name: 'Accessibility', value: 75, angle: (Math.PI * 2 * 2) / 7 },
    { id: 'reliability', name: 'Reliability', value: 90, angle: (Math.PI * 2 * 3) / 7 },
    { id: 'sustainability', name: 'Sustainability', value: 70, angle: (Math.PI * 2 * 4) / 7 },
    { id: 'humanControl', name: 'Human Control', value: 85, angle: (Math.PI * 2 * 5) / 7 },
    { id: 'inclusion', name: 'Digital Inclusion', value: 80, angle: (Math.PI * 2 * 6) / 7 }
  ];

  const radarCanvas = document.getElementById('radarCanvas');
  let radarCtx = null;

  function setupPriorityMatrix() {
    if (!radarCanvas) return;
    radarCtx = radarCanvas.getContext('2d');
    resizeRadarCanvas();

    const sliders = document.querySelectorAll('.priority-range-input');
    sliders.forEach(slider => {
      slider.addEventListener('input', (e) => {
        const id = slider.getAttribute('data-priority');
        const val = parseInt(e.target.value, 10);
        const item = priorities.find(p => p.id === id);
        if (item) {
          item.value = val;
          const valTag = document.getElementById(`val_${id}`);
          if (valTag) valTag.textContent = `${val}%`;
          updatePriorityImplication();
        }
      });
    });

    updatePriorityImplication();
    renderRadar();
  }

  function resizeRadarCanvas() {
    if (!radarCanvas) return;
    radarCanvas.width = 320 * (window.devicePixelRatio || 1);
    radarCanvas.height = 320 * (window.devicePixelRatio || 1);
    if (radarCtx) radarCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  function updatePriorityImplication() {
    const sorted = [...priorities].sort((a, b) => b.value - a.value);
    const top1 = sorted[0];
    const top2 = sorted[1];
    const lowest = sorted[sorted.length - 1];

    const box = document.getElementById('radarImplicationText');
    if (box) {
      box.innerHTML = `
        <strong>ARCHITECTURAL TRADEOFF IMPLICATION:</strong><br>
        Prioritizing <strong>${top1.name} (${top1.value}%)</strong> and <strong>${top2.name} (${top2.value}%)</strong> mandates decentralized on-premise hardware root-of-trust, zero-knowledge cryptographic proofs, and strict human-in-the-loop approvals.
        Lower allocation on <strong>${lowest.name} (${lowest.value}%)</strong> reflects potential bottlenecks in real-time execution speeds or specialized device requirements.
      `;
    }
  }

  function renderRadar() {
    if (!radarCanvas || !radarCtx) return;
    const size = 320;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 105;

    radarCtx.fillStyle = '#F5F2FF';
    radarCtx.fillRect(0, 0, size, size);

    radarCtx.save();

    // Concentric heptagon rings
    radarCtx.strokeStyle = 'rgba(17, 24, 39, 0.12)';
    radarCtx.lineWidth = 1;
    for (let r = 0.25; r <= 1.0; r += 0.25) {
      radarCtx.beginPath();
      for (let i = 0; i < 7; i++) {
        const angle = priorities[i].angle - Math.PI / 2;
        const px = cx + Math.cos(angle) * (radius * r);
        const py = cy + Math.sin(angle) * (radius * r);
        if (i === 0) radarCtx.moveTo(px, py);
        else radarCtx.lineTo(px, py);
      }
      radarCtx.closePath();
      radarCtx.stroke();
    }

    // Spokes
    priorities.forEach(p => {
      const angle = p.angle - Math.PI / 2;
      radarCtx.beginPath();
      radarCtx.moveTo(cx, cy);
      radarCtx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      radarCtx.stroke();
    });

    // Filled polygon of values
    radarCtx.fillStyle = 'rgba(49, 92, 255, 0.18)';
    radarCtx.strokeStyle = '#315CFF';
    radarCtx.lineWidth = 2.5;

    radarCtx.beginPath();
    priorities.forEach((p, i) => {
      const angle = p.angle - Math.PI / 2;
      const dist = radius * (p.value / 100);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      if (i === 0) radarCtx.moveTo(px, py);
      else radarCtx.lineTo(px, py);
    });
    radarCtx.closePath();
    radarCtx.fill();
    radarCtx.stroke();

    // Vertices
    priorities.forEach((p, idx) => {
      const angle = p.angle - Math.PI / 2;
      const dist = radius * (p.value / 100);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      radarCtx.fillStyle = idx % 2 === 0 ? '#FF6B35' : '#F4B942';
      radarCtx.beginPath();
      radarCtx.arc(px, py, 4, 0, Math.PI * 2);
      radarCtx.fill();
      radarCtx.strokeStyle = '#F5F2FF';
      radarCtx.lineWidth = 1.5;
      radarCtx.stroke();
    });

    radarCtx.restore();
    requestAnimationFrame(renderRadar);
  }

  // =========================================================================
  // 4. THE NEXT INTERNET 7-LAYER MASTER STACK
  // =========================================================================

  function setupMasterStack() {
    const stackItems = document.querySelectorAll('.master-stack-item');
    stackItems.forEach(item => {
      item.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        stackItems.forEach(i => i.classList.remove('active'));
        if (!wasActive) {
          item.classList.add('active');
          if (window.soundEngine) window.soundEngine.playNodeSelect();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage3);
  } else {
    initPage3();
  }
})();
