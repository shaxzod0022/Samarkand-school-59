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
      <div className={`${styles.fArround} jus !items-start flex-wrap gap-10 mb-6`}>
        <div
          className={`${styles.fStart} !justify-center cursor-pointer flex-wrap gap-4`}
          onClick={() => navigate("/home_page")}
        >
          <div className={`w-[150px] flex sm:mb-0 justify-center`}>
            <img
              className="rounded-full sm:w-[70px] w-[50px]"
              src={logo}
              alt="maktap platformasi logotipi"
            />
          </div>
          <p
            className={`${styles.paragraph} sm:text-start text-center w-[200px] !text-[15px] text-white`}
          >
            O‘zbekiston Respublikasi maktabgacha va maktab ta'limi vazirligi
          </p>
        </div>
        <div className={`sm:w-[50%] w-full !items-start flex-wrap gap-10`}>
          {
            <div
              className={`${styles.fCol} sm:items-start items-center text-start sm:w-auto w-full`}
            >
              <h3 className={`${styles.heading3} text-white mb-3`}>
                {footerLinks.title}
              </h3>
              <ul
                className={`${styles.fBetween} gap-6 sm:items-start items-center`}
              >
                {footerLinks.links.map((link, linkidx) => {
                  return (
                    <li key={linkidx} className={`${styles.link}`}>
                      <Link
                        to={link.url}
                        className="cursor-pointer sm:text-[16px] text-[14px] hover:text-slate-500"
                        target="blank"
                      >
                        {footerLinks.title === "Bog'lanish" ? (
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
            </div>
          }
        </div>
      </div>
      <div className="w-full bg-white h-0.5 mb-3" />
      <div className="text-center mb-2">
        <span className={`${styles.span} text-white`}>Copyright@ 2025.</span>
      </div>
    </div>
  );
};

export default Footer;
