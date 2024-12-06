import React from "react";
import Layout from "../../components/Layout";
import PortfolioForm from "../../components/portfolio/PortfolioForm";

function EditPortfolioPage() {
  return (
    <Layout>
      <PortfolioForm isEdit={true} />
    </Layout>
  );
}

export default EditPortfolioPage;
