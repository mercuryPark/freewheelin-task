import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <title>프리윌린 과제전형</title>
                <link
                    href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css'
                    rel='stylesheet'
                    type='text/css'
                ></link>
            </Head>
            <body className='antialiased'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
