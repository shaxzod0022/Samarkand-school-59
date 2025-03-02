import { instagram, telegram, whatsapp, youtube } from "../assets";

export const footerLinks = [
  {
    title: "Aloqa va Savollar",
    links: [
      {
        url: "https://www.samtuit.uz/uz",
        linkTitle: "Samtuit uz",
      },
      {
        url: "",
        linkTitle: "Savollaringiz bo'lsa?",
      },
      {
        url: "",
        linkTitle: "Maxfiylik Siyosati",
      },
      {
        url: "",
        linkTitle: "Saytning Foydalanish Qoidalari",
      },
    ],
  },
  {
    title: "O'quvchilarga Yordam",
    links: [
      {
        url: "",
        linkTitle: "O'quvchilar uchun Resurslar",
      },
      {
        url: "",
        linkTitle: "O'qish Bo'yicha Qo'llanmalar",
      },
      {
        url: "",
        linkTitle: "Maktab Formasi",
      },
      {
        url: "",
        linkTitle: "O'quvchilar Yutuqlari",
      },
    ],
  },
  {
    title: "Yangiliklar",
    links: [
      {
        url: "",
        linkTitle: "Yangiliklar va Tadbirlar",
      },
      {
        url: "",
        linkTitle: "Maktab Qoidalari",
      },
      {
        url: "",
        linkTitle: "O'quvchilar Yutuqlari",
      },
      {
        url: "",
        linkTitle: "O'qish Bo'yicha Qo'llanmalar",
      },
    ],
  },
  {
    title: "Bog'lanish",
    links: [
      {
        url: "",
        linkTitle: telegram,
      },
      {
        url: "",
        linkTitle: instagram,
      },
      {
        url: "",
        linkTitle: whatsapp,
      },
      {
        url: "",
        linkTitle: youtube,
      },
    ],
  },
];

export const teacherLinks = [
  {
    id: 1,
    title: "O'qituvchi",
    url: "",
  },
  {
    id: 2,
    title: "O'quvchilar",
    url: "students",
  },
  {
    id: 3,
    title: "Fanlar",
    url: "subjects",
  },
];

export const adminLinks = [
  {
    id: 1,
    title: "Admin",
    url: "",
  },
  {
    id: 2,
    title: "O'qituvchilar",
    url: "teachers",
  },
  {
    id: 3,
    title: "O'quvchilar",
    url: "students",
  },
  {
    id: 4,
    title: "Fanlar",
    url: "subjects",
  },
];

export const adminPermittedInfo = [
  {
    label: "Familia",
    name: "lastname",
    type: "text",
  },
  {
    label: "Ism",
    name: "firstname",
    type: "text",
  },
  {
    label: "Otasining ismi",
    name: "middlename",
    type: "text",
  },
  {
    label: "Jins",
    name: "gender",
    type: "radio",
  },
  {
    label: "Telefon raqam",
    name: "phone",
    type: "number",
  },
  {
    label: "Elektron pochta",
    name: "email",
    type: "email",
  },
  {
    label: "Tug'ilgan sana",
    name: "dateOfBirth",
    type: "date",
  },
  {
    label: "Lavozim",
    name: "position",
    type: "text",
  },
  {
    label: "O'qitadigan fan",
    name: "subject",
    type: "text",
  },
  {
    label: "Maktab nomi",
    name: "school_name",
    type: "text",
  },
  {
    label: "Maktab manzili",
    name: "school_address",
    type: "text",
  },
  {
    label: "Foydalanuvchi rasmi(url ko'rinishida)",
    name: "profile_image",
    type: "text",
  },
  {
    label: "Foydalanuvchi nomi(login)",
    name: "username",
    type: "text",
  },
];

export const teacherCreate = [
  {
    label: "Familia",
    name: "lastname",
    type: "text",
  },
  {
    label: "Ism",
    name: "firstname",
    type: "text",
  },
  {
    label: "Otasining ismi",
    name: "middlename",
    type: "text",
  },
  {
    label: "Jins",
    name: "gender",
    type: "radio",
  },
  {
    label: "Telefon raqam",
    name: "phone",
    type: "number",
  },
  {
    label: "Elektron pochta",
    name: "email",
    type: "email",
  },
  {
    label: "Tug'ilgan sana",
    name: "dateOfBirth",
    type: "date",
  },
  {
    label: "Lavozim",
    name: "position",
    type: "text",
  },
  {
    label: "O'qitadigan fan",
    name: "subject",
    type: "text",
  },
  {
    label: "Maktab nomi",
    name: "school_name",
    type: "text",
  },
  {
    label: "Maktab manzili",
    name: "school_address",
    type: "text",
  },
  {
    label: "Foydalanuvchi rasmi(url ko'rinishida)",
    name: "profile_image",
    type: "text",
  },
  {
    label: "Foydalanuvchi nomi(login)",
    name: "username",
    type: "text",
  },
  {
    label: "Foydalanuvchi paroli",
    name: "password",
    type: "text",
  },
];

export const studentCreate = [
  {
    label: "Familia",
    name: "lastname",
    type: "text",
  },
  {
    label: "Ism",
    name: "firstname",
    type: "text",
  },
  {
    label: "Otasining ismi",
    name: "middlename",
    type: "text",
  },
  {
    label: "Jins",
    name: "gender",
    type: "radio",
  },
  {
    label: "Telefon raqam(Ota-onasiniki ham bo'ladi)",
    name: "phone",
    type: "number",
  },
  {
    label: "Elektron pochta",
    name: "email",
    type: "email",
  },
  {
    label: "Tug'ilgan sana",
    name: "dateOfBirth",
    type: "date",
  },
  {
    label: "Lavozim",
    name: "position",
    type: "text",
  },
  {
    label: "Sinfi",
    name: "className",
    type: "text",
  },
  {
    label: "Maktab nomi",
    name: "school_name",
    type: "text",
  },
  {
    label: "Maktab manzili",
    name: "school_address",
    type: "text",
  },
  {
    label: "Foydalanuvchi rasmi(url ko'rinishida)",
    name: "profile_image",
    type: "text",
  },
  {
    label: "Foydalanuvchi nomi(login)",
    name: "username",
    type: "text",
  },
  {
    label: "Foydalanuvchi paroli",
    name: "password",
    type: "text",
  },
];
