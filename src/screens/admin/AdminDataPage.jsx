import React from "react";
import {
  AdminData,
  AdminPasswordUpdate,
  AdminPermittedInfo,
} from "../../components";
import { styles } from "../../util/styles";

const AdminDataPage = () => {
  return (
    <div className={`p-5`}>
      <AdminData />
      <div className={`w-full ${styles.fCol} gap-5`}>
        <AdminPermittedInfo />
        <AdminPasswordUpdate />
      </div>
    </div>
  );
};

export default AdminDataPage;
