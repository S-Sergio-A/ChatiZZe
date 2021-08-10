import React, { Dispatch, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { timer } from "rxjs";
import axios from "axios";
import { RootState } from "../../../context/rootState.interface";
import { userLinks } from "../../../utils/api-endpoints.enum";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import { setError } from "../../../context/actions/error";

export default function UsernameChangeForm({
  usernameChange,
  setUsernameChange
}: {
  usernameChange: boolean;
  setUsernameChange: Dispatch<boolean>;
}) {
  const [t] = useTranslation();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  const [animate, setAnimate] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (usernameChange && firstRender) {
      timer(300).subscribe(() => {
        setFirstRender(true);
      });
    }

    if (!usernameChange) {
      timer(300).subscribe(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [usernameChange]);

  async function changeUsername() {
    await axios
      .post(userLinks.changeUsername, {
        oldUsername: user.username,
        newUsername: username
      })
      .then(({ data }) => {
        if (data.error) {
          if (data.error.username) {
            setUsernameError(data.error.username);
          } else {
            setUsernameError("");
          }
        } else {
          dispatch(setError(data.error.message));
        }
      });
  }

  return (
    <div className={`block-username ${animate ? "reduce" : "enlarge"}`}>
      <Button
        onClick={() => setUsernameChange(!usernameChange)}
        layoutType="grid"
        className={`btn-sec btn-sm ${usernameChange ? "active" : ""}`}
      >
        <span>{t("modal.settings.form.username")}</span>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="15px"
          height="15px"
          className="drop"
          viewBox="0 0 451.847 451.847"
          xmlSpace="preserve"
        >
          <path
            d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                  c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                  c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"
          />
        </svg>
      </Button>
      <fieldset className={`${!firstRender && usernameChange ? "show-form" : "hide-form"} ${animate ? "none" : ""} username`}>
        <Input labelText={t("label.oldUsername")} inputId="old-username" showTip={false} disabled value={user.username} />
        <Input
          labelText={t("label.newUsername")}
          errorIdentifier={usernameError}
          errorLabelText={usernameError}
          onBlur={(event) => setUsername(event.target.value)}
          inputId="new-username"
          name="new-username"
          inputMode="text"
          autoComplete="username"
          type="text"
          required
          tooltipText={t("tooltip.username")}
        />
        <Button onClick={changeUsername} className="btn-pr dark">
          <span>{t("button.update")}</span>
        </Button>
      </fieldset>
    </div>
  );
}
