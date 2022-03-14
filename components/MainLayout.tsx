import Head from "next/head";

export function MainLayout({children, title = 'BSU exam system'}) {

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name={'keywords'} content={'admin'}/>
                <meta name={'description'} content={'Welcome page for admin'}/>
                <meta charSet={'utf-8'}/>
            </Head>
            <nav>Navigation</nav>
            <main>{children}</main>
        </>
    )

}