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

export default function FirstLastNamesSubModal({
  showSubModal,
  setShowSubModal
}: {
  showSubModal: boolean;
  setShowSubModal: (val: boolean) => void;
}) {
  const [t] = useTranslation();
  const [cookies, setCookies] = useCookies([]);

  const user = useSelector((state: RootState) => state.auth.user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState(user.lastName);
  const [lastNameError, setLastNameError] = useState("");

  const dispatch = useDispatch();

  async function changeOptionalData() {
    axios
      .put(
        userLinks.changeOptionalData,
        {
          firstName,
          lastName
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
          if (data.error.firstName) {
            setFirstNameError(data.error.firstName);
          } else {
            setFirstNameError("");
          }

          if (data.error.lastName) {
            setLastNameError(data.error.lastName);
          } else {
            setLastNameError("");
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
        <h1 className="h5-s">{t("modal.settings.n_s")}</h1>
      </Modal.Header>
      <Modal.Body className="flex a-i-c j-c-s-a f-f-c-n">
        <form className="f-w flex f-f-c-n a-i-c j-c-f-s">
          <Input
            labelText={t("label.firstName")}
            errorIdentifier={firstNameError}
            errorLabelText={firstNameError}
            onChange={(event) => setFirstName(event.target.value)}
            inputId="firstName"
            name="firstName"
            inputMode="text"
            autoComplete="given-name"
            type="text"
            required
            value={firstName}
            showTip={false}
            tooltipText={t("tooltip.name")}
          />
          <Input
            labelText={t("label.lastName")}
            errorIdentifier={lastNameError}
            errorLabelText={lastNameError}
            onChange={(event) => setLastName(event.target.value)}
            inputId="lastName"
            name="lastName"
            inputMode="text"
            autoComplete="family-name"
            type="text"
            required
            value={lastName}
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
