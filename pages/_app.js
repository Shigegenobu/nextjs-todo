import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
//TextContextという名前でcreatContextをした場合は、<TextContext.Provider></TextContext.Provider>となります。
//export const TestContext = creatContext();
