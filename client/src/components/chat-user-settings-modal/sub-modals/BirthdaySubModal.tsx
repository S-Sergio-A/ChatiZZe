import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { RootState } from "../../../context/rootState.interface";
import { userLinks } from "../../../utils/api-endpoints.enum";
import { cookieOptions } from "../../../utils/cookieOptions";
import { login } from "../../../context/actions/auth";
import { Button } from "../../button/Button";
import { Input } from "../../input/Input";
import Modal from "../../modal/Modal";

export default function BirthdaySubModal({
  showSubModal,
  setShowSubModal
}: {
  showSubModal: boolean;
  setShowSubModal: (val: boolean) => void;
}) {
  const [t] = useTranslation();
  const [cookies, setCookies] = useCookies<any>([]);

  const user = useSelector((state: RootState) => state.auth.user);

  const [birthday, setBirthday] = useState(user.birthday);
  const [birthdayError, setBirthdayError] = useState("");

  const [birthdayRef, setBirthdayRef] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (birthdayRef && birthdayRef?.current?.value.length === 0) {
      birthdayRef.current.value = birthday;
    }
  }, [birthdayRef]);

  async function changeOptionalData() {
    axios
      .put(
        userLinks.changeOptionalData,
        {
          birthday
        },
        {
          headers: {
            "Access-Token": cookies["accessToken"]?.accessToken,
            "Refresh-Token": cookies["refreshToken"]?.refreshToken,
            withCredentials: true
          }
        }
      )
      .then(({ data }) => {
        if (data.error) {
          if (data.error.birthday) {
            setBirthdayError(data.error.birthday);
          } else {
            setBirthdayError("");
          }
        } else {
          if (data.user) {
            const expTime = cookies["user-auth"].expTime;
            setCookies("user-data", data.user, cookieOptions(expTime > 1800 ? 3600 * 24 * 30 : expTime));
            dispatch(login(data.user));
          }
          setShowSubModal(false);
        }
      });
  }

  return (
    <Modal onModalClose={() => setShowSubModal(false)} show={showSubModal} className="user-settings">
      <Modal.Header onCloseModal={() => setShowSubModal(false)} layoutType="flex">
        <h1 className="h6-s">{t("modal.settings.birthday")}</h1>
      </Modal.Header>
      <Modal.Body className="flex a-i-c j-c-s-a f-f-c-n">
        <form className="f-w flex f-f-c-n a-i-c j-c-f-s">
          <Input
            labelText={t("label.birthday")}
            errorIdentifier={birthdayError}
            errorLabelText={birthdayError}
            onBlur={(event) => setBirthday(event.target.value)}
            inputId="bday"
            name="bday"
            inputMode="decimal"
            autoComplete="bday"
            type="date"
            setInputRef={setBirthdayRef}
            required
            showTip={false}
            tooltipText={t("tooltip.name")}
          />
          <Button onClick={changeOptionalData} className="btn-pr dark btn-sm-x-w j-s-c">
            <span>{t("button.update")}</span>
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
