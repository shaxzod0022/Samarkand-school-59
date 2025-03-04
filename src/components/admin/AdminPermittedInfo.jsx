import React, { useEffect, useState } from "react";
import { styles } from "../../util/styles";
import Button from "../Button";
import { adminPermittedInfo } from "../../util/constants";
import api from "../../services/api";
import Message from "./Message";

const AdminPermittedInfo = () => {
  const [adminData, setAdminData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [adminId, setAdminId] = useState();

  useEffect(() => {
    const storedAdminData = sessionStorage.getItem("adminData");
    if (storedAdminData) {
      setAdminId(JSON.parse(storedAdminData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `/admin/update-admin-profile/${adminId.admin._id}`,
        adminData,
        {
          headers: {
            Authorization: `Bearer ${adminId.token}`,
          },
        }
      );
      setMessage("Ma'lumotlar muvaffaqiyatli yangilandi!");
      setAdminData({});
    } catch (err) {
      setError(err.response?.data?.message);
    }

    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <h2 className={`${styles.heading2} text-center mb-5`}>
        Admin ma'lumotlarini yangilash
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`${styles.fCol} gap-5 !items-start`}
      >
        <div className={`${styles.fBetween} gap-5`}>
          {adminPermittedInfo.map((item, idx) => (
            <div
              key={idx}
              className={`${styles.fCol} !items-start w-full lg:w-[30%] md:w-[45%]`}
            >
              <label className="font-semibold sm:text-[18px] text-[16px]">
                {item.label}
              </label>

              {item.type === "radio" ? (
                <div className={`${styles.fStart} gap-5`}>
                  <div className={`${styles.fStart} gap-2`}>
                    <span>Erkak</span>
                    <input
                      type={item.type}
                      name={item.name}
                      value="Erkak"
                      checked={adminData[item.name] === "Erkak"}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={`${styles.fStart} gap-2`}>
                    <span>Ayol</span>
                    <input
                      type={item.type}
                      name={item.name}
                      value="Ayol"
                      checked={adminData[item.name] === "Ayol"}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ) : (
                <input
                  className={`${styles.input}`}
                  type={item.type}
                  name={item.name}
                  value={adminData[item.name] || ""}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        </div>
        <Button type={"submit"} title={"Yangilash"} />
      </form>
      <Message successMessage={message} errorMessage={error} />
    </div>
  );
};

export default AdminPermittedInfo;
