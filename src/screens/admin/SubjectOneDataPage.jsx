import React from "react";
import {
  SubjectOneData,
  SubjectOneDataUpdate,
  SubjectTestsData,
  TestAddToSubject,
} from "../../components";
import { styles } from "../../util/styles";

const SubjectOneDataPage = () => {
  return (
    <div className={`${styles.fCol} gap-8 w-full p-5`}>
      <SubjectOneData />
      <SubjectOneDataUpdate />
      <TestAddToSubject />
      <SubjectTestsData />
    </div>
  );
};

export default SubjectOneDataPage;
