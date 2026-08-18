// COURSE DIVINE TECHNOLOGY PVT. LTD.
// 100 Realistic Initial Mock Leads for Internal CRM Demo

const FIRST_NAMES = [
  "Aarav", "Aditi", "Aditya", "Akash", "Amit", "Ananya", "Anil", "Anjali", "Ankit", "Aparna",
  "Arjun", "Bhavani", "Chaitanya", "Deepak", "Divya", "Gautam", "Gayatri", "Harish", "Ishaan", "Jyoti",
  "Kalyan", "Karan", "Karthik", "Kavya", "Keerthi", "Krishna", "Madhuri", "Manoj", "Manish", "Meera",
  "Naveen", "Neha", "Nikhil", "Nisha", "Pooja", "Pranav", "Prasad", "Praveen", "Priya", "Rahul",
  "Rajesh", "Rakesh", "Ramesh", "Ravi", "Ritu", "Rohan", "Rohit", "Sai Teja", "Sameer", "Sandhya",
  "Sandeep", "Sanjay", "Santosh", "Sarika", "Shalini", "Shashi", "Shiva", "Shreya", "Shruti", "Siddharth",
  "Sneha", "Sowmya", "Srikanth", "Srinivas", "Subhash", "Suhas", "Sujatha", "Sumit", "Sunil", "Suresh",
  "Surya", "Swapna", "Swathi", "Tanvi", "Tarun", "Tejas", "Uday", "Uma", "Vamsi", "Varun",
  "Venkat", "Venkatesh", "Vidya", "Vikas", "Vikram", "Vinay", "Vineeth", "Vishal", "Vivek", "Yash",
  "Harini", "Preethi", "Tarun", "Kishore", "Chiranjeevi", "Ganesh", "Mahesh", "Sunita", "Archana", "Lalitha"
];

const LAST_NAMES = [
  "Sharma", "Varma", "Reddy", "Rao", "Nair", "Iyer", "Patel", "Verma", "Gupta", "Joshi",
  "Kumar", "Singh", "Mishra", "Deshmukh", "Kulkarni", "Choudhury", "Bhatt", "Menon", "Pillai", "Nambiar",
  "Chatterjee", "Banerjee", "Mukherjee", "Dutta", "Das", "Roy", "Sengupta", "Ghosh", "Patil", "Shinde",
  "Naidu", "Chowdary", "Goud", "Venkatesan", "Subramanian", "Krishnan", "Sundaram", "Swaminathan", "Natarajan", "Rajan"
];

const CITIES_DATA = [
  { city: "Visakhapatnam", addresses: ["Flat 402, Sai Residency, MVP Colony", "Plot 12, Seethammadhara", "Door 8-2, Gajuwaka", "14-35, Madhurawada", "Beach Road, Pandurangapuram"] },
  { city: "Vijayawada", addresses: ["Flat 102, Sri Nilayam, MG Road", "Plot 45, Benz Circle", "Door 3-12, Governorpet", "Near Bus Stand, Autonagar", "Gunadala Centre"] },
  { city: "Hyderabad", addresses: ["Flat 503, Green Heights, Madhapur", "Plot 88, Gachibowli", "Door 1-8, Banjara Hills Rd 12", "Kukatpally Housing Board Colony", "Ameerpet Metro Station Area"] },
  { city: "Bangalore", addresses: ["Flat 204, Silicon Towers, Koramangala 4th Block", "Plot 56, Indiranagar 100ft Rd", "HSR Layout Sector 2", "Whitefield Main Road", "BTM Layout 2nd Stage"] },
  { city: "Chennai", addresses: ["Flat 301, Temple Bells, T. Nagar", "Door 4-9, Anna Nagar West", "Velachery Main Road", "OMR IT Corridor, Thoraipakkam", "Adyar Bridge Road"] },
  { city: "Pune", addresses: ["Flat 104, Royal Palms, Kothrud", "Plot 78, Hinjewadi Phase 1", "Viman Nagar Main Road", "Baner High Street", "Wakad Link Road"] },
  { city: "Mumbai", addresses: ["Flat 801, Sea View, Andheri West", "Bandra Kurla Complex Area", "Borivali West Link Road", "Thane West Ghodbunder Road", "Dadar TT Circle"] },
  { city: "Delhi", addresses: ["Flat 302, Palm Court, Dwarka Sector 10", "Plot 45, Rohini Sector 15", "Lajpat Nagar 2", "Janakpuri Block B", "Connaught Place Outer Circle"] }
];

const COURSES = [
  "Full Stack Development",
  "Python Programming",
  "Java Programming",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Data Analytics",
  "Cloud Computing",
  "Cyber Security"
];

const SOURCES = [
  "Website Inquiry",
  "LinkedIn Campaign",
  "Google Ads",
  "Student Referral",
  "Campus Walk-in",
  "Instagram Ad"
];

export function generateInitialLeads() {
  const leads = [];
  const baseDate = new Date(2025, 1, 1); // Feb 1, 2025

  for (let i = 1; i <= 100; i++) {
    const leadNum = String(i).padStart(3, "0");
    const firstName = FIRST_NAMES[(i - 1) % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const fullName = `${firstName} ${lastName}`;
    
    const cityObj = CITIES_DATA[i % CITIES_DATA.length];
    const city = cityObj.city;
    const address = cityObj.addresses[i % cityObj.addresses.length];
    
    const course = COURSES[(i * 2 + 1) % COURSES.length];
    const source = SOURCES[i % SOURCES.length];
    
    const cleanFirstName = firstName.toLowerCase().replace(/\s+/g, "");
    const cleanLastName = lastName.toLowerCase().replace(/\s+/g, "");
    const domain = i % 3 === 0 ? "gmail.com" : i % 3 === 1 ? "outlook.com" : "yahoo.in";
    const email = `${cleanFirstName}.${cleanLastName}${i + 10}@${domain}`;
    
    const phonePrefix = ["98450", "98850", "97010", "99490", "96180", "94400", "91210", "89780"][i % 8];
    const phoneSuffix = String(10000 + i * 73).slice(0, 5);
    const phone = `+91 ${phonePrefix} ${phoneSuffix}`;

    const leadDate = new Date(baseDate.getTime() + (i % 14) * 86400000 + (i * 3600000));
    const formattedDate = leadDate.toISOString().split("T")[0];

    leads.push({
      id: `CDT-L${leadNum}`,
      leadId: `CDT-2025-${leadNum}`,
      studentName: fullName,
      email: email,
      phone: phone,
      city: city,
      address: address,
      course: course,
      source: source,
      status: "Unassigned", // All 100 leads start strictly as Unassigned as per the 100-lead assignment workflow
      assignedEmployeeId: null,
      assignedEmployeeName: null,
      assignedAt: null,
      createdAt: formattedDate,
      notes: [
        {
          id: `note-${leadNum}-1`,
          author: "Website System",
          text: `Online lead generated for ${course} from ${city} via ${source}.`,
          timestamp: `${formattedDate} 10:30 AM`
        }
      ],
      qualification: ["B.Tech Final Year", "Degree Completed", "MCA Graduate", "Working Professional", "Diploma Holder"][i % 5],
      preferredBatch: ["Weekday Morning", "Weekday Evening", "Weekend Fast-track"][i % 3]
    });
  }

  return leads;
}

export const INITIAL_LEADS = generateInitialLeads();
