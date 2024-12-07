import React from "react";
import Layout from "../../components/Layout";
import TestimonialForm from "../../components/testimonial/TestimonialForm";

function EditTestimonialPage() {
    return (
        <Layout>
            <TestimonialForm isEdit={true}/>
        </Layout>
    );
}

export default EditTestimonialPage;