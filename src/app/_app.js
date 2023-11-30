export default function App({ Component, pageProps }) {
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
        require("https://cdn.tailwindcss.com");
    })

    return <Component {...pageProps} />;
}