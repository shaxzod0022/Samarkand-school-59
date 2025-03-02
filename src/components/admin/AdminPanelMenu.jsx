import React, { useEffect, useState } from "react";
import { adminLinks } from "../../util/constants";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button";

const AdminPanelMenu = ({ newClass }) => {
  const [path, setPath] = useState("");
  const { pathname } = useLocation();

  const logout = () => {
    localStorage.clear()
    window.location.href = "/hello-admin";
  };

  useEffect(() => {
    setPath(pathname.slice(19));
  }, [pathname]);

  return (
    <ul
      className={`${newClass} bg-formaColor top-16 fixed lg:w-[20%] md:w-[25%] sm:w-[30%] w-[60%] h-[100vh] p-5`}
    >
      {adminLinks.map((item, index) => {
        return (
          <li
            key={index}
            className={`text-white hover:text-blue-500 ${
              path === item.url && "!text-blue-500"
            } transition-all duration-100`}
          >
            <Link to={item.url} className="w-full h-full p-2">
              {item.title}
            </Link>
          </li>
        );
      })}
      <Button
        onClick={logout}
        title={`Profildan chiqish`}
        className={`active:bg-red-500 bg-red-500 hover:bg-red-400 mt-4`}
      />
    </ul>
  );
};

export default AdminPanelMenu;
