import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";

function Home (){
    return(
        
        <>
        <Navbar />
        <Hero 
        cName="hero"
        homepage="../public/media/images/homepage.png"
        title="Your Community Discussions"
        text="Lets Join Our Community"
        buttonText="Login Now!"
        url="/login"
        btnClass="show"
        
        />
        
        </>
    )
}

export default Home;