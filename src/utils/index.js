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

export function formatFileSize(fileSizeInBytes) {
  if (fileSizeInBytes < 1024) {
    return fileSizeInBytes + " B";
  } else if (fileSizeInBytes < 1024 * 1024) {
    return (fileSizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}