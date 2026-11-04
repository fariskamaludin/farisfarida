import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import bride from "@/assets/bride.jpg";
import groom from "@/assets/groom.jpg";

/** Edit everything about the invitation here. */
export const wedding = {
  shortNames: { groom: "Habib", bride: "Adiba" },
  date: "2026-12-20T08:00:00+07:00",
  dateLabel: "20 . 12 . 2026",
  groom: {
    fullName: "Muhammad Habib Ramadhan",
    parents: "Putra Pertama dari Bapak H. Ahmad Fauzi & Ibu Siti Rahmawati",
    instagram: "habibramadhan",
    photo: groom,
  },
  bride: {
    fullName: "Adiba Putri Syahila",
    parents: "Putri Kedua dari Bapak M. Darsono & Ibu Dewi Sudarwati",
    instagram: "adibasyahila",
    photo: bride,
  },
  quote: {
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum : 21",
  },
  events: [
    {
      title: "Akad Nikah",
      day: "Minggu, 20 Desember 2026",
      time: "08.00 – 10.00 WIB",
      place: "Masjid Agung Al-Ikhlas",
      address: "Jl. Mawar No. 12, Kediri, Jawa Timur",
      maps: "https://maps.google.com/?q=Masjid+Agung+Kediri",
    },
    {
      title: "Resepsi",
      day: "Minggu, 20 Desember 2026",
      time: "11.00 WIB – Selesai",
      place: "Gedung Graha Melati",
      address: "Jl. Melati Raya No. 8, Kediri, Jawa Timur",
      maps: "https://maps.google.com/?q=Kediri+Jawa+Timur",
    },
  ],
  story: [
    { year: "2019", title: "Pertama Bertemu", text: "Kami dipertemukan di sebuah acara kampus. Sapaan sederhana menjadi awal cerita yang tak pernah kami duga.", photo: couple2 },
    { year: "2022", title: "Menjalin Kasih", text: "Waktu mengajarkan kami arti saling menjaga, tumbuh bersama, dan berjalan beriringan.", photo: couple3 },
    { year: "2026", title: "Lamaran", text: "Dengan restu kedua keluarga, kami memantapkan hati untuk melangkah ke jenjang pernikahan.", photo: couple1 },
  ],
  gallery: [couple1, couple2, couple3, bride, groom, couple2],
  cover: couple1,
  gifts: [
    { bank: "Bank BCA", number: "1234567890", holder: "Muhammad Habib Ramadhan" },
    { bank: "DANA", number: "081234567890", holder: "Adiba Putri Syahila" },
  ],
  giftAddress: "Jl. Mawar No. 12, RT 03/RW 05, Kediri, Jawa Timur 64121",
};
