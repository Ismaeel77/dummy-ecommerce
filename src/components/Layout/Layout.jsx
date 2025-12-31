import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Navbar />
      <section className="mx-auto max-w-7xl">
        <Outlet></Outlet>
      </section>
      <Footer />
    </>
  );
}

export default Layout;
