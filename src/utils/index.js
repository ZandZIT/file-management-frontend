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

export const iconMap = [
  {
    type: "jpg",
    src: "/image/file-format/png.png",
  },
  {
    type: "png",
    src: "/image/file-format/png.png",
  },
  {
    type: "jpeg",
    src: "/image/file-format/png.png",
  },
  {
    type: "pdf",
    src: "/image/file-format/pdf.png",
  },
  {
    type: "txt",
    src: "/image/file-format/txt.png",
  },
  {
    type: "doc",
    src: "/image/file-format/doc.png",
  },
  {
    type: "docx",
    src: "/image/file-format/doc.png",
  },
  {
    type: "ppt",
    src: "/image/file-format/ppt.png",
  },
  {
    type: "xlsx",
    src: "/image/file-format/sheets.png",
  },
  {
    type: "mp4",
    src: "/image/file-format/video.png",
  },
];