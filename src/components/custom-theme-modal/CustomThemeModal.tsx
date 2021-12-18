import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import React, { useState } from "react";
import { getCorrectTextColor, lightenDarkenColor } from "../../utils/color/shadeColor";
import { setCustomTheme, setShowCustomThemeModal } from "../../context/actions/theme";
import { RootState } from "../../context/rootState.interface";
import { cookieOptions } from "../../utils/cookieOptions";
import { Button } from "../button/Button";
import Modal from "../modal/Modal";
import "./CustomThemeModal.css";

export default function CustomThemeModal() {
  const [t] = useTranslation();
  const [cookies, setCookies] = useCookies<any>([]);

  const themeType = cookies["theme-type"];
  let theme = cookies["theme"];

  if (themeType && theme) {
    theme = {
      type: theme.type,
      primary: theme.primary,
      secondary: theme.secondary,
      layout: theme.layout,
      borderPrimary: theme.borderPrimary,
      borderSecondary: theme.borderSecondary,
      colorPrimary: theme.colorPrimary,
      colorSecondary: theme.colorSecondary,
      backgroundImage: theme.backgroundImage
    };
  } else {
    theme = {
      type: "light",
      primary: "#7400b8",
      secondary: "#dfbeff",
      layout: "#ebebeb",
      borderPrimary: "#dfe1e5",
      borderSecondary: "#b7b5b5",
      colorPrimary: "#ffffff",
      colorSecondary: "#000000",
      backgroundImage: ""
    };
  }

  const showCustomThemeModal = useSelector((state: RootState) => state.theme.showCustomThemeModal);

  const dispatch = useDispatch();

  const [primary, setPrimary] = useState(theme.primary);
  const [secondary, setSecondary] = useState(theme.secondary);
  const [primaryBorder, setPrimaryBorder] = useState(theme.borderPrimary);
  const [secondaryBorder, setSecondaryBorder] = useState(theme.borderSecondary);
  const [primaryColor, setPrimaryColor] = useState(theme.colorPrimary);
  const [secondaryColor, setSecondaryColor] = useState(theme.colorSecondary);
  const [layout, setLayout] = useState(theme.layout);

  return (
    <Modal onModalClose={() => dispatch(setShowCustomThemeModal(false))} show={showCustomThemeModal} className="theme">
      <Modal.Header onCloseModal={() => dispatch(setShowCustomThemeModal(false))} layoutType="flex">
        <h1 className="h6-s">{t("modal.theme.header")}</h1>
      </Modal.Header>
      <Modal.Body className="grid">
        <div className="ruler f-w" />
        <div className="color-back-pr grid">
          <label htmlFor="back-pr" className="t-c">
            {t("modal.theme.header")}
          </label>
          <input
            className="j-s-c"
            type="color"
            id="back-pr"
            value={primary}
            onChange={(e) => {
              setPrimary(e.target.value);
              setPrimaryColor(getCorrectTextColor(primary));
              setPrimaryBorder(lightenDarkenColor(primary, -40));
              setLayout(lightenDarkenColor(primaryColor, primaryColor === "#ffffff" ? -30 : 90));
            }}
          />
        </div>
        <div className="color-back-sec grid">
          <label htmlFor="back-sec" className="t-c">
            {t("modal.theme.l_sec_b")}
          </label>
          <input
            className="j-s-c"
            type="color"
            id="back-sec"
            value={secondary}
            onChange={(e) => {
              setSecondary(e.target.value);
              setSecondaryColor(getCorrectTextColor(secondary));
              setSecondaryBorder(lightenDarkenColor(secondary, -40));
            }}
          />
        </div>
        <div className="color-pr grid">
          <label htmlFor="col-pr" className="t-c">
            {t("modal.theme.l_pr_c")}
          </label>
          <input className="j-s-c" type="color" id="col-pr" value={primaryColor} disabled />
        </div>
        <div className="color-sec grid">
          <label htmlFor="col-sec" className="t-c">
            {t("modal.theme.l_sec_c")}
          </label>
          <input className="j-s-c" type="color" id="col-sec" value={secondaryColor} disabled />
        </div>
        <div className="color-b-pr grid">
          <label htmlFor="border-pr" className="t-c">
            {t("modal.theme.l_pr_b_c")}
          </label>
          <input className="j-s-c" type="color" id="border-pr" value={primaryBorder} disabled />
        </div>
        <div className="color-b-sec grid">
          <label htmlFor="border-sec" className="t-c">
            {t("modal.theme.l_sec_b_c")}
          </label>
          <input className="j-s-c" type="color" id="border-sec" value={secondaryBorder} disabled />
        </div>
        <div className="color-l grid">
          <label htmlFor="layout" className="t-c">
            {t("modal.theme.l_l")}
          </label>
          <input className="j-s-c" type="color" id="layout" value={layout} disabled />
        </div>
        <div className="container flex a-i-c j-c-c">
          <Button
            className="btn-pr btn-sm-x-w dark"
            onClick={() => {
              dispatch(setCustomTheme(primary, secondary, layout, primaryBorder, secondaryBorder, primaryColor, secondaryColor, ""));
              setCookies(
                "theme",
                {
                  type: "custom",
                  primary: primary,
                  secondary,
                  layout,
                  borderPrimary: primaryBorder,
                  borderSecondary: secondaryBorder,
                  colorPrimary: primaryColor,
                  colorSecondary:
                    primaryColor === "#000000" || secondaryColor === "#000000"
                      ? "#ffffff"
                      : primaryColor === "#ffffff" || secondaryColor === "#ffffff"
                      ? "#000000"
                      : secondaryColor,
                  backgroundImage: ""
                },
                cookieOptions(3600 * 24 * 30)
              );
              setCookies("theme-type", { type: "custom" }, cookieOptions(3600 * 24 * 30));
              dispatch(setShowCustomThemeModal(false));
            }}
          >
            <span>{t("modal.theme.ch_b")}</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
