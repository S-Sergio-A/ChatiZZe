import React from "react";
import { useTranslation } from "react-i18next";
import { LoadingOverlay } from "../../components/overlay/LoadingOverlay";

export const LoadingFallback = () => {
  const [t] = useTranslation();

  return <LoadingOverlay active text={t("overlay.loading")} />;
};
