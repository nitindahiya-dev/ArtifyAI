import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
            <Head>
                <title>ArtifyAI</title>
                <meta name="description" content="AI-powered Art Authentication Platform" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            
            <Header />
            <main className="container mx-auto p-4">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
