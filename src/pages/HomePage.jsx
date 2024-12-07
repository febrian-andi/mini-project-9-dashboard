import React from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

function HomePage() {
    const { user } = useSelector((state) => state.auth);
    return (
        <Layout>
            <h1 className="text-5xl font-bold">Welcome {user && user.name}</h1>
        </Layout>
    );
}

export default HomePage;