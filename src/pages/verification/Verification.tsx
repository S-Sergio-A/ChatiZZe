import { useHistory, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import { userLinks } from "../../utils/api-endpoints.enum";
import i18n from "../../utils/i18n/i18n";
import { logError } from "../error/errorHandler";
import "./Verification.css";

export default function Verification() {
  const [cookies] = useCookies([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const pathname = location.pathname.split("/");

    const verificationType = pathname[3];

    if (verificationType === "registration") {
      const email = pathname[4];
      const verificationCode = pathname[5];

      axios
        .post(
          userLinks.verifyRegistration(atob(email), atob(verificationCode)),
          {},
          {
            headers: {
              "Access-Token": cookies["accessToken"]?.accessToken,
              "Refresh-Token": cookies["refreshToken"]?.refreshToken
            }
          }
        )
        .then(() =>
          history.push({
            pathname: `/${i18n.language}/user/login`
          })
        )
        .catch((error) => logError(error));
    } else {
      const verificationCode = pathname[4];

      axios
        .post(
          userLinks.verifyChange(atob(verificationCode), verificationType),
          {},
          {
            headers: {
              "Access-Token": cookies["accessToken"]?.accessToken,
              "Refresh-Token": cookies["refreshToken"]?.refreshToken
            }
          }
        )
        .then(() =>
          history.push({
            pathname: `/${i18n.language}`
          })
        )
        .catch((error) => logError(error));
    }
  }, []);
  return <main id="main" className="verification-page" />;
}
