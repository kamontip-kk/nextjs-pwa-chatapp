import Document,{ Html, Main, Head, NextScript} from "next/document";

class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json"></link>
                    <link rel="apple-touch-icon" href="/icon.png" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                    <meta name="theme-color" content="#fff" />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument