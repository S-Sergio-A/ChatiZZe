import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Button } from "../button/Button";
import "./ChatInput.css";

type TextMessage = {
  textMessage: string;
};

type FileMessage = {
  attachment: string;
};

type Message = Partial<TextMessage & FileMessage> & { timestamp: string };

export const ChatInput = () => {
  const [message, setMessage] = useState<Message>({
    textMessage: "",
    attachment: "",
    timestamp: ""
  });
  const [extend, setExtend] = useState(false);
  const [attachedFile, setAttachedFile] = useState<any>(undefined);

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setMessage({
      textMessage: event.target.value,
      timestamp: new Date(Date.now()).toLocaleDateString()
    });
  }

  function textAreaOnFocusIn() {
    setExtend(true);
  }

  function textAreaOnFocusOut() {
    setExtend(false);
  }

  function sendMessage() {}

  function onFileChange(event: any) {
    setAttachedFile(event.target.files[0]);

    const formData = new FormData();

    formData.append("userAttachment", attachedFile, attachedFile.name);

    axios.post("/upload-file", formData);
  }

  function addEmotions() {}
  
  // TODO Add functions, fix layout, styles

  return (
    <div className="input-area grid">
      <div className="flex j-c-f-e a-i-c">
        <input onChange={onFileChange} type="file" />
        <Button onClick={addEmotions} type="button">
          em
        </Button>
      </div>
      <textarea
        onFocus={textAreaOnFocusIn}
        onBlur={textAreaOnFocusOut}
        className={`ta ${extend ? 'extended' : ''}`}
        maxLength={4000}
        onChange={onChange}
        value={message.textMessage}
      />
      <div>
        <Button onClick={sendMessage} type="button">
          em
        </Button>
      </div>
    </div>
  );
};
