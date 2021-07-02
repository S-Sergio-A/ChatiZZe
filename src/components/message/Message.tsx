import { useCookies } from "react-cookie";
import "./Message.css";

interface MessageProps {
  userImageSrc: string;
  messageAuthorId: string;
  messageText: string;
  messageTimestamp: string;
  nextMessageAuthorId: string | undefined;
}

export default function Message({ userImageSrc, messageAuthorId, messageText, messageTimestamp, nextMessageAuthorId }: MessageProps) {
  const [cookies] = useCookies(["user"]);
  
  return (
    <div className="message-wrapper flex a-i-c j-c-s-b">
      <div className="message-author-image flex a-i-f-e j-c-c">
        {nextMessageAuthorId !== messageAuthorId ? <img src={userImageSrc} alt="" /> : null}
      </div>
      <div className={messageAuthorId === cookies.userId ? "message-yours" : "message-others"}>
        <p className="message-text">{messageText}</p>
        <span className="message-timestamp">{messageTimestamp}</span>
      </div>
    </div>
  );
}
