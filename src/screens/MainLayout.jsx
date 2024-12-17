import React, { useEffect } from "react";
import { Footer, Navbar } from "../components";
import { styles } from "../util/styles";
import { Outlet, useLocation } from "react-router";
// import axios from "axios";
// import { headers } from "next/headers";

const MainLayout = () => {
  const pathname = useLocation().pathname;
  let user = JSON.parse(localStorage.getItem("userData"));
  // const getUsers = async () => {
  //   try {
  //     let response = await axios.get(
  //       "https://school59.pythonanywhere.com/api/subjects/",
  //       {
  //         Accept: "application/json",
  //         "X-CSRFTOKEN":
  //           "QLMu7RjIBJ6UyGsBFDm0WAJZvWHrSCuJTHIBWsAY3Bwpzy99gf8NGiEkR0pITpD0",
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getUsers();
  // }, []);
  useEffect(() => {
    const handlePopState = () => {
      if (pathname === `/home_page/${user.id}`) {
        window.location.href = "about:blank"; // Sahifani yopish
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
