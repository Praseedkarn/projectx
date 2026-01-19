const CITY_COORDS = {
  /* ===============================
     🇮🇳 METRO & TIER-1 CITIES
     =============================== */
  delhi: { lat: 28.6139, lng: 77.2090 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  bengaluru: { lat: 12.9716, lng: 77.5946 },
  hyderabad: { lat: 17.3850, lng: 78.4867 },
  pune: { lat: 18.5204, lng: 73.8567 },
  ahmedabad: { lat: 23.0225, lng: 72.5714 },

  /* ===============================
     🏙️ MAJOR STATE CAPITALS
     =============================== */
  patna: { lat: 25.5941, lng: 85.1376 },
  lucknow: { lat: 26.8467, lng: 80.9462 },
  bhubaneswar: { lat: 20.2961, lng: 85.8245 },
  raipur: { lat: 21.2514, lng: 81.6296 },
  ranchi: { lat: 23.3441, lng: 85.3096 },
  dehradun: { lat: 30.3165, lng: 78.0322 },
  shimla: { lat: 31.1048, lng: 77.1734 },
  gandhinagar: { lat: 23.2156, lng: 72.6369 },
  thiruvananthapuram: { lat: 8.5241, lng: 76.9366 },
  bhopal: { lat: 23.2599, lng: 77.4126 },
  imphal: { lat: 24.8170, lng: 93.9368 },
  agartala: { lat: 23.8315, lng: 91.2868 },

  /* ===============================
     🌴 TOP TOURIST CITIES
     =============================== */
  goa: { lat: 15.2993, lng: 74.1240 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  udaipur: { lat: 24.5854, lng: 73.7125 },
  jodhpur: { lat: 26.2389, lng: 73.0243 },
  jaisalmer: { lat: 26.9157, lng: 70.9083 },
  ajmer: { lat: 26.4499, lng: 74.6399 },
  pushkar: { lat: 26.4899, lng: 74.5511 },
  amritsar: { lat: 31.6340, lng: 74.8723 },
  varanasi: { lat: 25.3176, lng: 82.9739 },
  ayodhya: { lat: 26.7922, lng: 82.1998 },
  mathura: { lat: 27.4924, lng: 77.6737 },
  vrindavan: { lat: 27.5650, lng: 77.6593 },
  rishikesh: { lat: 30.0869, lng: 78.2676 },
  haridwar: { lat: 29.9457, lng: 78.1642 },

  /* ===============================
     🏔️ HILL STATIONS
     =============================== */
  manali: { lat: 32.2396, lng: 77.1887 },
  mussoorie: { lat: 30.4598, lng: 78.0644 },
  nainital: { lat: 29.3803, lng: 79.4636 },
  dalhousie: { lat: 32.5387, lng: 75.9714 },
  kasauli: { lat: 30.9000, lng: 76.9650 },
  ooty: { lat: 11.4064, lng: 76.6932 },
  kodaikanal: { lat: 10.2381, lng: 77.4892 },
  munnar: { lat: 10.0889, lng: 77.0595 },
  coorg: { lat: 12.3375, lng: 75.8069 },

  /* ===============================
     🌊 BEACH & COASTAL
     =============================== */
  vizag: { lat: 17.6868, lng: 83.2185 },
  visakhapatnam: { lat: 17.6868, lng: 83.2185 },
  pondicherry: { lat: 11.9416, lng: 79.8083 },
  gokarna: { lat: 14.5479, lng: 74.3188 },
  alappuzha: { lat: 9.4981, lng: 76.3388 },
  varkala: { lat: 8.7379, lng: 76.7163 },
  kovalam: { lat: 8.4006, lng: 76.9780 },

  /* ===============================
     🌄 NORTH-EAST TOURISM
     =============================== */
  shillong: { lat: 25.5788, lng: 91.8933 },
  gangtok: { lat: 27.3389, lng: 88.6065 },
  darjeeling: { lat: 27.0360, lng: 88.2627 },
  kaziranga: { lat: 26.5775, lng: 93.1711 },
  tawang: { lat: 27.5860, lng: 91.8619 },

  /* ===============================
     🇦🇪 / 🌍 INTERNATIONAL (OPTIONAL)
     =============================== */
  dubai: { lat: 25.2048, lng: 55.2708 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  bangkok: { lat: 13.7563, lng: 100.5018 },

  /* ===============================
     ✨ ADD MORE ANYTIME
     =============================== */

       noida: { lat: 28.5355, lng: 77.3910 },
  gurgaon: { lat: 28.4595, lng: 77.0266 },
  faridabad: { lat: 28.4089, lng: 77.3178 },
  ghaziabad: { lat: 28.6692, lng: 77.4538 },

  meerut: { lat: 28.9845, lng: 77.7064 },
  aligarh: { lat: 27.8974, lng: 78.0880 },
  moradabad: { lat: 28.8386, lng: 78.7733 },
  bareilly: { lat: 28.3670, lng: 79.4304 },

  kanpur: { lat: 26.4499, lng: 80.3319 },
  prayagraj: { lat: 25.4358, lng: 81.8463 },
  gorakhpur: { lat: 26.7606, lng: 83.3732 },
  faizabad: { lat: 26.7732, lng: 82.1442 },
     orchha: { lat: 25.3518, lng: 78.6403 },
  khajuraho: { lat: 24.8318, lng: 79.9199 },
  hampi: { lat: 15.3350, lng: 76.4600 },
  badami: { lat: 15.9149, lng: 75.6768 },
  aihole: { lat: 16.0230, lng: 75.8828 },
  pattadakal: { lat: 15.9486, lng: 75.8173 },

  konark: { lat: 19.8876, lng: 86.0945 },
  puri: { lat: 19.8135, lng: 85.8312 },
  chilika: { lat: 19.7783, lng: 85.3076 },
  digha: { lat: 21.6261, lng: 87.5089 },
  mandarmani: { lat: 21.6676, lng: 87.7066 },
  tarkarli: { lat: 16.0326, lng: 73.4630 },
  ganpatipule: { lat: 17.1449, lng: 73.2665 },
  murudeshwar: { lat: 14.0946, lng: 74.4845 },
  kohima: { lat: 25.6751, lng: 94.1086 },
  dimapur: { lat: 25.9090, lng: 93.7266 },
  aizawl: { lat: 23.7271, lng: 92.7176 },
  pasighat: { lat: 28.0663, lng: 95.3261 },
  ziro: { lat: 27.5944, lng: 93.8270 },
  sitapur: { lat: 27.5619, lng: 80.6827 },
  hardoi: { lat: 27.3949, lng: 80.1311 },
  shahjahanpur: { lat: 27.8837, lng: 79.9092 },
  lakhimpur: { lat: 27.9485, lng: 80.7792 },
  ballia: { lat: 25.7584, lng: 84.1487 },
  jaunpur: { lat: 25.7464, lng: 82.6837 },
  mirzapur: { lat: 25.1337, lng: 82.5644 },
  gaya: { lat: 24.7914, lng: 85.0002 },
  bodh_gaya: { lat: 24.6950, lng: 84.9912 },
  muzaffarpur: { lat: 26.1197, lng: 85.3910 },
  bhagalpur: { lat: 25.2425, lng: 86.9842 },
  darbhanga: { lat: 26.1542, lng: 85.8918 },
  purnia: { lat: 25.7771, lng: 87.4753 },
  arrah: { lat: 25.5647, lng: 84.6630 },
  bikaner: { lat: 28.0229, lng: 73.3119 },
  chittorgarh: { lat: 24.8887, lng: 74.6269 },
  sawai_madhopur: { lat: 26.0126, lng: 76.3560 },
  bharatpur: { lat: 27.2152, lng: 77.5030 },
  alwar: { lat: 27.5530, lng: 76.6346 },
  mount_abu: { lat: 24.5926, lng: 72.7156 },
  gwalior: { lat: 26.2183, lng: 78.1828 },
  jabalpur: { lat: 23.1815, lng: 79.9864 },
  satna: { lat: 24.6005, lng: 80.8322 },
  rewa: { lat: 24.5359, lng: 81.2961 },
  chhindwara: { lat: 22.0574, lng: 78.9382 },
  nashik: { lat: 19.9975, lng: 73.7898 },
  solapur: { lat: 17.6599, lng: 75.9064 },
  kolhapur: { lat: 16.7050, lng: 74.2433 },
  ratnagiri: { lat: 16.9902, lng: 73.3120 },
  lonavala: { lat: 18.7537, lng: 73.4068 },
  thanjavur: { lat: 10.7867, lng: 79.1378 },
  kumbakonam: { lat: 10.9601, lng: 79.3845 },
  rameswaram: { lat: 9.2881, lng: 79.3129 },
  kanyakumari: { lat: 8.0883, lng: 77.5385 },
  chidambaram: { lat: 11.3993, lng: 79.6936 },
  tirupati: { lat: 13.6288, lng: 79.4192 },
  nellore: { lat: 14.4426, lng: 79.9865 },
  kurnool: { lat: 15.8281, lng: 78.0373 },
  anantapur: { lat: 14.6819, lng: 77.6006 },
  palampur: { lat: 32.1146, lng: 76.5560 },
  dharamkot: { lat: 32.2451, lng: 76.3216 },
  kasauli: { lat: 30.8980, lng: 76.9656 },
  tehri: { lat: 30.3782, lng: 78.4320 },
  tawang: { lat: 27.5886, lng: 91.8656 },
  bomdila: { lat: 27.2639, lng: 92.4006 },
  haflong: { lat: 25.1640, lng: 93.0172 },
  lunglei: { lat: 22.8671, lng: 92.7655 },
  new_york: { lat: 40.7128, lng: -74.0060 },
  los_angeles: { lat: 34.0522, lng: -118.2437 },
  san_francisco: { lat: 37.7749, lng: -122.4194 },
  las_vegas: { lat: 36.1699, lng: -115.1398 },
  chicago: { lat: 41.8781, lng: -87.6298 },
  new_york: { lat: 40.7128, lng: -74.0060 },
  los_angeles: { lat: 34.0522, lng: -118.2437 },
  san_francisco: { lat: 37.7749, lng: -122.4194 },
  las_vegas: { lat: 36.1699, lng: -115.1398 },
  chicago: { lat: 41.8781, lng: -87.6298 },
  rome: { lat: 41.9028, lng: 12.4964 },
  venice: { lat: 45.4408, lng: 12.3155 },
  florence: { lat: 43.7696, lng: 11.2558 },
  barcelona: { lat: 41.3851, lng: 2.1734 },
  madrid: { lat: 40.4168, lng: -3.7038 },
  berlin: { lat: 52.5200, lng: 13.4050 },
  munich: { lat: 48.1351, lng: 11.5820 },
  amsterdam: { lat: 52.3676, lng: 4.9041 },
  zurich: { lat: 47.3769, lng: 8.5417 },
  lucerne: { lat: 47.0502, lng: 8.3093 },
  istanbul: { lat: 41.0082, lng: 28.9784 },
  cappadocia: { lat: 38.6431, lng: 34.8287 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  osaka: { lat: 34.6937, lng: 135.5023 },
  beijing: { lat: 39.9042, lng: 116.4074 },
  shanghai: { lat: 31.2304, lng: 121.4737 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  bangkok: { lat: 13.7563, lng: 100.5018 },
  phuket: { lat: 7.8804, lng: 98.3923 },
  bali: { lat: -8.3405, lng: 115.0920 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  melbourne: { lat: -37.8136, lng: 144.9631 },
  abu_dhabi: { lat: 24.4539, lng: 54.3773 },
  doha: { lat: 25.2854, lng: 51.5310 },
  cairo: { lat: 30.0444, lng: 31.2357 },
  luxor: { lat: 25.6872, lng: 32.6396 },
  cape_town: { lat: -33.9249, lng: 18.4241 },
  rio_de_janeiro: { lat: -22.9068, lng: -43.1729 },
  sao_paulo: { lat: -23.5505, lng: -46.6333 },
  buenos_aires: { lat: -34.6037, lng: -58.3816 },
  mexico_city: { lat: 19.4326, lng: -99.1332 },
  toronto: { lat: 43.6532, lng: -79.3832 },
  vancouver: { lat: 49.2827, lng: -123.1207 },
/* ===============================
   🌍 INTERNATIONAL CITIES (100)
   =============================== */

  // 🇺🇸 USA
  washington_dc: { lat: 38.9072, lng: -77.0369 },
  boston: { lat: 42.3601, lng: -71.0589 },
  miami: { lat: 25.7617, lng: -80.1918 },
  orlando: { lat: 28.5383, lng: -81.3792 },
  seattle: { lat: 47.6062, lng: -122.3321 },
  san_diego: { lat: 32.7157, lng: -117.1611 },
  houston: { lat: 29.7604, lng: -95.3698 },
  dallas: { lat: 32.7767, lng: -96.7970 },
  atlanta: { lat: 33.7490, lng: -84.3880 },
  denver: { lat: 39.7392, lng: -104.9903 },

  // 🇨🇦 Canada
  montreal: { lat: 45.5017, lng: -73.5673 },
  calgary: { lat: 51.0447, lng: -114.0719 },
  ottawa: { lat: 45.4215, lng: -75.6972 },
  quebec_city: { lat: 46.8139, lng: -71.2080 },
  edmonton: { lat: 53.5461, lng: -113.4938 },

  // 🇧🇷 Brazil
  brasilia: { lat: -15.7939, lng: -47.8828 },
  salvador: { lat: -12.9777, lng: -38.5016 },
  fortaleza: { lat: -3.7319, lng: -38.5267 },
  recife: { lat: -8.0476, lng: -34.8770 },

  // 🇨🇱 Chile
  santiago: { lat: -33.4489, lng: -70.6693 },
  valparaiso: { lat: -33.0472, lng: -71.6127 },

  // 🇵🇪 Peru
  lima: { lat: -12.0464, lng: -77.0428 },
  cusco: { lat: -13.5319, lng: -71.9675 },

  // 🇨🇴 Colombia
  bogota: { lat: 4.7110, lng: -74.0721 },
  medellin: { lat: 6.2442, lng: -75.5812 },

  // 🇲🇽 Mexico
  cancun: { lat: 21.1619, lng: -86.8515 },
  guadalajara: { lat: 20.6597, lng: -103.3496 },
  monterrey: { lat: 25.6866, lng: -100.3161 },

  // 🇩🇪 Germany
  hamburg: { lat: 53.5511, lng: 9.9937 },
  frankfurt: { lat: 50.1109, lng: 8.6821 },
  cologne: { lat: 50.9375, lng: 6.9603 },

  // 🇦🇹 Austria
  vienna: { lat: 48.2082, lng: 16.3738 },
  salzburg: { lat: 47.8095, lng: 13.0550 },

  // 🇵🇱 Poland
  warsaw: { lat: 52.2297, lng: 21.0122 },
  krakow: { lat: 50.0647, lng: 19.9450 },

  // 🇨🇿 Czech Republic
  prague: { lat: 50.0755, lng: 14.4378 },

  // 🇭🇺 Hungary
  budapest: { lat: 47.4979, lng: 19.0402 },

  // 🇬🇷 Greece
  athens: { lat: 37.9838, lng: 23.7275 },
  santorini: { lat: 36.3932, lng: 25.4615 },

  // 🇵🇹 Portugal
  lisbon: { lat: 38.7223, lng: -9.1393 },
  porto: { lat: 41.1579, lng: -8.6291 },

  // 🇸🇪 Sweden
  stockholm: { lat: 59.3293, lng: 18.0686 },
  gothenburg: { lat: 57.7089, lng: 11.9746 },

  // 🇳🇴 Norway
  oslo: { lat: 59.9139, lng: 10.7522 },
  bergen: { lat: 60.3913, lng: 5.3221 },

  // 🇩🇰 Denmark
  copenhagen: { lat: 55.6761, lng: 12.5683 },

  // 🇫🇮 Finland
  helsinki: { lat: 60.1699, lng: 24.9384 },

  // 🇷🇺 Russia
  moscow: { lat: 55.7558, lng: 37.6173 },
  saint_petersburg: { lat: 59.9311, lng: 30.3609 },

  // 🇰🇷 South Korea
  seoul: { lat: 37.5665, lng: 126.9780 },
  busan: { lat: 35.1796, lng: 129.0756 },

  // 🇻🇳 Vietnam
  hanoi: { lat: 21.0278, lng: 105.8342 },
  ho_chi_minh_city: { lat: 10.8231, lng: 106.6297 },

  // 🇲🇾 Malaysia
  kuala_lumpur: { lat: 3.1390, lng: 101.6869 },
  penang: { lat: 5.4141, lng: 100.3288 },

  // 🇵🇭 Philippines
  manila: { lat: 14.5995, lng: 120.9842 },
  cebu: { lat: 10.3157, lng: 123.8854 },

  // 🇳🇿 New Zealand
  auckland: { lat: -36.8485, lng: 174.7633 },
  wellington: { lat: -41.2865, lng: 174.7762 },

  // 🇲🇦 Morocco
  marrakech: { lat: 31.6295, lng: -7.9811 },
  casablanca: { lat: 33.5731, lng: -7.5898 },

  // 🇰🇪 Kenya
  nairobi: { lat: -1.2921, lng: 36.8219 },

  // 🇹🇿 Tanzania
  zanzibar: { lat: -6.1659, lng: 39.2026 },

  // 🇮🇸 Iceland
  reykjavik: { lat: 64.1466, lng: -21.9426 },
  /* ===============================
   🇮🇳 COMPLETE STATE COVERAGE (ADD-ON)
   =============================== */

// Andhra Pradesh
vijayawada: { lat: 16.5062, lng: 80.6480 },
rajahmundry: { lat: 17.0005, lng: 81.8040 },
kakinada: { lat: 16.9891, lng: 82.2475 },

// Arunachal Pradesh
itanagar: { lat: 27.0844, lng: 93.6053 },
naharlagun: { lat: 27.1026, lng: 93.6954 },

// Assam
guwahati: { lat: 26.1445, lng: 91.7362 },
jorhat: { lat: 26.7465, lng: 94.2026 },
silchar: { lat: 24.8333, lng: 92.7789 },

// Chhattisgarh
bilaspur: { lat: 22.0797, lng: 82.1409 },
durg: { lat: 21.1904, lng: 81.2849 },

// Goa
panaji: { lat: 15.4909, lng: 73.8278 },
madgaon: { lat: 15.2736, lng: 73.9581 },

// Gujarat
surat: { lat: 21.1702, lng: 72.8311 },
vadodara: { lat: 22.3072, lng: 73.1812 },
rajkot: { lat: 22.3039, lng: 70.8022 },
bhuj: { lat: 23.2419, lng: 69.6669 },

// Haryana
panipat: { lat: 29.3909, lng: 76.9635 },
ambala: { lat: 30.3752, lng: 76.7821 },
hisar: { lat: 29.1492, lng: 75.7217 },

// Jharkhand
bokaro: { lat: 23.6693, lng: 86.1511 },
dhanbad: { lat: 23.7957, lng: 86.4304 },

// Karnataka
mysuru: { lat: 12.2958, lng: 76.6394 },
hubli: { lat: 15.3647, lng: 75.1240 },
mangaluru: { lat: 12.9141, lng: 74.8560 },
belagavi: { lat: 15.8497, lng: 74.4977 },

// Kerala
kochi: { lat: 9.9312, lng: 76.2673 },
kozhikode: { lat: 11.2588, lng: 75.7804 },
thrissur: { lat: 10.5276, lng: 76.2144 },

// Madhya Pradesh
indore: { lat: 22.7196, lng: 75.8577 },
ujjain: { lat: 23.1765, lng: 75.7885 },
sagar: { lat: 23.8388, lng: 78.7378 },

// Maharashtra
aurangabad: { lat: 19.8762, lng: 75.3433 },
nagpur: { lat: 21.1458, lng: 79.0882 },
amravati: { lat: 20.9374, lng: 77.7796 },

// Manipur
churachandpur: { lat: 24.3335, lng: 93.6790 },

// Meghalaya
tura: { lat: 25.5144, lng: 90.2021 },

// Mizoram
kolasib: { lat: 24.2246, lng: 92.6789 },

// Nagaland
mokokchung: { lat: 26.3226, lng: 94.5177 },

// Odisha
cuttack: { lat: 20.4625, lng: 85.8828 },
sambalpur: { lat: 21.4669, lng: 83.9812 },
balasore: { lat: 21.4942, lng: 86.9336 },

// Punjab
jalandhar: { lat: 31.3260, lng: 75.5762 },
ludhiana: { lat: 30.9009, lng: 75.8573 },
patiala: { lat: 30.3398, lng: 76.3869 },

// Rajasthan
kota: { lat: 25.2138, lng: 75.8648 },
sikar: { lat: 27.6094, lng: 75.1399 },
nagaur: { lat: 27.2020, lng: 73.7330 },

// Sikkim
namchi: { lat: 27.1667, lng: 88.3639 },

// Tamil Nadu
madurai: { lat: 9.9252, lng: 78.1198 },
salem: { lat: 11.6643, lng: 78.1460 },
erode: { lat: 11.3410, lng: 77.7172 },
vellore: { lat: 12.9165, lng: 79.1325 },

// Telangana
warangal: { lat: 17.9689, lng: 79.5941 },
karimnagar: { lat: 18.4386, lng: 79.1288 },

// Tripura
udaipur_tripura: { lat: 23.5333, lng: 91.4833 },

// Uttarakhand
almora: { lat: 29.5971, lng: 79.6591 },
pithoragarh: { lat: 29.5835, lng: 80.2096 },

// West Bengal
asansol: { lat: 23.6739, lng: 86.9524 },
siliguri: { lat: 26.7271, lng: 88.3953 },
krishnanagar: { lat: 23.4058, lng: 88.4907 },

// Union Territories
chandigarh: { lat: 30.7333, lng: 76.7794 },
daman: { lat: 20.3974, lng: 72.8328 },
diu: { lat: 20.7141, lng: 70.9879 },
silvassa: { lat: 20.2763, lng: 73.0083 },
kavaratti: { lat: 10.5667, lng: 72.6167 },
port_blair: { lat: 11.6234, lng: 92.7265 },
leh: { lat: 34.1526, lng: 77.5771 },
kargil: { lat: 34.5539, lng: 76.1349 }


};

export default CITY_COORDS;
