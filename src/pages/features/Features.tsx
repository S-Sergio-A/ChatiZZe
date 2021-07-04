import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import features from "./features.json";
import "./Features.css";

export default function FeaturesPage() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <main id="main" className="features-page grid">
      <header className="f-w flex a-i-c j-c-c">
        <h2 className={`${width < 769 ? "h3-s f-w__900" : "h1-s"}`}>Features</h2>
      </header>
      <div className="grid">
        {features.map((array, index) => (
          <ul key={index} className="flex a-i-c j-c-f-s f-f-c-n">
            {array.map((item, itemIndex) => (
              <li key={itemIndex} className="flex a-i-c j-c-c">
                <div className="block grid">
                  <div style={{ background: `url(${item.src})` }} />
                  <h2 className={`${width < 481 ? "h4-s" : "h3-s"} flex t-c a-i-c j-c-c f-w__900`}>{item.header}</h2>
                  <p className="h6-s t-j">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </main>
  );
}
