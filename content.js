/*
  EDIT THIS FILE TO UPDATE YOUR SITE.
  Everything below (hero evidence, roadmap, skills, work, experience, credentials, contact)
  is shown on the page automatically. Keep the commas and quote marks as they are.
  After editing, upload content.js to GitHub (replace the old file). See UPDATE-GUIDE.md.
*/
window.SITE = {
  updated: "21 Nov 2026",

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
    { group: "Laboratory", items: [
      { name: "A549 mammalian cell culture", status: "practised" },
      { name: "ELISA (IL-8) and WST-1 viability assays", status: "practised" },
      { name: "HPLC, FTIR and dissolution testing", status: "practised" },
      { name: "Microbial limit testing", status: "practised" },
      { name: "DLS and UV spectroscopy", status: "practised" },
      { name: "GLP-style documentation", status: "practised" },
      { name: "PCR and western blotting", status: "coursework" }
    ]},
    { group: "Clinical research and drug safety", items: [
      { name: "ICH-GCP", status: "certified" },
      { name: "Pharmacovigilance and drug safety", status: "certified" },
      { name: "ICSR processing and ADR reporting", status: "training" },
      { name: "MedDRA coding", status: "training" },
      { name: "Causality assessment", status: "training" },
      { name: "Clinical data management", status: "training" },
      { name: "Regulatory affairs", status: "training" },
      { name: "Medical writing", status: "training" }
    ]},
    { group: "Data and tools", items: [
      { name: "GraphPad Prism", status: "practised" },
      { name: "Geneious and antiSMASH", status: "practised" },
      { name: "PyMOL and UCSF Chimera", status: "coursework" },
      { name: "Excel", status: "learning" },
      { name: "SQL", status: "learning" },
      { name: "Python and R", status: "learning" },
      { name: "Power BI", status: "learning" }
    ]},
    { group: "Quality and operations", items: [
      { name: "Leading a team of 15+", status: "practised" },
      { name: "Incident documentation and escalation", status: "practised" },
      { name: "Training and competency records", status: "practised" },
      { name: "Root cause analysis", status: "certified" }
    ]}
  ],

  /* Research and projects. state: done | planned. Add link: "https://..." when something is published. */
  work: [
    {
      state: "done", period: "2023 to 2024", kind: "Master's dissertation",
      title: "Silver nanoparticles, nanocellulose and A549 lung epithelial cells",
      summary: "Tested cell viability (WST-1) and inflammatory response (IL-8 ELISA) in A549 cells exposed to silver nanoparticles and nanocellulose, alone and with LPS. Treatments were run in triplicate and analysed in GraphPad Prism.",
      tags: ["Cell culture", "ELISA", "WST-1", "GraphPad Prism"]
    },
    {
      state: "done", period: "Jan to Jul 2024", kind: "Research scholar, remote",
      title: "Multi-omics and machine-learning-assisted anti-malarial research",
      summary: "Supported a Gen'Omics Research Hub programme on anti-malarial peptide discovery: read trimming, genome assembly and contig extraction from whole-genome sequencing data of multidrug-resistant bacteria, and biosynthetic gene cluster analysis with antiSMASH.",
      tags: ["Whole-genome sequencing", "Geneious", "antiSMASH"]
    },
    {
      state: "done", period: "2021 to 2022", kind: "Undergraduate project",
      title: "Biosynthesised iron oxide nanoparticles and molecular docking",
      summary: "Plant-extract synthesis of iron oxide nanoparticles, characterisation (UV spectroscopy, DLS, FTIR), pharmacological assays, and docking studies against hepatocellular carcinoma targets.",
      tags: ["Nanoparticles", "DLS", "FTIR", "Molecular docking"]
    },
    {
      state: "planned", period: "Planned for Dec 2026", kind: "Pharmacovigilance",
      title: "Practice case portfolio",
      summary: "Eight to ten adverse event reports from public sources, each with a narrative, MedDRA coding and a causality assessment. No patient data.",
      tags: ["ICSR", "MedDRA", "Causality"]
    },
    {
      state: "planned", period: "Planned", kind: "Data",
      title: "Drug safety dashboard with public openFDA data",
      summary: "An educational dashboard, not a validated pharmacovigilance system. Reports on it do not establish causality or incidence.",
      tags: ["Python", "openFDA"], link: "https://open.fda.gov/", linkText: "About openFDA"
    },
    {
      state: "planned", period: "Planned", kind: "Clinical data management",
      title: "eCRF and data validation case study",
      summary: "A synthetic-data exercise covering eCRF structure, edit checks and query resolution.",
      tags: ["CRF design", "Edit checks", "Queries"]
    }
  ],

  /* Experience, newest first. */
  experience: [
    { date: "Oct 2026 to present", role: "Clinical research trainee", org: "LLRI (Learning Labb Research Institute), remote",
      text: "Pro Advanced Diploma training across pharmacovigilance, clinical research, clinical data management, regulatory affairs and medical writing." },
    { date: "Nov to Dec 2026", role: "Pharmacovigilance virtual intern", org: "Workora, remote",
      text: "Hands-on, project-based pharmacovigilance tasks, each submission reviewed by the Workora team. Graduation 16 Dec 2026." },
    { date: "Jul to Nov 2026", role: "Generalist expert", org: "Mercor, part-time, remote",
      text: "Reviewed written content against detailed guidelines for accuracy, clarity and logical consistency, and gave structured feedback to weekly deadlines." },
    { date: "Sep 2024 to Aug 2026", role: "Duty manager", org: "SSP Group plc, Edinburgh, UK",
      text: "Ran daily operations and a team of 15+ in a regulated, time-critical environment. Kept compliance, training and competency records and incident documentation, and stayed audit-ready." },
    { date: "Jan to Jul 2024", role: "Research scholar", org: "Gen'Omics Research Hub (Genomac Hub), remote",
      text: "Whole-genome sequencing analysis of multidrug-resistant bacteria and machine-learning-assisted peptide prediction for anti-malarial research." },
    { date: "Aug 2021", role: "Quality control laboratory intern", org: "Synthyia Research Labs Pvt. Ltd., Puducherry",
      text: "HPLC, dissolution, FTIR, friability, disintegration and microbial limit testing with GLP-compliant documentation." }
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
    { date: "Sep 2026", title: "Advanced Certification in Pharmacovigilance and Drug Safety", issuer: "Udemy" },
    { date: "Dec 2025", title: "Introduction to Good Clinical Practice", issuer: "Novartis, via Coursera" },
    { date: "Nov 2025", title: "Cancer Genomics workshop", issuer: "Decode Life" },
    { date: "Mar 2025", title: "Molecular Biology Techniques", issuer: "Uyirgene International" },
    { date: "Sep 2024", title: "Root Cause Analysis", issuer: "Food Standards Agency" },
    { date: "Jul 2024", title: "Protein structure, QSAR, PyMOL, Unix, Python and molecular docking workshop", issuer: "Decode Life" }
  ]
};
