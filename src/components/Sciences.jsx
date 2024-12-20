import React from "react";
import { sciences } from "../util/constants";
import { styles } from "../util/styles";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { createScince } from "../store/scincesSlice";
const Sciences = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitToStore = (id) => {
    dispatch(createScince(id));
    navigate(`test_page/${id}`);
  };
  return (
    <div className={`bg-white pt-[100px] sm:pt-[110px] mb-10`}>
      <h2 className={`${styles.heading2} mb-3`}>Fanlar</h2>
      <div className={`w-full flex flex-wrap sm:justify-between justify-around items-center gap-4`}>
        {sciences.map((item, idx) => {
          return (
            <div
              onClick={() => submitToStore(item.id)}
              key={idx}
              className={`flex items-center flex-col bg-white cursor-pointer text-center max-w-[300px] w-full  border-2 justify-around sm:justify-between rounded-md hover:shadow-md sm:p-10 p-10`}
            >
              <div className="sm:w-[90px] sm:h-[90px] h-[60px] w-[60px] mb-3">
                <img
                  className="w-ful h-full object-contain rounded-full"
                  src={item.img}
                  alt="ozlashtirish"
                />
              </div>
              <h3 className={`${styles.heading3}`}>{item.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sciences;
