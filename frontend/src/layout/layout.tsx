import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import Lightning from "@/components/Lightning";

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
        <Lightning
        hue={220}
        xOffset={0}
        speed={1}
        intensity={1}
        size={1}
      />      
            <Header />
            <main className="max-w-7xl mx-auto p-4">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
