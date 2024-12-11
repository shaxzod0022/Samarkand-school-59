import { useNavigate } from "react-router";
// import { useEffect, useState } from "react";
// import { languages, loginPassword } from "../util/constants";
import { styles } from "../util/styles";
// import Button from "./Button";
import { logo } from "../assets";
// import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  // const [lang, setLang] = useState(false);
  // const [langTitle, setLangTitle] = useState("O'zbekcha");
  // const handleLangTitle = (title) => {
  //   setLangTitle(title);
  //   setLang(false);
  // };
  return (
    <div
      className={`${styles.fBetween} ${styles.container} flex-wrap bg-formaColor fixed top-0 left-[50%] translate-x-[-50%] z-50 py-3 gap-2`}
    >
      <div className="sm:w-auto flex gap-3 items-center w-full">
        <h1
          className={`${styles.heading1} sm:w-[70px] w-[50px] cursor-pointer flex sm:mb-0 mb-3`}
          onClick={() => navigate(`/home_page/${user.id}`)}
        >
          <img className="rounded-full w-full" src={logo} alt="" />
        </h1>
        <p
          className={`${styles.paragraph} text-white max-w-[250px] text-center`}
        >
          O'zbekiston Respublikasi oliy va o'rta maxzus ta'lim vazirligi
        </p>
      </div>
      <div
        className={`${styles.fWrap} sm:w-auto w-full sm:justify-center justify-between text-center sm:gap-5 gap-2 relative`}
      >
        {/* <span className="relative">
          <Button
            title={langTitle}
            className="!bg-transparent hover:text-gray-400"
            onClick={() => setLang((e) => !e)}
          />
          <ul
            className={`${
              lang ? "flex" : "hidden"
            } absolute top-[100%] left-0 bg-white card-box-shadow z-50 rounded-sm p-3 ${
              styles.fCol
            }`}
          >
            {languages.map((item, idx) => {
              return (
                <li
                  onClick={() => handleLangTitle(item)}
                  key={idx}
                  className={`${styles.link} ${
                    item === langTitle ? "!text-slate-500" : "!text-black"
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </span> */}
        <div
          onClick={() => navigate(`user_info/${user.id}`)}
          className={`flex items-center gap-4 cursor-pointer`}
        >
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full border-2`}
          >
            <h2 className={`${styles.heading2} text-white`}>
              {user.name
                .split(" ")
                .map((i) => i[0])
                .join("")}
            </h2>
          </div>
          <div className={`${styles.fCol}`}>
            <h3 className={`${styles.heading3} text-white`}>{user.name}</h3>
            <span className={`${styles.span} text-white`}>
              {user.company.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
