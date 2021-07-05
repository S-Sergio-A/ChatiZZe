import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { Button } from "../button/Button";
import { useContext, useEffect, useState } from "react";
import { SearchInput } from "../input/search-input/SearchInput";
import { ChatInfoContext } from "../../context/chat-info/ChatInfoContext";
import { ChatMetadataContext } from "../../context/chat-metadata/ChatInfoContext";

const membersCount = 5, activeMembersCount = 2, name = "BOOBA";

export default function ChatHeader() {
  const [searchMessage, setSearchMessage] = useState(false);
  const { show, showChatInfo } = useContext(ChatInfoContext);
  // const { loadChatMetadata, membersCount, activeMembersCount, name } = useContext(ChatMetadataContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    // loadChatMetadata();
  }, []);

  function showSearchBar() {
    setSearchMessage(!searchMessage);
  }
  
  // Test, than change layout

  return (
    <header className="flex a-i-c j-c-s-b">
      <Button onClick={() => showChatInfo(show)} type="button" ariaLabel="Show chat information">
        <div className="gr-name-con flex a-i-c j-c-f-s f-f-c-n">
          <h1 className="h3-s">{name}</h1>
          <p className="c-gray">{`${membersCount} участников${activeMembersCount ? `${activeMembersCount} в сети` : ""}`}</p>
        </div>
        <div className="flex a-i-c ">
          <div className="flex">
            {searchMessage ? <SearchInput /> : null}
            <Button onClick={showSearchBar} type="button" ariaLabel="Search in messages.">
              S
            </Button>
          </div>
          <Button onClick={showSearchBar} type="button" ariaLabel="Open chat settings.">
            Op
          </Button>
        </div>
      </Button>
    </header>
  );
}
