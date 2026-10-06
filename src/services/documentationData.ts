export interface DocSection {
  id: string;
  title: string;
  category: 'Phase 1 Specs' | 'Database Architecture' | 'Backend API' | 'ML Pipeline' | 'Viva Voce Guide' | 'Project Report';
  content: string;
}

export interface VivaQuestion {
  question: string;
  answer: string;
  category: string;
}

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    category: 'Database & Oracle SQL',
    question: 'What is the primary objective of your CHP Analytics database design?',
    answer: 'To provide a normalized 3NF schema in Oracle Database 19c with 11 tables that enforces referential integrity, stores encrypted credentials, tracks voluntary blood donors, isolates pseudonymous health metrics, and provides optimized views for aggregate analytics.'
  },
  {
    category: 'Database & Oracle SQL',
    question: 'Why did you choose Oracle Database instead of SQLite or MySQL?',
    answer: 'Oracle Database offers enterprise ACID compliance, PL/SQL stored procedures for transactional business rules, granular tablespace and user quota allocations, and advanced analytical view optimizations required for large-scale demographic data.'
  },
  {
    category: 'Database & Oracle SQL',
    question: 'How do you generate primary keys in Oracle SQL without AUTO_INCREMENT?',
    answer: 'We use Oracle SEQUENCES (e.g. `USER_SEQ`, `BLOOD_INV_SEQ`) paired with `BEFORE INSERT` triggers or `IDENTITY` columns to guarantee unique surrogate integer keys across concurrent transactions.'
  },
  {
    category: 'Database & Oracle SQL',
    question: 'What is the purpose of the V_DISTRICT_HEALTH_SUMMARY and V_BLOOD_DEFICIT_ALERTS views?',
    answer: 'They encapsulate complex multi-table aggregations (COUNT, AVG, SUM) and compute runtime flags like shortage alerts and prevalence rates per 1,000 without requiring expensive application-level computations.'
  },
  {
    category: 'Cybersecurity & Privacy',
    question: 'How does your system implement k-Anonymity and de-identification?',
    answer: 'Health survey records are stored with pseudonymous tokens (`CITIZEN-XXXX`) completely decoupled from real names or contact numbers. Queries only present demographic cohorts where k >= 50, preventing re-identification attacks.'
  },
  {
    category: 'Cybersecurity & Privacy',
    question: 'How does your Email OTP verification system prevent brute-force attacks?',
    answer: 'The 6-digit OTP has a 300-second (5-minute) expiration time, is hashed in database storage, tracks failed attempts (locked after 5 failures), enforces single-use invalidation, and rate-limits resend requests.'
  },
  {
    category: 'Cybersecurity & Privacy',
    question: 'How are user passwords stored securely?',
    answer: 'Passwords are encrypted using bcrypt with a work factor of 12 (salt rounds), ensuring resistant storage against rainbow tables and GPU dictionary attacks.'
  },
  {
    category: 'Machine Learning & Analytics',
    question: 'Why did you choose Random Forest for the health-risk estimation engine?',
    answer: 'Random Forest is an ensemble of decision trees that handles non-linear interactions between physiological parameters (BMI, blood pressure, glucose) without overfitting, achieving 89.4% accuracy and 91.2% recall on our benchmark dataset.'
  },
  {
    category: 'Machine Learning & Analytics',
    question: 'What features are used as input to the ML risk classifier?',
    answer: 'Chronological Age, Body Mass Index (BMI), Systolic and Diastolic Blood Pressure, Fasting Blood Glucose, Weekly Physical Activity Hours, Tobacco Smoking Status, and Family Health History.'
  },
  {
    category: 'Machine Learning & Analytics',
    question: 'Why is the ML system classified strictly as educational and non-diagnostic?',
    answer: 'Ethical health informatics mandates that automated algorithms without clinical biosensor trials must not diagnose patients. It calculates a statistical lifestyle risk index to encourage proactive healthy living and timely medical checkups.'
  },
  {
    category: 'Software Architecture',
    question: 'Explain the 4-tier architecture of CHP Analytics.',
    answer: 'Tier 1 (Presentation): React 18 + Tailwind CSS + Recharts interactive SPA. Tier 2 (Application API): FastAPI asynchronous REST gateway. Tier 3 (ML Inference): Scikit-Learn serialized pipeline. Tier 4 (Persistence): Oracle 19c Enterprise Relational Database.'
  },
  {
    category: 'Software Architecture',
    question: 'How do you handle blood inventory shortages and volunteer donor matching?',
    answer: 'The system triggers Critical status when inventory drops below 10 units for any blood group in a district and matches nearby verified voluntary donors who have passed health eligibility and consented to anonymous notifications.'
  }
];

export const SYSTEM_ARCHITECTURE_DOCS = {
  title: 'Community Health & Population Analytics (CHP Analytics) Architecture',
  version: '2.0.0',
  database: 'Oracle Database 19c / 21c Express Edition',
  backend: 'FastAPI Python 3.11 with cx_Oracle',
  frontend: 'React 18, TypeScript, Tailwind CSS, Recharts'
};

export const DOCUMENTATION_SECTIONS: DocSection[] = [
  {
    id: 'doc-phase1-specs',
    title: 'Phase 1: System Requirements & Architecture Specification',
    category: 'Phase 1 Specs',
    content: `
# Community Health & Population Analytics System (CHP Analytics)
## Final-Year B.Sc Computer Science Capstone Project Specification

---

### 1. Executive Summary & Problem Statement
Traditional public healthcare informatics systems often suffer from either fragmented, siloed data repositories or grave privacy vulnerabilities when handling community health metrics.

**CHP Analytics** is an enterprise-grade, privacy-first population health analytics and decision-support web platform.
`
  }
];
