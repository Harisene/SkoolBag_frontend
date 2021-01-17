const SCHOOLS = [
  {
    _id: "600285414de0c68668fbeefb",
    schoolName: "Adam Road Primary School",
    address: {
      street: "Great Street",
      suburb: "South Bunbury",
      postalCode: "6230",
      state: "WA",
    },
    numberOfStudents: 12,
  },
  {
    _id: "600285414de08668fbeefb",
    schoolName: "Adam Road Primary School",
    address: {
      street: "Great Street",
      suburb: "Merriwa",
      postalCode: "6030",
      state: "WA",
    },
    numberOfStudents: 98,
  },
  {
    _id: "6002414de0c68668fbeefb",
    schoolName: "Cecil Andrews College",
    address: {
      street: "Great Street",
      suburb: "Armadale",
      postalCode: "6112",
      state: "WA",
    },
    numberOfStudents: 1,
  },
  {
    _id: "600285414de0c688fbeefb",
    schoolName: "Bertram Primary School",
    address: {
      street: "Great Street",
      suburb: "Bertram",
      postalCode: "6167",
      state: "WA",
    },
    numberOfStudents: 45,
  },
];



export default function getAllSchools(){
    return SCHOOLS;
}