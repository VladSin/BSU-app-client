import Head from "next/head";

interface HeadProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

function HeadMeta({title, description, keywords}: HeadProps) {
    return (
        <Head>
            <title>{title} BSU</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta charSet={'utf-8'}/>
        </Head>
    );
}

export default HeadMeta;
