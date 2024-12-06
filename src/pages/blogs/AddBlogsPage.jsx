import React from "react";
import Layout from "../../components/Layout";
import BlogForm from "../../components/blogs/BlogForm";

function AddBlogsPage() {
    return (
        <Layout>
            <BlogForm isEdit={false}/>
        </Layout>
    )
}

export default AddBlogsPage;