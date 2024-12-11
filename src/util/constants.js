import {
  adabiyot,
  biologiya,
  english,
  fizika,
  informatika,
  instagram,
  Kimyo,
  math,
  onaTili,
  reyting,
  tarix,
  telegram,
  userImg,
  uzlashtirish,
  whatsapp,
  youtube,
} from "../assets";

export const loginPassword = [
  {
    login: "1234567890",
    password: "salom123",
    img: userImg,
    id: 12345,
    name: "Sirojiddin",
    surname: "Shomuxtorov",
    forname: "Shamsiddinovich",
    seriya: "AD",
    seriyaNum: 1234567,
    jshshir: 12345678910111,
    classRoom: "11 b",
  },
];

export const languages = ["O'zbekcha", "Русский", "English"];
export const sciences = [
  {
    id: 1,
    img: onaTili,
    title: "Ona tili",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 2,
    img: fizika,
    title: "Fizika",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 3,
    img: math,
    title: "Matematika",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 4,
    img: adabiyot,
    title: "Adabiyot",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 5,
    img: tarix,
    title: "O'zbekiston Tarixi",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 6,
    img: Kimyo,
    title: "Kimyo",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 7,
    img: biologiya,
    title: "Biologiya",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 8,
    img: informatika,
    title: "Informatika",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
  {
    id: 9,
    img: english,
    title: "Ingliz tili",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia expedita magni sequi dicta illum.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, consequuntur!",
  },
];

export const activity = [
  {
    id: 1,
    img: uzlashtirish,
    title: "O'zlashtirish",
  },
  {
    id: 2,
    img: reyting,
    title: "Reyting",
  },
];

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

export const classes = [
  {
    id: 1,
    title: "11 A sinf",
  },
  {
    id: 2,
    title: "11 B sinf",
  },
  {
    id: 3,
    title: "11 D sinf",
  },
  {
    id: 4,
    title: "11 C sinf",
  },
];

export const testOnaTili = [
  {
    id: 1,
    question: "Qaysi so‘zda urg‘u birinchi bo‘g‘inda?",
    complated: false,
    answer: "a",
    complated: false,
    options: [
      {
        option: "a",
        title: "gulzor",
      },
      {
        option: "b",
        title: "o‘qituvchi",
      },
      {
        option: "c",
        title: "mavsum",
      },
      {
        option: "d",
        title: "kutubxona",
      },
    ],
  },
  {
    id: 2,
    question: "Qaysi so‘z yasalgan so‘z hisoblanadi?",
    complated: false,
    answer: "b",
    options: [
      {
        option: "a",
        title: "daraxt",
      },
      {
        option: "b",
        title: "suvchi",
      },
      {
        option: "c",
        title: "kitob",
      },
      {
        option: "d",
        title: "shirin",
      },
    ],
  },
  {
    id: 3,
    question: "Qaysi so‘z fe’lning tuslanishida ishlatilmaydi?",
    complated: false,
    answer: "d",
    options: [
      {
        option: "a",
        title: "ko‘rmoq",
      },
      {
        option: "b",
        title: "yozishmoq",
      },
      {
        option: "c",
        title: "o‘rgatmoq",
      },
      {
        option: "d",
        title: "yurt",
      },
    ],
  },
  {
    id: 4,
    question: "O‘zbekiston Respublikasi davlat tilini qachon qabul qilgan?",
    complated: false,
    answer: "a",
    options: [
      {
        option: "a",
        title: "1989-yil",
      },
      {
        option: "b",
        title: "1991-yil",
      },
      {
        option: "c",
        title: "1995-yil",
      },
      {
        option: "d",
        title: "2000-yil",
      },
    ],
  },
  {
    id: 5,
    question: "Qaysi so‘z yasalish usuli bilan yasalgan?",
    complated: false,
    answer: "b",
    options: [
      {
        option: "a",
        title: "ko‘cha",
      },
      {
        option: "b",
        title: "gulzor",
      },
      {
        option: "c",
        title: "ona",
      },
      {
        option: "d",
        title: "kitob",
      },
    ],
  },
  {
    id: 6,
    question: "Qaysi so‘zda sifatdosh bor?",
    complated: false,
    answer: "b",
    options: [
      {
        option: "a",
        title: "qattip",
      },
      {
        option: "b",
        title: "yozgan",
      },
      {
        option: "c",
        title: "rang",
      },
      {
        option: "d",
        title: "yoshi",
      },
    ],
  },
  {
    id: 7,
    question: "Qaysi so‘zda tashqi o‘zgarish bilan yasalgan so‘z mavjud?",
    complated: false,
    answer: "a",
    options: [
      {
        option: "a",
        title: "yozuvchi",
      },
      {
        option: "b",
        title: "o‘rgatmoq",
      },
      {
        option: "c",
        title: "oshxona",
      },
      {
        option: "d",
        title: "sayohat",
      },
    ],
  },
  {
    id: 8,
    question: "Qaysi jumlada fe’l bor?",
    complated: false,
    answer: "a",
    options: [
      {
        option: "a",
        title: "Yomg‘ir yog‘moqda",
      },
      {
        option: "b",
        title: "O‘quvchilar kutubxonada",
      },
      {
        option: "c",
        title: "Bahor fasli",
      },
      {
        option: "d",
        title: "Uyingiz chiroyli",
      },
    ],
  },
  {
    id: 9,
    question: "Qaysi so‘z so‘z birikmasi tarkibida kelgan?",
    complated: false,
    answer: "b",
    options: [
      {
        option: "a",
        title: "yigit",
      },
      {
        option: "b",
        title: "oq qog‘oz",
      },
      {
        option: "c",
        title: "onam",
      },
      {
        option: "d",
        title: "daraxt",
      },
    ],
  },
  {
    id: 10,
    question: "“Til” so‘zi qaysi ma’noda ishlatilgan?",
    complated: false,
    answer: "b",
    options: [
      {
        option: "a",
        title: "inson a’zosi",
      },
      {
        option: "b",
        title: "aloqa vositasi",
      },
      {
        option: "c",
        title: "og‘izning bir qismi",
      },
      {
        option: "d",
        title: "material",
      },
    ],
  },
];
