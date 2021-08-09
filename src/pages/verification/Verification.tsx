import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import axios from "axios";
import { userLinks } from "../../utils/api-endpoints.enum";
import { cookieOptions } from "../../utils/cookieOptions";
import { setError } from "../../context/actions/error";
import { login } from "../../context/actions/auth";
import i18n from "../../utils/i18n/i18n";
import { logError } from "../error/errorHandler";
import "./Verification.css";

export default function Verification() {
  const [cookies, setCookies] = useCookies([]);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

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
        .then(({ data }) => {
          if (data.errors) {
            dispatch(setError(data.errors.message));
          }

          if (data.user) {
            const expTime = cookies["user-auth"].expTime;
            setCookies("user-data", data.user, cookieOptions(expTime > 1800 ? 3600 * 24 * 30 : expTime));
            dispatch(login(data.user));
          }

          history.push({
            pathname: `/${i18n.language}`
          });
        })
        .catch((error) => logError(error));
    }
  }, []);
  return <main id="main" className="verification-page" />;
}
