import { useEffect } from 'react'
import './App.css'
import Contact from './components/contact'
import Footer from './components/footer'
import Header from './components/header'
import Hero from './components/hero'
import Portfolio from './components/portfolio'
import Qualifications from './components/qualifications'
import Aos from "aos";
import "aos/dist/aos.css";

// import { Link, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';


function App() {

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  return (
    <div className='dark:bg-[#161616] relative dark:text-white bg-[#bebebe] text-[#030303] max-w-[1240px] w-[95%] mx-auto'>
      <Header />
      <Hero />
      <Qualifications />
      <Portfolio />
      <Contact />
      <hr className='mt-20' />
      <Footer />
    </div>
  )
}

export default App