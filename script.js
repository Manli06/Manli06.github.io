/**
 * MANLI H KONYAK - PORTFOLIO INTERACTIVE SCRIPT
 * Electrical and Electronic Engineering Student | NIT Nagaland
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initProjectFiltering();
  initProjectModals();
  initContactForm();
  initClipboardButtons();
  initBackToTop();
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('manli_portfolio_theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('manli_portfolio_theme', 'dark');
      showToast('Switched to Dark Theme', 'info');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('manli_portfolio_theme', 'light');
      showToast('Switched to Light Theme', 'info');
    }
  });
}

/* ==========================================================================
   2. Mobile Responsive Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
  });

  // Auto-close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside navbar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Active Section Highlighting (Scroll Spy)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function onScroll() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4. Projects Data & Detailed Modals
   ========================================================================== */
const projectDetailsData = {
  'footstep-power': {
    title: 'Footstep Power Generation Using Piezoelectric Sensors',
    category: 'Energy Harvesting & Simulation',
    badge: 'Hardware & IoT Integration',
    image: 'images/projects/footstep-power.svg',
    summary: 'An energy harvesting system based on piezoelectric sensors that converts mechanical energy from human footsteps into usable electrical energy.',
    objectives: [
      'Harness kinetic footstep force to actuate piezoelectric transducers (PZT/PVDF discs).',
      'Design an AC-to-DC rectification and power conditioning circuit to charge energy storage capacitors/batteries.',
      'Integrate Raspberry Pi with Python scripts for continuous voltage monitoring, data logging, and IoT telemetry.',
      'Model the electromechanical energy conversion dynamics to evaluate potential power output per step.'
    ],
    technologies: [
      'Piezoelectric Energy Harvesting',
      'PZT / PVDF Materials',
      'AC-DC Bridge Rectifier & Filter',
      'LTC3588 Power Management',
      'Raspberry Pi',
      'Python Programming',
      'COMSOL Multiphysics',
      'Sensor Integration'
    ],
    teamRoles: [
      {
        role: '1. Mechanical and Energy Generation / Harvester',
        desc: 'Design of footstep tile housing, spring return mechanism, and physical placement of the piezoelectric disc array for uniform stress distribution.'
      },
      {
        role: '2. Power Management & Circuit Design',
        desc: 'Selection of low-drop diodes, bridge rectification, smoothing capacitor bank, and voltage regulation circuitry to supply steady DC.'
      },
      {
        role: '3. Raspberry Pi & Sensor Integration',
        desc: 'Interfacing voltage sensor modules (ADC MCP3008) with Raspberry Pi GPIO pins for real-time electrical acquisition.'
      },
      {
        role: '4. Programming, Monitoring & Reporting',
        desc: 'Writing Python scripts for live data logging, time-series plotting of voltage spikes, power calculation, and technical documentation.'
      }
    ],
    userRolePlaceholder: '[EDIT THIS: Specify your personal role among the 4 team divisions above in js/script.js]',
    resultsPlaceholder: '[EDIT THIS: Add voltage/power generated per step, e.g. 5V - 12V transient pulses, capacitor charge time]',
    status: 'Team Project / Academic Prototype'
  },

  'comsol-piezo': {
    title: 'Piezoelectric Materials & Energy Harvesting Simulation',
    category: 'Energy Harvesting & Simulation',
    badge: 'FEA & Multiphysics Modelling',
    image: 'images/projects/comsol-piezo.svg',
    summary: 'Finite Element Analysis (FEA) simulation and multiphysics modeling of piezoelectric materials under mechanical strain for energy harvesting optimization.',
    objectives: [
      'Simulate electromechanical coupling between Solid Mechanics (solid) and Electrostatics (es) modules.',
      'Evaluate von Mises stress distribution and electric potential generation under dynamic cantilever deflection.',
      'Compare performance of PZT-5H piezoceramic versus PVDF polymer on an Aluminium substrate.',
      'Conduct eigenfrequency and harmonic frequency response analysis to match ambient mechanical vibration frequencies.'
    ],
    technologies: [
      'COMSOL Multiphysics',
      'PZT-5H Ceramics',
      'PVDF Polymers',
      'Aluminium Substrate (6061)',
      'Piezoelectric Effect',
      'Structural Mechanics',
      'Electric Potential Modeling',
      'Stress Analysis',
      'Frequency Response',
      'User-Controlled Mesh Refinement'
    ],
    teamRoles: null,
    simulationParameters: [
      'Geometry: Unimorph / Bimorph cantilever beam fixed at one end.',
      'Boundary Conditions: Fixed constraint at root, point/boundary force applied at tip.',
      'Constitutive Relations: Stress-charge form with anisotropic piezoelectric tensor (d31 / d33 coupling).',
      'Mesh Type: Physics-controlled fine mesh with refinement at stress-concentration zones.'
    ],
    userRolePlaceholder: '[EDIT THIS: Individual Simulation & Multiphysics Project]',
    resultsPlaceholder: '[EDIT THIS: Add peak generated open-circuit voltage (Voc), natural frequency (Hz), and optimal load resistance]',
    status: 'Simulation & Academic Research'
  },

  'control-systems': {
    title: 'Control Systems & State-Space Modelling Experiments',
    category: 'Electrical & Machines',
    badge: 'MATLAB / Simulink',
    image: 'images/projects/control-systems.svg',
    summary: 'Dynamic system modeling and simulation using MATLAB and Simulink, incorporating state-space representations and transient response evaluation.',
    objectives: [
      'Formulate state-space matrices (A, B, C, D) for 2nd and higher-order electrical and electromechanical networks.',
      'Analyze system eigenvalues, stability margins, controllability, and observability.',
      'Plot unit step and impulse responses to determine rise time, peak overshoot, and settling time.',
      'Design feedback controllers and observer structures in MATLAB/Simulink.'
    ],
    technologies: [
      'MATLAB',
      'Simulink',
      'State-Space Modelling',
      'Transfer Functions',
      'Transient Response Analysis',
      'Root Locus',
      'Bode Plots',
      'Control System Toolbox'
    ],
    teamRoles: null,
    userRolePlaceholder: '[EDIT THIS: Coursework / Laboratory Simulation]',
    resultsPlaceholder: '[EDIT THIS: Add key damping ratios (ζ), natural frequencies (ωn), and observed settling times]',
    status: 'Laboratory & Computational Analysis'
  },

  'transformer-machines': {
    title: 'Single-Phase Transformer & Electrical Machines Diagnostics',
    category: 'Electrical & Machines',
    badge: 'Hands-on Laboratory Testing',
    image: 'images/projects/transformer-machines.svg',
    summary: 'Experimental testing and parameter estimation of single-phase transformers and DC shunt machines under varying load and excitation conditions.',
    objectives: [
      'Perform Open-Circuit (OC) test to determine core loss (iron losses) and magnetizing branch parameters (Ro, Xm).',
      'Conduct Short-Circuit (SC) test to evaluate full-load copper losses and equivalent impedance (Req, Xeq).',
      'Plot efficiency vs load current curve and compute voltage regulation at different power factors.',
      'Investigate speed control of DC shunt motor using armature voltage and field flux control methods.',
      'Trace magnetic B-H hysteresis loops on Cathode Ray Oscilloscope (CRO) to study magnetic retentivity and coercivity.'
    ],
    technologies: [
      'Single-Phase Transformer (1 kVA / 230V)',
      'DC Shunt Motor',
      'Open-Circuit & Short-Circuit Tests',
      'B-H Curve / Magnetic Hysteresis',
      '3-Point Starter & Rheostats',
      'Wattmeters, Ammeters, Voltmeters',
      'CRO & Inductive Pickups'
    ],
    teamRoles: null,
    userRolePlaceholder: '[EDIT THIS: Laboratory Practical & Experimental Testing]',
    resultsPlaceholder: '[EDIT THIS: Add maximum transformer efficiency % and DC motor speed variation range (RPM)]',
    status: 'Laboratory Experiments & Diagnostics'
  },

  'digital-logic': {
    title: 'Digital Electronics, Arithmetic Circuits & Analog Rectification',
    category: 'Electronics & Digital',
    badge: 'Hardware Prototyping',
    image: 'images/projects/digital-logic.svg',
    summary: 'Design, breadboard prototyping, and verification of digital combinational logic systems and analog rectification filters.',
    objectives: [
      'Construct and verify 4-bit Magnitude Comparator using TTL IC 7485 for A > B, A = B, and A < B conditions.',
      'Implement 4-bit Ripple Carry Adder using Full Adder ICs (7483/7408/7486) and verify carry propagation.',
      'Build Half Subtractor, Full Subtractor, Multiplexer (4:1) and Demultiplexer (1:4) networks.',
      'Study PN junction forward and reverse V-I characteristics.',
      'Analyze Half-Wave Rectifier with π-section filter, measuring ripple factor and voltage regulation.'
    ],
    technologies: [
      'IC 7485 (4-Bit Comparator)',
      'IC 7483 (4-Bit Binary Adder)',
      '7400 Series TTL Logic Gates',
      'Multiplexer & Demultiplexer',
      'PN Junction Diodes (1N4007)',
      'π-Section LC Filter Network',
      'Digital Multimeter & Oscilloscope'
    ],
    teamRoles: null,
    userRolePlaceholder: '[EDIT THIS: Laboratory Prototyping & Verification]',
    resultsPlaceholder: '[EDIT THIS: Add measured ripple factor and comparator truth table verification results]',
    status: 'Electronics Lab Verification'
  }
};

/* ==========================================================================
   5. Project Filtering
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Project Modals Implementation
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('project-modal-content');
  const closeBtn = document.getElementById('project-modal-close');
  const detailButtons = document.querySelectorAll('[data-project-id]');
  const addProjectCard = document.getElementById('add-project-card');

  if (!modal || !modalContainer || !closeBtn) return;

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Open Project Details
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project-id');
      const data = projectDetailsData[projectId];
      if (!data) return;

      let teamRolesHtml = '';
      if (data.teamRoles && data.teamRoles.length) {
        teamRolesHtml = `
          <div class="modal-section">
            <h4 class="modal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Project Team Structure (4 Core Engineering Roles)
            </h4>
            <ul class="modal-bullets">
              ${data.teamRoles.map(item => `<li><strong>${item.role}:</strong> ${item.desc}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      let simParamsHtml = '';
      if (data.simulationParameters && data.simulationParameters.length) {
        simParamsHtml = `
          <div class="modal-section">
            <h4 class="modal-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path></svg>
              Simulation &amp; Model Specifications
            </h4>
            <ul class="modal-bullets">
              ${data.simulationParameters.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      const content = `
        <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 12px;">
          <span class="project-category-badge" style="position: static;">${data.category}</span>
          <span class="meta-tag highlight">${data.badge}</span>
        </div>
        <h2 style="font-size: clamp(1.4rem, 3vw, 1.85rem); font-weight: 800; color: var(--text-primary); margin-bottom: 12px; line-height: 1.3;">
          ${data.title}
        </h2>
        <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 16px;">
          ${data.summary}
        </p>

        <div class="modal-image-preview">
          <img src="${data.image}" alt="${data.title}" />
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Project Objectives &amp; Scope
          </h4>
          <ul class="modal-bullets">
            ${data.objectives.map(obj => `<li>${obj}</li>`).join('')}
          </ul>
        </div>

        ${teamRolesHtml}
        ${simParamsHtml}

        <div class="modal-section">
          <h4 class="modal-section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Technologies &amp; Engineering Tools
          </h4>
          <div class="project-tags" style="margin-top: 10px;">
            ${data.technologies.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-section" style="background: var(--bg-tertiary); padding: 18px; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 6px;">
            📝 Customizable Placeholders (Ready For Your Inputs)
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">
            <strong>My Assigned Role:</strong> <span style="color: var(--accent-amber); font-family: var(--font-mono);">${data.userRolePlaceholder}</span>
          </p>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">
            <strong>Recorded Results / Measurements:</strong> <span style="color: var(--accent-amber); font-family: var(--font-mono);">${data.resultsPlaceholder}</span>
          </p>
        </div>
      `;

      modalContainer.innerHTML = content;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Add Project helper card
  if (addProjectCard) {
    addProjectCard.addEventListener('click', () => {
      const content = `
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">
          How to Add a New Project
        </h2>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
          Your portfolio has been designed to make adding future engineering projects straightforward.
        </p>

        <div class="modal-section">
          <h4 class="modal-section-title">Method 1: Add to index.html (Card View)</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 10px;">
            Copy any existing <code>&lt;article class="project-card" ...&gt;</code> block inside the <code>#projects-container</code> grid in <code>index.html</code>. Update the title, description, and technologies.
          </p>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Method 2: Add to js/script.js (Detailed Modal)</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 10px;">
            In <code>js/script.js</code>, add a new entry to the <code>projectDetailsData</code> object with your project ID, objectives, technologies, and images.
          </p>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Project Images</h4>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            Save your project photos or simulation graphs into the <code>images/projects/</code> folder and update the image <code>src</code>.
          </p>
        </div>
      `;
      modalContainer.innerHTML = content;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
}

/* ==========================================================================
   7. Contact Form Client-side Validation
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    let isValid = true;

    // Helper validation
    function validateField(input, condition) {
      const group = input.closest('.form-group');
      if (!condition) {
        group.classList.add('error');
        isValid = false;
      } else {
        group.classList.remove('error');
      }
    }

    // Name
    validateField(nameInput, nameInput.value.trim().length >= 2);

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validateField(emailInput, emailRegex.test(emailInput.value.trim()));

    // Subject
    validateField(subjectInput, subjectInput.value.trim().length >= 3);

    // Message
    validateField(messageInput, messageInput.value.trim().length >= 10);

    if (isValid) {
      // Show simulated submission message (No fake sending - clear explanation)
      alertBox.className = 'form-alert success';
      alertBox.innerHTML = `
        <strong>Thank you, ${escapeHtml(nameInput.value.trim())}!</strong><br/>
        Your message details have been validated successfully.<br/>
        <small style="display: block; margin-top: 6px; opacity: 0.9;">
          ℹ️ <strong>Note on Contact Form:</strong> This is a static client-side demonstration. To receive actual emails directly to <code>manli06konyak@gmail.com</code>, connect a free service like <em>Formspree</em> or <em>EmailJS</em> (instructions in <code>README.md</code>).
        </small>
      `;

      showToast('Form validated! Check message below.', 'success');
      form.reset();
    } else {
      alertBox.className = 'form-alert';
      alertBox.style.display = 'none';
      showToast('Please check the highlighted fields above.', 'error');
    }
  });

  // Remove error state on input change
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group.classList.contains('error')) {
        group.classList.remove('error');
      }
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ==========================================================================
   9. One-Click Clipboard Copy
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--accent-emerald)';
        btn.style.color = 'var(--accent-emerald)';

        showToast(`Copied to clipboard: ${textToCopy}`, 'success');

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Clipboard copy failed:', err);
      });
    });
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' 
        ? '<polyline points="20 6 9 17 4 12"></polyline>' 
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'
      }
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.2s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   11. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
