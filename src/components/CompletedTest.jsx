import React, { useEffect, useState } from "react";
import { styles } from "../util/styles";
import Button from "./Button";

const CompletedTest = ({ hidden, onClose, subjectInfo, submit }) => {
  const [subject, setSubject] = useState(subjectInfo);

  useEffect(() => {
    setSubject(subjectInfo);
  }, [subjectInfo]);

  if (!subject) {
    return (
      <h2 className={`${styles.heading2} ${hidden ? "flex" : "hidden"}`}>
        Yuklanmoqda...
      </h2>
    );
  }

  return (
    <div
      className={`${
        hidden ? "flex" : "hidden"
      } fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center`}
    >
      <div
        className={`${styles.fCol} bg-white rounded-md p-8 w-[90%] max-w-[500px]`}
      >
        <div className="flex gap-3 items-center justify-center mb-5">
          <img
            className="max-w-[50px] w-full h-full object-cover max-h-[50px] rounded-full"
            src={subject.image}
            alt="fanlar rasmlari"
          />
          <h2 className={`capitalize ${styles.heading2}`}>
            {subject.subjectname}
          </h2>
        </div>
        <h3 className={`${styles.heading3} text-center mb-5`}>
          Testni rosdan yakunlamoqchimisiz?
        </h3>
        <div className="flex justify-between gap-4">
          <Button title="Yo'q" onClick={onClose} className="!bg-red-500" />
          <Button title="Ha" className="!bg-green-500" onClick={submit} />
        </div>
      </div>
    </div>
  );
};

export default CompletedTest;
