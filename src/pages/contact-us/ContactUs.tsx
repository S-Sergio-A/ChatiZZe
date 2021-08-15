import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useRef, useState } from "react";
import { timer } from "rxjs";
import axios from "axios";
import useOutsideClick from "../../utils/hooks/useOutsideClick";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { clientLinks } from "../../utils/api-endpoints.enum";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import Head from "../../components/head/Head";
import { logError } from "../error/errorHandler";
import "./ContactUs.css";
import useDropdownNavigation from "../../utils/hooks/useDropdownNavigation";

const maxLength = 1200;
const options = ["choose", "careers", "support", "pr"];

export default function ContactUs() {
  const [showSubjects, setShowSubjects] = useState(false);
  const [cursor, setCursor] = useState(0);

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

  const dropdownRef = useRef<any>(null);
  const subjectButtonRef = useRef<any>(null);

  async function handleContact() {
    const data = {
      subject: contactForm.subject,
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      email: contactForm.email,
      message: contactForm.message
    };

    timer(50).subscribe(
      async () =>
        await axios
          .post(clientLinks.contactUs, data, {
            headers: {
              "Client-Token": cookies.accessToken,
              withCredentials: true
            }
          })
          .then((response) => {
            const { error } = response.data;

            if (error) {
              if (error.subject) {
                setContactFormError({
                  ...contactFormError,
                  subjectError: error.subject
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  subjectError: ""
                });
              }
              if (error.firstName) {
                setContactFormError({
                  ...contactFormError,
                  firstNameError: error.firstName
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  firstNameError: ""
                });
              }
              if (error.lastName) {
                setContactFormError({
                  ...contactFormError,
                  lastNameError: error.lastName
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  lastNameError: ""
                });
              }
              if (error.email) {
                setContactFormError({
                  ...contactFormError,
                  emailError: error.email
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  emailError: ""
                });
              }
              if (error.message) {
                setContactFormError({
                  ...contactFormError,
                  messageError: error.message
                });
              } else {
                setContactFormError({
                  ...contactFormError,
                  messageError: ""
                });
              }
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

  useDropdownNavigation({
    focused: showSubjects,
    list: options,
    cursor,
    setCursor,
    onEnterClick: () => {
      setContactForm({ ...contactForm, subject: `option.${options[cursor]}` });
      setShowSubjects(false);
    },
    deps: []
  });

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
            overlayPlacement="top"
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
            overlayPlacement="top"
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
            overlayPlacement="top"
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
        <Button onClick={handleContact} className="btn-pr dark btn-sm-x-w">
          <span>{t("contactUs.button")}</span>
        </Button>
      </section>
    </main>
  );
}
