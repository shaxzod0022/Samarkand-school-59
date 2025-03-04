import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../../util/styles";
import api from "../../services/api";

const AdminData = () => {
  const [adminDataStore, setAdminDataStore] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("adminData");
    if (storedAdmin) {
      setAdminDataStore(JSON.parse(storedAdmin));
    }
  }, []);

  const fetchAdminData = useCallback(async () => {
    try {
      const response = await api.get(
        `/admin/admin-data/${adminDataStore.admin._id}`,
        {
          headers: {
            Authorization: `Bearer ${adminDataStore.token}`,
          },
        }
      );
      setAdmin(response.data);
    } catch (err) {
      console.error(err);
    }
  }, [adminDataStore]); // ✅ `adminDataStore` o‘zgarmasa, funksiya ham o‘zgarmaydi

  useEffect(() => {
    if (adminDataStore) {
      fetchAdminData();
    }
  }, [adminDataStore, fetchAdminData]);

  if (!admin) {
    return (
      <div className="w-full text-center align-middle py-16">
        <span className="admin__loader"></span>
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <h2 className={`${styles.heading2} text-center mb-3`}>
        Admin ma'lumotlari
      </h2>
      <div className={`w-full ${styles.fBetween} !items-start`}>
        <div className={`${styles.fCol} !items-start gap-3 sm:w-[70%] w-full`}>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Ism:{" "}
            <span className="font-normal capitalize">{admin.firstname}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Familia:{" "}
            <span className="font-normal capitalize">{admin.lastname}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Otasining ismi:{" "}
            <span className="font-normal capitalize">{admin.middlename}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Tug'ilgan sanasi:{" "}
            <span className="font-normal capitalize">
              {admin.dateOfBirth.slice(0, 10)}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Jinsi:{" "}
            <span className="font-normal capitalize">{admin.gender}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Telefon raqami:{" "}
            <span className="font-normal capitalize">{admin.phone}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Elektron pochtasi:{" "}
            <span className="font-normal">{admin.email}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Lavozimi:{" "}
            <span className="font-normal capitalize">{admin.position}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Fan: <span className="font-normal capitalize">{admin.subject}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab:{" "}
            <span className="font-normal capitalize">{admin.school_name}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Maktab manzili:{" "}
            <span className="font-normal capitalize">
              {admin.school_address}
            </span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Saytdan kim sifatida foydalanadi:{" "}
            <span className="font-normal capitalize">{admin.role}</span>
          </p>
          <p
            className={`${styles.paragraph} w-full !font-bold rounded-lg p-2 bg-slate-200`}
          >
            Foydalanuvchi nomi(logini):{" "}
            <span className="font-normal">{admin.username}</span>
          </p>
        </div>
        <div className={`w-full sm:w-[27%] ${styles.fCol} sm:mt-0 mt-5`}>
          <img
            src={admin.profile_image}
            alt="Profil rasmi"
            className="sm:w-full w-[60%]"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminData;
