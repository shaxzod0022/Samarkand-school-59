import React, { useEffect, useState } from "react";
import { adminLinks } from "../../util/constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";

const AdminPanelMenu = ({ newClass }) => {
  const [path, setPath] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/hello-admin");
  };

  useEffect(() => {
    setPath(pathname.slice(19));
  }, [pathname]);

  return (
    <ul
      className={`${newClass} bg-formaColor text-start top-16 fixed lg:w-[20%] md:w-[25%] sm:w-[30%] w-[60%] h-[100vh] p-5`}
    >
      {adminLinks.map((item, index) => {
        return (
          <li
            key={index}
            className={`text-white w-fit hover:bg-blue-500/50 rounded-md ${
              path.split("/").find((i) => i === item.url) && "!text-blue-500"
            } transition-all duration-100`}
          >
            <Link to={item.url} className="p-2">
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
