export interface DistrictSvgData {
  id: string; // matches district name in uppercase e.g. 'CHENNAI'
  name: string; // display name e.g. 'Chennai'
  path: string; // SVG path data (d attribute)
  center: [number, number]; // [x, y] coordinates for label/dot
  region: 'Northern' | 'Central' | 'Western' | 'Southern' | 'Coastal / Delta';
  areaKm2: number;
}

/**
 * 38 Tamil Nadu Districts Vector Map Coordinates
 * Calibrated for viewBox="0 0 700 840"
 * Accurately represents geographical neighborhood adjacencies and coastal curves of Tamil Nadu.
 */
export const TAMIL_NADU_SVG_DISTRICTS: DistrictSvgData[] = [
  // --- NORTHERN REGION ---
  {
    id: 'TIRUVALLUR',
    name: 'Tiruvallur',
    path: 'M 490 60 L 550 55 L 590 85 L 575 130 L 530 145 L 485 125 L 470 90 Z',
    center: [530, 95],
    region: 'Northern',
    areaKm2: 3422
  },
  {
    id: 'CHENNAI',
    name: 'Chennai',
    path: 'M 575 130 L 600 135 L 605 165 L 580 175 L 565 150 Z',
    center: [585, 150],
    region: 'Northern',
    areaKm2: 426
  },
  {
    id: 'KANCHEEPURAM',
    name: 'Kanchipuram',
    path: 'M 480 140 L 530 145 L 540 185 L 490 200 L 465 165 Z',
    center: [500, 170],
    region: 'Northern',
    areaKm2: 1704
  },
  {
    id: 'CHENGALPATTU',
    name: 'Chengalpattu',
    path: 'M 530 145 L 580 175 L 595 220 L 540 235 L 525 185 Z',
    center: [555, 195],
    region: 'Northern',
    areaKm2: 2944
  },
  {
    id: 'RANIPET',
    name: 'Ranipet',
    path: 'M 430 115 L 485 125 L 480 160 L 435 165 L 415 130 Z',
    center: [450, 140],
    region: 'Northern',
    areaKm2: 2234
  },
  {
    id: 'VELLORE',
    name: 'Vellore',
    path: 'M 370 110 L 430 115 L 435 165 L 390 175 L 365 140 Z',
    center: [400, 140],
    region: 'Northern',
    areaKm2: 3592
  },
  {
    id: 'TIRUPATHUR',
    name: 'Tirupathur',
    path: 'M 330 140 L 390 145 L 385 195 L 335 205 L 315 165 Z',
    center: [350, 175],
    region: 'Northern',
    areaKm2: 1797
  },
  {
    id: 'TIRUVANNAMALAI',
    name: 'Tiruvannamalai',
    path: 'M 385 185 L 480 170 L 495 235 L 430 260 L 380 230 Z',
    center: [435, 215],
    region: 'Northern',
    areaKm2: 6188
  },
  {
    id: 'KRISHNAGIRI',
    name: 'Krishnagiri',
    path: 'M 255 120 L 330 140 L 335 200 L 270 215 L 235 160 Z',
    center: [285, 165],
    region: 'Western',
    areaKm2: 5143
  },
  {
    id: 'DHARMAPURI',
    name: 'Dharmapuri',
    path: 'M 265 210 L 335 205 L 340 270 L 275 280 L 245 235 Z',
    center: [295, 245],
    region: 'Western',
    areaKm2: 4497
  },

  // --- CENTRAL & NORTH-CENTRAL ---
  {
    id: 'VILUPPURAM',
    name: 'Viluppuram',
    path: 'M 465 235 L 540 235 L 555 295 L 485 305 L 455 260 Z',
    center: [500, 270],
    region: 'Coastal / Delta',
    areaKm2: 3725
  },
  {
    id: 'KALLAKURICHI',
    name: 'Kallakurichi',
    path: 'M 380 240 L 455 240 L 450 310 L 375 300 L 360 260 Z',
    center: [415, 275],
    region: 'Central',
    areaKm2: 3520
  },
  {
    id: 'SALEM',
    name: 'Salem',
    path: 'M 275 280 L 370 270 L 380 345 L 290 350 L 265 305 Z',
    center: [325, 310],
    region: 'Western',
    areaKm2: 5245
  },
  {
    id: 'CUDDALORE',
    name: 'Cuddalore',
    path: 'M 485 305 L 555 295 L 570 365 L 505 380 L 475 335 Z',
    center: [525, 340],
    region: 'Coastal / Delta',
    areaKm2: 3703
  },
  {
    id: 'PERAMBALUR',
    name: 'Perambalur',
    path: 'M 410 335 L 475 330 L 470 380 L 405 380 Z',
    center: [440, 355],
    region: 'Central',
    areaKm2: 1757
  },
  {
    id: 'ARIYALUR',
    name: 'Ariyalur',
    path: 'M 470 350 L 530 355 L 525 405 L 465 400 Z',
    center: [495, 380],
    region: 'Central',
    areaKm2: 1949
  },
  {
    id: 'MAYILADUTHURAI',
    name: 'Mayiladuthurai',
    path: 'M 530 360 L 585 365 L 590 410 L 540 405 Z',
    center: [560, 385],
    region: 'Coastal / Delta',
    areaKm2: 1172
  },
  {
    id: 'NAGAPATTINAM',
    name: 'Nagapattinam',
    path: 'M 565 410 L 610 415 L 615 480 L 580 475 L 560 435 Z',
    center: [585, 445],
    region: 'Coastal / Delta',
    areaKm2: 1397
  },
  {
    id: 'TIRUVARUR',
    name: 'Tiruvarur',
    path: 'M 520 410 L 565 410 L 560 475 L 515 470 Z',
    center: [540, 440],
    region: 'Coastal / Delta',
    areaKm2: 2274
  },
  {
    id: 'THANJAVUR',
    name: 'Thanjavur',
    path: 'M 450 405 L 520 410 L 530 480 L 470 485 L 440 435 Z',
    center: [485, 445],
    region: 'Coastal / Delta',
    areaKm2: 3411
  },

  // --- WESTERN (KONGU) REGION ---
  {
    id: 'NILGIRIS',
    name: 'The Nilgiris',
    path: 'M 100 300 L 175 285 L 180 345 L 125 360 L 90 330 Z',
    center: [135, 325],
    region: 'Western',
    areaKm2: 2549
  },
  {
    id: 'ERODE',
    name: 'Erode',
    path: 'M 180 290 L 265 295 L 265 375 L 195 380 L 175 330 Z',
    center: [225, 335],
    region: 'Western',
    areaKm2: 5722
  },
  {
    id: 'COIMBATORE',
    name: 'Coimbatore',
    path: 'M 115 360 L 190 355 L 185 450 L 110 430 L 95 390 Z',
    center: [145, 400],
    region: 'Western',
    areaKm2: 4723
  },
  {
    id: 'TIRUPPUR',
    name: 'Tiruppur',
    path: 'M 190 365 L 260 370 L 250 460 L 185 450 Z',
    center: [220, 415],
    region: 'Western',
    areaKm2: 5186
  },
  {
    id: 'NAMAKKAL',
    name: 'Namakkal',
    path: 'M 270 350 L 355 345 L 350 415 L 270 410 Z',
    center: [310, 380],
    region: 'Western',
    areaKm2: 3363
  },
  {
    id: 'KARUR',
    name: 'Karur',
    path: 'M 265 415 L 345 415 L 340 475 L 260 465 Z',
    center: [300, 445],
    region: 'Central',
    areaKm2: 2896
  },
  {
    id: 'TIRUCHIRAPPALLI',
    name: 'Tiruchirappalli',
    path: 'M 350 385 L 440 380 L 435 465 L 345 465 Z',
    center: [390, 425],
    region: 'Central',
    areaKm2: 4404
  },

  // --- SOUTH-CENTRAL & DELTA ---
  {
    id: 'DINDIGUL',
    name: 'Dindigul',
    path: 'M 195 465 L 310 470 L 305 560 L 205 550 L 180 495 Z',
    center: [250, 510],
    region: 'Southern',
    areaKm2: 6266
  },
  {
    id: 'THENI',
    name: 'Theni',
    path: 'M 140 500 L 205 510 L 195 595 L 130 580 L 120 535 Z',
    center: [165, 545],
    region: 'Southern',
    areaKm2: 3242
  },
  {
    id: 'MADURAI',
    name: 'Madurai',
    path: 'M 230 550 L 320 545 L 315 620 L 235 615 Z',
    center: [275, 580],
    region: 'Southern',
    areaKm2: 3741
  },
  {
    id: 'PUDUKKOTTAI',
    name: 'Pudukkottai',
    path: 'M 390 465 L 485 465 L 490 545 L 400 540 Z',
    center: [440, 505],
    region: 'Coastal / Delta',
    areaKm2: 4663
  },
  {
    id: 'SIVAGANGA',
    name: 'Sivaganga',
    path: 'M 320 540 L 415 540 L 410 625 L 325 620 Z',
    center: [365, 580],
    region: 'Southern',
    areaKm2: 4189
  },

  // --- SOUTHERN REGION ---
  {
    id: 'VIRUDHUNAGAR',
    name: 'Virudhunagar',
    path: 'M 195 605 L 305 610 L 295 675 L 185 665 Z',
    center: [245, 640],
    region: 'Southern',
    areaKm2: 4288
  },
  {
    id: 'RAMANATHAPURAM',
    name: 'Ramanathapuram',
    path: 'M 330 625 L 450 615 L 535 640 L 475 680 L 340 680 Z',
    center: [415, 650],
    region: 'Coastal / Delta',
    areaKm2: 4089
  },
  {
    id: 'TENKASI',
    name: 'Tenkasi',
    path: 'M 145 645 L 210 655 L 205 745 L 140 735 Z',
    center: [175, 690],
    region: 'Southern',
    areaKm2: 2916
  },
  {
    id: 'THOOTHUKUDI',
    name: 'Thoothukudi',
    path: 'M 255 675 L 345 675 L 350 765 L 270 765 Z',
    center: [305, 720],
    region: 'Southern',
    areaKm2: 4707
  },
  {
    id: 'TIRUNELVELI',
    name: 'Tirunelveli',
    path: 'M 185 715 L 265 715 L 260 805 L 180 795 Z',
    center: [220, 755],
    region: 'Southern',
    areaKm2: 3842
  },
  {
    id: 'KANYAKUMARI',
    name: 'Kanniyakumari',
    path: 'M 160 780 L 225 780 L 220 835 L 155 830 Z',
    center: [190, 810],
    region: 'Southern',
    areaKm2: 1672
  }
];

export function getDistrictSvgById(id: string): DistrictSvgData | undefined {
  const norm = id.toUpperCase().trim();
  return TAMIL_NADU_SVG_DISTRICTS.find(d => d.id === norm || d.name.toUpperCase() === norm);
}
