import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang='en'>
            <Head />
            <body className='antialiased'>
                <link
                    href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
                    rel='stylesheet'
                    type='text/css'
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
