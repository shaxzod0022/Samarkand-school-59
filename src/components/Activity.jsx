import React from "react";
import { styles } from "../util/styles";
import { activity } from "../util/constants";
import { useNavigate, useParams } from "react-router";

const Activity = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const navigateAppropriation = (id) =>
    id === 1 ? navigate(`appropriation/${userId}`) : navigate(``);
  return (
    <div className={`bg-white mb-10`}>
      <h2 className={`${styles.heading2} mb-3`}>Faoliyat</h2>
      <div className={`${styles.fWrap} justify-start`}>
        {activity.map((item, idx) => {
          return (
            <div
              onClick={() => navigateAppropriation(item.id)}
              key={idx}
              className={`${styles.fCol} bg-white cursor-pointer text-center max-w-[300px] w-[40%] md:w-[20%] lg:w-full border-2 rounded-md hover:shadow-md p-10`}
            >
              <div className="sm:w-[90px] sm:h-[90px] h-[60px] w-[60px] mb-3">
                <img
                  className="w-ful h-full object-contain rounded-full"
                  src={item.img}
                  alt="fanlar"
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

export default Activity;
