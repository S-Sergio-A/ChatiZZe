import React, { ChangeEvent, useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { timer } from "rxjs";
import axios from "axios";
import { logError } from "../error/errorHandler";
import "./ContactUs.css";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { ModalContext } from "../../context/modal/ModalContext";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/textarea/Textarea";
import { AuthContext } from "../../context/auth/AuthContext";
import { ErrorContext } from "../../context/error/ErrorContext";
import { clientLinks, userLinks } from "../../utils/api-endpoints.enum";
import { useCookies } from "react-cookie";
import Head from '../../components/head/Head';
import { Form } from '../../components/form/Form';

const phones = [
  {
    phone: "49 (045) 2478-9856",
    header: "contactUs.label.Europe"
  },
  {
    phone: "1 (888) 234-4985",
    header: "contactUs.label.America"
  },
  {
    phone: "852 (28) 349-810",
    header: "contactUs.label.Asia"
  },
  {
    phone: "61 (491) 599-153",
    header: "contactUs.label.AsiaPacific"
  }
];

const maxLength = 1200;

export default function ContactUs() {
  const [contactForm, setContactForm] = useState({
    subject: "contactUs.option.choose",
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
  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);
  const [animate, setAnimate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userCookie] = useCookies(["user"]);
  const [clientCookie] = useCookies(["client"]);
  const [t] = useTranslation();
  const { show, showModal } = useContext(ModalContext);
  const { showErrorModal } = useContext(ErrorContext);
  const { width } = useWindowDimensions();
  const { logged } = useContext(AuthContext);
  
  function subjectOnChange(event: ChangeEvent<HTMLInputElement>) {
    setContactForm({
      ...contactForm,
      subject: event.target.value
    });
  }
  
  function firstNameOnChange(event: ChangeEvent<HTMLInputElement>) {
    setContactForm({
      ...contactForm,
      firstName: event.target.value
    });
  }
  
  function lastNameOnChange(event: ChangeEvent<HTMLInputElement>) {
    setContactForm({
      ...contactForm,
      lastName: event.target.value
    });
  }
  
  function emailOnChange(event: ChangeEvent<HTMLInputElement>) {
    setContactForm({
      ...contactForm,
      email: event.target.value
    });
  }
  
  function messageOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setContactForm({
      ...contactForm,
      message: event.target.value
    });
  
    setRemainingCharacters(maxLength - event.target.value.length);
  }
  
  function subjectOnBlur() {
    setContactFormError({
      ...contactFormError,
      subjectError: ''
    });
  
    // validateEmail()
  }
  
  function firstNameOnBlur() {
    setContactFormError({
      ...contactFormError,
      firstNameError: ''
    });
  
    // validateEmail()
  }
  
  function lastNameOnBlur() {
    setContactFormError({
      ...contactFormError,
      lastNameError: ''
    });
  
    // validateEmail()
  }
  
  function emailOnBlur() {
    setContactFormError({
      ...contactFormError,
      emailError: ''
    });
  
    // validateEmail()
  }
  
  function messageOnBlur() {
    setContactFormError({
      ...contactFormError,
      messageError: ''
    });
  
    // validateEmail()
  }

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

    if (logged) {
      config = {
        headers: {
          Token: userCookie.accessToken,
          "Refresh-Token": userCookie.refreshToken,
          withCredentials: true
        }
      };
      url = userLinks.contactUs;
    } else {
      config = {
        headers: {
          "Client-Token": clientCookie.accessToken,
          withCredentials: true
        }
      };
      url = clientLinks.contactUs;
    }

    timer(50).subscribe(
      async () =>
        await axios
          .post(url, data, config)
          .then((response) => {
            const { errors } = response.data;

            if (errors) {
              const errors = response.data.errors;

              if (errors.code === 500) {
                showErrorModal(500);
              }
            } else {
              setSuccess(true);
              timer(400).subscribe(() => setSuccess(false));
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
              setRemainingCharacters(maxLength);
            }
          })
          .catch((error) => logError(error))
    );
  }

  const doubleRow = (
    <React.Fragment>
      <div className="Form-R Grid C-F">
        <Input
          errorIdentifier={contactFormError.firstNameError}
          labelText={t("label.firstName")}
          errorLabelText={contactFormError.firstNameError}
          inputId="firstName"
          name="firstName"
          onBlur={firstNameOnBlur}
          onChange={firstNameOnChange}
          required={true}
          autoComplete="given-name"
          tooltipText={t("tooltip.name")}
          value={contactForm.firstName}
          overlayPlacement={width < 769 ? "bottom" : "right"}
        />
      </div>
      <div className="Form-R Grid C-S">
        <Input
          errorIdentifier={contactFormError.lastNameError}
          labelText={t("label.lastName")}
          errorLabelText={contactFormError.lastNameError}
          inputId="lastName"
          name="lastName"
          onBlur={lastNameOnBlur}
          onChange={lastNameOnChange}
          required={true}
          autoComplete="family-name"
          tooltipText={t("tooltip.name")}
          value={contactForm.lastName}
          overlayPlacement={width < 769 ? "bottom" : "right"}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="Contact-Page Grid Nunito">
      <Head title={t("contactUs.seo.title")} description={t("contactUs.seo.description")} />
      <section className="F-C Grid">
        <section className="B-T flex J-C-C a-i-c Playfair T-C">
          <header className="F-W">
            <h1>{t("contactUs.header")}</h1>
          </header>
        </section>
        <section className="B-M flex J-C-C a-i-c f-f-c-n">
          <Form success={success}>
            <div className="Form-R Grid F-W">
              <label htmlFor="subject" className="h6-size Form-L flex J-C-C A-I-F-S f-f-c-n">
                {t("label.subject")}
              </label>
              {/*<Dropdown onSelect={(eventKey) => setContactForm({ ...contactForm, subject: eventKey })}>*/}
              {/*  <Dropdown.Toggle variant={null} id="subject" className="F-W Form-Sel Sel-Tel-C h6-size Btn-S tel">*/}
              {/*    {t(`${contactForm.subject}`)}*/}
              {/*  </Dropdown.Toggle>*/}
              {/*  <Dropdown.Menu className="F-W S-M Flex F-F-C-N" flip={false}>*/}
              {/*    <Dropdown.Item eventKey={t("contactUs.option.catering")} className="T-C">*/}
              {/*      {t("contactUs.option.catering")}*/}
              {/*    </Dropdown.Item>*/}
              {/*    <Dropdown.Item eventKey={t("contactUs.option.careers")} className="T-C">*/}
              {/*      {t("contactUs.option.careers")}*/}
              {/*    </Dropdown.Item>*/}
              {/*    <Dropdown.Item eventKey={t("contactUs.option.marketingAndPR")} className="T-C">*/}
              {/*      {t("contactUs.option.marketingAndPR")}*/}
              {/*    </Dropdown.Item>*/}
              {/*    <Dropdown.Item eventKey={t("contactUs.option.productInfo")} className="T-C">*/}
              {/*      {t("contactUs.option.productInfo")}*/}
              {/*    </Dropdown.Item>*/}
              {/*    <Dropdown.Item eventKey={t("contactUs.option.support")} className="T-C">*/}
              {/*      {t("contactUs.option.support")}*/}
              {/*    </Dropdown.Item>*/}
              {/*  </Dropdown.Menu>*/}
              {/*</Dropdown>*/}
              <p className={contactFormError.subjectError ? "Form-L-E Italic F-W flex" : "None"}>
                {contactFormError.subjectError ? contactFormError.subjectError : null}
              </p>
            </div>
            {width > 480 ? <div className="Form-R-D">{doubleRow}</div> : <React.Fragment>{doubleRow}</React.Fragment>}
            <div className="Form-R Grid">
              <Input
                errorIdentifier={contactFormError.emailError}
                labelText={t("label.email")}
                errorLabelText={contactFormError.emailError}
                inputId="email"
                name="email"
                onBlur={emailOnChange}
                onChange={emailOnBlur}
                required={true}
                autoComplete="email"
                tooltipText={t("tooltip.email")}
                value={contactForm.email}
                overlayPlacement={width < 769 ? "bottom" : "right"}
              />
            </div>
            <div className="Form-Ta-R">
              <Textarea
                errorIdentifier={contactFormError.messageError}
                errorLabelText={contactFormError.messageError}
                labelText={t("label.message")}
                id="message"
                name="message"
                onBlur={messageOnBlur}
                onChange={messageOnChange}
                required={true}
                value={contactForm.message}
                textareaLimit={maxLength}
              />
              <p>
                {t("remaining.characters")} {remainingCharacters}
              </p>
            </div>
          </Form>
          <Button
            onClick={handleContact}
            disabled={!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.subject || !contactForm.message}
          >
            {t("contactUs.button")}
          </Button>
        </section>
      </section>
      <section className="S-C Grid" style={{ background: `url(// TODO)` }}>
        <section className="B-T flex J-C-C A-I-F-S f-f-c-n">
          <header className="T-C flex J-C-C A-I-F-S f-f-c-n F-W F-H">
            <h2 className="h3-size">{t("contactUs.header.addresses")}</h2>
            <a href="mailto:sales@bakely.com" className="h6-size Secondary-Link">
              sales@bakely.com
            </a>
          </header>
        </section>
        <section className="B-M Grid">
          <ul className="Phones Grid">
            {phones.map((item, index) => (
              <li className="Cell flex A-I-F-S J-C-F-S f-f-c-n" key={index}>
                <h3 className="T-L F-W h5-size">{t(item.header)}</h3>
                <a id="Europe" className="T-L PhoneNum F-W Secondary-Link" href={`tel:${item.phone}`}>
                  +{item.phone}
                </a>
              </li>
            ))}
          </ul>
          <section className="Locations Grid">
            <header className="F-W F-H">
              <h2 className="h3-size">{t("contactUs.header.locations")}</h2>
            </header>
            <div className="Addresses Grid">
              <div className="Cell flex A-I-F-S J-C-F-S f-f-c-n">
                <h3 className="F-W h4-size T-L">{t("contactUs.location.Kyiv.city")}</h3>
                <p className="h6-size F-W T-L">{t("contactUs.location.Kyiv")}.</p>
              </div>
              <div className="Cell flex A-I-F-S J-C-F-S f-f-c-n">
                <h3 className="F-W h4-size T-L">{t("contactUs.location.Kharkov.city")}</h3>
                <p className="h6-size F-W T-L">{t("contactUs.location.Kharkov")}.</p>
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
