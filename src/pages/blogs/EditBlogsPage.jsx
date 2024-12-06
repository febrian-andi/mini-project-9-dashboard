import React from "react";
import Layout from "../../components/Layout";
import BlogForm from "../../components/blogs/BlogForm";

function EditBlogsPage() {
    return (
        <Layout>
            <BlogForm isEdit={true}/>
        </Layout>
    )
}

export default EditBlogsPage;