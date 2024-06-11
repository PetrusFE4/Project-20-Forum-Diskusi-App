import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";

function Home (){
    return(
        
        <>
        <Navbar />
        <Hero 
        cName="hero"
        homepage="../public/media/images/homepage.png"
        buttonText="Login Now!"
        url="/login"
        btnClass="show"
        
        />
        
        </>
    )
}

export default Home;