import { useTranslation } from "react-i18next";
import useWindowDimensions from "../../../../utils/hooks/useWindowDimensions";
import { Card } from "../../../../components/card/Card";
import "./Features.css";

export default function Features() {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <section className="features grid">
      <header className="f-w flex a-i-c j-c-c">
        <h2 className={`${width < 769 ? "h3-s f-w__900" : "h1-s"}`}>Features</h2>
      </header>
      <ul className={`flex ${width < 993 && width > 768 ? "j-c-s-a" : width < 769 ? "j-c-c" : "j-c-s-b"} a-i-c f-f-r-w`}>
        <li className="flex a-i-c j-c-c">
          <Card layoutType="grid">
            <div style={{ background: "url(http://localhost:3000/features/security_primary.svg)" }} />
            <h2 className="flex a-i-c j-c-c h3-s f-w__900">Security</h2>
            <p className={width < 1199 ? "h6-s" : ""}>
              You can send one-on-one and group texts, and use international voice and video calls with your friends.
            </p>
          </Card>
        </li>
        {/*Securely text with friends*/}
        <li className="flex a-i-c j-c-c">
          <Card layoutType="grid">
            <div style={{ background: "url(http://localhost:3000/features/emoji_primary.svg)" }} />
            <h2 className="flex a-i-c j-c-c h3-s f-w__900">Emojis</h2>
            <p className={width < 1199 ? "h6-s" : ""}>You can share you feelings with emoji and wrap your app with colorful themes.</p>
          </Card>
        </li>
        {/*Custom themes and emoji*/}
        <li className="flex a-i-c j-c-c">
          <Card layoutType="grid">
            <div style={{ background: "url(http://localhost:3000/features/channel_primary.svg)" }} />
            <h2 className="flex a-i-c j-c-c h3-s f-w__900">Channels</h2>
            <p className={width < 1199 ? "h6-s" : ""}>Find a channel, subscribe, share posts with friends and enjoy!</p>
          </Card>
        </li>
        {/*Follow channels matching your interests*/}

        {/*<li className="flex a-i-c j-c-c">*/}
        {/*  <div className="feature flex a-i-c j-c-c f-f-c-n">*/}
        {/*    <img src="http://localhost:3000/file-sharing-demo.png" alt="Share files up to 30Mb without hassle." />*/}
        {/*    <h2>Files Sharing Made Easy</h2>*/}
        {/*    <p>*/}
        {/*      Send PDFs, documents, spreadsheets, slideshows and more, without the hassle of file sharing apps. You can send files up to*/}
        {/*      30 MB.*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</li>*/}
      </ul>
    </section>
  );
}
