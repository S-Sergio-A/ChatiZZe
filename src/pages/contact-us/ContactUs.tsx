import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useRef, useState } from "react";
import { timer } from "rxjs";
import axios from "axios";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { clientLinks } from "../../utils/api-endpoints.enum";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import Head from "../../components/head/Head";
import { logError } from "../error/errorHandler";
import "./ContactUs.css";

const maxLength = 1200;
const options = ["choose", "careers", "support", "pr"];

export default function ContactUs() {
  const [showSubjects, setShowSubjects] = useState(false);

  const [contactForm, setContactForm] = useState({
    subject: "option.choose",
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [contactFormError, setContactFormError] = useState({
    subjectError: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    messageError: ""
  });

  const [cookies] = useCookies([]);
  const [t] = useTranslation();

  const { width } = useWindowDimensions();

  const dropdownRef = useRef<any>(null);
  const subjectButtonRef = useRef<any>(null);

  async function handleContact() {
    const id = btoa("" + Date.now());

    let config: any, url: string;

    const data = {
      appealId: id,
      subject: contactForm.subject,
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      email: contactForm.email,
      message: contactForm.message
    };

    config = {
      headers: {
        "Client-Token": cookies.accessToken,
        withCredentials: true
      }
    };
    url = clientLinks.contactUs;

    timer(50).subscribe(
      async () =>
        await axios
          .post(url, data, config)
          .then((response) => {
            const { error } = response.data;

            if (error) {
  
            } else {
              setContactFormError({
                ...contactFormError,
                subjectError: "",
                firstNameError: "",
                lastNameError: "",
                emailError: "",
                messageError: ""
              });
              setContactForm({
                ...contactForm,
                subject: "",
                firstName: "",
                lastName: "",
                email: "",
                message: ""
              });
            }
          })
          .catch((error) => logError(error))
    );
  }

  useOutsideClick(dropdownRef, () => setShowSubjects(false), subjectButtonRef);

  return (
    <main id="main" className="contact-page grid">
      <Head title={t("contactUs.seo.title")} description={t("contactUs.seo.description")} />
      <header className="t-b flex j-c-c a-i-c f-f-c-n">
        <h1 className="t-c">{t("contactUs.header")}</h1>
        <a href="mailto:sales@chatizze.com" className="h6-s Secondary-Link">
          sales@chatizze.com
        </a>
      </header>
      <section className="m-b flex j-c-c a-i-c f-f-c-n">
        <form className="form f-w flex a-i-c j-c-c f-f-c-n" method="POST">
          <div className="subj flex a-i-c j-c-c f-f-c-n f-w">
            <label htmlFor="subject" className="h6-s form-l t-c">
              {t("label.subject")}
            </label>
            <Button onClick={() => setShowSubjects(!showSubjects)} className="subject btn-sec btn-sm-x-w" buttonRef={subjectButtonRef}>
              {t(`${contactForm.subject}`)}
            </Button>
            <Dropdown focused={showSubjects} setFocused={setShowSubjects} dropdownRef={dropdownRef}>
              <ul role="menu" className="flex j-c-f-s a-i-c f-f-c-n">
                {options.map((item: string, index: number) => (
                  <li key={index} className="f-w">
                    <Button
                      onClick={() => {
                        setContactForm({ ...contactForm, subject: `option.${item}` });
                        setShowSubjects(false);
                      }}
                      className="btn-ter btn-sm-x-w"
                    >
                      {t(`option.${item}`)}
                    </Button>
                  </li>
                ))}
              </ul>
            </Dropdown>
            <p className={contactFormError.subjectError ? "form-l-e it f-w flex" : "none"}>
              {contactFormError.subjectError ? contactFormError.subjectError : null}
            </p>
          </div>
          <Input
            errorIdentifier={contactFormError.firstNameError}
            labelText={t("label.firstName")}
            errorLabelText={contactFormError.firstNameError}
            inputId="firstName"
            name="firstName"
            onBlur={(event) =>
              setContactForm({
                ...contactForm,
                firstName: event.target.value
              })
            }
            required
            autoComplete="given-name"
            tooltipText={t("tooltip.name")}
            overlayPlacement={width < 1200 ? "bottom" : "right"}
          />
          <Input
            errorIdentifier={contactFormError.lastNameError}
            labelText={t("label.lastName")}
            errorLabelText={contactFormError.lastNameError}
            inputId="lastName"
            name="lastName"
            onBlur={(event) =>
              setContactForm({
                ...contactForm,
                lastName: event.target.value
              })
            }
            required
            autoComplete="family-name"
            tooltipText={t("tooltip.name")}
            overlayPlacement={width < 1200 ? "bottom" : "right"}
          />
          <Input
            errorIdentifier={contactFormError.emailError}
            labelText={t("label.email")}
            errorLabelText={contactFormError.emailError}
            inputId="email"
            name="email"
            onBlur={(event) =>
              setContactForm({
                ...contactForm,
                email: event.target.value
              })
            }
            required
            autoComplete="email"
            tooltipText={t("tooltip.email")}
            overlayPlacement={width < 1200 ? "bottom" : "right"}
          />
          <div className="ta-r">
            <label htmlFor="message" className="form-l a-s-f-s f-w h6-s" tabIndex={-1}>
              {t("label.message")}
            </label>
            <textarea
              id="message"
              className={`${contactFormError.messageError ? "i-e" : ""} ta f-w`}
              maxLength={maxLength}
              name="message"
              onBlur={(event) =>
                setContactForm({
                  ...contactForm,
                  message: event.target.value
                })
              }
              required
            />
          </div>
        </form>
        <Button
          onClick={handleContact}
          className="btn-pr dark btn-sm-x-w"
          disabled={!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.subject || !contactForm.message}
        >
          <span>{t("contactUs.button")}</span>
        </Button>
      </section>
    </main>
  );
}
