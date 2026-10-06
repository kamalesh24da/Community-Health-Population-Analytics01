export type UserRole = 'USER' | 'ADMIN';

export const TAMIL_NADU_DISTRICTS = [
  'ARIYALUR',
  'CHENGALPATTU',
  'CHENNAI',
  'COIMBATORE',
  'CUDDALORE',
  'DHARMAPURI',
  'DINDIGUL',
  'ERODE',
  'KALLAKURICHI',
  'KANCHEEPURAM',
  'KANYAKUMARI',
  'KARUR',
  'KRISHNAGIRI',
  'MADURAI',
  'MAYILADUTHURAI',
  'NAGAPATTINAM',
  'NAMAKKAL',
  'NILGIRIS',
  'PERAMBALUR',
  'PUDUKKOTTAI',
  'RAMANATHAPURAM',
  'RANIPET',
  'SALEM',
  'SIVAGANGA',
  'TENKASI',
  'THANJAVUR',
  'THENI',
  'THOOTHUKUDI',
  'TIRUCHIRAPPALLI',
  'TIRUNELVELI',
  'TIRUPATHUR',
  'TIRUPPUR',
  'TIRUVALLUR',
  'TIRUVANNAMALAI',
  'TIRUVARUR',
  'VELLORE',
  'VILUPPURAM',
  'VIRUDHUNAGAR'
] as const;

export type TamilNaduDistrict = typeof TAMIL_NADU_DISTRICTS[number];

export function isValidTamilNaduDistrict(district: string): district is TamilNaduDistrict {
  return TAMIL_NADU_DISTRICTS.includes(district as TamilNaduDistrict);
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  age?: number;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  district: TamilNaduDistrict | string;
  isEmailVerified: boolean;
  registeredAt: string;
  isDonor?: boolean;
}

export interface OTPRecord {
  email: string;
  otp: string;
  expiresAt: number; // timestamp
  attempts: number;
  resendCount: number;
  createdAt: number;
}

export interface DemographicData {
  id: string;
  ageGroup: '0-14 (Children)' | '15-24 (Youth)' | '25-59 (Adults)' | '60+ (Seniors)';
  gender: 'Male' | 'Female' | 'Other';
  district: string;
  area: string;
  occupation: string;
  education: string;
  familySize: number;
  reportedYear: number;
}

export interface HealthRecord {
  id: string;
  anonymousId: string;
  ageGroup: string;
  gender: string;
  district: string;
  conditionName: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reportedYear: number;
  consentGiven: boolean;
}

export interface Disease {
  id: string;
  name: string;
  category: 'Non-Communicable' | 'Communicable' | 'Vector-Borne' | 'Nutritional' | 'Chronic';
  description: string;
  commonRiskFactors: string[];
  commonSymptoms: string[];
  preventivePractices: string[];
  whenToSeekCare: string;
  reliableSource: string;
  sourceUrl: string;
  prevalenceIndex: number; // scale 1-100 for analytics
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type BloodStockStatus = 'Available' | 'Low' | 'Critical';

export interface BloodInventoryItem {
  id: string;
  bloodGroup: BloodGroup;
  availableUnits: number;
  district: string;
  hospitalOrBank: string;
  lastUpdated: string;
  status: BloodStockStatus;
}

export interface BloodDonor {
  id: string;
  userId: string;
  donorCode: string; // anonymized ID e.g. DONOR-4821
  bloodGroup: BloodGroup;
  district: string;
  area: string;
  availabilityStatus: 'Available' | 'Unavailable' | 'Temporarily Ineligible';
  lastDonationDate: string;
  consentGiven: boolean;
  totalDonationsCount: number;
}

export interface DistrictSummary {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  population: number;
  malePopulation: number;
  femalePopulation: number;
  topCondition: string;
  prevalenceRate: number; // per 1,000
  totalBloodUnits: number;
  criticalBloodGroups: BloodGroup[];
  registeredDonors: number;
  vulnerabilityIndex: 'Low' | 'Moderate' | 'High';
}

export interface HealthSource {
  id: string;
  name: string;
  organization: string;
  type: 'Government' | 'International Agency' | 'Research Institution' | 'Medical Council';
  website: string;
  description: string;
  trustScore: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId?: string;
  userEmail?: string;
  action: string;
  category: 'AUTH' | 'DATA_ACCESS' | 'POPULATION' | 'BLOOD_BANK' | 'SECURITY';
  status: 'SUCCESS' | 'WARNING' | 'FAILURE';
  ipAddress: string;
  details: string;
}

export interface MLPredictionInput {
  age: number;
  bmi: number;
  systolicBP: number;
  diastolicBP: number;
  fastingGlucose: number;
  physicalActivityHours: number; // hours per week
  smokingStatus: 'Never' | 'Former' | 'Current';
  familyHistory: boolean;
}

export interface MLPredictionResult {
  riskScore: number; // 0 - 100
  riskTier: 'Low Risk' | 'Moderate Risk' | 'Higher Risk';
  primaryRiskFactors: { factor: string; impact: string; severity: 'low' | 'med' | 'high' }[];
  recommendations: string[];
  modelUsed: 'Random Forest' | 'Logistic Regression' | 'Decision Tree';
  confidenceScore: number;
  timestamp: string;
}

export interface ModelMetrics {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  confusionMatrix: {
    matrix: number[][]; // 3x3 matrix [Low, Med, High]
    labels: string[];
  };
}
