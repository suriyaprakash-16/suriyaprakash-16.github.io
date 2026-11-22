/*
  EDIT THIS FILE TO UPDATE YOUR SITE.
  Everything below (hero evidence, roadmap, skills, work, experience, credentials, contact)
  is shown on the page automatically. Keep the commas and quote marks as they are.
  After editing, upload content.js to GitHub (replace the old file). See UPDATE-GUIDE.md.
*/
window.SITE = {
  updated: "22 Nov 2026",

  /* Text for the "View this page for" switch in the hero. Keep each one true to your evidence. */
  views: {
    all: { label: "Everyone" },
    pv: { label: "Clinical and PV", lead: "Moving into pharmacovigilance and clinical research: GCP certified, and training in ICSR processing, MedDRA coding and causality assessment through a diploma and a Workora virtual internship. Two years leading a team of 15+ with accurate records, clear escalation and audit readiness." },
    lab: { label: "Lab and PhD", lead: "Laboratory and research focus: an MSc dissertation on A549 cell viability and IL-8 response, plus HPLC, FTIR, DLS and GLP documentation, and genome analysis for anti-malarial research. Open to laboratory, research and funded PhD positions." }
  },

  person: {
    name: "Suriyaprakash Sudarvelraja",
    email: "suriyaprakashsudarvelraja@gmail.com",
    linkedin: "https://www.linkedin.com/in/suriyaprakash-sudarvelraja",
    blog: "https://biotechons.blogspot.com/",
    cv: "assets/Suriyaprakash_Sudarvelraja_CV.pdf"
  },

  /* Hero plot: one numbered point per piece of evidence, oldest first.
     Add or remove lines (keep between 4 and 7). Set flag: true on one line to highlight it. */
  evidence: [
    { label: "MSc Medical Biotechnology, Edinburgh Napier University (2024)" },
    { label: "Led a team of 15+ in a regulated, audit-driven setting (2024 to 2026)" },
    { label: "Advanced Certification in Pharmacovigilance and Drug Safety (Sep 2026)" },
    { label: "Good Clinical Practice certificate, NIDA Clinical Trials Network (Nov 2026)" },
    { label: "Pharmacovigilance virtual internship with Workora (in progress)" },
    { label: "Open to pharmacovigilance, clinical research and clinical data roles in India", flag: true }
  ],

  /* Roadmap: one line per month. status is worked out from today's date. */
  roadmap: [
    { start: "2026-11-01", topic: "Clinical research" },
    { start: "2026-12-01", topic: "Pharmacovigilance" },
    { start: "2027-01-01", topic: "Clinical data management" },
    { start: "2027-02-01", topic: "Regulatory affairs" },
    { start: "2027-03-01", topic: "Medical writing" }
  ],

  /* Current learning. Delete a line when it is finished and add it to credentials below. */
  now: [
    { title: "Pro Advanced Diploma in Clinical Research", detail: "LLRI (Learning Labb Research Institute). Oct 2026 to Mar 2027." },
    { title: "Pharmacovigilance virtual internship", detail: "Workora. Project-based tasks reviewed by their team. Graduation 16 Dec 2026." },
    { title: "Introduction to the Principles and Practice of Clinical Research", detail: "NIH online course (IPPCR). In progress." },
    { title: "ICH-GCP E6(R3) training", detail: "The Global Health Network, University of Oxford. In progress." }
  ],

  /* Skills. status: practised | certified | coursework | training | learning
     Change a status as you gain evidence. Be honest: it is what makes the page credible. */
  skills: [
    { group: "Laboratory", tracks: "lab", items: [
      { name: "A549 mammalian cell culture", status: "practised" },
      { name: "ELISA (IL-8) and WST-1 viability assays", status: "practised" },
      { name: "HPLC, FTIR and dissolution testing", status: "practised" },
      { name: "Microbial limit testing", status: "practised" },
      { name: "DLS and UV spectroscopy", status: "practised" },
      { name: "GLP-style documentation", status: "practised" },
      { name: "PCR and western blotting", status: "coursework" }
    ]},
    { group: "Clinical research and drug safety", tracks: "pv", items: [
      { name: "ICH-GCP", status: "certified" },
      { name: "Pharmacovigilance and drug safety", status: "certified" },
      { name: "ICSR processing and ADR reporting", status: "training" },
      { name: "MedDRA coding", status: "training" },
      { name: "Causality assessment", status: "training" },
      { name: "Clinical data management", status: "training" },
      { name: "Regulatory affairs", status: "training" },
      { name: "Medical writing", status: "training" }
    ]},
    { group: "Data and tools", tracks: "pv lab", items: [
      { name: "GraphPad Prism", status: "practised" },
      { name: "Geneious and antiSMASH", status: "practised" },
      { name: "PyMOL and UCSF Chimera", status: "coursework" },
      { name: "Excel", status: "learning" },
      { name: "SQL", status: "learning" },
      { name: "Python and R", status: "learning" },
      { name: "Power BI", status: "learning" }
    ]},
    { group: "Quality and operations", tracks: "pv", items: [
      { name: "Leading a team of 15+", status: "practised" },
      { name: "Incident documentation and escalation", status: "practised" },
      { name: "Training and competency records", status: "practised" },
      { name: "Root cause analysis", status: "certified" }
    ]}
  ],

  /* Research and projects. state: done | planned. Add link: "https://..." when something is published. */
  work: [
    {
      state: "done", tracks: "lab", period: "2023 to 2024", kind: "Master's dissertation",
      title: "Silver nanoparticles, nanocellulose and A549 lung epithelial cells",
      summary: "Tested cell viability (WST-1) and inflammatory response (IL-8 ELISA) in A549 cells exposed to silver nanoparticles and nanocellulose, alone and with LPS. Treatments were run in triplicate and analysed in GraphPad Prism.",
      tags: ["Cell culture", "ELISA", "WST-1", "GraphPad Prism"]
    },
    {
      state: "done", tracks: "lab", period: "Jan to Jul 2024", kind: "Research scholar, remote",
      title: "Multi-omics and machine-learning-assisted anti-malarial research",
      summary: "Supported a Gen'Omics Research Hub programme on anti-malarial peptide discovery: read trimming, genome assembly and contig extraction from whole-genome sequencing data of multidrug-resistant bacteria, and biosynthetic gene cluster analysis with antiSMASH.",
      tags: ["Whole-genome sequencing", "Geneious", "antiSMASH"]
    },
    {
      state: "done", tracks: "lab", period: "2021 to 2022", kind: "Undergraduate project",
      title: "Biosynthesised iron oxide nanoparticles and molecular docking",
      summary: "Plant-extract synthesis of iron oxide nanoparticles, characterisation (UV spectroscopy, DLS, FTIR), pharmacological assays, and docking studies against hepatocellular carcinoma targets.",
      tags: ["Nanoparticles", "DLS", "FTIR", "Molecular docking"]
    },
    {
      state: "planned", tracks: "pv", period: "Planned for Dec 2026", kind: "Pharmacovigilance",
      title: "Practice case portfolio",
      summary: "Eight to ten adverse event reports from public sources, each with a narrative, MedDRA coding and a causality assessment. No patient data.",
      tags: ["ICSR", "MedDRA", "Causality"]
    },
    {
      state: "planned", tracks: "pv", period: "Planned", kind: "Data",
      title: "Drug safety dashboard with public openFDA data",
      summary: "An educational dashboard, not a validated pharmacovigilance system. Reports on it do not establish causality or incidence.",
      tags: ["Python", "openFDA"], link: "https://open.fda.gov/", linkText: "About openFDA"
    },
    {
      state: "planned", tracks: "pv", period: "Planned", kind: "Clinical data management",
      title: "eCRF and data validation case study",
      summary: "A synthetic-data exercise covering eCRF structure, edit checks and query resolution.",
      tags: ["CRF design", "Edit checks", "Queries"]
    }
  ],

  /* Experience, newest first. */
  experience: [
    { date: "Oct 2026 to present", role: "Clinical research trainee", org: "LLRI (Learning Labb Research Institute), remote",
      text: "Pro Advanced Diploma training across **pharmacovigilance**, **clinical research**, **clinical data management**, **regulatory affairs** and **medical writing**." },
    { date: "Nov to Dec 2026", role: "Pharmacovigilance virtual intern", org: "Workora, remote",
      text: "**Hands-on, project-based pharmacovigilance** tasks, each submission reviewed by the Workora team. Graduation 16 Dec 2026." },
    { date: "Jul to Nov 2026", role: "Generalist expert", org: "Mercor, part-time, remote",
      text: "Reviewed written content against detailed guidelines for **accuracy, clarity and logical consistency**, and gave **structured feedback** to weekly deadlines." },
    { date: "Sep 2024 to Aug 2026", role: "Duty manager", org: "SSP Group plc, Edinburgh, UK",
      text: "Ran daily operations and a **team of 15+** in a regulated, time-critical environment. Kept **compliance, training and competency records** and **incident documentation**, and stayed **audit-ready**." },
    { date: "Jan to Jul 2024", role: "Research scholar", org: "Gen'Omics Research Hub (Genomac Hub), remote",
      text: "**Whole-genome sequencing analysis** of multidrug-resistant bacteria and **machine-learning-assisted peptide prediction** for anti-malarial research." },
    { date: "Aug 2021", role: "Quality control laboratory intern", org: "Synthyia Research Labs Pvt. Ltd., Puducherry",
      text: "**HPLC**, **dissolution**, **FTIR**, friability, disintegration and **microbial limit testing** with **GLP-compliant documentation**." }
  ],

  education: [
    { date: "2023 to 2024", title: "MSc Medical Biotechnology", org: "Edinburgh Napier University, UK" },
    { date: "2018 to 2022", title: "BTech Biotechnology", org: "Anna University, BIT Campus, Tiruchirappalli", note: "First class, CGPA 7.70 out of 10" }
  ],

  /* Certificates, newest first. Add link: "https://..." only after checking the link is correct and public.
     Use status: "In progress" for courses you have not finished. */
  certificates: [
    { date: "In progress", title: "ICH-GCP E6(R3) training", issuer: "The Global Health Network, University of Oxford", status: "In progress" },
    { date: "In progress", title: "Introduction to the Principles and Practice of Clinical Research", issuer: "National Institutes of Health (NIH)", status: "In progress" },
    { date: "Nov 2026", title: "Good Clinical Practice (ICH E6-based, 6 hours)", issuer: "NIDA Clinical Trials Network. Valid to Nov 2029." },
    { date: "Sep 2026", title: "Advanced Certification in Pharmacovigilance and Drug Safety", issuer: "Udemy", link: "https://ude.my/UC-2123b19d-a149-47e4-9c54-7ddde9845c55" },
    { date: "Dec 2025", title: "Introduction to Good Clinical Practice", issuer: "Novartis, via Coursera", link: "https://www.coursera.org/account/accomplishments/records/R5FQWFGN99EI" },
    { date: "Nov 2025", title: "Cancer Genomics workshop", issuer: "Decode Life" },
    { date: "Mar 2025", title: "Molecular Biology Techniques", issuer: "Uyirgene International" },
    { date: "Sep 2024", title: "Root Cause Analysis", issuer: "Food Standards Agency" },
    { date: "Jul 2024", title: "Protein structure, QSAR, PyMOL, Unix, Python and molecular docking workshop", issuer: "Decode Life" }
  ],
  /* My path: one box per step, oldest first. state: done | now | goal */
  path: [
    { title: "BTech Biotechnology", meta: "Anna University, 2022", state: "done" },
    { title: "MSc Medical Biotechnology", meta: "Edinburgh Napier University, 2024", state: "done" },
    { title: "Duty manager, team of 15+", meta: "SSP Group, 2024 to 2026", state: "done" },
    { title: "Pharmacovigilance and Drug Safety certification", meta: "Udemy, Sep 2026", state: "done" },
    { title: "Good Clinical Practice certificate", meta: "NIDA Clinical Trials Network, Nov 2026", state: "done" },
    { title: "Clinical research diploma and PV internship", meta: "LLRI and Workora, now", state: "now" },
    { title: "Pharmacovigilance, clinical research and clinical data roles", meta: "India. Also lab, research and funded PhD roles.", state: "goal" }
  ],

  /* Skill map. "skill" must match a skill name above exactly: its status is taken from there,
     so the map never disagrees with your list. hub: which group it hangs from. */
  network: {
    hubs: [
      { id: "cr", label: "Clinical research", x: 0.30, y: 0.30 },
      { id: "ds", label: "Drug safety", x: 0.72, y: 0.30 },
      { id: "lab", label: "Laboratory", x: 0.27, y: 0.70 },
      { id: "da", label: "Data", x: 0.72, y: 0.70 }
    ],
    nodes: [
      { label: "ICH-GCP", skill: "ICH-GCP", hub: "cr", angle: -2.5 },
      { label: "Data management", skill: "Clinical data management", hub: "cr", angle: -1.2 },
      { label: "Pharmacovigilance", skill: "Pharmacovigilance and drug safety", hub: "ds", angle: -0.7 },
      { label: "ICSR", skill: "ICSR processing and ADR reporting", hub: "ds", angle: -1.9 },
      { label: "MedDRA", skill: "MedDRA coding", hub: "ds", angle: 0.2 },
      { label: "Causality", skill: "Causality assessment", hub: "ds", angle: 1.0 },
      { label: "A549 cells", skill: "A549 mammalian cell culture", hub: "lab", angle: 3.0 },
      { label: "ELISA, WST-1", skill: "ELISA (IL-8) and WST-1 viability assays", hub: "lab", angle: 2.2 },
      { label: "HPLC, FTIR", skill: "HPLC, FTIR and dissolution testing", hub: "lab", angle: -3.0 },
      { label: "GraphPad", skill: "GraphPad Prism", hub: "da", angle: 1.4 },
      { label: "Excel", skill: "Excel", hub: "da", angle: 0.4 },
      { label: "SQL", skill: "SQL", hub: "da", angle: 2.0 }
    ],
    links: [["cr","ds"],["cr","lab"],["cr","da"],["ds","da"],["lab","da"],
            ["ICH-GCP","Pharmacovigilance"],["Data management","SQL"],["Data management","Excel"],
            ["ICSR","MedDRA"],["MedDRA","Causality"],["GraphPad","ELISA, WST-1"],["A549 cells","ELISA, WST-1"]]
  },

  /* Courses. status: done | progress | planned. Each card opens a short detail window. */
  courses: [
    { status: "progress", title: "ICH-GCP E6(R3) training", provider: "The Global Health Network, University of Oxford", date: "In progress",
      summary: "Training in the current ICH Good Clinical Practice guideline for clinical trials.",
      use: "Builds on my earlier GCP certificates and covers the revised guideline employers now expect.", tags: ["GCP", "ICH E6(R3)"] },
    { status: "progress", title: "Introduction to the Principles and Practice of Clinical Research", provider: "National Institutes of Health (NIH)", date: "In progress",
      summary: "A free NIH online course on how clinical research is designed, run and reviewed.",
      use: "Gives me the wider clinical research background behind drug safety work.", tags: ["Clinical research", "Study design"] },
    { status: "progress", title: "Pro Advanced Diploma in Clinical Research", provider: "LLRI (Learning Labb Research Institute)", date: "Oct 2026 to Mar 2027",
      summary: "One area a month: clinical research, pharmacovigilance, clinical data management, regulatory affairs and medical writing.",
      use: "The backbone of my learning plan. Classes run on weekday evenings.", tags: ["Clinical research", "PV", "CDM", "Regulatory", "Medical writing"] },
    { status: "progress", title: "Pharmacovigilance virtual internship", provider: "Workora", date: "Nov to Dec 2026",
      summary: "Project-based pharmacovigilance tasks, each reviewed by the Workora team. Graduation 16 Dec 2026.",
      use: "My practice ground for case processing, MedDRA coding and causality assessment.", tags: ["ICSR", "MedDRA", "Causality"] },
    { status: "done", title: "Good Clinical Practice (ICH E6-based, 6 hours)", provider: "NIDA Clinical Trials Network", date: "Nov 2026",
      summary: "Six-hour GCP course based on ICH E6. Certificate valid to Nov 2029.",
      use: "Meets the GCP requirement listed in most clinical research job posts.", tags: ["GCP", "ICH E6"] },
    { status: "done", title: "Advanced Certification in Pharmacovigilance and Drug Safety", provider: "Udemy", date: "Sep 2026",
      summary: "An introduction to pharmacovigilance and drug safety.",
      use: "Foundation for the ICSR, MedDRA and causality work in my internship and diploma.", tags: ["Pharmacovigilance", "Drug safety"] },
    { status: "done", title: "Introduction to Good Clinical Practice", provider: "Novartis, via Coursera", date: "Dec 2025",
      summary: "A short introduction to GCP from an industry sponsor.",
      use: "My first GCP course. Later courses go deeper.", tags: ["GCP"] },
    { status: "done", title: "Root Cause Analysis", provider: "Food Standards Agency", date: "Sep 2024",
      summary: "Finding the underlying cause of an incident, not just the visible problem.",
      use: "Links to my incident documentation work, and to CAPA thinking in quality roles.", tags: ["Root cause analysis", "Quality"] },
    { status: "planned", title: "WHO Research Ethics Online Training", provider: "World Health Organization", date: "Planned",
      summary: "A free course on ethics in health research.",
      use: "Adds an ethics certificate to my GCP and clinical research training.", tags: ["Research ethics"] }
  ]
};
