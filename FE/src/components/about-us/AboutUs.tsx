import { NavLink } from "react-router-dom";
import Button from "../common/button/Button"
import { Card } from "../common/card/Card"
import aboutUsClasses from "./AboutUs.module.css"

export const AboutUs = () => {
  return <Card className={aboutUsClasses["about-us"]}>
    <h2 className={aboutUsClasses.title}>About Us</h2>
    <p className={aboutUsClasses.greeting}>Hello, my friend! Welcome to our web application designed to improve your life and make healthy living easier than ever before. We understand the challenges you face in managing your products, maintaining a balanced diet, and reducing food waste. That's why we're here to lend a helping hand and provide you with a seamless experience that will revolutionize the way you approach your daily routines.</p>
    <div className={aboutUsClasses.action}>
    <NavLink to="/generator" >Generate recipe</NavLink>
    </div>
    <div className={aboutUsClasses.description}>
      <p>So our web application designed to simplify your life and support your healthy lifestyle goals while reducing food waste. With an intuitive interface, effortless product management allows you to easily add, edit, and remove items from your inventory. Filter products by expiration dates to prioritize usage and minimize waste. Stay informed with timely notifications, discover exciting recipes tailored to your available ingredients, and customize filters based on your dietary preferences. Enhance your cooking experience with comprehensive recipe details and streamline grocery shopping by downloading ingredient lists. Join us today and enjoy a healthier, more sustainable future.</p>
      <div><img src="https://www.bsmu.edu.ua/wp-content/uploads/2019/04/3.jpg" alt="Healthy lifestyle"></img></div>
    </div>
  </Card>
}