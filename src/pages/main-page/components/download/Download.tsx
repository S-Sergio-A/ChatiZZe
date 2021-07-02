import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import "./Download.css";

export default function Download() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <section className="download-now grid">
      <div className={`col ${width < 481 ? 'j-s-c' : ''}`}>
        <img className="demo-img" src="http://localhost:3000/download-r.png" alt="Download our app on IOS or Android for free!" />
      </div>
      <div className="col flex j-c-c a-i-f-s">
        <div className="grid">
          <header className="f-w flex a-i-c j-c-f-s">
            <h2 className={width > 768 ? "h1-s" : "h3-s f-w__900"}>Download the app</h2>
          </header>
          <p className={`${width > 768 ? "" : "h6-s"} flex a-i-f-s f-f-c-n`}>
            <span className="t-j">Chatizze is available on IOS and Android.</span>
            <span className="t-j">Download now and enjoy free conversations 24/7!</span>
          </p>
          <div className={`flex a-i-c j-c-s-b  ${(width > 480 && width < 670) ? "f-f-c-n" : "f-f-r-w"}`}>
            <a href="#some-link-to-app-store">
              <img className="badge" src="http://localhost:3000/app-store-badge.png" alt="Download on the App Store" width={170} height={55} />
            </a>
            <a href="#some-link-to-google-play">
              <img className="badge" src="http://localhost:3000/google-play-badge.png" alt="Download on the Google Play" width={170} height={55} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
