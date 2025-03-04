import { useNavigate } from "react-router";
import { styles } from "../util/styles";
import { logo } from "../assets";
import { useEffect, useState } from "react";
import studentApi from "../services/studentApi";

const Navbar = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState();
  const [studentId, setStudentId] = useState();

  useEffect(() => {
    const storeStudentData = sessionStorage.getItem("studentData");
    if (storeStudentData) {
      const data = JSON.parse(storeStudentData);
      setStudentId(data.student._id);
    }
  }, []);

  useEffect(() => {
    const getStudentData = async () => {
      if (!studentId) return;
      try {
        const response = await studentApi.get("/students/students-data");
        const data = response.data.find((i) => i._id === studentId);
        setStudentData(data);
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };

    getStudentData();
  }, [studentId]);

  return (
    <div
      className={`${styles.fBetween} ${styles.container} flex-wrap bg-formaColor fixed top-0 left-[50%] translate-x-[-50%] z-50 py-3 gap-2`}
    >
      <div className="sm:w-auto flex gap-3 items-center">
        <h1
          className={`${styles.heading1} sm:w-[70px] w-[50px] cursor-pointer flex sm:mb-0`}
          onClick={() => navigate(`/home_page`)}
        >
          <img
            className="rounded-full w-full"
            src={logo}
            alt="maktab platformasi logotipi"
          />
        </h1>
        <p
          className={`${styles.paragraph} text-white max-w-[250px] sm:block hidden text-center`}
        >
          O'zbekiston Respublikasi oliy va o'rta maxzus ta'lim vazirligi
        </p>
      </div>
      <div
        className={`${styles.fWrap} sm:w-auto sm:justify-center justify-between text-center sm:gap-5 gap-2 relative`}
      >
        {!studentData ? (
          <div className="text-white">Loading...</div>
        ) : (
          <div
            onClick={() => navigate(`user_info/${studentData._id}`)}
            className={`flex items-center gap-4 cursor-pointer`}
          >
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-full border-2`}
            >
              <h2
                className={`${styles.heading2}  text-white uppercase !text-[20px]`}
              >
                {studentData.firstname.slice(0, 1)}.
                {studentData.lastname.slice(0, 1)}
              </h2>
            </div>
            <div className={`${styles.fCol}`}>
              <h3 className={`${styles.heading3} text-white capitalize`}>
                {studentData.firstname}. {studentData.lastname.slice(0, 1)} .
                {studentData.middlename.slice(0, 1)}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
