import { Dispatch, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { timer } from "rxjs";
import axios from "axios";
import { RootState } from "../../../context/rootState.interface";
import { userLinks } from "../../../utils/api-endpoints.enum";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import { setError } from "../../../context/actions/error";

export default function PhoneChangeForm({ phoneChange, setPhoneChange }: { phoneChange: boolean; setPhoneChange: Dispatch<boolean> }) {
  const [t] = useTranslation();

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const user = useSelector((state: RootState) => state.auth.user);

  const [animate, setAnimate] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (phoneChange && firstRender) {
      timer(300).subscribe(() => {
        setFirstRender(true);
      });
    }

    if (!phoneChange) {
      timer(300).subscribe(() => {
        setAnimate(true);
      });
    } else {
      setAnimate(false);
    }
  }, [phoneChange]);

  async function changePhone() {
    await axios
      .post(userLinks.changePhone, {
        oldPhoneNumber: user.phoneNumber,
        newPhoneNumber: phone
      })
      .then(({ data }) => {
        if (data.error) {
          if (data.error.phoneNumber) {
            setPhoneError(data.error.phoneNumber);
          } else {
            setPhoneError("");
          }
        } else {
          dispatch(setError(data.error.message));
        }
      });
  }

  return (
    <div className={`block-phone ${animate ? "reduce" : "enlarge"}`}>
      <Button onClick={() => setPhoneChange(!phoneChange)} layoutType="grid" className={`btn-sec btn-sm ${phoneChange ? "active" : ""}`}>
        <span>{t("modal.settings.form.phone")}</span>
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
      <fieldset className={`${!firstRender && phoneChange ? "show-form" : "hide-form"} ${animate ? "none" : ""} phone`}>
        <Input labelText={t("label.oldPhone")} inputId="old-phone" showTip={false} disabled value={user.phoneNumber} />
        <Input
          labelText={t("label.newPhone")}
          errorIdentifier={phoneError}
          errorLabelText={phoneError}
          onBlur={(event) => setPhone(event.target.value)}
          inputId="new-phone"
          name="new-phone"
          inputMode="tel"
          autoComplete="tel"
          type="tel"
          required
          tooltipText={t("tooltip.phone")}
        />
        <Button onClick={changePhone} className="btn-pr dark">
          <span>{t("button.update")}</span>
        </Button>
      </fieldset>
    </div>
  );
}
