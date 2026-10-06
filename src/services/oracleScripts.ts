export interface OracleScriptFile {
  filename: string;
  title: string;
  description: string;
  code: string;
}

export const ORACLE_SQL_SCRIPTS: OracleScriptFile[] = [
  {
    filename: '01_create_user.sql',
    title: '01. Oracle Tablespace, User & Privileges',
    description: 'Creates the CHP_ADMIN database user, dedicated tablespace, quota, and assigns necessary system & object privileges for SQL*Plus.',
    code: `-- ============================================================================
-- SCRIPT: 01_create_user.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- TARGET DATABASE: Oracle Database 19c / 21c / 23c (Enterprise or XE)
-- EXECUTION: SQL*Plus (Connect as SYSDBA or SYSTEM)
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON
SET SERVEROUTPUT ON

PROMPT ========================================================================
PROMPT STEP 1: Creating Dedicated Tablespace and Application User for CHP
PROMPT ========================================================================

-- Create dedicated tablespace (optional in PDB, customize path as required)
-- CREATE TABLESPACE chp_data_tbs 
--   DATAFILE 'chp_data01.dbf' SIZE 100M AUTOEXTEND ON NEXT 50M MAXSIZE 2G;

-- Drop user if re-running clean setup
BEGIN
   EXECUTE IMMEDIATE 'DROP USER chp_admin CASCADE';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -1918 THEN
         RAISE;
      END IF;
END;
/

-- Create CHP Schema User
CREATE USER chp_admin IDENTIFIED BY "ChpSecure2026#Db"
   DEFAULT TABLESPACE USERS
   TEMPORARY TABLESPACE TEMP
   QUOTA UNLIMITED ON USERS;

PROMPT Granting System Privileges to chp_admin...
GRANT CREATE SESSION TO chp_admin;
GRANT CREATE TABLE TO chp_admin;
GRANT CREATE VIEW TO chp_admin;
GRANT CREATE SEQUENCE TO chp_admin;
GRANT CREATE PROCEDURE TO chp_admin;
GRANT CREATE TRIGGER TO chp_admin;
GRANT CREATE SYNONYM TO chp_admin;
GRANT CREATE TYPE TO chp_admin;

PROMPT Setup completed successfully.
PROMPT Connect as: CONNECT chp_admin/"ChpSecure2026#Db"@localhost:1521/XEPDB1;
-- ============================================================================`
  },
  {
    filename: '02_create_tables.sql',
    title: '02. Table DDL Definitions',
    description: 'Creates 11 normalized tables with Oracle native data types (VARCHAR2, NUMBER, TIMESTAMP, CLOB, CHAR) and inline constraints.',
    code: `-- ============================================================================
-- SCRIPT: 02_create_tables.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus (Connected as chp_admin)
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 2: Creating 11 Normalized Relational Tables for CHP Analytics
PROMPT ========================================================================

-- 1. USERS TABLE
CREATE TABLE USERS (
    user_id          VARCHAR2(36) PRIMARY KEY,
    full_name        VARCHAR2(100) NOT NULL,
    email            VARCHAR2(150) NOT NULL UNIQUE,
    password_hash    VARCHAR2(255) NOT NULL,
    role             VARCHAR2(20) DEFAULT 'USER' NOT NULL,
    age              NUMBER(3),
    gender           VARCHAR2(20),
    district         VARCHAR2(50) NOT NULL,
    is_verified      CHAR(1) DEFAULT 'N' NOT NULL,
    is_active        CHAR(1) DEFAULT 'Y' NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_user_role CHECK (role IN ('USER', 'ADMIN', 'ANALYST')),
    CONSTRAINT chk_user_gender CHECK (gender IN ('Male', 'Female', 'Other', 'Prefer not to say', NULL)),
    CONSTRAINT chk_user_verified CHECK (is_verified IN ('Y', 'N')),
    CONSTRAINT chk_user_active CHECK (is_active IN ('Y', 'N')),
    CONSTRAINT chk_user_age CHECK (age >= 0 AND age <= 125)
);

-- 2. CONSENTS TABLE (GDPR / Health Data Privacy Compliance)
CREATE TABLE CONSENTS (
    consent_id       VARCHAR2(36) PRIMARY KEY,
    user_id          VARCHAR2(36) NOT NULL,
    consent_type     VARCHAR2(50) NOT NULL,
    is_granted       CHAR(1) DEFAULT 'Y' NOT NULL,
    ip_address       VARCHAR2(45),
    granted_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    revoked_at       TIMESTAMP,
    CONSTRAINT chk_consent_granted CHECK (is_granted IN ('Y', 'N'))
);

-- 3. POPULATION TABLE (Aggregated Demographic Micro-Data)
CREATE TABLE POPULATION (
    population_id    VARCHAR2(36) PRIMARY KEY,
    age_group        VARCHAR2(30) NOT NULL,
    gender           VARCHAR2(20) NOT NULL,
    district         VARCHAR2(50) NOT NULL,
    area             VARCHAR2(100) NOT NULL,
    occupation       VARCHAR2(100),
    education        VARCHAR2(100),
    family_size      NUMBER(3) DEFAULT 1 NOT NULL,
    reported_year    NUMBER(4) NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_pop_age_group CHECK (age_group IN ('0-14 (Children)', '15-24 (Youth)', '25-59 (Adults)', '60+ (Seniors)')),
    CONSTRAINT chk_pop_gender CHECK (gender IN ('Male', 'Female', 'Other')),
    CONSTRAINT chk_pop_family_size CHECK (family_size > 0)
);

-- 4. DISEASES TABLE (Health Knowledge Base & Factsheets)
CREATE TABLE DISEASES (
    disease_id       VARCHAR2(36) PRIMARY KEY,
    disease_code     VARCHAR2(20) UNIQUE NOT NULL,
    disease_name     VARCHAR2(150) NOT NULL,
    category         VARCHAR2(50) NOT NULL,
    description      VARCHAR2(1000) NOT NULL,
    risk_factors     VARCHAR2(2000) NOT NULL,
    symptoms         VARCHAR2(2000) NOT NULL,
    prevention       VARCHAR2(2000) NOT NULL,
    when_seek_care   VARCHAR2(1000) NOT NULL,
    prevalence_index NUMBER(5,2) DEFAULT 0.0,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. HEALTH_RESOURCES & SOURCES TABLE
CREATE TABLE HEALTH_SOURCES (
    source_id        VARCHAR2(36) PRIMARY KEY,
    source_name      VARCHAR2(150) NOT NULL,
    organization     VARCHAR2(200) NOT NULL,
    source_type      VARCHAR2(50) NOT NULL,
    website_url      VARCHAR2(500) NOT NULL,
    description      VARCHAR2(1000),
    trust_score      NUMBER(3) DEFAULT 95 NOT NULL,
    is_active        CHAR(1) DEFAULT 'Y' NOT NULL
);

-- 6. HEALTH_RECORDS TABLE (De-identified Health Analytics Records)
CREATE TABLE HEALTH_RECORDS (
    record_id        VARCHAR2(36) PRIMARY KEY,
    anonymous_id     VARCHAR2(50) NOT NULL,
    disease_id       VARCHAR2(36) NOT NULL,
    age_group        VARCHAR2(30) NOT NULL,
    gender           VARCHAR2(20) NOT NULL,
    district         VARCHAR2(50) NOT NULL,
    severity         VARCHAR2(20) DEFAULT 'Moderate' NOT NULL,
    reported_year    NUMBER(4) NOT NULL,
    consent_status   CHAR(1) DEFAULT 'Y' NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_hr_severity CHECK (severity IN ('Mild', 'Moderate', 'Severe')),
    CONSTRAINT chk_hr_consent CHECK (consent_status IN ('Y', 'N'))
);

-- 7. BLOOD_INVENTORY TABLE
CREATE TABLE BLOOD_INVENTORY (
    inventory_id     VARCHAR2(36) PRIMARY KEY,
    blood_group      VARCHAR2(5) NOT NULL,
    available_units  NUMBER(6) DEFAULT 0 NOT NULL,
    district         VARCHAR2(50) NOT NULL,
    hospital_name    VARCHAR2(150) NOT NULL,
    status           VARCHAR2(20) DEFAULT 'Available' NOT NULL,
    last_updated     TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_blood_group CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    CONSTRAINT chk_blood_status CHECK (status IN ('Available', 'Low', 'Critical')),
    CONSTRAINT chk_blood_units CHECK (available_units >= 0)
);

-- 8. BLOOD_DONORS TABLE (Voluntary Donor Registry)
CREATE TABLE BLOOD_DONORS (
    donor_id         VARCHAR2(36) PRIMARY KEY,
    user_id          VARCHAR2(36) NOT NULL,
    donor_code       VARCHAR2(20) UNIQUE NOT NULL,
    blood_group      VARCHAR2(5) NOT NULL,
    district         VARCHAR2(50) NOT NULL,
    area             VARCHAR2(100) NOT NULL,
    availability     VARCHAR2(30) DEFAULT 'Available' NOT NULL,
    last_donation    DATE,
    total_donations  NUMBER(4) DEFAULT 0 NOT NULL,
    consent_flag     CHAR(1) DEFAULT 'Y' NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_donor_bg CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    CONSTRAINT chk_donor_avail CHECK (availability IN ('Available', 'Unavailable', 'Temporarily Ineligible')),
    CONSTRAINT chk_donor_consent CHECK (consent_flag IN ('Y', 'N'))
);

-- 9. OTP_VERIFICATIONS TABLE (Single-use Secure OTP Storage)
CREATE TABLE OTP_VERIFICATIONS (
    otp_id           VARCHAR2(36) PRIMARY KEY,
    email            VARCHAR2(150) NOT NULL,
    otp_code_hash    VARCHAR2(255) NOT NULL,
    purpose          VARCHAR2(30) DEFAULT 'REGISTRATION' NOT NULL,
    expires_at       TIMESTAMP NOT NULL,
    is_used          CHAR(1) DEFAULT 'N' NOT NULL,
    attempt_count    NUMBER(2) DEFAULT 0 NOT NULL,
    resend_count     NUMBER(2) DEFAULT 0 NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_otp_used CHECK (is_used IN ('Y', 'N')),
    CONSTRAINT chk_otp_purpose CHECK (purpose IN ('REGISTRATION', 'PASSWORD_RESET', 'EMAIL_CHANGE'))
);

-- 10. PASSWORD_RESETS TABLE
CREATE TABLE PASSWORD_RESETS (
    reset_id         VARCHAR2(36) PRIMARY KEY,
    email            VARCHAR2(150) NOT NULL,
    token_hash       VARCHAR2(255) NOT NULL,
    expires_at       TIMESTAMP NOT NULL,
    is_consumed      CHAR(1) DEFAULT 'N' NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_reset_consumed CHECK (is_consumed IN ('Y', 'N'))
);

-- 11. AUDIT_LOGS TABLE (Security & Access Telemetry)
CREATE TABLE AUDIT_LOGS (
    log_id           VARCHAR2(36) PRIMARY KEY,
    user_id          VARCHAR2(36),
    user_email       VARCHAR2(150),
    action           VARCHAR2(100) NOT NULL,
    category         VARCHAR2(50) NOT NULL,
    status           VARCHAR2(20) NOT NULL,
    ip_address       VARCHAR2(45),
    details          VARCHAR2(2000),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT chk_audit_status CHECK (status IN ('SUCCESS', 'WARNING', 'FAILURE'))
);

PROMPT Tables created successfully.
-- ============================================================================`
  },
  {
    filename: '03_constraints.sql',
    title: '03. Foreign Key Constraints & Integrity Rules',
    description: 'Defines Foreign Keys linking USERS, CONSENTS, HEALTH_RECORDS, DISEASES, BLOOD_DONORS, and AUDIT_LOGS.',
    code: `-- ============================================================================
-- SCRIPT: 03_constraints.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 3: Applying Foreign Key Constraints and Referential Integrity
PROMPT ========================================================================

-- FK: CONSENTS -> USERS
ALTER TABLE CONSENTS
    ADD CONSTRAINT fk_consents_user
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
    ON DELETE CASCADE;

-- FK: HEALTH_RECORDS -> DISEASES
ALTER TABLE HEALTH_RECORDS
    ADD CONSTRAINT fk_hr_disease
    FOREIGN KEY (disease_id) REFERENCES DISEASES(disease_id);

-- FK: BLOOD_DONORS -> USERS
ALTER TABLE BLOOD_DONORS
    ADD CONSTRAINT fk_donors_user
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
    ON DELETE CASCADE;

-- FK: AUDIT_LOGS -> USERS (Set null on user deletion to preserve audit history)
ALTER TABLE AUDIT_LOGS
    ADD CONSTRAINT fk_audit_user
    FOREIGN KEY (user_id) REFERENCES USERS(user_id)
    ON DELETE SET NULL;

-- CHECK CONSTRAINT: 38 Valid Tamil Nadu Districts for USERS, POPULATION, HEALTH_RECORDS, BLOOD_INVENTORY, BLOOD_DONORS
ALTER TABLE USERS
    ADD CONSTRAINT chk_users_tn_district CHECK (district IN (
        'ARIYALUR', 'CHENGALPATTU', 'CHENNAI', 'COIMBATORE', 'CUDDALORE',
        'DHARMAPURI', 'DINDIGUL', 'ERODE', 'KALLAKURICHI', 'KANCHEEPURAM',
        'KANYAKUMARI', 'KARUR', 'KRISHNAGIRI', 'MADURAI', 'MAYILADUTHURAI',
        'NAGAPATTINAM', 'NAMAKKAL', 'NILGIRIS', 'PERAMBALUR', 'PUDUKKOTTAI',
        'RAMANATHAPURAM', 'RANIPET', 'SALEM', 'SIVAGANGA', 'TENKASI',
        'THANJAVUR', 'THENI', 'THOOTHUKUDI', 'TIRUCHIRAPPALLI', 'TIRUNELVELI',
        'TIRUPATHUR', 'TIRUPPUR', 'TIRUVALLUR', 'TIRUVANNAMALAI', 'TIRUVARUR',
        'VELLORE', 'VILUPPURAM', 'VIRUDHUNAGAR'
    ));

ALTER TABLE POPULATION
    ADD CONSTRAINT chk_pop_tn_district CHECK (district IN (
        'ARIYALUR', 'CHENGALPATTU', 'CHENNAI', 'COIMBATORE', 'CUDDALORE',
        'DHARMAPURI', 'DINDIGUL', 'ERODE', 'KALLAKURICHI', 'KANCHEEPURAM',
        'KANYAKUMARI', 'KARUR', 'KRISHNAGIRI', 'MADURAI', 'MAYILADUTHURAI',
        'NAGAPATTINAM', 'NAMAKKAL', 'NILGIRIS', 'PERAMBALUR', 'PUDUKKOTTAI',
        'RAMANATHAPURAM', 'RANIPET', 'SALEM', 'SIVAGANGA', 'TENKASI',
        'THANJAVUR', 'THENI', 'THOOTHUKUDI', 'TIRUCHIRAPPALLI', 'TIRUNELVELI',
        'TIRUPATHUR', 'TIRUPPUR', 'TIRUVALLUR', 'TIRUVANNAMALAI', 'TIRUVARUR',
        'VELLORE', 'VILUPPURAM', 'VIRUDHUNAGAR'
    ));

ALTER TABLE HEALTH_RECORDS
    ADD CONSTRAINT chk_hr_tn_district CHECK (district IN (
        'ARIYALUR', 'CHENGALPATTU', 'CHENNAI', 'COIMBATORE', 'CUDDALORE',
        'DHARMAPURI', 'DINDIGUL', 'ERODE', 'KALLAKURICHI', 'KANCHEEPURAM',
        'KANYAKUMARI', 'KARUR', 'KRISHNAGIRI', 'MADURAI', 'MAYILADUTHURAI',
        'NAGAPATTINAM', 'NAMAKKAL', 'NILGIRIS', 'PERAMBALUR', 'PUDUKKOTTAI',
        'RAMANATHAPURAM', 'RANIPET', 'SALEM', 'SIVAGANGA', 'TENKASI',
        'THANJAVUR', 'THENI', 'THOOTHUKUDI', 'TIRUCHIRAPPALLI', 'TIRUNELVELI',
        'TIRUPATHUR', 'TIRUPPUR', 'TIRUVALLUR', 'TIRUVANNAMALAI', 'TIRUVARUR',
        'VELLORE', 'VILUPPURAM', 'VIRUDHUNAGAR'
    ));

ALTER TABLE BLOOD_INVENTORY
    ADD CONSTRAINT chk_bi_tn_district CHECK (district IN (
        'ARIYALUR', 'CHENGALPATTU', 'CHENNAI', 'COIMBATORE', 'CUDDALORE',
        'DHARMAPURI', 'DINDIGUL', 'ERODE', 'KALLAKURICHI', 'KANCHEEPURAM',
        'KANYAKUMARI', 'KARUR', 'KRISHNAGIRI', 'MADURAI', 'MAYILADUTHURAI',
        'NAGAPATTINAM', 'NAMAKKAL', 'NILGIRIS', 'PERAMBALUR', 'PUDUKKOTTAI',
        'RAMANATHAPURAM', 'RANIPET', 'SALEM', 'SIVAGANGA', 'TENKASI',
        'THANJAVUR', 'THENI', 'THOOTHUKUDI', 'TIRUCHIRAPPALLI', 'TIRUNELVELI',
        'TIRUPATHUR', 'TIRUPPUR', 'TIRUVALLUR', 'TIRUVANNAMALAI', 'TIRUVARUR',
        'VELLORE', 'VILUPPURAM', 'VIRUDHUNAGAR'
    ));

ALTER TABLE BLOOD_DONORS
    ADD CONSTRAINT chk_bd_tn_district CHECK (district IN (
        'ARIYALUR', 'CHENGALPATTU', 'CHENNAI', 'COIMBATORE', 'CUDDALORE',
        'DHARMAPURI', 'DINDIGUL', 'ERODE', 'KALLAKURICHI', 'KANCHEEPURAM',
        'KANYAKUMARI', 'KARUR', 'KRISHNAGIRI', 'MADURAI', 'MAYILADUTHURAI',
        'NAGAPATTINAM', 'NAMAKKAL', 'NILGIRIS', 'PERAMBALUR', 'PUDUKKOTTAI',
        'RAMANATHAPURAM', 'RANIPET', 'SALEM', 'SIVAGANGA', 'TENKASI',
        'THANJAVUR', 'THENI', 'THOOTHUKUDI', 'TIRUCHIRAPPALLI', 'TIRUNELVELI',
        'TIRUPATHUR', 'TIRUPPUR', 'TIRUVALLUR', 'TIRUVANNAMALAI', 'TIRUVARUR',
        'VELLORE', 'VILUPPURAM', 'VIRUDHUNAGAR'
    ));

PROMPT Foreign key constraints and Tamil Nadu district check rules applied successfully.
-- ============================================================================`
  },
  {
    filename: '04_sequences.sql',
    title: '04. Oracle Sequences & Identity Helpers',
    description: 'Defines standard Oracle sequences for donor code generation and audit sequencing.',
    code: `-- ============================================================================
-- SCRIPT: 04_sequences.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 4: Creating Sequences and Auto-Number Generators
PROMPT ========================================================================

-- Sequence for Donor Codes (e.g. DONOR-1001, DONOR-1002...)
CREATE SEQUENCE seq_donor_code
    START WITH 1001
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- Sequence for Anonymous Citizen Identifiers (e.g. CITIZEN-5001...)
CREATE SEQUENCE seq_citizen_code
    START WITH 5001
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- Sequence for Global Audit IDs
CREATE SEQUENCE seq_audit_num
    START WITH 1
    INCREMENT BY 1
    CACHE 20
    NOCYCLE;

PROMPT Sequences created successfully.
-- ============================================================================`
  },
  {
    filename: '05_indexes.sql',
    title: '05. High-Performance B-Tree Indexes',
    description: 'Creates optimized indexes on frequently filtered and aggregated columns (district, blood group, disease_id, email, timestamps).',
    code: `-- ============================================================================
-- SCRIPT: 05_indexes.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 5: Creating Indexes for Performance Optimization
PROMPT ========================================================================

-- Users index
CREATE INDEX idx_users_email ON USERS(email);
CREATE INDEX idx_users_district ON USERS(district);
CREATE INDEX idx_users_role ON USERS(role);

-- Population analytics index
CREATE INDEX idx_pop_district_age ON POPULATION(district, age_group);
CREATE INDEX idx_pop_gender ON POPULATION(gender);

-- Health records index
CREATE INDEX idx_hr_disease_dist ON HEALTH_RECORDS(disease_id, district);
CREATE INDEX idx_hr_age_gender ON HEALTH_RECORDS(age_group, gender);
CREATE INDEX idx_hr_reported_yr ON HEALTH_RECORDS(reported_year);

-- Blood inventory index
CREATE INDEX idx_blood_group_dist ON BLOOD_INVENTORY(blood_group, district);
CREATE INDEX idx_blood_status ON BLOOD_INVENTORY(status);

-- Blood donor index
CREATE INDEX idx_donor_bg_dist ON BLOOD_DONORS(blood_group, district);
CREATE INDEX idx_donor_avail ON BLOOD_DONORS(availability);

-- OTP & Audit indexes
CREATE INDEX idx_otp_email_exp ON OTP_VERIFICATIONS(email, expires_at);
CREATE INDEX idx_audit_timestamp ON AUDIT_LOGS(created_at DESC);

PROMPT Indexes created successfully.
-- ============================================================================`
  },
  {
    filename: '06_sample_data.sql',
    title: '06. Synthetic Sample Data Seeding',
    description: 'Inserts realistic, non-identifying synthetic sample records into USERS, DISEASES, HEALTH_SOURCES, BLOOD_INVENTORY, BLOOD_DONORS, and POPULATION.',
    code: `-- ============================================================================
-- SCRIPT: 06_sample_data.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 6: Seeding Synthetic Sample Data for Testing & Demonstration
PROMPT ========================================================================

-- 1. Insert Admin & Test User (Password hash corresponds to bcrypt hash)
INSERT INTO USERS (user_id, full_name, email, password_hash, role, age, gender, district, is_verified, is_active)
VALUES ('usr-admin-01', 'Dr. Sarah Jenkins', 'admin@chpanalytics.org', '$2b$12$e/c96vC05eO0fI892e80Ou7hL02Wp7LpZ70lA.9xXvWz8dZ4dC7mC', 'ADMIN', 42, 'Female', 'CHENNAI', 'Y', 'Y');

INSERT INTO USERS (user_id, full_name, email, password_hash, role, age, gender, district, is_verified, is_active)
VALUES ('usr-user-01', 'Kamalesh D.', 'kamaleshda24@gmail.com', '$2b$12$e/c96vC05eO0fI892e80Ou7hL02Wp7LpZ70lA.9xXvWz8dZ4dC7mC', 'USER', 22, 'Male', 'CHENNAI', 'Y', 'Y');

-- 2. Insert Diseases Knowledgebase
INSERT INTO DISEASES (disease_id, disease_code, disease_name, category, description, risk_factors, symptoms, prevention, when_seek_care, prevalence_index)
VALUES ('dis-01', 'E11.9', 'Type 2 Diabetes Mellitus', 'Non-Communicable', 
'Chronic metabolic disorder characterized by high blood glucose levels.',
'Family history, Sedentary lifestyle, BMI > 25, High-sugar diet',
'Increased thirst, Frequent urination, Fatigue, Blurred vision',
'150 mins weekly aerobic exercise, Whole grain nutrition, Regular screenings',
'Fasting blood sugar > 126 mg/dL or recurrent extreme thirst.', 78.5);

INSERT INTO DISEASES (disease_id, disease_code, disease_name, category, description, risk_factors, symptoms, prevention, when_seek_care, prevalence_index)
VALUES ('dis-02', 'I10', 'Essential Hypertension', 'Non-Communicable',
'Persistent arterial blood pressure exceeding 140/90 mmHg.',
'High sodium diet, Tobacco smoking, Physical inactivity, Chronic stress',
'Morning headaches, Dizziness, Shortness of breath (often silent)',
'Low sodium DASH diet, 30 mins daily walking, Stress management',
'Systolic BP > 180 mmHg or accompanied by chest pain.', 84.0);

INSERT INTO DISEASES (disease_id, disease_code, disease_name, category, description, risk_factors, symptoms, prevention, when_seek_care, prevalence_index)
VALUES ('dis-03', 'J45', 'Bronchial Asthma', 'Chronic',
'Chronic respiratory disease causing airway inflammation and spasms.',
'Air particulate matter PM2.5, Industrial dust, Pollen, Mold',
'Wheezing on exhale, Shortness of breath, Night-time coughing',
'Avoid triggers, Well-ventilated spaces, Prescribed preventer inhalers',
'Severe breathlessness, Blue lips or unresponsive to inhaler.', 56.2);

INSERT INTO DISEASES (disease_id, disease_code, disease_name, category, description, risk_factors, symptoms, prevention, when_seek_care, prevalence_index)
VALUES ('dis-04', 'D50.9', 'Iron Deficiency Anaemia', 'Nutritional',
'Blood lacks adequate red blood cells due to insufficient dietary iron.',
'Inadequate iron intake, High blood loss, Pregnancy without IFA',
'Fatigue, Pale conjunctiva, Lightheadedness, Cold extremities',
'Green leafy vegetables, Legumes, Iron-folic acid supplementation',
'Chronic extreme fatigue or haemoglobin < 10 g/dL.', 69.1);

INSERT INTO DISEASES (disease_id, disease_code, disease_name, category, description, risk_factors, symptoms, prevention, when_seek_care, prevalence_index)
VALUES ('dis-05', 'A90', 'Dengue Fever', 'Vector-Borne',
'Viral infection transmitted by female Aedes mosquitoes.',
'Stagnant water near homes, Monsoon season, Lack of mosquito nets',
'High grade fever, Retro-orbital eye pain, Severe joint pain, Rash',
'Eliminate stagnant water weekly, Mosquito repellents, Protective clothing',
'Persistent vomiting, Severe abdominal pain, Platelets < 50,000.', 42.0);

-- 3. Insert Blood Inventory Records for Tamil Nadu Districts
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-01', 'A+', 48, 'CHENNAI', 'Rajiv Gandhi Government General Hospital Blood Bank', 'Available');
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-02', 'A-', 6, 'CHENNAI', 'Stanley Medical College Blood Centre', 'Critical');
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-03', 'B+', 62, 'COIMBATORE', 'Coimbatore Medical College Hospital Blood Bank', 'Available');
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-04', 'O+', 85, 'MADURAI', 'Madurai Government Rajaji Hospital Blood Centre', 'Available');
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-05', 'O-', 4, 'TIRUCHIRAPPALLI', 'Mahatma Gandhi Memorial Government Hospital', 'Critical');
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-06', 'AB-', 2, 'SALEM', 'Government Mohan Kumaramangalam Medical College Bank', 'Critical');

INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-07', 'O+', 72, 'TIRUNELVELI', 'Tirunelveli Medical College Hospital Blood Bank', 'Available');
INSERT INTO BLOOD_INVENTORY (inventory_id, blood_group, available_units, district, hospital_name, status)
VALUES ('bi-08', 'O-', 8, 'VELLORE', 'Government Vellore Medical College Hospital', 'Low');

-- 4. Insert Donors
INSERT INTO BLOOD_DONORS (donor_id, user_id, donor_code, blood_group, district, area, availability, last_donation, total_donations, consent_flag)
VALUES ('bd-01', 'usr-user-01', 'DONOR-3189', 'O+', 'CHENNAI', 'Anna Nagar', 'Available', TO_DATE('2026-04-12', 'YYYY-MM-DD'), 5, 'Y');

-- 5. Insert Population Demographics
INSERT INTO POPULATION (population_id, age_group, gender, district, area, occupation, education, family_size, reported_year)
VALUES ('pop-01', '25-59 (Adults)', 'Male', 'CHENNAI', 'Ward 3 - T. Nagar', 'Retail Commerce', 'Graduate', 4, 2026);
INSERT INTO POPULATION (population_id, age_group, gender, district, area, occupation, education, family_size, reported_year)
VALUES ('pop-02', '25-59 (Adults)', 'Female', 'COIMBATORE', 'Ward 4 - RS Puram', 'Information Technology', 'Postgraduate', 3, 2026);
INSERT INTO POPULATION (population_id, age_group, gender, district, area, occupation, education, family_size, reported_year)
VALUES ('pop-03', '60+ (Seniors)', 'Female', 'MADURAI', 'Ward 5 - KK Nagar', 'Retired / Homemaker', 'Secondary', 2, 2026);

COMMIT;
PROMPT Sample data seeded and committed successfully.
-- ============================================================================`
  },
  {
    filename: '07_views.sql',
    title: '07. Privacy-Preserving Analytical Views',
    description: 'Creates aggregation views that compute district summaries, disease distribution, and blood availability without exposing personal identifiers.',
    code: `-- ============================================================================
-- SCRIPT: 07_views.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 7: Creating Aggregated Analytical Views (Privacy-Preserving)
PROMPT ========================================================================

-- 1. District Blood Inventory Summary View
CREATE OR REPLACE VIEW VW_DISTRICT_BLOOD_SUMMARY AS
SELECT 
    district,
    blood_group,
    SUM(available_units) AS total_units,
    CASE 
        WHEN SUM(available_units) >= 20 THEN 'Available'
        WHEN SUM(available_units) BETWEEN 10 AND 19 THEN 'Low'
        ELSE 'Critical'
    END AS aggregate_status,
    COUNT(DISTINCT hospital_name) AS blood_banks_count
FROM BLOOD_INVENTORY
GROUP BY district, blood_group;

-- 2. Disease Prevalence by Age Group
CREATE OR REPLACE VIEW VW_DISEASE_AGE_DISTRIBUTION AS
SELECT 
    d.disease_name,
    d.category,
    hr.age_group,
    COUNT(hr.record_id) AS reported_cases,
    ROUND(COUNT(hr.record_id) * 100.0 / NULLIF(SUM(COUNT(hr.record_id)) OVER(PARTITION BY d.disease_name), 0), 2) AS percentage_in_disease
FROM HEALTH_RECORDS hr
JOIN DISEASES d ON hr.disease_id = d.disease_id
WHERE hr.consent_status = 'Y'
GROUP BY d.disease_name, d.category, hr.age_group;

-- 3. District Health & Demographics Summary View
CREATE OR REPLACE VIEW VW_DISTRICT_HEALTH_METRICS AS
SELECT 
    p.district,
    COUNT(DISTINCT p.population_id) AS sample_population_count,
    ROUND(AVG(p.family_size), 1) AS avg_family_size,
    (SELECT COUNT(*) FROM BLOOD_DONORS bd WHERE bd.district = p.district AND bd.availability = 'Available') AS active_donors_count,
    (SELECT SUM(available_units) FROM BLOOD_INVENTORY bi WHERE bi.district = p.district) AS total_blood_stock
FROM POPULATION p
GROUP BY p.district;

PROMPT Views compiled successfully.
-- ============================================================================`
  },
  {
    filename: '08_procedures.sql',
    title: '08. Stored Procedures & Business Logic',
    description: 'PL/SQL procedures for secure user OTP generation, email verification, and audit event logging.',
    code: `-- ============================================================================
-- SCRIPT: 08_procedures.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON

PROMPT ========================================================================
PROMPT STEP 8: Creating PL/SQL Packages and Stored Procedures
PROMPT ========================================================================

CREATE OR REPLACE PACKAGE PKG_CHP_AUTH AS
    PROCEDURE PR_ISSUE_OTP(
        p_email IN VARCHAR2,
        p_otp_hash IN VARCHAR2,
        p_purpose IN VARCHAR2,
        p_expiry_minutes IN NUMBER,
        p_status OUT VARCHAR2
    );
    
    PROCEDURE PR_VERIFY_OTP(
        p_email IN VARCHAR2,
        p_otp_hash IN VARCHAR2,
        p_success OUT NUMBER,
        p_message OUT VARCHAR2
    );
END PKG_CHP_AUTH;
/

CREATE OR REPLACE PACKAGE BODY PKG_CHP_AUTH AS

    PROCEDURE PR_ISSUE_OTP(
        p_email IN VARCHAR2,
        p_otp_hash IN VARCHAR2,
        p_purpose IN VARCHAR2,
        p_expiry_minutes IN NUMBER,
        p_status OUT VARCHAR2
    ) IS
    BEGIN
        -- Invalidate any previous unexpired OTP for this email and purpose
        UPDATE OTP_VERIFICATIONS
        SET is_used = 'Y'
        WHERE email = p_email AND purpose = p_purpose AND is_used = 'N';

        -- Insert new OTP record
        INSERT INTO OTP_VERIFICATIONS (
            otp_id, email, otp_code_hash, purpose, expires_at, is_used, attempt_count, resend_count, created_at
        ) VALUES (
            RAWTOHEX(SYS_GUID()),
            p_email,
            p_otp_hash,
            p_purpose,
            SYSTIMESTAMP + NUMTODSINTERVAL(p_expiry_minutes, 'MINUTE'),
            'N',
            0,
            0,
            SYSTIMESTAMP
        );

        COMMIT;
        p_status := 'SUCCESS';
    EXCEPTION
        WHEN OTHERS THEN
            p_status := 'ERROR: ' || SQLERRM;
    END PR_ISSUE_OTP;

    PROCEDURE PR_VERIFY_OTP(
        p_email IN VARCHAR2,
        p_otp_hash IN VARCHAR2,
        p_success OUT NUMBER,
        p_message OUT VARCHAR2
    ) IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*)
        INTO v_count
        FROM OTP_VERIFICATIONS
        WHERE email = p_email
          AND otp_code_hash = p_otp_hash
          AND is_used = 'N'
          AND expires_at > SYSTIMESTAMP
          AND attempt_count < 5;

        IF v_count > 0 THEN
            UPDATE OTP_VERIFICATIONS
            SET is_used = 'Y'
            WHERE email = p_email AND otp_code_hash = p_otp_hash;

            UPDATE USERS
            SET is_verified = 'Y', updated_at = SYSTIMESTAMP
            WHERE email = p_email;

            COMMIT;
            p_success := 1;
            p_message := 'Email verified successfully. Account is now active.';
        ELSE
            UPDATE OTP_VERIFICATIONS
            SET attempt_count = attempt_count + 1
            WHERE email = p_email AND is_used = 'N';
            COMMIT;

            p_success := 0;
            p_message := 'Invalid or expired OTP token.';
        END IF;
    END PR_VERIFY_OTP;

END PKG_CHP_AUTH;
/

PROMPT PL/SQL packages created successfully.
-- ============================================================================`
  },
  {
    filename: '09_test_queries.sql',
    title: '09. Analytical & Verification Test Queries',
    description: 'Comprehensive test queries demonstrating joins, aggregations, ROLLUP, subqueries, and security checks for your final year viva.',
    code: `-- ============================================================================
-- SCRIPT: 09_test_queries.sql
-- PROJECT: Community Health & Population Analytics System (CHP Analytics)
-- SCHEMA: chp_admin
-- EXECUTION: SQL*Plus
-- ============================================================================

SET ECHO ON
SET FEEDBACK ON
SET PAGESIZE 50
SET LINESIZE 120

PROMPT ========================================================================
PROMPT STEP 9: Executing Verification & Demonstration Analytical Queries
PROMPT ========================================================================

PROMPT 1. Test Query: Critical Blood Shortages by District (Units < 10)
SELECT 
    district,
    blood_group,
    available_units,
    hospital_name,
    status
FROM BLOOD_INVENTORY
WHERE available_units < 10
ORDER BY available_units ASC;

PROMPT 2. Test Query: Available Blood Donors Grouped by Blood Group & District
SELECT 
    district,
    blood_group,
    COUNT(*) AS total_available_donors,
    MAX(last_donation) AS most_recent_donation
FROM BLOOD_DONORS
WHERE availability = 'Available' AND consent_flag = 'Y'
GROUP BY district, blood_group
ORDER BY district, blood_group;

PROMPT 3. Test Query: Disease Knowledge Base Prevalence Index Ranking
SELECT 
    disease_code,
    disease_name,
    category,
    prevalence_index
FROM DISEASES
ORDER BY prevalence_index DESC;

PROMPT 4. Test Query: Demographic Distribution by Age Group with Sub-totals (ROLLUP)
SELECT 
    NVL(district, 'ALL DISTRICTS') AS district,
    NVL(age_group, 'ALL AGES') AS age_group,
    COUNT(*) AS records_count,
    ROUND(AVG(family_size), 2) AS avg_family_size
FROM POPULATION
GROUP BY ROLLUP(district, age_group);

PROMPT Verification queries completed successfully.
-- ============================================================================`
  }
];
