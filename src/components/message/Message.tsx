import { useCookies } from "react-cookie";
import "./Message.css";

interface MessageProps {
  userIcon: string;
  author: {
    id: number;
    username: string;
  };
  text: string;
  timestamp: string;
  nextMessageAuthorId: number | undefined;
}

export default function Message({ userIcon, author, text, timestamp, nextMessageAuthorId }: MessageProps) {
  const [cookies] = useCookies(["user"]);

  return (
    <div className="message-wrapper flex a-i-c j-c-s-b">
      <div className="message-author-image flex a-i-f-e j-c-c">
        {nextMessageAuthorId !== author.id ? <img src={userIcon} alt="" /> : null}
      </div>
      <div className={author.id === cookies.userId ? "message-yours" : "message-others"}>
        <p className="message-text">{text}</p>
        <span className="message-timestamp">{timestamp}</span>
      </div>
    </div>
  );
}
