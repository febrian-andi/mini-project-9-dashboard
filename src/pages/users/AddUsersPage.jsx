import React from "react";
import UserForm from "../../components/users/UserForm";
import Layout from "../../components/Layout";

function AddUsersPage() {
  return (
    <Layout>
      <UserForm isEdit={false} />
    </Layout>
  );
}

export default AddUsersPage;
