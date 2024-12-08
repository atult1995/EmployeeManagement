export interface User {
  id: string;
  name: string;
  email: string;
  contactNo: number;
  company: string;
  designation: string;
  avatar: string;
}
export interface Designation {
  designationName: string;
  designationKey: string;
  selected: false;
}

export interface Company {
  companyName: string;
  companyKey: string;
  selected: boolean;
}
export const DESIGNATION: Designation[] = [
  {
    designationKey: 'sd',
    designationName: 'Software Developer',
    selected: false,
  },
  {
    designationKey: 'ssd',
    designationName: 'Senior Software Developer',
    selected: false,
  },
  {
    designationKey: 'qa',
    designationName: 'Quality Assurance',
    selected: false,
  },
  {
    designationKey: 'tlm',
    designationName: 'Technical Lead, Manager',
    selected: false,
  },
];

export const COMPANY: Company[] = [
  {
    companyKey: 'XYZ',
    companyName: 'XYZ',
    selected: false,
  },
  {
    companyKey: 'ABC',
    companyName: 'ABC',
    selected: false,
  },
  {
    companyKey: 'DEF',
    companyName: 'DEF',
    selected: false,
  },
];
