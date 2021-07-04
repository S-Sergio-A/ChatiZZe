import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import { Button } from "../../../../components/button/Button";
import "./HowItWorks.css";

export default function HowItWorks() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();
  
  //TODO
  function play() {
  
  }
  return (
    <section className="how-it-works grid">
      <header className="f-w flex a-i-c j-c-c">
        <h2 className={`${width < 769 ? "h3-s f-w__900" : "h1-s"}`}>How it works</h2>
      </header>
      <div className="col grid">
        <div className="flex f-f-c-n">
          <header>
            <h3>
              <span>Step №1</span>
            </h3>
          </header>
          <p className="t-j h6-s">
            Enter your phone number or email, receive and enter a verification code. Or use your Google account to sign up.
          </p>
        </div>
        <div className="flex f-f-c-n">
          <header>
            <h3>
              <span>Step №2</span>
            </h3>
          </header>
          <p className="t-j h6-s">Create a username and password. Add other information about yourself if you want.</p>
        </div>
        <div className="flex f-f-c-n">
          <header>
            <h3>
              <span>Step №3</span>
            </h3>
          </header>
          <p className="t-j h6-s">Find your friends, follow channels, start group chats, send images, videos or other files.</p>
        </div>
        <div className="flex f-f-c-n">
          <header>
            <h3>
              <span>Step №4</span>
            </h3>
          </header>
          <p className="t-j h4-s f-w__900">Enjoy!</p>
        </div>
      </div>
      <div className="col flex a-i-c j-c-f-s f-f-c-n">
        <figure className="f-w flex a-i-c j-c-c f-f-c-n">
          <video className="demo-img" controls preload="metadata" poster="http://localhost:3000/chat-demo-r.jpg" />
          <figcaption className="flex a-i-c j-c-s-b">
            <Button onClick={play} type="button" ariaLabel="Play the chat usage demo." className="btn-i">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 142.448 142.448"
                enableBackground="new 0 0 142.448 142.448;"
                xmlSpace="preserve"
              >
                <path
                  d="M142.411,68.9C141.216,31.48,110.968,1.233,73.549,0.038c-20.361-0.646-39.41,7.104-53.488,21.639
		C6.527,35.65-0.584,54.071,0.038,73.549c1.194,37.419,31.442,67.667,68.861,68.861c0.779,0.025,1.551,0.037,2.325,0.037
		c19.454,0,37.624-7.698,51.163-21.676C135.921,106.799,143.033,88.377,142.411,68.9z M111.613,110.336
		c-10.688,11.035-25.032,17.112-40.389,17.112c-0.614,0-1.228-0.01-1.847-0.029c-29.532-0.943-53.404-24.815-54.348-54.348
		c-0.491-15.382,5.122-29.928,15.806-40.958c10.688-11.035,25.032-17.112,40.389-17.112c0.614,0,1.228,0.01,1.847,0.029
		c29.532,0.943,53.404,24.815,54.348,54.348C127.91,84.76,122.296,99.306,111.613,110.336z"
                />
                <path
                  d="M94.585,67.086L63.001,44.44c-3.369-2.416-8.059-0.008-8.059,4.138v45.293
		c0,4.146,4.69,6.554,8.059,4.138l31.583-22.647C97.418,73.331,97.418,69.118,94.585,67.086z"
                />
              </svg>
            </Button>
            <span className={`${width < 481 ? 'h6-s' : ''}`}>Check the app demo</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
