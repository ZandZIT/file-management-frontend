import bcrypt from 'bcryptjs'

export const types = [
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Employee",
    value: "EMPLOYEE",
  },
  {
    label: "Manager",
    value: "MANAGER",
  },
];

export const createPassword = (text)=>{
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
  
} 