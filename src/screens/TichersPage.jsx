import React from "react";
import Classes from "../components/Classes";
import { Helmet } from "react-helmet";

const TichersPage = () => {
  return (
    <div className={`w-full pt-[140px] sm:pt-[110px] mb-10`}>
      <Helmet>
        <title>Tichers</title>
        <meta name="description" content="Bu mening ajoyib React saytim" />
        <meta
          name="keywords"
          content="React, SEO, web development, tichers, ticher, samarkand, sam maktab, maktab 59, 59, samarqanda maktab 59, samarqand, registon"
        />
      </Helmet>
      <Classes />
    </div>
  );
};

export default TichersPage;
