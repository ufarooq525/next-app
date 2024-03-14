import "./globals.css";
import Navbar from "./components/Navbar";
import { raleway } from "./font";
import { Provider } from "./components/Provider";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
      <Provider>
      <Navbar />
        {children}
      </Provider>
        
        </body>
    </html>
  );
}
