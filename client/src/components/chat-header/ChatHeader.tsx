import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
import axios from "axios";
import { changeChatListSize, displayAddUserModal, displayChatData, displayManageChatModal } from "../../context/actions/chat";
import useDropdownNavigation from "../../utils/hooks/useDropdownNavigation";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { RootState } from "../../context/rootState.interface";
import { userLinks } from "../../utils/api-endpoints.enum";
import { isInViewport } from "../../utils/isInViewport";
import useKeyDown from "../../utils/hooks/useKeyDown";
import { Dropdown } from "../dropdown/Dropdown";
import { Button } from "../button/Button";
import "./ChatHeader.css";
import { setError } from "../../context/actions/error";

export default function ChatHeader({
  socketRef,
  membersCount,
  activeMembersCount
}: {
  socketRef: React.MutableRefObject<any>;
  membersCount: number;
  activeMembersCount: number;
}) {
  const [t] = useTranslation();
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [cursor, setCursor] = useState(0);
  const [settingsCursor, setSettingsCursor] = useState(0);

  const userId = useSelector((state: RootState) => state.auth.user._id);
  const roomId = useSelector((state: RootState) => state.chat.data.roomId);

  const chatName = useSelector((state: RootState) => state.chat.data.chatName);
  const showChatData = useSelector((state: RootState) => state.chat.showChatData);

  const settingsRef = useRef<any>(null);
  const settingsDropdownRef = useRef<any>(null);
  const searchInputRef = useRef<any>(null);
  const searchDropdownRef = useRef<any>(null);

  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const settings = [
    {
      onClick: () => dispatch(displayChatData(!showChatData)),
      text: t("chatHeader.settings.gr_i")
    },
    {
      onClick: disableNotifications,
      text: t("chatHeader.settings.d_n"),
      disabled: true
    },
    {
      onClick: () => dispatch(displayManageChatModal(true)),
      text: t("chatHeader.settings.m_ch")
    },
    {
      onClick: () => dispatch(displayAddUserModal(true)),
      text: t("chatHeader.settings.a_u")
    }
  ];

  useEffect(() => {
    setSearchResult([]);
    setShowSearchResult(false);
    setDisplaySearchBar(false);
  }, [roomId]);

  useEffect(() => {
    if (displaySearchBar && socketRef.current) {
      socketRef.current.on("searched-messages", (foundedMessages: any[]) => {
        setShowSearchResult(true);
        setSearchResult(foundedMessages);
      });
    }
  }, [socketRef, displaySearchBar]);

  useEffect(() => {
    if (searchInputRef.current && displaySearchBar) {
      searchInputRef.current.focus();
    }
  }, [displaySearchBar, searchInputRef]);

  function searchMessages(event: React.FocusEvent<HTMLInputElement>) {
    if (socketRef.current && event.target.value.length !== 0)
      socketRef.current.emit("search-messages", { roomId: roomId, keyword: event.target.value });
  }

  async function disableNotifications() {
    axios.put(userLinks.notifications(userId, roomId, "false"), {}).then(({ data }) => {
      if (data.error) {
        dispatch(setError(data.error.message));
      }
    });
  }

  useOutsideClick(settingsRef, () => setShowSettings(false), settingsDropdownRef);
  useOutsideClick(searchInputRef, () => setShowSearchResult(false), searchDropdownRef);

  useKeyDown(
    "Escape",
    () => {
      setShowSearchResult(false);
      setDisplaySearchBar(false);
      if (searchInputRef.current) searchInputRef.current.blur();
    },
    [displaySearchBar, searchInputRef]
  );

  useDropdownNavigation({
    focused: showSearchResult,
    list: searchResult,
    cursor,
    setCursor,
    onEnterClick: () => {
      document.getElementById(searchResult[cursor]._id)?.scrollIntoView({ block: "center", behavior: "smooth" });
      timer(550).subscribe(() => {
        if (isInViewport(document.getElementById(searchResult[cursor]._id))) {
          setShowSearchResult(false);
          setDisplaySearchBar(false);
        }
      });
    },
    onArrowClick: () =>
      document.getElementById(`${searchResult[cursor]._id}-menu-item`)?.scrollIntoView({
        block: "center",
        behavior: "smooth"
      }),
    deps: []
  });

  useDropdownNavigation({
    focused: showSettings,
    list: settings,
    cursor: settingsCursor,
    setCursor: setSettingsCursor,
    onEnterClick: () => {
      settings[settingsCursor].onClick();
    },
    deps: []
  });

  return (
    <header className="chat-header grid">
      {width < 769 ? (
        <Button
          onClick={() => dispatch(changeChatListSize(true))}
          type="button"
          ariaLabel={t("ariaLabel.button.backToList")}
          className="btn-back btn-i btn-sec btn-r no-border a-s-c j-s-c"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 330 330"
            xmlSpace="preserve"
            width="20px"
            height="20px"
          >
            <path
              d="M315,150H51.213l49.393-49.394c5.858-5.857,5.858-15.355,0-21.213c-5.857-5.857-15.355-5.857-21.213,0
              l-75,75c-5.858,5.857-5.858,15.355,0,21.213l75,75C82.323,253.535,86.161,255,90,255c3.839,0,7.678-1.465,10.606-4.394
              c5.858-5.857,5.858-15.355,0-21.213L51.213,180H315c8.284,0,15-6.716,15-15S323.284,150,315,150z"
            />
          </svg>
        </Button>
      ) : null}
      {width < 769 && displaySearchBar ? null : (
        <Button
          onClick={() => dispatch(displayChatData(!showChatData))}
          ariaLabel={t("ariaLabel.button.chatInfo")}
          className={`gr-name-con grid h6-s btn-nav ${width < 769 ? "sm" : ""} ${displaySearchBar ? "search-on" : ""}`}
        >
          <h1 className="h5-s f-w j-s-c t-l">{chatName}</h1>
          <p className="c-gray helper j-s-c f-w t-l">{`${membersCount} ${t("users")}, ${
            activeMembersCount ? `${activeMembersCount} ${t("usersOnline")}` : ""
          }`}</p>
        </Button>
      )}
      {displaySearchBar ? (
        <input
          className={`search ${width < 769 ? "f-w sm" : ""}`}
          inputMode="search"
          onClick={() => setShowSearchResult(searchInputRef.current && searchInputRef.current.value.length > 0)}
          onChange={searchMessages}
          placeholder={t("search.placeholder")}
          ref={searchInputRef}
        />
      ) : null}
      <Button
        onClick={() => {
          if (displaySearchBar) {
            setShowSearchResult(false);
            setDisplaySearchBar(false);
            if (searchInputRef.current) searchInputRef.current.blur();
          }
          setDisplaySearchBar(!displaySearchBar);
        }}
        type="button"
        layoutType="flex"
        ariaLabel={t("ariaLabel.button.searchM")}
        className="btn-search btn-i btn-sec btn-r no-border a-s-c j-s-c"
      >
        {!displaySearchBar ? (
          <svg width="20px" height="20px" viewBox="0 0 74 74" xmlns="http://www.w3.org/2000/svg">
            <path d="m27 51.93a25 25 0 0 1 -17.69-42.62 25 25 0 1 1 17.69 42.62zm-16.27-41.2a23 23 0 1 0 32.47 0 23 23 0 0 0 -32.47 0z" />
            <path d="m27 45.45a18.34 18.34 0 0 1 -13.11-5.45 18.5 18.5 0 1 1 13.11 5.45zm0-35a16.5 16.5 0 0 0 -11.7 28.18 16.5 16.5 0 1 0 11.7-28.15z" />
            <path d="m65.81 72a6.14 6.14 0 0 1 -4.38-1.81l-22.3-22.3a1 1 0 0 1 0-1.42 1 1 0 0 1 1.41 0l22.3 22.3a4.19 4.19 0 1 0 5.93-5.93l-22.3-22.3a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l22.3 22.3a6.19 6.19 0 0 1 -4.38 10.57z" />
          </svg>
        ) : (
          <svg
            className="close"
            width="16px"
            height="16px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 22.88 22.88"
            xmlSpace="preserve"
          >
            <path
              d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
                l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
                c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
                c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"
            />
          </svg>
        )}
      </Button>
      <div className="btn-settings-wrapper flex a-i-c j-c-c">
        <Button
          onClick={() => setShowSettings(!showSettings)}
          type="button"
          ariaLabel={t("ariaLabel.button.chatSettings")}
          className="btn-settings btn-i btn-sec btn-r no-border a-s-c j-s-c"
          buttonRef={settingsRef}
        >
          <svg width="20px" height="20px" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 13.9841V13.5556C0 13.545 0.00529101 13.5344 0.015873 13.5238L0.031746 13.4603C0.0952381 13.0053 0.296296 12.6164 0.634921 12.2937C0.973545 11.9709 1.36508 11.7989 1.80952 11.7778C2.30688 11.7354 2.74603 11.8439 3.12698 12.1032C3.50794 12.3624 3.7672 12.7249 3.90476 13.1905C3.91534 13.2011 3.92328 13.2169 3.92857 13.2381C3.93386 13.2593 3.93915 13.2778 3.94444 13.2937C3.94974 13.3095 3.95238 13.3254 3.95238 13.3413C3.95238 13.3571 3.95503 13.3757 3.96032 13.3968C3.96561 13.418 3.9709 13.4365 3.97619 13.4524C3.98148 13.4683 3.98677 13.4868 3.99206 13.5079C3.99735 13.5291 4 13.545 4 13.5556V13.9841L3.99206 14.0238L3.96825 14.0794C3.90476 14.4921 3.7328 14.8492 3.45238 15.1508C3.17196 15.4524 2.8254 15.6455 2.4127 15.7302C2.38095 15.7407 2.33862 15.7513 2.28571 15.7619C2.25397 15.7725 2.2328 15.7778 2.22222 15.7778H1.7619C1.73016 15.7672 1.70899 15.7566 1.69841 15.746C1.28571 15.6825 0.933862 15.5132 0.642857 15.2381C0.351852 14.963 0.15873 14.6243 0.0634921 14.2222C0.0529101 14.1905 0.0396825 14.1481 0.0238095 14.0952C0.00793651 14.0423 0 14.0053 0 13.9841ZM4 1.79365V2.22222L3.99206 2.2619L3.96825 2.31746C3.90476 2.77249 3.70106 3.16138 3.35714 3.48413C3.01323 3.80688 2.61905 3.97884 2.1746 4C1.84656 4.02116 1.53968 3.97619 1.25397 3.86508C0.968254 3.75397 0.724868 3.5873 0.52381 3.36508C0.322751 3.14286 0.174603 2.87831 0.0793651 2.57143C0.0793651 2.53968 0.0529101 2.42328 0 2.22222V1.79365C0 1.78307 0.00529101 1.7672 0.015873 1.74603L0.031746 1.69841C0.179894 0.883598 0.656085 0.343915 1.46032 0.0793651C1.50265 0.0687831 1.56349 0.0529101 1.64286 0.031746C1.72222 0.010582 1.7672 0 1.77778 0H2.22222L2.2381 0.015873C2.26984 0.026455 2.29101 0.031746 2.30159 0.031746C2.71429 0.0952381 3.06878 0.26455 3.36508 0.539683C3.66138 0.814815 3.85714 1.15873 3.95238 1.57143C3.96296 1.61376 3.97884 1.68254 4 1.77778V1.79365ZM4 7.66667V8.11111L3.98413 8.15079L3.96825 8.20635C3.89418 8.66138 3.68519 9.05026 3.34127 9.37302C2.99735 9.69577 2.60317 9.86772 2.15873 9.88889C1.65079 9.91005 1.2037 9.78307 0.81746 9.50794C0.431217 9.2328 0.179894 8.86243 0.0634921 8.39682C0.0529101 8.33333 0.031746 8.23809 0 8.11111V7.66667L0.015873 7.62698L0.031746 7.57143C0.0952381 7.1164 0.301587 6.72751 0.650794 6.40476C1 6.08201 1.39683 5.91005 1.84127 5.88889C2.34921 5.86772 2.7963 5.99471 3.18254 6.26984C3.56878 6.54497 3.82011 6.91534 3.93651 7.38095C3.94709 7.44444 3.96825 7.53968 4 7.66667Z" />
          </svg>
        </Button>
        <Dropdown focused={showSettings} setFocused={setShowSettings} dropdownRef={settingsDropdownRef}>
          <ul role="menu" className="flex j-c-f-s a-i-c f-f-c-n">
            {settings &&
              settings.map((item, index) => (
                <li key={index}>
                  <Button
                    onClick={item.onClick}
                    type="button"
                    layoutType="flex"
                    className={`btn-sec no-border btn-sm ${settingsCursor === index ? "active" : ""}`}
                    disabled={item?.disabled ? item.disabled : undefined}
                  >
                    {item.text}
                  </Button>
                </li>
              ))}
          </ul>
        </Dropdown>
      </div>
      <Dropdown focused={showSearchResult} setFocused={setShowSearchResult} dropdownRef={searchDropdownRef}>
        <ul role="menu" className="flex j-c-f-s a-i-c f-f-c-n">
          {searchResult &&
            searchResult.map((item, index) => (
              <li key={`${item._id}-menu-item`} className="flex a-i-c j-c-c f-w" id={`${item._id}-menu-item`}>
                <Button
                  onClick={() => {
                    document.getElementById(item._id)?.scrollIntoView({
                      block: "center",
                      behavior: "smooth"
                    });
                    setShowSearchResult(false);
                  }}
                  type="button"
                  layoutType="grid"
                  className={`btn-ter no-border btn-sm ${cursor === index ? "active" : ""}`}
                >
                  <img src={item.user.photo} alt={item.user.username} width={50} height={50} />
                  <div className="flex a-i-c j-c-s-b">
                    <span className="helper f-w__600">{item.user.username}</span>
                    <span className="copyright">{item.timestamp}</span>
                  </div>
                  <p>{item.text}</p>
                </Button>
              </li>
            ))}
        </ul>
      </Dropdown>
    </header>
  );
}
