import { useTranslation } from "react-i18next";
import React, { useRef, useState } from "react";
import { Button } from "../Button";
import "./ChangePhoto.css";
import axios from "axios";
import { userLinks } from "../../../utils/api-endpoints.enum";
import { setError } from "../../../context/actions/error";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { RootState } from "../../../context/rootState.interface";
import { fileToBase64 } from "../../../utils/fileToBase64";
import { login } from "../../../context/actions/auth";
import { cookieOptions } from "../../../utils/cookieOptions";
import { reloadChats } from "../../../context/actions/chat";

export default function ChangePhoto({
  type = "img",
  previousState,
  alt,
  actionType = "user-photo"
}: {
  type?: "img" | "svg";
  previousState: any;
  alt: string;
  actionType?: "chat-photo" | "user-photo";
}) {
  const [t] = useTranslation();
  const [cookies, setCookies] = useCookies<any>([]);

  const [photo, setPhoto] = useState(type === "img" ? previousState : "");

  const inputRef = useRef<any>(null);

  const dispatch = useDispatch();

  const userId = useSelector((state: RootState) => state.auth.user._id);
  const roomId = useSelector((state: RootState) => state.chat.data.roomId);
  const rights = useSelector((state: RootState) => state.chat.rights);

  async function onFileChange(event: any) {
    if (event.target.files[0].size > 200000) {
      event.preventDefault();
      alert(t("alert.tooBig"));
      return;
    }

    if (event.target.files && event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
    }
    const file = await fileToBase64(event.target.files[0]).catch((e) => Error(e));

    if (actionType === "user-photo") {
      await changeUserPhoto(file);
    } else {
      await changeChatPhoto(file);
    }
  }

  async function changeUserPhoto(photo: any) {
    axios
      .put(
        userLinks.changePhoto,
        {
          photo
        },
        {
          headers: {
            "x-access-token": cookies["accessToken"]?.accessToken,
            "x-refresh-token": cookies["refreshToken"]?.refreshToken,
            withCredentials: true
          }
        }
      )
      .then(({ data }) => {
        if (data.error && data.error.photo) {
          dispatch(setError(data.error.photo));
        } else {
          if (data) {
            const expTime = cookies["user-auth"].expTime;
            setCookies("user-data", data, cookieOptions(expTime > 1800 ? 3600 * 24 * 30 : expTime));
            dispatch(login(data));
          }
        }
      });
  }

  async function changeChatPhoto(photo: any) {
    axios
      .put(
        userLinks.changeRoomPhoto(userId, roomId),
        {
          photo
        },
        {
          headers: {
            Rights: [rights],
            "x-access-token": cookies["accessToken"]?.accessToken,
            "x-refresh-token": cookies["refreshToken"]?.refreshToken,
            "x-rights": [rights],
            withCredentials: true
          }
        }
      )
      .then(({ data }) => {
        if (data.error && data.error.photo) {
          dispatch(setError(data.error.photo));
        } else {
          dispatch(reloadChats(true));
        }
      });
  }

  return (
    <div className="change-photo">
      <div className="label-back" />
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        onClick={() => inputRef.current && inputRef.current.click()}
        className="label"
      >
        <path
          d="M311.653,100.535H79.59c-4.199,0-7.604,3.405-7.604,7.604s3.405,7.604,7.604,7.604h232.063
			    c4.199,0,7.604-3.405,7.604-7.604S315.852,100.535,311.653,100.535z"
        />
        <path
          d="M438.487,248.833c-4.199,0-7.604,3.405-7.604,7.604v168.669c0,11.107-9.037,20.144-20.144,20.144H35.352
          c-11.107,0-20.143-9.036-20.143-20.144v-289.22c0-11.108,9.037-20.143,20.143-20.143h18.89c4.199,0,7.604-3.405,7.604-7.604
          s-3.405-7.604-7.604-7.604h-18.89C15.859,100.535,0,116.394,0,135.887v289.22c0,19.493,15.859,35.352,35.352,35.352H410.74
          c19.494,0,35.352-15.859,35.352-35.352V256.437C446.091,252.238,442.687,248.833,438.487,248.833z"
        />
        <path
          d="M408.071,378.854c-4.199,0-7.604,3.405-7.604,7.604v28.376H45.624v-266.13h259.662c4.199,0,7.604-3.405,7.604-7.604
          c0-4.199-3.405-7.604-7.604-7.604H38.02c-4.199,0-7.604,3.405-7.604,7.604v281.338c0,4.199,3.405,7.604,7.604,7.604h370.051
          c4.199,0,7.604-3.405,7.604-7.604v-35.98C415.675,382.258,412.271,378.854,408.071,378.854z"
        />
        <path
          d="M408.071,250.334c-4.199,0-7.604,3.405-7.604,7.604v103.171c0,4.2,3.405,7.604,7.604,7.604s7.604-3.405,7.604-7.604
			    V257.938C415.675,253.739,412.271,250.334,408.071,250.334z"
        />
        <path
          d="M285.703,234.88c-3.778,0-7.157-2.253-8.61-5.74l-1.716-4.119c-3.664-8.792-12.187-14.474-21.712-14.474h-61.239
          c-9.525,0-18.048,5.682-21.713,14.475l-1.715,4.118c-1.453,3.487-4.833,5.74-8.61,5.74c-12.969,0-23.522,10.551-23.522,23.522
          v74.622c0,12.969,10.551,23.522,23.522,23.522h125.315c12.969,0,23.522-10.551,23.522-23.522v-74.622
          C309.224,245.431,298.673,234.88,285.703,234.88z M295.031,333.022h-0.001c0,5.143-4.184,9.328-9.328,9.328H160.389
          c-5.143,0-9.328-4.184-9.328-9.328V258.4c0-5.143,4.184-9.328,9.328-9.328c9.525,0,18.048-5.682,21.713-14.475l1.715-4.118
          c1.453-3.487,4.833-5.741,8.61-5.741h61.239c3.778,0,7.157,2.253,8.61,5.74l1.716,4.119c3.663,8.792,12.186,14.474,21.712,14.474
          c5.143,0,9.328,4.184,9.328,9.328V333.022z"
        />
        <path
          d="M223.046,249.916c-21.338,0-38.697,17.359-38.697,38.697c0,21.338,17.359,38.697,38.697,38.697
          c21.338,0,38.697-17.359,38.697-38.697C261.743,267.276,244.384,249.916,223.046,249.916z M223.046,313.117
          c-13.512,0-24.503-10.992-24.503-24.503s10.992-24.503,24.503-24.503s24.503,10.992,24.503,24.503
          C247.549,302.125,236.557,313.117,223.046,313.117z"
        />
        <path
          d="M417.714,51.542c-51.989,0-94.286,42.297-94.286,94.286c0,51.989,42.297,94.286,94.286,94.286S512,197.817,512,145.828
          C512,93.839,469.703,51.542,417.714,51.542z M417.714,224.904c-43.603,0-79.078-35.474-79.078-79.078s35.474-79.078,79.078-79.078
          c43.603,0,79.078,35.474,79.078,79.078S461.318,224.904,417.714,224.904z"
        />
        <path
          d="M463.336,138.224h-38.018v-38.018c0-4.199-3.405-7.604-7.604-7.604c-4.199,0-7.604,3.405-7.604,7.604v38.018h-38.018
          c-4.199,0-7.604,3.405-7.604,7.604c0,4.199,3.405,7.604,7.604,7.604h38.018v38.018c0,4.199,3.405,7.604,7.604,7.604
          c4.199,0,7.604-3.405,7.604-7.604v-38.018h38.018c4.199,0,7.604-3.405,7.604-7.604
          C470.94,141.628,467.536,138.224,463.336,138.224z"
        />
      </svg>
      <input onChange={onFileChange} type="file" accept="image/*" hidden ref={inputRef} className="none" />
      <Button
        onClick={() => inputRef.current && inputRef.current.click()}
        type="button"
        className="btn-r no-border chat-logo"
        ariaLabel={t("ariaLabel.button.changePhoto")}
      >
        {!photo ? type === "img" ? <img src={previousState} alt={alt} className="user-photo flex j-c-c a-i-c" /> : previousState : null}
        {photo ? <img src={photo} alt={alt} className="user-photo flex j-c-c a-i-c" /> : null}
      </Button>
    </div>
  );
}
