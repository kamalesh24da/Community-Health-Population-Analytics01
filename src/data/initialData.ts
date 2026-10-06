import {
  DemographicData,
  HealthRecord,
  Disease,
  BloodInventoryItem,
  BloodDonor,
  DistrictSummary,
  HealthSource,
  AuditLog,
  User,
  TAMIL_NADU_DISTRICTS
} from '../types';

export const INITIAL_DISTRICTS: DistrictSummary[] = [
  {
    id: 'dist-01',
    name: 'ARIYALUR',
    coordinates: [11.1401, 79.0786],
    population: 754000,
    malePopulation: 379000,
    femalePopulation: 375000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 112,
    totalBloodUnits: 140,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 68,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-02',
    name: 'CHENGALPATTU',
    coordinates: [12.6819, 79.9836],
    population: 2550000,
    malePopulation: 1300000,
    femalePopulation: 1250000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 154,
    totalBloodUnits: 420,
    criticalBloodGroups: ['AB-'],
    registeredDonors: 210,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-03',
    name: 'CHENNAI',
    coordinates: [13.0827, 80.2707],
    population: 7100000,
    malePopulation: 3600000,
    femalePopulation: 3500000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 178,
    totalBloodUnits: 890,
    criticalBloodGroups: ['O-', 'B-'],
    registeredDonors: 450,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-04',
    name: 'COIMBATORE',
    coordinates: [11.0168, 76.9558],
    population: 3450000,
    malePopulation: 1750000,
    femalePopulation: 1700000,
    topCondition: 'Ischaemic Heart Disease (IHD)',
    prevalenceRate: 145,
    totalBloodUnits: 620,
    criticalBloodGroups: ['AB-', 'A-'],
    registeredDonors: 310,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-05',
    name: 'CUDDALORE',
    coordinates: [11.7480, 79.7714],
    population: 2600000,
    malePopulation: 1320000,
    femalePopulation: 1280000,
    topCondition: 'Bronchial Asthma',
    prevalenceRate: 138,
    totalBloodUnits: 280,
    criticalBloodGroups: ['O-'],
    registeredDonors: 140,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-06',
    name: 'DHARMAPURI',
    coordinates: [12.1211, 78.1582],
    population: 1510000,
    malePopulation: 775000,
    femalePopulation: 735000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 162,
    totalBloodUnits: 190,
    criticalBloodGroups: ['B-', 'AB-'],
    registeredDonors: 95,
    vulnerabilityIndex: 'High'
  },
  {
    id: 'dist-07',
    name: 'DINDIGUL',
    coordinates: [10.3673, 77.9803],
    population: 2160000,
    malePopulation: 1090000,
    femalePopulation: 1070000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 130,
    totalBloodUnits: 260,
    criticalBloodGroups: ['A-'],
    registeredDonors: 130,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-08',
    name: 'ERODE',
    coordinates: [11.3410, 77.7172],
    population: 2250000,
    malePopulation: 1140000,
    femalePopulation: 1110000,
    topCondition: 'Chronic Kidney Disease (CKD)',
    prevalenceRate: 142,
    totalBloodUnits: 340,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 175,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-09',
    name: 'KALLAKURICHI',
    coordinates: [11.7384, 78.9639],
    population: 1370000,
    malePopulation: 695000,
    femalePopulation: 675000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 158,
    totalBloodUnits: 170,
    criticalBloodGroups: ['B-', 'O-'],
    registeredDonors: 82,
    vulnerabilityIndex: 'High'
  },
  {
    id: 'dist-10',
    name: 'KANCHEEPURAM',
    coordinates: [12.8342, 79.7036],
    population: 1650000,
    malePopulation: 835000,
    femalePopulation: 815000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 136,
    totalBloodUnits: 290,
    criticalBloodGroups: ['AB-'],
    registeredDonors: 145,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-11',
    name: 'KANYAKUMARI',
    coordinates: [8.0883, 77.5385],
    population: 1870000,
    malePopulation: 930000,
    femalePopulation: 940000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 122,
    totalBloodUnits: 380,
    criticalBloodGroups: ['O-'],
    registeredDonors: 190,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-12',
    name: 'KARUR',
    coordinates: [10.9601, 78.0766],
    population: 1060000,
    malePopulation: 535000,
    femalePopulation: 525000,
    topCondition: 'Bronchial Asthma',
    prevalenceRate: 128,
    totalBloodUnits: 180,
    criticalBloodGroups: ['A-', 'B-'],
    registeredDonors: 90,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-13',
    name: 'KRISHNAGIRI',
    coordinates: [12.5186, 78.2137],
    population: 1880000,
    malePopulation: 960000,
    femalePopulation: 920000,
    topCondition: 'Pulmonary Tuberculosis',
    prevalenceRate: 148,
    totalBloodUnits: 230,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 115,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-14',
    name: 'MADURAI',
    coordinates: [9.9252, 78.1198],
    population: 3040000,
    malePopulation: 1540000,
    femalePopulation: 1500000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 168,
    totalBloodUnits: 580,
    criticalBloodGroups: ['O-', 'B-'],
    registeredDonors: 290,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-15',
    name: 'MAYILADUTHURAI',
    coordinates: [11.1075, 79.6523],
    population: 918000,
    malePopulation: 456000,
    femalePopulation: 462000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 134,
    totalBloodUnits: 150,
    criticalBloodGroups: ['A-'],
    registeredDonors: 75,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-16',
    name: 'NAGAPATTINAM',
    coordinates: [10.7672, 79.8449],
    population: 697000,
    malePopulation: 345000,
    femalePopulation: 352000,
    topCondition: 'Dengue Fever',
    prevalenceRate: 144,
    totalBloodUnits: 130,
    criticalBloodGroups: ['B-', 'AB-'],
    registeredDonors: 65,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-17',
    name: 'NAMAKKAL',
    coordinates: [11.2189, 78.1674],
    population: 1720000,
    malePopulation: 875000,
    femalePopulation: 845000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 126,
    totalBloodUnits: 250,
    criticalBloodGroups: ['O-'],
    registeredDonors: 125,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-18',
    name: 'NILGIRIS',
    coordinates: [11.4102, 76.6950],
    population: 735000,
    malePopulation: 360000,
    femalePopulation: 375000,
    topCondition: 'Bronchial Asthma',
    prevalenceRate: 118,
    totalBloodUnits: 160,
    criticalBloodGroups: ['AB-', 'A-'],
    registeredDonors: 80,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-19',
    name: 'PERAMBALUR',
    coordinates: [11.2342, 78.8821],
    population: 565000,
    malePopulation: 284000,
    femalePopulation: 281000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 152,
    totalBloodUnits: 110,
    criticalBloodGroups: ['B-'],
    registeredDonors: 55,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-20',
    name: 'PUDUKKOTTAI',
    coordinates: [10.3797, 78.8208],
    population: 1618000,
    malePopulation: 808000,
    femalePopulation: 810000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 132,
    totalBloodUnits: 220,
    criticalBloodGroups: ['O-'],
    registeredDonors: 110,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-21',
    name: 'RAMANATHAPURAM',
    coordinates: [9.3639, 78.8395],
    population: 1353000,
    malePopulation: 682000,
    femalePopulation: 671000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 166,
    totalBloodUnits: 180,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 90,
    vulnerabilityIndex: 'High'
  },
  {
    id: 'dist-22',
    name: 'RANIPET',
    coordinates: [12.9298, 79.3326],
    population: 1210000,
    malePopulation: 610000,
    femalePopulation: 600000,
    topCondition: 'Chronic Kidney Disease (CKD)',
    prevalenceRate: 140,
    totalBloodUnits: 195,
    criticalBloodGroups: ['A-', 'B-'],
    registeredDonors: 98,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-23',
    name: 'SALEM',
    coordinates: [11.6643, 78.1460],
    population: 3480000,
    malePopulation: 1780000,
    femalePopulation: 1700000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 156,
    totalBloodUnits: 510,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 255,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-24',
    name: 'SIVAGANGA',
    coordinates: [9.8433, 78.4809],
    population: 1339000,
    malePopulation: 668000,
    femalePopulation: 671000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 135,
    totalBloodUnits: 185,
    criticalBloodGroups: ['B-'],
    registeredDonors: 92,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-25',
    name: 'TENKASI',
    coordinates: [8.9594, 77.3161],
    population: 1407000,
    malePopulation: 698000,
    femalePopulation: 709000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 124,
    totalBloodUnits: 200,
    criticalBloodGroups: ['A-'],
    registeredDonors: 100,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-26',
    name: 'THANJAVUR',
    coordinates: [10.7870, 79.1378],
    population: 2405000,
    malePopulation: 1185000,
    femalePopulation: 1220000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 146,
    totalBloodUnits: 360,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 180,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-27',
    name: 'THENI',
    coordinates: [10.0104, 77.4768],
    population: 1246000,
    malePopulation: 628000,
    femalePopulation: 618000,
    topCondition: 'Pulmonary Tuberculosis',
    prevalenceRate: 130,
    totalBloodUnits: 190,
    criticalBloodGroups: ['B-'],
    registeredDonors: 95,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-28',
    name: 'THOOTHUKUDI',
    coordinates: [8.7642, 78.1348],
    population: 1750000,
    malePopulation: 865000,
    femalePopulation: 885000,
    topCondition: 'Bronchial Asthma',
    prevalenceRate: 148,
    totalBloodUnits: 270,
    criticalBloodGroups: ['AB-', 'O-'],
    registeredDonors: 135,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-29',
    name: 'TIRUCHIRAPPALLI',
    coordinates: [10.7905, 78.7047],
    population: 2722000,
    malePopulation: 1350000,
    femalePopulation: 1372000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 152,
    totalBloodUnits: 490,
    criticalBloodGroups: ['O-', 'B-'],
    registeredDonors: 245,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-30',
    name: 'TIRUNELVELI',
    coordinates: [8.7139, 77.7567],
    population: 1665000,
    malePopulation: 820000,
    femalePopulation: 845000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 138,
    totalBloodUnits: 310,
    criticalBloodGroups: ['A-', 'AB-'],
    registeredDonors: 155,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-31',
    name: 'TIRUPATHUR',
    coordinates: [12.4958, 78.5678],
    population: 1111000,
    malePopulation: 561000,
    femalePopulation: 550000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 146,
    totalBloodUnits: 160,
    criticalBloodGroups: ['O-'],
    registeredDonors: 80,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-32',
    name: 'TIRUPPUR',
    coordinates: [11.1085, 77.3411],
    population: 2479000,
    malePopulation: 1260000,
    femalePopulation: 1219000,
    topCondition: 'Bronchial Asthma',
    prevalenceRate: 150,
    totalBloodUnits: 390,
    criticalBloodGroups: ['B-', 'AB-'],
    registeredDonors: 195,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-33',
    name: 'TIRUVALLUR',
    coordinates: [13.1432, 79.9079],
    population: 3728000,
    malePopulation: 1888000,
    femalePopulation: 1840000,
    topCondition: 'Essential Hypertension',
    prevalenceRate: 160,
    totalBloodUnits: 480,
    criticalBloodGroups: ['O-'],
    registeredDonors: 240,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-34',
    name: 'TIRUVANNAMALAI',
    coordinates: [12.2253, 79.0747],
    population: 2464000,
    malePopulation: 1236000,
    femalePopulation: 1228000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 164,
    totalBloodUnits: 270,
    criticalBloodGroups: ['O-', 'A-'],
    registeredDonors: 135,
    vulnerabilityIndex: 'High'
  },
  {
    id: 'dist-35',
    name: 'TIRUVARUR',
    coordinates: [10.7725, 79.6365],
    population: 1264000,
    malePopulation: 626000,
    femalePopulation: 638000,
    topCondition: 'Dengue Fever',
    prevalenceRate: 136,
    totalBloodUnits: 175,
    criticalBloodGroups: ['AB-'],
    registeredDonors: 88,
    vulnerabilityIndex: 'Moderate'
  },
  {
    id: 'dist-36',
    name: 'VELLORE',
    coordinates: [12.9165, 79.1325],
    population: 1614000,
    malePopulation: 808000,
    femalePopulation: 806000,
    topCondition: 'Type 2 Diabetes Mellitus',
    prevalenceRate: 158,
    totalBloodUnits: 430,
    criticalBloodGroups: ['O-', 'AB-'],
    registeredDonors: 215,
    vulnerabilityIndex: 'Low'
  },
  {
    id: 'dist-37',
    name: 'VILUPPURAM',
    coordinates: [11.9401, 79.4861],
    population: 2092000,
    malePopulation: 1058000,
    femalePopulation: 1034000,
    topCondition: 'Iron Deficiency Anaemia',
    prevalenceRate: 170,
    totalBloodUnits: 240,
    criticalBloodGroups: ['B-', 'O-'],
    registeredDonors: 120,
    vulnerabilityIndex: 'High'
  },
  {
    id: 'dist-38',
    name: 'VIRUDHUNAGAR',
    coordinates: [9.5872, 77.9579],
    population: 1942000,
    malePopulation: 966000,
    femalePopulation: 976000,
    topCondition: 'Bronchial Asthma',
    prevalenceRate: 142,
    totalBloodUnits: 260,
    criticalBloodGroups: ['A-', 'AB-'],
    registeredDonors: 130,
    vulnerabilityIndex: 'Moderate'
  }
];

export const INITIAL_DISEASES: Disease[] = [
  {
    id: 'dis-01',
    name: 'Type 2 Diabetes Mellitus',
    category: 'Non-Communicable',
    description: 'A chronic metabolic disorder characterized by high levels of blood glucose resulting from impaired insulin secretion and progressive peripheral insulin resistance.',
    commonRiskFactors: [
      'Family history / genetic predisposition to metabolic syndrome',
      'Overweight and central visceral obesity (waist circumference > 90 cm in Asian men, > 80 cm in Asian women)',
      'Physical inactivity and sedentary lifestyle (< 150 min activity/week)',
      'High-glycemic carbohydrate and ultra-processed food consumption',
      'Hypertension (blood pressure ≥ 140/90 mmHg)',
      'History of gestational diabetes or polycystic ovary syndrome (PCOS)',
      'Age ≥ 35 years with dyslipidemia (low HDL, elevated triglycerides)'
    ],
    commonSymptoms: [
      'Increased thirst and dry mouth (polydipsia)',
      'Frequent urination, especially at night (polyuria/nocturia)',
      'Unexplained progressive weight loss despite normal appetite',
      'Persistent fatigue, low energy, and lethargy',
      'Blurred or fluctuating visual acuity',
      'Slow-healing cuts, skin abrasions, or recurrent fungal infections',
      'Tingling or numbness in extremities (peripheral neuropathy)'
    ],
    preventivePractices: [
      'Engage in at least 150 minutes of moderate-to-vigorous aerobic exercise per week plus 2 resistance training sessions',
      'Adopt a balanced whole-food dietary pattern: increase dietary fiber (≥ 30g/day), whole millets, legumes, and green vegetables',
      'Eliminate sugar-sweetened beverages and ultra-processed confectionery',
      'Maintain healthy body weight (target BMI 18.5 - 22.9 kg/m² for South Asian adults)',
      'Annual fasting blood glucose and HbA1c screening for all adults over 30 years',
      'Quality restorative sleep (7–8 hours nightly) to regulate cortisol and insulin sensitivity'
    ],
    whenToSeekCare: 'Consult a primary healthcare professional if experiencing persistent extreme thirst, unexplained rapid weight loss, recurrent infections, or fasting blood glucose > 126 mg/dL (or random blood sugar > 200 mg/dL).',
    reliableSource: 'World Health Organization (WHO) & ICMR Guidelines for Type 2 Diabetes',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/diabetes',
    prevalenceIndex: 78
  },
  {
    id: 'dis-02',
    name: 'Essential Hypertension',
    category: 'Non-Communicable',
    description: 'Persistent clinical elevation of systemic arterial blood pressure exceeding standard baseline (systolic ≥ 140 mmHg or diastolic ≥ 90 mmHg), commonly referred to as the silent killer due to absence of early signs.',
    commonRiskFactors: [
      'High dietary sodium intake (> 5g salt or > 2g sodium per day)',
      'Tobacco usage in all forms (cigarettes, beedis, chewing tobacco)',
      'Harmful levels of alcohol consumption',
      'Chronic psychosocial distress and inadequate sleep duration',
      'Sedentary lifestyle and lack of regular cardiovascular physical exertion',
      'Advanced age and arterial stiffness (prevalence escalates > 45 years)',
      'Positive family history of essential hypertension or early stroke'
    ],
    commonSymptoms: [
      'Often completely asymptomatic in early and moderate stages',
      'Occipital morning headaches and throbbing cranial discomfort',
      'Shortness of breath on mild exertional activity',
      'Dizziness, lightheadedness, or postural unsteadiness',
      'Irregular heart sensations or palpitations',
      'Recurrent spontaneous epistaxis (nosebleeds) in severe cases',
      'Visual blurring or scotomas during acute blood pressure spikes'
    ],
    preventivePractices: [
      'Strictly restrict dietary salt intake to under 5 grams per day (approximately 1 level teaspoon)',
      'Adopt the Dietary Approaches to Stop Hypertension (DASH) eating pattern rich in potassium, magnesium, and fresh vegetables',
      'Engage in 30–45 minutes of daily brisk walking, cycling, or swimming',
      'Complete tobacco cessation and avoid second-hand smoke exposure',
      'Practice evidence-based stress mitigation (mindfulness, yoga, controlled diaphragmatic breathing)',
      'Routine calibrated blood pressure screenings at least biannually for all adults'
    ],
    whenToSeekCare: 'Seek immediate emergency medical attention if systolic blood pressure exceeds 180 mmHg or diastolic exceeds 120 mmHg, or if high BP is accompanied by crushing chest pressure, shortness of breath, sudden visual impairment, or focal neurological weakness.',
    reliableSource: 'Indian Council of Medical Research (ICMR) & WHO Hypertension Factsheet',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/hypertension',
    prevalenceIndex: 84
  },
  {
    id: 'dis-03',
    name: 'Bronchial Asthma',
    category: 'Chronic',
    description: 'A chronic non-communicable inflammatory disease of the lower airways characterized by bronchial hyperresponsiveness, mucosal edema, and episodic reversible airflow limitation.',
    commonRiskFactors: [
      'Exposure to elevated urban airborne particulate matter (PM 2.5 and PM 10) and industrial emissions',
      'Indoor allergens: house dust mites, cockroach debris, and fungal/mold spores',
      'Active smoking or passive exposure to environmental tobacco smoke',
      'Occupational exposure to chemical fumes, textile dust, or flour dust',
      'Personal or family history of atopic eczema, allergic rhinitis, or asthma',
      'Sudden meteorological shifts, cold weather fronts, and high seasonal humidity'
    ],
    commonSymptoms: [
      'High-pitched expiratory wheezing during exhalation',
      'Paroxysmal dry or mucoid coughing, markedly worse during nocturnal hours or early dawn',
      'Tightness or constriction sensation across the anterior chest wall',
      'Dyspnea (shortness of breath) exacerbated by physical exertion or laughter',
      'Difficulty exhaling fully during flare-ups'
    ],
    preventivePractices: [
      'Identify and systematically avoid individual environmental aeroallergen triggers',
      'Ensure strict adherence to prescribed inhaled corticosteroid (preventer) maintenance regimens',
      'Maintain clean, well-ventilated indoor living spaces; wash bed linens in hot water weekly',
      'Wear high-filtration protective masks (N95) during high smog days or in dusty industrial environments',
      'Receive annual seasonal influenza vaccinations to avert severe viral respiratory triggers',
      'Keep rapid-acting rescue inhalers accessible at all times with proper spacer technique'
    ],
    whenToSeekCare: 'Seek emergency hospitalization immediately if experiencing acute severe breathlessness unresponsive to rescue bronchodilators, inability to speak full sentences in one breath, tachypnea (> 25 breaths/min), or cyanosis (bluish tint on lips or fingernails).',
    reliableSource: 'Global Initiative for Asthma (GINA) & Ministry of Health & Family Welfare (MoHFW)',
    sourceUrl: 'https://ginasthma.org/',
    prevalenceIndex: 56
  },
  {
    id: 'dis-04',
    name: 'Iron Deficiency Anaemia',
    category: 'Nutritional',
    description: 'A microcytic hypochromic haematological disorder wherein total circulating red blood cell mass or haemoglobin concentration falls below physiological norms due to exhausted iron stores.',
    commonRiskFactors: [
      'Inadequate dietary intake of bioavailable iron and micronutrient deficiency',
      'Heavy menstrual blood loss (menorrhagia) in women of reproductive age',
      'Increased physiological iron demands during pregnancy, lactation, and adolescent growth spurts',
      'Chronic occult gastrointestinal blood loss (peptic ulcers, polyps, hookworm infestation)',
      'Malabsorptive gut disorders (celiac disease, Crohn disease, bariatric resections)',
      'Excessive consumption of dietary phytates, polyphenols, and tea/coffee with meals inhibiting iron uptake'
    ],
    commonSymptoms: [
      'Chronic debilitating fatigue, generalized muscular weakness, and low stamina',
      'Pallor of palpebral conjunctivae, tongue, mucosal membranes, and nailbeds',
      'Exertional breathlessness and tachycardia (palpitations)',
      'Dizziness, lightheadedness, and cold hands and feet',
      'Brittle, spoon-shaped fingernails (koilonychia)',
      'Pica (unusual cravings for non-nutritive substances such as ice, clay, or chalk)',
      'Soreness or smooth appearance of the tongue (atrophic glossitis)'
    ],
    preventivePractices: [
      'Consume iron-dense foods: dark green leafy vegetables (moringa/drumstick leaves, spinach), legumes, dates, jaggery, and lean animal proteins',
      'Co-ingest Vitamin C-rich foods (amla/Indian gooseberry, lemons, citrus, guava) alongside meals to markedly enhance non-heme iron absorption',
      'Avoid drinking strong tea, coffee, or calcium supplements within 1 hour before or after main meals',
      'Adhere to national weekly Iron and Folic Acid (IFA) supplementation protocols for adolescent girls and pregnant women',
      'Undergo periodic deworming (oral albendazole biannually) in endemic areas',
      'Bi-annual complete blood count (CBC) or serum ferritin evaluation for vulnerable cohorts'
    ],
    whenToSeekCare: 'Consult a medical clinician if experiencing persistent exhaustion, exertional dizziness, rapid heart rate, or when haemoglobin drops below 10 g/dL (< 7 g/dL indicates severe anaemia warranting urgent intervention).',
    reliableSource: 'Anemia Mukt Bharat Initiative (MoHFW, Govt of India) & WHO',
    sourceUrl: 'https://anemiamuktbharat.info/',
    prevalenceIndex: 69
  },
  {
    id: 'dis-05',
    name: 'Dengue Fever',
    category: 'Vector-Borne',
    description: 'An acute arboviral febrile infection caused by four antigenically distinct serotypes (DENV 1–4) and transmitted through the bites of daytime-feeding female Aedes aegypti and Aedes albopictus mosquitoes.',
    commonRiskFactors: [
      'Presence of domestic and peri-domestic stagnant water collections (flower vases, discard tires, uncovered storage drums)',
      'Peak post-monsoon and tropical humid seasons providing fertile mosquito breeding habitat',
      'Living in high-density urban or semi-urban housing with inadequate window screening',
      'Daytime outdoor activities without insect protective barriers or repellent application',
      'Secondary infection with a heterologous dengue serotype (significantly increases dengue hemorrhagic fever risk)'
    ],
    commonSymptoms: [
      'Sudden onset of debilitating high-grade fever (up to 104°F / 40°C)',
      'Severe retro-orbital cephalalgia (excruciating pain behind the eyeballs)',
      'Severe generalized arthralgia and myalgia ("breakbone fever")',
      'Maculopapular cutaneous rash erupting 3–4 days following fever onset',
      'Nausea, vomiting, and loss of appetite',
      'Minor bleeding manifestations (epistaxis, petechiae, or gingival bleeding)'
    ],
    preventivePractices: [
      'Inspect and clean all domestic water containers, air cooler tanks, and rooftop drainage channels weekly ("Dry Day" observance)',
      'Apply DEET-, Picaridin-, or PMD-based topical insect repellents to exposed skin',
      'Fit residential windows and doors with fine insect-proof mesh screening',
      'Sleep under insecticide-treated bed nets (ITNs), particularly for daytime naps and infant cribs',
      'Wear loose-fitting, light-colored, long-sleeved shirts and full trousers during dawn and dusk hours',
      'Support municipal vector fogging, larvicidal application, and biological guppy fish introduction in open tanks'
    ],
    whenToSeekCare: 'URGENT: Immediate emergency hospital admission required if danger signs develop as fever breaks (days 3–7): persistent projectile vomiting, severe abdominal pain, clinical mucosal bleeding, lethargy or restlessness, fluid accumulation, or rapid drop in platelet count with hematocrit rise.',
    reliableSource: 'National Center for Vector Borne Diseases Control (NCVBDC) & WHO',
    sourceUrl: 'https://nvbdcp.gov.in/',
    prevalenceIndex: 42
  },
  {
    id: 'dis-06',
    name: 'Pulmonary Tuberculosis',
    category: 'Communicable',
    description: 'A chronic granulomatous bacterial infection caused by the acid-fast bacillus Mycobacterium tuberculosis, primarily infecting the pulmonary parenchyma and spreading via airborne droplet nuclei.',
    commonRiskFactors: [
      'Prolonged close contact with an untreated sputum smear-positive pulmonary TB patient',
      'Immunocompromised health conditions: HIV coinfection, uncontrolled diabetes, chronic steroid therapy',
      'Undernutrition, protein-energy malnutrition, and body mass index < 18.5 kg/m²',
      'Poorly ventilated, humid, overcrowded indoor residences or institutional settings',
      'Active tobacco smoking and chronic obstructive pulmonary disease',
      'Silicosis exposure in quarrying, mining, or masonry construction workers'
    ],
    commonSymptoms: [
      'Persistent, productive cough continuing for greater than 2 weeks',
      'Hemoptysis (coughing up blood or blood-tinged sputum streaks)',
      'Low-grade fever with characteristic late afternoon or evening spikes',
      'Drenching night sweats requiring change of clothing',
      'Unintentional, progressive loss of body weight and muscle mass',
      'Pleuritic chest discomfort aggravated by coughing or deep inhalation',
      'Persistent malaise, loss of appetite, and chronic fatigue'
    ],
    preventivePractices: [
      'Adhere strictly to the full 6-month Directly Observed Treatment Short-Course (DOTS) antibiotic protocol if diagnosed',
      'Practice proper cough hygiene: cover nose and mouth with tissues or elbow bend, and properly dispose of sputum',
      'Ensure adequate natural cross-ventilation and sunlight penetration in residential and workplace rooms',
      'Administer the Bacillus Calmette-Guérin (BCG) vaccine to all neonates at birth',
      'Early clinical screening and molecular NAAT (GeneXpert/Truenat) testing for anyone with cough > 14 days',
      'Provide preventive tuberculosis preventive therapy (TPT) for household contacts and vulnerable pediatric populations'
    ],
    whenToSeekCare: 'Consult a primary healthcare centre or designated TB diagnostic microscopy centre immediately if coughing continuously for more than 14 days, producing bloody sputum, or suffering unexplained evening fevers and severe weight loss.',
    reliableSource: 'National Tuberculosis Elimination Program (NTEP) & WHO Global TB Programme',
    sourceUrl: 'https://tbcindia.gov.in/',
    prevalenceIndex: 38
  },
  {
    id: 'dis-07',
    name: 'Chronic Kidney Disease (CKD)',
    category: 'Chronic',
    description: 'Progressive, irreversible decline in renal function characterized by structural kidney damage or glomerular filtration rate (eGFR) below 60 mL/min/1.73 m² persisting for greater than 3 months.',
    commonRiskFactors: [
      'Long-standing uncontrolled diabetes mellitus (diabetic nephropathy is the leading etiology)',
      'Chronic poorly controlled arterial hypertension',
      'Frequent or prolonged unmonitored use of non-steroidal anti-inflammatory drugs (NSAIDs) or nephrotoxic analgesics',
      'Family history of chronic kidney failure or polycystic kidney disease (PKD)',
      'Recurrent untreated urinary tract infections or obstructive nephropathy (kidney stones/enlarged prostate)',
      'Cardiovascular disease and advanced biological age (> 60 years)'
    ],
    commonSymptoms: [
      'Often asymptomatic until advanced stages (silent progressive loss of functional nephrons)',
      'Dependent peripheral edema (swelling of ankles, feet, legs, and peri-orbital morning puffiness)',
      'Alterations in urination: nocturia, reduced volume, or foamy/frothy urine indicating proteinuria',
      'Unexplained chronic fatigue, pallor, and reduced exercise tolerance',
      'Persistent generalized pruritus (skin itching) and uremic xerosis',
      'Metallic taste in mouth, anorexia, nausea, and morning vomiting',
      'Nocturnal involuntary muscle twitching, cramps, and restless leg sensations'
    ],
    preventivePractices: [
      'Maintain rigorous glycemic control (HbA1c < 7.0%) in diabetic individuals',
      'Strictly manage blood pressure below target thresholds (< 130/80 mmHg) using kidney-protective ACE inhibitors or ARBs as prescribed',
      'Avoid arbitrary self-medication with over-the-counter NSAIDs (e.g., ibuprofen, diclofenac) and untested heavy-metal herbal preparations',
      'Maintain adequate balanced daily hydration (1.5 to 2.5 litres unless medically fluid-restricted)',
      'Moderate dietary protein and sodium intake; avoid excess processed foods with added phosphate preservatives',
      'Undergo annual urine albumin-to-creatinine ratio (uACR) and serum creatinine eGFR testing for all hypertensive and diabetic patients'
    ],
    whenToSeekCare: 'Seek prompt nephrology evaluation if developing persistent leg or facial swelling, visible blood in urine (hematuria), marked reduction in daily urine output, severe intractable hiccups, or breathlessness while lying flat.',
    reliableSource: 'International Society of Nephrology (ISN) & Kidney Disease: Improving Global Outcomes (KDIGO)',
    sourceUrl: 'https://www.theisn.org/',
    prevalenceIndex: 34
  },
  {
    id: 'dis-08',
    name: 'Ischaemic Heart Disease (IHD)',
    category: 'Non-Communicable',
    description: 'A spectrum of cardiovascular conditions resulting from atherosclerotic narrowing or occlusion of the coronary arteries, impairing oxygenated blood perfusion to the myocardium.',
    commonRiskFactors: [
      'Elevated serum low-density lipoprotein (LDL) cholesterol and hypertriglyceridemia',
      'Active tobacco cigarette/beedi smoking and secondhand tobacco smoke exposure',
      'Systemic arterial hypertension causing chronic endothelial shear stress',
      'Type 2 diabetes mellitus and metabolic insulin resistance syndrome',
      'Premature cardiovascular disease in first-degree relatives (male < 55 years, female < 65 years)',
      'Sedentary lifestyle, high abdominal visceral adiposity, and chronic workplace distress'
    ],
    commonSymptoms: [
      'Retrosternal chest pressure, heaviness, tightness, or squeezing pain (angina pectoris)',
      'Pain radiation to the left shoulder, left arm, neck, jaw, epigastrium, or interscapular back',
      'Exertional dyspnea (unusual shortness of breath triggered by mild physical activity)',
      'Diaphoresis (profuse cold perspiration) and unexplained lightheadedness',
      'Atypical presentations (frequent in women, elderly, and diabetics): extreme sudden exhaustion, indigestion, or nausea'
    ],
    preventivePractices: [
      'Adopt a cardiovascular-protective Mediterranean-style or traditional South Asian pulse-and-vegetable diet free of industrial trans-fats',
      'Complete and permanent tobacco cessation; nicotine elevates heart rate and induces coronary vasoconstriction',
      'Participate in at least 30 minutes of moderate aerobic physical activity at least 5 days weekly',
      'Maintain healthy lipid levels: LDL target < 100 mg/dL (< 70 mg/dL in high-risk patients) via lifestyle and statins if indicated',
      'Monitor and control blood pressure and fasting blood glucose strictly within clinical goals',
      'Practice evidence-based stress reduction and ensure 7–8 hours of quality sleep nightly'
    ],
    whenToSeekCare: 'MEDICAL EMERGENCY: Call local emergency services (108 / 112) immediately if experiencing acute central chest pain lasting greater than 5 minutes, especially if accompanied by cold sweating, radiating arm/jaw discomfort, vomiting, or dizziness. Do not attempt to drive oneself.',
    reliableSource: 'American Heart Association (AHA) & Cardiological Society of India',
    sourceUrl: 'https://www.heart.org/',
    prevalenceIndex: 61
  },
  {
    id: 'dis-09',
    name: 'Acute Viral Hepatitis (A & E)',
    category: 'Communicable',
    description: 'An acute inflammatory hepatic infection transmitted predominantly through the fecal-oral route via contaminated drinking water or unhygienic food handling.',
    commonRiskFactors: [
      'Ingestion of untreated, contaminated drinking water during floods or civic drainage failures',
      'Consumption of raw, unwashed street foods or produce irrigated with untreated wastewater',
      'Suboptimal personal hygiene, lack of safe handwashing facilities, and inadequate municipal sanitation',
      'Living in areas with compromised piped drinking water infrastructure during monsoon seasons',
      'Pregnancy (Hepatitis E presents a dramatically higher risk of fulminant hepatic failure in 3rd trimester)'
    ],
    commonSymptoms: [
      'Acute onset of jaundice (icterus): yellowish discoloration of sclerae, mucous membranes, and skin',
      'Dark amber or tea-colored urine accompanied by pale or clay-colored stools',
      'Extreme anorexia (loss of appetite), aversion to food, and persistent nausea/vomiting',
      'Right upper quadrant abdominal discomfort over the anatomical liver bed',
      'Low-to-moderate grade fever, generalized body aches, and debilitating fatigue',
      'Cutaneous pruritus (itching) due to circulating bile salt accumulation'
    ],
    preventivePractices: [
      'Drink strictly boiled or certified purified potable water, particularly during monsoon rainfall periods',
      'Practice rigorous hand hygiene with soap and running water before cooking, eating, and after restroom use',
      'Thoroughly wash and peel all fresh fruits and vegetables before raw consumption',
      'Avoid consuming open, unhygienic cut fruits, ice cubes, or raw shellfish from uncertified street vendors',
      'Administer the Hepatitis A vaccine to children and high-risk traveling populations',
      'Ensure proper community separation of municipal sewage conduits from domestic drinking water pipelines'
    ],
    whenToSeekCare: 'Consult a medical clinician promptly if noticing yellowing of the eyes or tea-colored urine. Seek emergency hospital care if the patient displays confusion, extreme somnolence, flapping tremors, or persistent vomiting (warning signs of acute liver failure).',
    reliableSource: 'World Health Organization (WHO) & Indian National Association for Study of the Liver (INASL)',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/hepatitis-a',
    prevalenceIndex: 40
  },
  {
    id: 'dis-10',
    name: 'Chikungunya Viral Disease',
    category: 'Vector-Borne',
    description: 'An alphavirus infection transmitted to humans by infected female Aedes mosquitoes, infamous for causing severe, debilitating, and sometimes prolonged polyarthralgia.',
    commonRiskFactors: [
      'Presence of domestic water receptacles and containers acting as Aedes mosquito oviposition sites',
      'High mosquito vector density during post-monsoon tropical transitions',
      'Lack of residential insect screens, window netting, and protective door seals',
      'Daytime outdoor exposure without personal insect repellent application',
      'Advanced age (> 65 years) and preexisting osteoarthritis, which elevate the risk of chronic joint sequelae'
    ],
    commonSymptoms: [
      'Sudden high-grade fever typically lasting between 3 and 7 days',
      'Severe, symmetrical polyarthralgia (excruciating joint pain mainly in wrists, ankles, fingers, and knees)',
      'Joint swelling with periarticular edema, morning stiffness, and difficulty walking erect',
      'Maculopapular cutaneous rash involving trunk, limbs, and occasionally palms and soles',
      'Severe muscular aches (myalgia), headache, retro-orbital soreness, and intense fatigue',
      'Persistent joint discomfort that can linger for weeks, months, or rarely years after the acute phase'
    ],
    preventivePractices: [
      'Systematically eradicate peri-domestic standing water in discarded tires, coconut shells, plastic containers, and air cooler trays',
      'Apply approved topical insect repellents containing DEET, Picaridin, or Oil of Lemon Eucalyptus',
      'Install fine mesh screens on all exterior domestic windows and doors',
      'Wear protective, light-colored clothing covering upper arms and lower legs during daylight hours',
      'Participate actively in neighborhood vector surveillance and community environmental cleanup drives',
      'Ensure infected patients rest under bed nets during the first week to prevent passing the virus to local biting mosquitoes'
    ],
    whenToSeekCare: 'Consult a primary healthcare doctor for formal confirmation and supportive care. Seek immediate medical evaluation if accompanied by refractory high fever, confusion, severe dehydration, inability to bear weight, or bleeding manifestations.',
    reliableSource: 'National Vector Borne Disease Control Programme (NVBDCP) & WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/chikungunya',
    prevalenceIndex: 36
  },
  {
    id: 'dis-11',
    name: 'Malaria (Plasmodium Vivax & Falciparum)',
    category: 'Vector-Borne',
    description: 'A life-threatening protozoan parasitic infection transmitted through the nocturnal bites of infected female Anopheles mosquitoes, targeting erythrocytes and hepatic tissue.',
    commonRiskFactors: [
      'Proximity to stagnant water bodies, slow-moving streams, marshy coastal zones, and construction puddles',
      'Night-time and twilight outdoor exposure without protective netting or repellents',
      'Seasonal monsoon and post-monsoon climatic periods facilitating mosquito propagation',
      'Residing in or traveling to endemic forested, tribal, or irrigated rural agricultural tracts',
      'Lack of chemical larviciding or indoor residual spraying (IRS) in high-risk zones'
    ],
    commonSymptoms: [
      'Classic malarial paroxysm: sudden cold stage (rigors and teeth-chattering chills), followed by hot stage (fever up to 105°F), terminating with a drenching diaphoresis sweating stage',
      'Cyclical recurring febrile episodes every 48 hours (tertian) or irregular continuous fever (falciparum)',
      'Intense pulsating headache, generalized muscle aches, and back pain',
      'Nausea, bilious vomiting, diarrhea, and profound prostration',
      'Mild jaundice and pallor resulting from acute hemolytic breakdown of red blood cells',
      'Splenomegaly (tender enlargement of the spleen on clinical palpation)'
    ],
    preventivePractices: [
      'Sleep under Long-Lasting Insecticidal Nets (LLINs) every night without exception',
      'Support indoor residual spraying (IRS) with approved synthetic pyrethroids conducted by health authorities',
      'Eliminate open stagnant puddles, drain blocked rainwater channels, and introduce larvivorous fish (Gambusia)',
      'Apply mosquito repellent creams on exposed skin before going outdoors after dusk',
      'Take recommended chemoprophylaxis when traveling into known high-transmission falciparum regions',
      'Rapid diagnostic testing (RDT) or peripheral blood smear evaluation within 24 hours of any unexplained fever'
    ],
    whenToSeekCare: 'EMERGENCY: Immediate hospital admission required if fever is accompanied by altered mental status, delirium, seizures, severe breathlessness, dark "blackwater" urine, persistent vomiting, or extreme pallor (indicators of Cerebral Malaria or Severe Falciparum Disease).',
    reliableSource: 'National Center for Vector Borne Diseases Control (NCVBDC) & WHO Global Malaria Programme',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/malaria',
    prevalenceIndex: 32
  },
  {
    id: 'dis-12',
    name: 'Chronic Obstructive Pulmonary Disease (COPD)',
    category: 'Chronic',
    description: 'A progressive, debilitating lung disorder characterized by persistent, non-reversible airflow limitation caused by a combination of small-airway disease (obstructive bronchiolitis) and parenchymal destruction (emphysema).',
    commonRiskFactors: [
      'Tobacco smoke exposure (active cigarette or beedi smoking is the dominant global risk factor)',
      'Indoor biomass fuel exposure: burning wood, animal dung, or crop residues in poorly ventilated traditional cookstoves (chulhas)',
      'Heavy ambient outdoor particulate air pollution (PM 2.5) in urban industrial corridors',
      'Occupational exposure to organic/inorganic dusts, coal dust, silica, and chemical gases',
      'Severe or recurrent childhood lower respiratory tract infections and untreated chronic asthma',
      'Rare genetic deficiency of alpha-1 antitrypsin enzyme'
    ],
    commonSymptoms: [
      'Progressive dyspnea (breathlessness) initially on exertion, gradually advancing to breathless at rest',
      'Chronic daily cough with variable production of tenacious mucoid or purulent sputum',
      'Frequent chest tightness and audible respiratory wheezing during physical effort',
      'Frequent acute chest infections ("winter bronchitis" episodes)',
      'Unintended weight loss and muscle wasting (pulmonary cachexia in advanced disease)',
      'Morning headaches from nocturnal carbon dioxide retention in severe stages'
    ],
    preventivePractices: [
      'Total and unconditional smoking cessation; halts the accelerated rate of lung function decline',
      'Transition from traditional biomass cookstoves to clean energy sources (LPG, electricity, induction cooking) with kitchen chimneys',
      'Ensure excellent cross-ventilation in kitchens and residential quarters',
      'Wear certified occupational dust respirators in textile, brick kiln, stone crushing, and construction trades',
      'Receive annual influenza and pneumococcal polysaccharide vaccinations to prevent acute exacerbations',
      'Participate in structured pulmonary rehabilitation exercises to maintain cardiovascular and respiratory muscular stamina'
    ],
    whenToSeekCare: 'Seek urgent medical care if experiencing an acute exacerbation: sudden worsening of breathlessness, increased volume or purulence (green/yellow) of sputum, blue lips/fingertips, or acute confusion/lethargy.',
    reliableSource: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD) & MoHFW',
    sourceUrl: 'https://goldcopd.org/',
    prevalenceIndex: 50
  },
  {
    id: 'dis-13',
    name: 'Acute Gastroenteritis & Foodborne Infections',
    category: 'Communicable',
    description: 'Acute inflammation of the gastric and intestinal mucosa caused by bacterial (Vibrio cholerae, Salmonella, E. coli), viral (Rotavirus, Norovirus), or protozoan pathogens, leading to sudden vomiting and diarrhea.',
    commonRiskFactors: [
      'Consumption of microbially contaminated municipal or borewell drinking water',
      'Eating unrefrigerated cooked food kept at ambient tropical temperatures exceeding 2 hours',
      'Inadequate hand hygiene by food handlers before meal preparation and serving',
      'Consumption of raw street salads, unpasteurized juices, and food exposed to flies',
      'Compromised civic sanitation and open drainage overflow during seasonal monsoon deluges'
    ],
    commonSymptoms: [
      'Sudden onset of frequent, loose or watery diarrheal stools (> 3 episodes in 24 hours)',
      'Abdominal cramping, colicky pain, and hyperactive bowel sounds (borborygmi)',
      'Nausea, recurrent vomiting, and total loss of appetite',
      'Low to moderate grade fever, chills, and generalized headache',
      'Clinical signs of dehydration: intense dry mouth, sunken eyeballs, reduced skin turgor, dark urine, and postural dizziness'
    ],
    preventivePractices: [
      'Strict adherence to the WHO Five Keys to Safer Food: keep clean, separate raw and cooked, cook thoroughly, keep food at safe temperatures, and use safe water/raw materials',
      'Wash hands vigorously with soap and clean water for at least 20 seconds before handling food and after toilet use',
      'Boil municipal drinking water vigorously for at least 1 minute before domestic consumption',
      'Immediately administer Oral Rehydration Salts (ORS) solution plus zinc supplementation at the earliest onset of loose stools',
      'Ensure infants complete the rotavirus vaccination schedule as part of national immunization',
      'Avoid consuming street foods prepared with untreated raw water or handled without protective gloves'
    ],
    whenToSeekCare: 'URGENT: Seek immediate emergency hospital care if the patient displays severe dehydration (dry tongue, sunken eyes, skin pinch retracts very slowly), inability to retain fluids due to persistent vomiting, blood in stools (dysentery), high fever (> 102°F), or no urine output for over 6 hours.',
    reliableSource: 'World Health Organization (WHO) & National Institute of Cholera and Enteric Diseases (NICED)',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease',
    prevalenceIndex: 64
  },
  {
    id: 'dis-14',
    name: 'Thyroid Disorders (Hypothyroidism & Goitre)',
    category: 'Non-Communicable',
    description: 'Endocrine conditions marked by insufficient circulating thyroid hormone levels (hypothyroidism) or anatomical enlargement of the thyroid gland (goitre), frequently stemming from autoimmune thyroiditis or dietary iodine imbalances.',
    commonRiskFactors: [
      'Insufficient dietary iodine intake or exclusive consumption of unfortified non-iodized crystal salt',
      'Autoimmune predisposition (Hashimoto thyroiditis, high anti-TPO antibody titers)',
      'Female gender (prevalence is 4 to 8 times higher in females than males)',
      'Excessive habitual consumption of raw goitrogenic foods (cabbage, cauliflower, cassava) without cooking',
      'Family history of thyroid autoimmune dysfunction or other autoimmune disorders',
      'Postpartum period (postpartum thyroiditis occurring within 12 months of childbirth)'
    ],
    commonSymptoms: [
      'Unexplained weight gain and severe difficulty losing weight despite low caloric intake',
      'Chronic persistent fatigue, sluggishness, mental fog, and impaired concentration',
      'Extreme sensitivity and intolerance to cold environmental temperatures',
      'Dry, coarse skin, thinning brittle hair, and excessive hair loss',
      'Persistent constipation and abdominal bloating',
      'Menstrual irregularities (heavy, prolonged, or infrequent menstrual cycles)',
      'Painless swelling or fullness at the base of the anterior neck (visible goitre)'
    ],
    preventivePractices: [
      'Consistently utilize certified iodized salt for all domestic meal preparation to meet recommended daily iodine intake (150 mcg/day)',
      'Store iodized salt in sealed containers protected from direct sunlight and moisture to prevent iodine volatilization',
      'Cook cruciferous vegetables thoroughly to neutralize natural goitrogens before consumption',
      'Undergo periodic thyroid screening (serum TSH and free T4 assays), particularly before planned conception and in early pregnancy',
      'Avoid arbitrary consumption of high-dose kelp or unproven over-the-counter thyroid supplements without medical supervision',
      'Maintain adherence to prescribed morning levothyroxine replacement therapy on an empty stomach with plain water'
    ],
    whenToSeekCare: 'Consult an endocrinologist or general physician if experiencing persistent unexplained weight gain, chronic exhaustion, neck swelling, hoarseness of voice, or menstrual irregularities. Pregnant women require immediate TSH assessment to prevent fetal developmental impairment.',
    reliableSource: 'Indian Thyroid Society (ITS) & American Thyroid Association (ATA)',
    sourceUrl: 'https://www.thyroid.org/',
    prevalenceIndex: 48
  },
  {
    id: 'dis-15',
    name: 'Cervical & Breast Cancer Awareness',
    category: 'Non-Communicable',
    description: 'The two most prevalent oncological conditions affecting women in India, marked by uncontrolled malignant cell proliferation in the uterine cervix (primarily driven by high-risk human papillomavirus) or mammary gland tissue.',
    commonRiskFactors: [
      'Persistent high-risk Human Papillomavirus (HPV strains 16 & 18) genital mucosal infection',
      'Early age at first sexual intercourse, multiple sexual partners, and high parity',
      'Poor female genital hygiene and lack of routine cervical screening',
      'Family history of breast or ovarian malignancy (BRCA1/BRCA2 genetic mutations)',
      'Early menarche (< 12 years), late menopause (> 55 years), or nulliparity / delayed first childbirth (> 30 years)',
      'Post-menopausal obesity, physical inactivity, and hormone replacement therapy usage'
    ],
    commonSymptoms: [
      'Cervical: Abnormal vaginal bleeding between menstrual cycles, after sexual intercourse, or post-menopause',
      'Cervical: Persistent watery, blood-stained, or foul-smelling vaginal discharge',
      'Cervical: Constant pelvic pain or pain during sexual intercourse (dyspareunia)',
      'Breast: Painless, firm, irregular lump or localized thickening in the breast or axillary armpit',
      'Breast: Changes in breast size, contour, or symmetry, or localized dimpling of skin ("peau d orange")',
      'Breast: Spontaneous nipple discharge (especially bloody or clear serous) or sudden nipple retraction/inversion'
    ],
    preventivePractices: [
      'Administer the HPV vaccine to adolescent girls aged 9–14 years prior to sexual debut (single or two-dose schedule as per national guidelines)',
      'Undergo routine cervical cancer screening via Pap smear or visual inspection with acetic acid (VIA) every 3–5 years for women aged 30–65',
      'Perform monthly Breast Self-Examination (BSE) 5–7 days following the end of menstrual periods',
      'Attend clinical breast examinations (CBE) by a trained healthcare professional every 1–3 years, and screening mammography from age 45–50',
      'Adopt a physically active lifestyle, maintain optimal body mass index, and avoid tobacco and alcohol exposure',
      'Promote extended exclusive breastfeeding for at least 6 months, which exerts a protective effect against hormone-receptor breast cancer'
    ],
    whenToSeekCare: 'Consult a gynecologist or surgical oncologist immediately upon detecting any palpable breast lump, abnormal post-coital or post-menopausal vaginal bleeding, unusual nipple discharge, or persistent non-cyclical breast pain. Early detection saves lives.',
    reliableSource: 'World Health Organization (WHO) Cervical Cancer Elimination Initiative & ICMR National Cancer Registry',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/cervical-cancer',
    prevalenceIndex: 44
  },
  {
    id: 'dis-16',
    name: 'Scrub Typhus (Rickettsial Infection)',
    category: 'Vector-Borne',
    description: 'An acute, potentially severe zoonotic bacterial illness caused by Orientia tsutsugamushi, transmitted to humans through the bite of larval trombiculid mites ("chiggers") inhabiting dense scrub vegetation.',
    commonRiskFactors: [
      'Agricultural labor, clearing brushwood, weeding, or working in tea/paddy fields without protective wear',
      'Walking barefoot or sitting directly on grass and scrub vegetation in rural and semi-urban fringe areas',
      'Post-monsoon seasonal vegetation growth creating dense micro-habitats for trombiculid mites',
      'Living in or traveling to rural hilly, sub-mountainous, or agricultural districts during cooler monsoon months',
      'Domestic storage of unharvested crops or firewood attracting rodent reservoir hosts near living quarters'
    ],
    commonSymptoms: [
      'Pathognomonic "Eschar": a localized, painless black necrotic cigarette-burn-like skin lesion at the site of the chigger bite (often in axilla, groin, or waistline)',
      'Sudden onset of high-grade persistent fever accompanied by severe chills and rigors',
      'Severe frontal and retro-orbital headache, generalized muscle aches, and extreme weakness',
      'Generalized lymphadenopathy (tender swollen lymph nodes) and conjunctival suffusion (red eyes)',
      'Maculopapular rash developing on the trunk and spreading centrifugally to limbs around day 5 of illness',
      'Cough, mild dyspnea, and gastrointestinal disturbances (nausea, vomiting, abdominal pain)'
    ],
    preventivePractices: [
      'Apply insect repellents containing DEET, Picaridin, or permethrin to shoes, socks, and lower trouser hems when working outdoors',
      'Wear high gumboots, long trousers tucked firmly into socks, and long-sleeved shirts when working in fields or dense brush',
      'Avoid sitting or sleeping directly on grass, agricultural mounds, or scrub foliage; use thick plastic tarpaulins',
      'Clear brush, tall weeds, and overgrown scrub vegetation within a 20-metre perimeter around residential buildings',
      'Bathe with soap and water and wash all clothes in hot water immediately after returning from agricultural field work',
      'Control domestic and agricultural rodent populations through proper grain storage and sanitation'
    ],
    whenToSeekCare: 'Consult a physician immediately if running a high fever after visiting rural fields or brushlands, particularly if a black scab (eschar) is discovered. Untreated scrub typhus can rapidly progress to multi-organ dysfunction syndrome (pneumonitis, encephalitis, acute kidney injury).',
    reliableSource: 'Indian Council of Medical Research (ICMR) & National Centre for Disease Control (NCDC)',
    sourceUrl: 'https://ncdc.mohfw.gov.in/',
    prevalenceIndex: 30
  }
];

export const INITIAL_BLOOD_INVENTORY: BloodInventoryItem[] = [
  { id: 'bi-01', bloodGroup: 'A+', availableUnits: 48, district: 'CHENNAI', hospitalOrBank: 'Rajiv Gandhi Government General Hospital Blood Bank', lastUpdated: '2026-08-29 14:30', status: 'Available' },
  { id: 'bi-02', bloodGroup: 'A-', availableUnits: 6, district: 'CHENNAI', hospitalOrBank: 'Rajiv Gandhi Government General Hospital Blood Bank', lastUpdated: '2026-08-29 15:15', status: 'Critical' },
  { id: 'bi-03', bloodGroup: 'B+', availableUnits: 62, district: 'CHENNAI', hospitalOrBank: 'Kilpauk Medical College Blood Centre', lastUpdated: '2026-08-29 16:00', status: 'Available' },
  { id: 'bi-04', bloodGroup: 'B-', availableUnits: 9, district: 'CHENNAI', hospitalOrBank: 'Kilpauk Medical College Blood Centre', lastUpdated: '2026-08-29 15:45', status: 'Low' },
  { id: 'bi-05', bloodGroup: 'O+', availableUnits: 85, district: 'CHENNAI', hospitalOrBank: 'Tamil Nadu Red Cross Regional Bank', lastUpdated: '2026-08-29 16:30', status: 'Available' },
  { id: 'bi-06', bloodGroup: 'O-', availableUnits: 4, district: 'CHENNAI', hospitalOrBank: 'Tamil Nadu Red Cross Regional Bank', lastUpdated: '2026-08-29 16:15', status: 'Critical' },
  { id: 'bi-07', bloodGroup: 'AB+', availableUnits: 26, district: 'CHENNAI', hospitalOrBank: 'Stanley Medical College Blood Bank', lastUpdated: '2026-08-29 14:30', status: 'Available' },
  { id: 'bi-08', bloodGroup: 'AB-', availableUnits: 2, district: 'CHENNAI', hospitalOrBank: 'Stanley Medical College Blood Bank', lastUpdated: '2026-08-29 15:00', status: 'Critical' },

  { id: 'bi-09', bloodGroup: 'A+', availableUnits: 38, district: 'COIMBATORE', hospitalOrBank: 'Coimbatore Medical College Hospital Centre', lastUpdated: '2026-08-29 13:40', status: 'Available' },
  { id: 'bi-10', bloodGroup: 'B+', availableUnits: 55, district: 'COIMBATORE', hospitalOrBank: 'Coimbatore Medical College Hospital Centre', lastUpdated: '2026-08-29 13:40', status: 'Available' },
  { id: 'bi-11', bloodGroup: 'O+', availableUnits: 72, district: 'COIMBATORE', hospitalOrBank: 'Kovai Medical Center Blood Bank', lastUpdated: '2026-08-29 15:10', status: 'Available' },
  { id: 'bi-12', bloodGroup: 'O-', availableUnits: 7, district: 'COIMBATORE', hospitalOrBank: 'Kovai Medical Center Blood Bank', lastUpdated: '2026-08-29 15:10', status: 'Critical' },
  { id: 'bi-13', bloodGroup: 'AB-', availableUnits: 3, district: 'COIMBATORE', hospitalOrBank: 'Coimbatore Medical College Hospital Centre', lastUpdated: '2026-08-29 12:50', status: 'Critical' },

  { id: 'bi-14', bloodGroup: 'A+', availableUnits: 32, district: 'MADURAI', hospitalOrBank: 'Government Rajaji Hospital Apex Blood Bank', lastUpdated: '2026-08-29 11:20', status: 'Available' },
  { id: 'bi-15', bloodGroup: 'B-', availableUnits: 5, district: 'MADURAI', hospitalOrBank: 'Government Rajaji Hospital Apex Blood Bank', lastUpdated: '2026-08-29 11:20', status: 'Critical' },
  { id: 'bi-16', bloodGroup: 'O+', availableUnits: 64, district: 'MADURAI', hospitalOrBank: 'Meenakshi Mission Blood Bank', lastUpdated: '2026-08-29 14:05', status: 'Available' },

  { id: 'bi-17', bloodGroup: 'O+', availableUnits: 45, district: 'TIRUCHIRAPPALLI', hospitalOrBank: 'Mahatma Gandhi Memorial Govt Hospital Bank', lastUpdated: '2026-08-29 12:10', status: 'Available' },
  { id: 'bi-18', bloodGroup: 'O-', availableUnits: 4, district: 'TIRUCHIRAPPALLI', hospitalOrBank: 'Mahatma Gandhi Memorial Govt Hospital Bank', lastUpdated: '2026-08-29 12:10', status: 'Critical' },
  { id: 'bi-19', bloodGroup: 'B+', availableUnits: 48, district: 'SALEM', hospitalOrBank: 'Government Mohan Kumaramangalam Medical College Bank', lastUpdated: '2026-08-29 13:40', status: 'Available' },
  { id: 'bi-20', bloodGroup: 'AB-', availableUnits: 3, district: 'SALEM', hospitalOrBank: 'Government Mohan Kumaramangalam Medical College Bank', lastUpdated: '2026-08-29 13:40', status: 'Critical' },
  { id: 'bi-21', bloodGroup: 'A+', availableUnits: 28, district: 'TIRUNELVELI', hospitalOrBank: 'Tirunelveli Medical College Blood Bank', lastUpdated: '2026-08-29 11:00', status: 'Available' },
  { id: 'bi-22', bloodGroup: 'O+', availableUnits: 36, district: 'VELLORE', hospitalOrBank: 'Christian Medical College (CMC) Blood Bank', lastUpdated: '2026-08-29 10:30', status: 'Available' }
];

export const INITIAL_BLOOD_DONORS: BloodDonor[] = [
  { id: 'bd-01', userId: 'usr-002', donorCode: 'DONOR-3189', bloodGroup: 'O+', district: 'CHENNAI', area: 'T. Nagar, Chennai', availabilityStatus: 'Available', lastDonationDate: '2026-04-12', consentGiven: true, totalDonationsCount: 5 },
  { id: 'bd-02', userId: 'usr-003', donorCode: 'DONOR-7721', bloodGroup: 'A+', district: 'COIMBATORE', area: 'RS Puram, Coimbatore', availabilityStatus: 'Available', lastDonationDate: '2026-05-20', consentGiven: true, totalDonationsCount: 3 },
  { id: 'bd-03', userId: 'usr-004', donorCode: 'DONOR-1044', bloodGroup: 'B+', district: 'MADURAI', area: 'KK Nagar, Madurai', availabilityStatus: 'Available', lastDonationDate: '2026-03-01', consentGiven: true, totalDonationsCount: 8 },
  { id: 'bd-04', userId: 'usr-005', donorCode: 'DONOR-9082', bloodGroup: 'O-', district: 'TIRUCHIRAPPALLI', area: 'Thillai Nagar, Trichy', availabilityStatus: 'Available', lastDonationDate: '2026-06-18', consentGiven: true, totalDonationsCount: 6 },
  { id: 'bd-05', userId: 'usr-006', donorCode: 'DONOR-4412', bloodGroup: 'AB+', district: 'SALEM', area: 'Fairlands, Salem', availabilityStatus: 'Available', lastDonationDate: '2026-02-14', consentGiven: true, totalDonationsCount: 2 },
  { id: 'bd-06', userId: 'usr-007', donorCode: 'DONOR-6519', bloodGroup: 'A-', district: 'TIRUNELVELI', area: 'Palayamkottai, Tirunelveli', availabilityStatus: 'Temporarily Ineligible', lastDonationDate: '2026-08-01', consentGiven: true, totalDonationsCount: 4 },
  { id: 'bd-07', userId: 'usr-008', donorCode: 'DONOR-8823', bloodGroup: 'B-', district: 'VELLORE', area: 'Katpadi, Vellore', availabilityStatus: 'Available', lastDonationDate: '2026-01-25', consentGiven: true, totalDonationsCount: 7 },
  { id: 'bd-08', userId: 'usr-009', donorCode: 'DONOR-5130', bloodGroup: 'AB-', district: 'THANJAVUR', area: 'Medical College Road, Thanjavur', availabilityStatus: 'Available', lastDonationDate: '2026-04-30', consentGiven: true, totalDonationsCount: 3 },
  { id: 'bd-09', userId: 'usr-010', donorCode: 'DONOR-6214', bloodGroup: 'O+', district: 'ERODE', area: 'Perundurai Road, Erode', availabilityStatus: 'Available', lastDonationDate: '2026-07-10', consentGiven: true, totalDonationsCount: 4 },
  { id: 'bd-10', userId: 'usr-011', donorCode: 'DONOR-8391', bloodGroup: 'A+', district: 'KANYAKUMARI', area: 'Nagercoil Town, Kanyakumari', availabilityStatus: 'Available', lastDonationDate: '2026-05-02', consentGiven: true, totalDonationsCount: 5 }
];

export const INITIAL_POPULATION_DATA: DemographicData[] = [
  { id: 'pop-01', ageGroup: '0-14 (Children)', gender: 'Male', district: 'CHENNAI', area: 'Mylapore Ward 12', occupation: 'Student', education: 'Primary', familySize: 4, reportedYear: 2026 },
  { id: 'pop-02', ageGroup: '0-14 (Children)', gender: 'Female', district: 'CHENNAI', area: 'Anna Nagar Ward 08', occupation: 'Student', education: 'Middle School', familySize: 5, reportedYear: 2026 },
  { id: 'pop-03', ageGroup: '15-24 (Youth)', gender: 'Female', district: 'CHENNAI', area: 'Velachery Tech Hub', occupation: 'Higher Secondary / College', education: 'Undergraduate', familySize: 4, reportedYear: 2026 },
  { id: 'pop-04', ageGroup: '25-59 (Adults)', gender: 'Male', district: 'CHENNAI', area: 'T. Nagar Commercial Hub', occupation: 'Commerce / Retail', education: 'Graduate', familySize: 3, reportedYear: 2026 },
  { id: 'pop-05', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'CHENNAI', area: 'OMR IT Corridor', occupation: 'Information Technology', education: 'Postgraduate', familySize: 4, reportedYear: 2026 },
  { id: 'pop-06', ageGroup: '60+ (Seniors)', gender: 'Male', district: 'CHENNAI', area: 'George Town Heritage Ward', occupation: 'Retired / Pensioner', education: 'Secondary', familySize: 2, reportedYear: 2026 },
  { id: 'pop-07', ageGroup: '60+ (Seniors)', gender: 'Female', district: 'CHENNAI', area: 'Adyar Residential Sector', occupation: 'Homemaker / Retired', education: 'Primary', familySize: 2, reportedYear: 2026 },

  { id: 'pop-08', ageGroup: '25-59 (Adults)', gender: 'Male', district: 'COIMBATORE', area: 'Peelamedu Tech Zone', occupation: 'Industrial Engineering', education: 'Graduate', familySize: 4, reportedYear: 2026 },
  { id: 'pop-09', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'COIMBATORE', area: 'Gandhipuram Sector', occupation: 'Textile Design', education: 'Secondary', familySize: 5, reportedYear: 2026 },
  { id: 'pop-10', ageGroup: '15-24 (Youth)', gender: 'Male', district: 'COIMBATORE', area: 'Saravanampatti IT Hub', occupation: 'Software Apprentice', education: 'Diploma', familySize: 4, reportedYear: 2026 },
  { id: 'pop-11', ageGroup: '0-14 (Children)', gender: 'Female', district: 'COIMBATORE', area: 'RS Puram Zone', occupation: 'Student', education: 'Primary', familySize: 4, reportedYear: 2026 },

  { id: 'pop-12', ageGroup: '25-59 (Adults)', gender: 'Male', district: 'MADURAI', area: 'KK Nagar Medical Enclave', occupation: 'Healthcare Professional', education: 'Postgraduate', familySize: 3, reportedYear: 2026 },
  { id: 'pop-13', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'MADURAI', area: 'Simmakkal Ward', occupation: 'Educator', education: 'Master of Arts', familySize: 4, reportedYear: 2026 },
  { id: 'pop-14', ageGroup: '15-24 (Youth)', gender: 'Female', district: 'MADURAI', area: 'Tallakulam Colony', occupation: 'Arts & Science Student', education: 'Undergraduate', familySize: 4, reportedYear: 2026 },

  { id: 'pop-15', ageGroup: '25-59 (Adults)', gender: 'Male', district: 'SALEM', area: 'Suramangalam Ward', occupation: 'Steel & Metallurgical Trade', education: 'ITI Certified', familySize: 5, reportedYear: 2026 },
  { id: 'pop-16', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'TIRUCHIRAPPALLI', area: 'Srirangam Temple Ward', occupation: 'Quality Inspection', education: 'Secondary', familySize: 4, reportedYear: 2026 },
  { id: 'pop-17', ageGroup: '0-14 (Children)', gender: 'Male', district: 'TIRUNELVELI', area: 'Tirunelveli Town Ward 4', occupation: 'Student', education: 'Primary', familySize: 5, reportedYear: 2026 },
  { id: 'pop-18', ageGroup: '60+ (Seniors)', gender: 'Male', district: 'VELLORE', area: 'Katpadi Extension', occupation: 'Retired Railway Supervisor', education: 'Secondary', familySize: 3, reportedYear: 2026 },
  { id: 'pop-19', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'THANJAVUR', area: 'Kumbakonam Road Ward', occupation: 'Agricultural Officer', education: 'Graduate', familySize: 4, reportedYear: 2026 }
];

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  { id: 'hr-01', anonymousId: 'CITIZEN-0921', ageGroup: '25-59 (Adults)', gender: 'Male', district: 'CHENNAI', conditionName: 'Essential Hypertension', severity: 'Moderate', reportedYear: 2026, consentGiven: true },
  { id: 'hr-02', anonymousId: 'CITIZEN-1142', ageGroup: '60+ (Seniors)', gender: 'Female', district: 'CHENNAI', conditionName: 'Type 2 Diabetes Mellitus', severity: 'Moderate', reportedYear: 2026, consentGiven: true },
  { id: 'hr-03', anonymousId: 'CITIZEN-3819', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'DHARMAPURI', conditionName: 'Iron Deficiency Anaemia', severity: 'Moderate', reportedYear: 2026, consentGiven: true },
  { id: 'hr-04', anonymousId: 'CITIZEN-4491', ageGroup: '0-14 (Children)', gender: 'Male', district: 'CUDDALORE', conditionName: 'Bronchial Asthma', severity: 'Severe', reportedYear: 2026, consentGiven: true },
  { id: 'hr-05', anonymousId: 'CITIZEN-5012', ageGroup: '15-24 (Youth)', gender: 'Female', district: 'NAGAPATTINAM', conditionName: 'Dengue Fever', severity: 'Mild', reportedYear: 2026, consentGiven: true },
  { id: 'hr-06', anonymousId: 'CITIZEN-6720', ageGroup: '60+ (Seniors)', gender: 'Male', district: 'KRISHNAGIRI', conditionName: 'Pulmonary Tuberculosis', severity: 'Severe', reportedYear: 2026, consentGiven: true },
  { id: 'hr-07', anonymousId: 'CITIZEN-7182', ageGroup: '25-59 (Adults)', gender: 'Male', district: 'COIMBATORE', conditionName: 'Type 2 Diabetes Mellitus', severity: 'Mild', reportedYear: 2026, consentGiven: true },
  { id: 'hr-08', anonymousId: 'CITIZEN-8049', ageGroup: '60+ (Seniors)', gender: 'Male', district: 'COIMBATORE', conditionName: 'Ischaemic Heart Disease (IHD)', severity: 'Severe', reportedYear: 2026, consentGiven: true },
  { id: 'hr-09', anonymousId: 'CITIZEN-9311', ageGroup: '25-59 (Adults)', gender: 'Female', district: 'MADURAI', conditionName: 'Essential Hypertension', severity: 'Mild', reportedYear: 2026, consentGiven: true },
  { id: 'hr-10', anonymousId: 'CITIZEN-2234', ageGroup: '15-24 (Youth)', gender: 'Female', district: 'VILUPPURAM', conditionName: 'Iron Deficiency Anaemia', severity: 'Mild', reportedYear: 2026, consentGiven: true }
];

export const INITIAL_HEALTH_SOURCES: HealthSource[] = [
  {
    id: 'src-01',
    name: 'World Health Organization (WHO)',
    organization: 'United Nations Specialized Health Agency',
    type: 'International Agency',
    website: 'https://www.who.int',
    description: 'Directing and coordinating authority for health within the United Nations system, providing global public health standards and disease guidelines.',
    trustScore: 99
  },
  {
    id: 'src-02',
    name: 'Indian Council of Medical Research (ICMR)',
    organization: 'Department of Health Research, MoHFW India',
    type: 'Research Institution',
    website: 'https://www.icmr.gov.in',
    description: 'Apex body in India for the formulation, coordination and promotion of biomedical research and national disease treatment protocols.',
    trustScore: 98
  },
  {
    id: 'src-03',
    name: 'Ministry of Health and Family Welfare (MoHFW)',
    organization: 'Government of India',
    type: 'Government',
    website: 'https://www.mohfw.gov.in',
    description: 'Union government ministry responsible for national health policies, epidemiological surveillance, and public healthcare delivery programs.',
    trustScore: 97
  },
  {
    id: 'src-04',
    name: 'Centers for Disease Control and Prevention (CDC)',
    organization: 'U.S. Department of Health and Human Services',
    type: 'Government',
    website: 'https://www.cdc.gov',
    description: 'National public health institute protecting community health through disease control, prevention, and statistical surveillance data.',
    trustScore: 96
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'log-01', timestamp: '2026-08-29 14:14:02', userEmail: 'admin@chpanalytics.org', action: 'ADMIN_LOGIN_SUCCESS', category: 'AUTH', status: 'SUCCESS', ipAddress: '192.168.1.45', details: 'Admin authentication via JWT bearer token' },
  { id: 'log-02', timestamp: '2026-08-29 14:18:30', userEmail: 'admin@chpanalytics.org', action: 'BLOOD_INVENTORY_UPDATE', category: 'BLOOD_BANK', status: 'SUCCESS', ipAddress: '192.168.1.45', details: 'Updated O- blood availability in CHENNAI regional bank' },
  { id: 'log-03', timestamp: '2026-08-29 14:22:15', userEmail: 'kamaleshda24@gmail.com', action: 'OTP_SENT', category: 'AUTH', status: 'SUCCESS', ipAddress: '117.214.32.18', details: '6-digit registration OTP issued with 300s expiration' },
  { id: 'log-04', timestamp: '2026-08-29 14:23:40', userEmail: 'kamaleshda24@gmail.com', action: 'EMAIL_VERIFIED_SUCCESS', category: 'AUTH', status: 'SUCCESS', ipAddress: '117.214.32.18', details: 'Account status updated to ACTIVE with district CHENNAI upon OTP verification' },
  { id: 'log-05', timestamp: '2026-08-29 14:45:10', userEmail: 'anonymous_client', action: 'POPULATION_ANALYTICS_VIEW', category: 'DATA_ACCESS', status: 'SUCCESS', ipAddress: '14.139.182.11', details: 'Aggregated Tamil Nadu 38-district demographic summary queried' }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr-001',
    fullName: 'Dr. Sarah Jenkins',
    email: 'admin@chpanalytics.org',
    role: 'ADMIN',
    district: 'CHENNAI',
    isEmailVerified: true,
    registeredAt: '2026-01-10'
  },
  {
    id: 'usr-002',
    fullName: 'Kamalesh D.',
    email: 'kamaleshda24@gmail.com',
    role: 'USER',
    age: 22,
    gender: 'Male',
    district: 'CHENNAI',
    isEmailVerified: true,
    registeredAt: '2026-08-26',
    isDonor: true
  }
];
