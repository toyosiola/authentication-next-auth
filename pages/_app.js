import GlobalProvider from "../contexts/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-center" theme="colored" />
      </GlobalProvider>
    </SessionProvider>
  );
}
