import React from "react";
import UserForm from "../../components/users/UserForm";
import Layout from "../../components/Layout";

function EditUserPage() {
  return (
    <Layout>
      <UserForm isEdit={true} />
    </Layout>
  );
}

export default EditUserPage;
