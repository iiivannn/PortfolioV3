import Navbar from "./components/ui/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Works from "./components/sections/Works";
import Portfolio from "./components/sections/Portfolio";
import Skills from "./components/sections/Skills";
import Certificates from "./components/sections/Certificates";
import Footer from "./components/ui/Footer";

export default function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Works />
        <Portfolio />
        <Skills />
        <Certificates />
      </main>
      <Footer />
    </>
  );
}
