# MANLI H KONYAK — Personal Engineering Portfolio

A modern, responsive, and interactive engineering portfolio website built for **MANLI H KONYAK**, Electrical and Electronic Engineering undergraduate student at **National Institute of Technology, Nagaland (NIT Nagaland)**.

---

## 📁 1. Project Folder Structure

The project has been organized with a clean, standard separation of concerns:

```text
portfolio/
│
├── index.html                   # Main webpage containing all sections and modals
│
├── css/
│   └── style.css                # Styling, themes (dark/light), layout, and responsive rules
│
├── js/
│   └── script.js                # Interactive logic (theme toggle, filter, modals, form validation)
│
├── images/
│   ├── profile-placeholder.svg  # Default profile graphic with engineering circuit motif
│   ├── projects/                # Technical schematics and simulation diagram graphics
│   │   ├── footstep-power.svg       # Project 1: Piezoelectric energy harvesting
│   │   ├── comsol-piezo.svg         # Project 2: COMSOL multiphysics cantilever FEA
│   │   ├── control-systems.svg      # Project 3: MATLAB / Simulink state-space
│   │   ├── transformer-machines.svg # Project 4: Transformer OC/SC & DC motor
│   │   └── digital-logic.svg        # Project 5: IC 7485 & ripple carry adder
│   └── certificates/
│       └── certificate-placeholder.svg # High-res certificate preview graphic
│
├── documents/
│   └── resume.pdf               # Downloadable resume document
│
└── README.md                    # Beginner-friendly guide and documentation
```

---

## ⚡ 2. How to Run the Website Locally

You do not need any complicated compilers, frameworks, or dependencies. 

### Option A: Double Click (Simplest)
1. Open the `portfolio` folder in Windows File Explorer: `d:\Desktop\portfolio`.
2. Double-click on `index.html`.
3. It will open immediately in your default browser (Google Chrome, Microsoft Edge, Firefox, Brave, etc.).

### Option B: Local Web Server (Recommended)
Running a local web server ensures all features (such as clipboard copy and fetch requests) function under `http://localhost`:
1. Open PowerShell in the `d:\Desktop\portfolio` folder.
2. If Python is installed, run:
   ```powershell
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   ```text
   http://localhost:8080
   ```
4. Alternatively, in **VS Code**, install the **Live Server** extension, right-click `index.html`, and select **"Open with Live Server"**.

---

## 🖼️ 3. How to Replace Your Profile Photo

1. Prepare your photograph (a clean square or portrait orientation, ideally 500x500 pixels or higher, `.jpg` or `.png`).
2. Rename your photo file to:
   ```text
   profile.jpg
   ```
3. Place it in the `images/` folder (`d:\Desktop\portfolio\images\profile.jpg`).
4. Open `index.html` in any text editor (Notepad, VS Code).
5. Find line ~142:
   ```html
   <!-- Before: -->
   <img src="images/profile-placeholder.svg" alt="MANLI H KONYAK Profile" class="profile-img" id="profile-photo" />

   <!-- Change to: -->
   <img src="images/profile.jpg" alt="MANLI H KONYAK Profile" class="profile-img" id="profile-photo" />
   ```
6. Save `index.html` and refresh your browser.

---

## 🛠️ 4. How to Add New Projects

Adding a new project requires two simple steps:

### Step 1: Add a Card in `index.html`
Inside the `<div class="projects-grid" id="projects-container">` section of `index.html`, duplicate one of the existing `<article class="project-card">` elements:

```html
<article class="project-card" data-category="Electrical & Machines">
  <div class="project-thumbnail">
    <img src="images/projects/your-project-image.jpg" alt="Project Title" class="project-img" />
    <span class="project-category-badge">Category Badge</span>
  </div>
  <div class="project-content">
    <h3 class="project-title">Your Project Name</h3>
    <p class="project-desc">
      A 2-3 sentence overview describing the objective, methodology, and engineering concept.
    </p>
    <div class="project-tags">
      <span class="project-tag">MATLAB</span>
      <span class="project-tag">Simulink</span>
    </div>
    <div class="project-actions">
      <button class="btn btn-primary btn-sm" data-project-id="your-new-project-id">
        <span>View Full Details</span>
      </button>
      <span class="meta-tag">Academic Project</span>
    </div>
  </div>
</article>
```

### Step 2: Add Detailed Content in `js/script.js`
Open `js/script.js` and add a new entry to the `projectDetailsData` object with your matching project ID:

```javascript
'your-new-project-id': {
  title: 'Your Project Name',
  category: 'Electrical & Machines',
  badge: 'Coursework / Lab Project',
  image: 'images/projects/your-project-image.jpg',
  summary: 'In-depth description of the project.',
  objectives: [
    'First objective or goal.',
    'Second objective or experimental test.'
  ],
  technologies: ['MATLAB', 'Simulink', 'Power Electronics'],
  teamRoles: null,
  userRolePlaceholder: 'Your specific individual role or team task',
  resultsPlaceholder: 'Key quantitative results, efficiency numbers, or waveforms',
  status: 'Completed / In Progress'
}
```

---

## 📄 5. How to Replace Your Resume PDF

1. Whenever you prepare an updated PDF of your resume, rename it to:
   ```text
   resume.pdf
   ```
2. Copy it into the `documents/` folder, replacing `d:\Desktop\portfolio\documents\resume.pdf`.
3. Both the **"Download Resume"** button in the Hero section and the Resume section will automatically download your newest PDF without editing any HTML code.

---

## 📬 6. How to Connect the Contact Form to Receive Real Emails

Currently, the contact form validates input fields client-side and provides a simulation confirmation without falsely claiming to deliver an unconfigured backend email.

To receive messages submitted on your website directly into your inbox (`manli06konyak@gmail.com`), you can use a free, secure form forwarding service such as **Formspree**:

1. Go to [https://formspree.io/](https://formspree.io/) and create a free account with `manli06konyak@gmail.com`.
2. Create a new form and copy your unique Form ID (e.g. `https://formspree.io/f/mqkenvxy`).
3. In `index.html`, find the `<form id="contact-form">` tag and update it:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Now, any visitor submitting the form will send the message directly to your email address!

---

## 🌐 7. How to Publish the Website Online (Free Hosting)

### Method A: GitHub Pages (Recommended for Students)
1. Create a free account on [GitHub.com](https://github.com/).
2. Create a new public repository named `portfolio` (or `manlikonyak.github.io`).
3. Upload all files from `d:\Desktop\portfolio` into the repository.
4. Go to repository **Settings** → **Pages**.
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. In 1–2 minutes, your website will be live online at:
   `https://<your-username>.github.io/portfolio/`

### Method B: Vercel or Netlify (Drag and Drop)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com).
2. Drag and drop the `portfolio` folder directly into the browser window.
3. You will receive an instant, high-speed live `.vercel.app` or `.netlify.app` web address that you can put on your resume and LinkedIn.

---

## 📌 Summary of Clearly Identifiable Placeholders

You can easily find all placeholders across the project by searching for the bracketed text `[ADD` or `[EDIT`:
- `[READY FOR YOUR PHOTO: images/profile.jpg]` (Profile photo)
- `[ADD CGPA / SGPA PLACEHOLDER]` (Education section)
- `[ADD BOARD / PERCENTAGE PLACEHOLDER]` (Class 10 & 12)
- `[EDIT THIS: Specify your personal role among the 4 team divisions]` (Footstep power generation project)
- `[EDIT THIS: Add voltage/power generated per step]` (Footstep project measurements)
- `[EDIT THIS: Add peak generated open-circuit voltage]` (COMSOL project)

