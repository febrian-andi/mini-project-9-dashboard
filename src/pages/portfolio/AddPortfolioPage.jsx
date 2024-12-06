import React from "react";
import Layout from "../../components/Layout";
import PortfolioForm from "../../components/portfolio/PortfolioForm";

function AddPortfolioPage() {
  return (
    <Layout>
      <PortfolioForm isEdit={false} />
    </Layout>
  );
}

export default AddPortfolioPage;
