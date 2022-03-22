import Header from "../modules/Header";
import HeadMeta from "../modules/HeadMeta";

interface Layout {
    children: React.ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    themeColor?: boolean;
}

export function MainLayout({ children,
                             title = 'BSU exam system',
                             keywords = 'BSU',
                             description = 'Welcome to page',
                             themeColor }: Layout) {
    return (
        <>
            <HeadMeta
                title={title}
                description={description}
                keywords={keywords}
                themeColor={themeColor}>
            </HeadMeta>
            <Header />
            <main>
                {children}
            </main>
            <footer></footer>
        </>
    );
}