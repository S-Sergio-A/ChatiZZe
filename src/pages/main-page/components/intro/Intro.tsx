import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import './Intro.css';

export default function Intro() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();
  
 return(
   <section className="intro grid">
     <header className={`flex j-c-c ${width < 670 ? 'a-i-f-s' : 'a-i-c'} f-f-c-n`}>
       <h2 className={`${width < 769 ? "h3-s f-w__900" : ""} flex a-i-f-s j-c-s-b f-f-c-n`}>
         <span>New Era of Messaging</span>
         <span>Enjoy Flexibility and Simplicity</span>
       </h2>
       <p className={`${width > 768 ? "" : "h6-s"} t-j`}>
         New communication app which allows you to securely send FREE messages whenever and wherever you are, 24 hours a day!
       </p>
     </header>
     <div className={`flex a-i-c j-c-s-b ${width < 481 ? 'f-f-c-n' : 'f-f-r-n'}`}>
       <a href="#some-link-to-app-store">
         <img className="badge" src="http://localhost:3000/app-store-badge.png" alt="Download on the App Store" width={170} height={55} />
       </a>
       <a href="#some-link-to-google-play">
         <img className="badge" src="http://localhost:3000/google-play-badge.png" alt="Download on the Google Play" width={170} height={55} />
       </a>
     </div>
     <img className={`demo-img flex a-s-f-e ${width < 670 ? 'j-s-c' : 'j-s-s'}`} src="http://localhost:3000/intro-chat-r.png" alt="Example of a chat conversation." />
   </section>
 );
}
