import React from "react";
import Layout from "../../components/Layout";
import TestimonialForm from "../../components/testimonial/TestimonialForm";

function AddTestimonialPage() {
    return (
        <Layout>
            <TestimonialForm isEdit={false}/>
        </Layout>
    );
}

export default AddTestimonialPage;