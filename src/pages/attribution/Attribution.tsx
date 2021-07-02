import React from 'react';
import { useTranslation } from 'react-i18next';
import { iconsAttributionList, photosAttributionList } from './attributionList';
import './Attribution.css';

export default function Attribution() {
  const [ t ] = useTranslation();

  return (
    <div className="Attr-Page Grid Nunito">
      <header className="B-T T-C flex J-C-C a-i-c f-f-c-n F-W">
        <h1 className="h3-size">
          {t('attribution.header')}
        </h1>
        <h2 className="h5-size">
          {t('attribution.main')}
          <a className="h6-size" href="mailto:sergiom33033@gmail.com">
            {' sergiom33033@gmail.com'}
          </a>
        </h2>
      </header>
      <div className="B-M flex J-C-C a-i-c f-f-c-n F-W">
        <section className="flex J-C-C a-i-c f-f-c-n F-W">
          <header className="T-C F-W">
            <h3>
              {t('icons')}
            </h3>
          </header>
          <ul className="flex a-i-c J-C-C f-f-c-n F-W">
            {iconsAttributionList.map((item, index) => (
              <li key={index} className="F-W T-L">
                <a href={item.link} title={item?.title}>
                  {item.author}
                </a>
              </li>
              )
            )}
          </ul>
        </section>
        <section className="flex J-C-C a-i-c f-f-c-n F-W">
          <header className="T-C F-W">
            <h3>
              {t('photos')}
            </h3>
          </header>
          <ul className="flex a-i-c J-C-C f-f-c-n F-W">
            {photosAttributionList.map((item, index) => (
              <li key={index} className="F-W T-L">
                <a href={item}>
                  {item}
                </a>
              </li>
              )
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
