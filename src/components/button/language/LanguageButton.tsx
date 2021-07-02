import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
// import world from '../../../../assets/images/icons/world.svg';
// import enFlag from '../../../../assets/images/icons/en.svg';
// import ruFlag from '../../../../assets/images/icons/ru.svg';
// import uaFlag from '../../../../assets/images/icons/ua.svg';
import { logError } from '../../../pages/error/errorHandler';
import { Button } from '../Button';
import './LanguageButton.css';

export default function LanguageButton() {
  const [toggle, setToggle] = useState(false);
  const [clicksCount, setClicksCount] = useState(0);
  const [t] = useTranslation();
  const toggleRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const history = useHistory();

  const languages = ['en', 'ru', 'ua'];

  const setLanguageCookie = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target;

    if (target.toString().match('button img')) {
      // @ts-ignore
      let language = target.parentElement.getAttribute('data-lang');

      changeLanguage(language);
    } else if (target.toString().match('button')) {
      // @ts-ignore
      let language = target.getAttribute('data-lang');

      changeLanguage(language);
    }
  };

  const changeLanguage = (lng: string) => {
    const pathname = location.pathname.split('/');

    pathname[1] = lng;
    i18n.changeLanguage(lng).catch((error) => logError(error));

    history.push({ pathname: pathname.join('/') });
  };

  function useToggleListener(refOfMenu: React.MutableRefObject<any>, refOfToggle: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          refOfMenu.current &&
          !(refOfMenu.current.contains(event.target) || (refOfToggle.current && refOfToggle.current.contains(event.target)))
        ) {
          setClicksCount(0);
          setToggle(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [refOfMenu, refOfToggle]);
  }

  useToggleListener(menuRef, toggleRef);

  return (
    <React.Fragment>
      <Button
        className="btn-i-l btn-i d-t"
        type="button"
        onClick={() => {
          if (clicksCount !== 0) {
            setToggle(!(clicksCount % 2));
          } else {
            setToggle(true);
          }
          setClicksCount(clicksCount + 1);
        }}
        buttonRef={toggleRef}
        ariaLabel={t('navbar.ariaLabel.langButton')}
      >
        <img src="http://localhost:3000/icons/world.svg" alt="" className="icon" />
      </Button>

      <div className={`d-m ${toggle ? 'flex j-c-c a-i-c f-f-c-n' : 'none'}`} ref={menuRef}>
        {languages.map((item, index) => {
          let flag;

          switch (item) {
            case 'en':
              flag = "http://localhost:3000/icons/en.svg";
              break;
            case 'ru':
              flag = "http://localhost:3000/icons/ru.svg";
              break;
            case 'ua':
              flag = "http://localhost:3000/icons/ua.svg";
              break;
            default:
              flag = "http://localhost:3000/icons/en.svg";
              break;
          }

          return (
            <button
              key={index}
              className="d-i flex j-c-c a-i-c btn-s btn-i-d"
              type="button"
              data-lang={item}
              onClick={(event) => setLanguageCookie(event)}
              aria-label={t(`navbar.ariaLabel.langButton.${item}`)}
            >
              <img src={flag} alt="" className="icon-flag" />
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
}
