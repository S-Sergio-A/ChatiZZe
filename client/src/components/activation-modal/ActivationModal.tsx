import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import i18n from "i18next";
import { showNotActivated } from "../../context/actions/activation";
import { RootState } from "../../context/rootState.interface";
import Modal from "../modal/Modal";

export default function ActivationModal() {
  const [t] = useTranslation();

  const notActivated = useSelector((state: RootState) => state.activation.notActivated);

  const dispatch = useDispatch();

  return (
    <Modal onModalClose={() => dispatch(showNotActivated(false))} show={notActivated} className="chat error">
      <Modal.Header onCloseModal={() => dispatch(showNotActivated(false))} layoutType="grid">
        <h1 className="h6-s">{t("modal.activation.header")}</h1>
      </Modal.Header>
      <Modal.Body className="flex t-c">
        <p className="h6-s">
          {t("modal.activation.text.fir")}
          <Link to={`/${i18n.language}/contact-us`}>{t("modal.activation.link")}</Link>
          {t("modal.activation.text.sec")}
        </p>
      </Modal.Body>
    </Modal>
  );
}
