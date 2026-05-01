import { Doctor, Patient, Appointment, Message } from './types';
import { subWeeks, format } from 'date-fns';



const maleNames = [
  'Dr. Rajesh Kumar', 'Dr. Vikram Seth', 'Dr. Suresh Mani', 'Dr. Rahul Dravid', 'Dr. Vijay Kanth',
  'Dr. Surya Kumar', 'Dr. Ajith Kumar', 'Dr. Dhanush K', 'Dr. Vishnu Vardhan', 'Dr. Sivakarthikeyan',
  'Dr. Vikram Prabhu', 'Dr. Karthi Sivakumar', 'Dr. Mahesh Babu', 'Dr. Allu Arjun', 'Dr. Ram Charan',
  'Dr. Jr NTR', 'Dr. Prabhas Raju', 'Dr. Yash Gowda', 'Dr. Rakshit Shetty', 'Dr. Rishab Shetty',
  'Dr. Sudeep Sanjeev', 'Dr. Puneeth Rajkumar', 'Dr. Darshan Thoogudeepa', 'Dr. Fahadh Faasil', 'Dr. Dulquer Salmaan',
  'Dr. Tovino Thomas', 'Dr. Prithviraj Sukumaran', 'Dr. Mohanlal', 'Dr. Mammootty'
];

const femaleNames = [
  'Dr. Priya Sharma', 'Dr. Kavita Rao', 'Dr. Lakshmi Devi', 'Dr. Sneha Pillai', 'Dr. Amala Paul',
  'Dr. Revathi Menon', 'Dr. Shalini Ajith', 'Dr. Shruti Haasan', 'Dr. Keerthy Suresh', 'Dr. Sai Pallavi',
  'Dr. Trisha Krishnan', 'Dr. Samantha Ruth', 'Dr. Rashmika Mandanna', 'Dr. Pooja Hegde', 'Dr. Kiara Advani',
  'Dr. Kajal Aggarwal', 'Dr. Tamannaah Bhatia', 'Dr. Nazriya Nazim', 'Dr. Anupama Parameswaran', 'Dr. Nimisha Sajayan',
  'Dr. Parvathy Thiruvothu', 'Dr. Meenakshi Sundaram', 'Dr. Anitha Lakshmi'
];

const specializations = [
  'Orthodontist', 'Periodontist', 'Pediatric Dentist', 'Endodontist', 'Cosmetic Dentist',
  'General Dentist', 'Oral Surgeon', 'Prosthodontist', 'Implantologist'
];

const clinicPrefixes = ['White', 'Pearl', 'Bright', 'Smile', 'Dental', 'Elite', 'Crown', 'Crystal', 'Apex', 'Life'];
const clinicSuffixes = ['Care', 'Hub', 'Studio', 'Clinic', 'Hospital', 'Center', 'World', 'Space', 'Lounge', 'Point'];

const locations = [
  { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
  { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
  { name: 'Trichy', lat: 10.7905, lng: 78.7047 },
  { name: 'Salem', lat: 11.6643, lng: 78.1460 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
  { name: 'Trivandrum', lat: 8.5241, lng: 76.9366 }
];

const universities = [
  'Madras Medical College, Chennai',
  'AIIMS, New Delhi',
  'CMC, Vellore',
  'Saveetha Dental College, Chennai',
  'Manipal College of Dental Sciences',
  'SRM Dental College, Chennai',
  'Meenakshi Ammal Dental College',
  'JIPMER, Pondicherry',
  'King Georges Medical University',
  'Maulana Azad Institute of Dental Sciences'
];

const generateMoreDoctors = (count: number): Doctor[] => {
  return Array.from({ length: count }, (_, i) => {
    const isMale = Math.random() > 0.4;
    const id = `dg-${i + 6}`;
    const names = isMale ? maleNames : femaleNames;
    const name = names[Math.floor(Math.random() * names.length)];
    const spec = specializations[Math.floor(Math.random() * specializations.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const clinic = `${clinicPrefixes[Math.floor(Math.random() * clinicPrefixes.length)]} ${clinicSuffixes[Math.floor(Math.random() * clinicSuffixes.length)]}`;
    const exp = (5 + Math.floor(Math.random() * 20)) + ' years';
    const rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
    const avatarSeed = name.replace(/\s/g, '');
    const university = universities[Math.floor(Math.random() * universities.length)];
    
    return {
      id,
      name,
      gender: isMale ? 'Male' : 'Female',
      specialization: spec,
      experience: exp,
      rating,
      bio: `Experienced ${spec} dedicated to providing the best oral healthcare. Specializing in advanced ${spec.toLowerCase()} procedures.`,
      clinicName: clinic,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}&backgroundColor=b6e3f4&mouth=smile&eyebrows=default`,
      patients: [],
      appointments: [],
      coordinates: { 
        lat: location.lat + (Math.random() - 0.5) * 0.1, 
        lng: location.lng + (Math.random() - 0.5) * 0.1 
      },
      timings: '09:00 AM - 07:00 PM',
      studiedIn: university,
      availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:30 PM']
    };
  });
};

export const DUMMY_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Arul Selvan',
    gender: 'Male',
    specialization: 'Orthodontist',
    experience: '12 years',
    rating: 4.9,
    bio: 'Specializing in modern braces and clear aligners. Passionate about creating perfect smiles with a patient-centric approach.',
    clinicName: 'Chennai Dental Hub',
    avatar: '/doctor_male_1.png',
    appointments: [],
    coordinates: { lat: 13.0827, lng: 80.2707 },
    timings: '09:00 AM - 08:00 PM',
    studiedIn: 'Madras Medical College, Chennai',
    availableSlots: ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'],
    patients: [
      {
        id: 'p1',
        name: 'Alice Johnson',
        age: 28,
        gender: 'Female',
        mobile: '9876543210',
        lastVisit: '2026-03-15',
        healthMetrics: [
          { id: 'm1', label: 'Hygiene', value: 'Good', status: 'good', date: '2026-03-15' },
          { id: 'm2', label: 'Gum Health', value: 'Average', status: 'average', date: '2026-03-15' },
          { id: 'm3', label: 'Plaque', value: 'Low', status: 'good', date: '2026-03-15' }
        ],
        messages: [],
        treatmentHistory: [
          {
            id: 't1',
            date: '2026-03-15',
            title: 'Routine Cleaning',
            doctorName: 'Dr. Arul Selvan',
            notes: 'General scaling and polishing performed. No major issues found.',
            cost: '$80',
            prescriptions: ['Chlorhexidine Mouthwash']
          }
        ],
        infectionHistory: [
          {
            id: 'ir1',
            date: '2026-02-10',
            imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80',
            detection: 'Early stage gingivitis detected in the lower molar area.',
            prevention: ['Floss twice daily', 'Use soft-bristled brush', 'Warm salt water rinses'],
            status: 'reviewed'
          }
        ],
        appointments: [
          {
            id: 'a1',
            patientId: 'p1',
            patientName: 'Alice Johnson',
            date: format(subWeeks(new Date(), 1), 'yyyy-MM-dd'),
            time: '10:00 AM',
            type: 'Cleaning',
            status: 'completed'
          },
          {
            id: 'a2',
            patientId: 'p1',
            patientName: 'Alice Johnson',
            date: format(new Date(), 'yyyy-MM-dd'),
            time: '02:00 PM',
            type: 'Consultation',
            status: 'upcoming'
          }
        ]
      }
    ]
  },
  {
    id: 'd2',
    name: 'Dr. Meenakshi Sundaram',
    gender: 'Female',
    specialization: 'Periodontist',
    experience: '15 years',
    rating: 4.8,
    bio: 'Expert in gum health and dental implants. Dedicated to restoring confidence through advanced periodontal care.',
    clinicName: 'Madurai Smile Center',
    avatar: '/doctor_female_1.png',
    patients: [],
    appointments: [],
    coordinates: { lat: 9.9252, lng: 78.1198 },
    timings: '10:00 AM - 07:00 PM',
    studiedIn: 'CMC, Vellore',
    availableSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM']
  },
  {
    id: 'd3',
    name: 'Dr. Karthik Raja',
    gender: 'Male',
    specialization: 'Pediatric Dentist',
    experience: '8 years',
    rating: 5.0,
    bio: 'Specialized in child behavior management and gentle pediatric dental procedures. Making sure every child leaves with a big smile.',
    clinicName: 'Coimbatore Oral Care',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&q=80',
    patients: [],
    appointments: [],
    coordinates: { lat: 11.0168, lng: 76.9558 },
    timings: '09:30 AM - 06:30 PM',
    studiedIn: 'SRM Dental College, Chennai',
    availableSlots: ['09:30 AM', '10:30 AM', '01:30 PM', '02:30 PM', '05:30 PM']
  },
  {
    id: 'd4',
    name: 'Dr. Anitha Lakshmi',
    gender: 'Female',
    specialization: 'Endodontist',
    experience: '20 years',
    rating: 4.7,
    bio: 'Specialist in complex root canal treatments. Uses high-magnification for precise and pain-free endodontic therapy.',
    clinicName: 'Trichy Bright Smiles',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71f1e59816?w=400&h=400&fit=crop&q=80',
    patients: [],
    appointments: [],
    coordinates: { lat: 10.7905, lng: 78.7047 },
    timings: '08:00 AM - 05:00 PM',
    studiedIn: 'AIIMS, New Delhi',
    availableSlots: ['08:00 AM', '09:00 AM', '10:00 AM', '02:00 PM', '04:00 PM']
  },
  {
    id: 'd5',
    name: 'Dr. Senthil Kumar',
    gender: 'Male',
    specialization: 'Cosmetic Dentist',
    experience: '10 years',
    rating: 4.9,
    bio: 'Artistic approach to dental aesthetics. Expert in smile makeovers using porcelain veneers and digital smile design.',
    clinicName: 'Salem Dental Clinic',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&q=80',
    patients: [],
    appointments: [],
    coordinates: { lat: 11.6643, lng: 78.1460 },
    timings: '10:30 AM - 08:30 PM',
    studiedIn: 'Saveetha Dental College, Chennai',
    availableSlots: ['11:00 AM', '01:00 PM', '04:00 PM', '06:00 PM', '07:30 PM']
  },
  ...generateMoreDoctors(45)
];


