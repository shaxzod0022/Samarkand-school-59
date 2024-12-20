import React from "react";
import { logo } from "../assets";
import { styles } from "../util/styles";
import { useNavigate } from "react-router";
import { footerLinks } from "../util/constants";
import { Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className={`bg-formaColor ${styles.container} pt-8 pb-3`}>
      <div className={`${styles.fBetween} !items-start flex-wrap gap-10 mb-6`}>
        <div className="gap-4 text-center flex flex-wrap items-center">
          <h1
            className={`${styles.heading1} cursor-pointer w-[150px] flex sm:mb-0 justify-center`}
            onClick={() => navigate("/home_page")}
          >
            <img
              className="rounded-full sm:w-[70px] w-[50px]"
              src={logo}
              alt="maktap platformasi logotipi"
            />
          </h1>
          <p className={`${styles.paragraph} w-[200px] !text-[15px] text-white`}>
            O'zbekiston Respublikasi oliy va o'rta maxsus ta'lim vazirligi
          </p>
        </div>
        {/* <ul
          className={`sm:w-[85%] w-full ${styles.fBetween} !items-start flex-wrap gap-10`}
        >
          {footerLinks.map((menyu, menyuidx) => {
            return (
              <li
                key={menyuidx}
                className={`${styles.fCol} sm:items-start items-center text-start sm:w-auto w-full`}
              >
                <h3 className={`${styles.heading3} text-white mb-3`}>
                  {menyu.title}
                </h3>
                <ul
                  className={` ${
                    menyu.title === "Bog'lanish"
                      ? `${styles.fBetween} gap-6`
                      : styles.fCol
                  } sm:items-start items-center gap-2`}
                >
                  {menyu.links.map((link, linkidx) => {
                    return (
                      <li key={linkidx} className={`${styles.link}`}>
                        <Link
                          to={link.url}
                          className="cursor-pointer sm:text-[16px] text-[14px] hover:text-slate-500"
                          target="blank"
                        >
                          {menyu.title === "Bog'lanish" ? (
                            <img
                              className="w-[40px] h-[40px] hover:scale-110 rounded-full"
                              src={link.linkTitle}
                              alt=""
                            />
                          ) : (
                            link.linkTitle
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul> */}
      </div>
      <div className="w-full bg-white h-0.5 mb-3" />
      <div className="text-center mb-2">
        <span className={`${styles.span} text-white`}>Copyright@ 2024.</span>
      </div>
    </div>
  );
};

export default Footer;
