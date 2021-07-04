import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import i18n from 'i18next';

interface HeadProps {
  cardCreatorTwitterAccount?: string;
  cardDescription?: string;
  cardTitle?: string;
  description: string;
  imgAlt?: string;
  imgHeight?: string;
  imgType?: string;
  imgUrl?: string;
  imgUrlSecure?: string;
  imgWidth?: string;
  ogType?: string;
  ogUrl?: string;
  siteTwitterAccount?: string;
  structuredDataJSON?: Record<string, unknown>;
  title: string;
  twitterCardType?: string;
}

export default function Head({
                               cardCreatorTwitterAccount = '',
                               description = '',
                               imgAlt = '',
                               imgHeight = '630',
                               imgType = 'JPG',
                               imgUrl = '',
                               imgUrlSecure = '',
                               imgWidth = '1200',
                               ogType = 'website',
                               ogUrl = '',
                               siteTwitterAccount = '',
                               structuredDataJSON = {},
                               title = '',
                               cardDescription = description,
                               cardTitle = title,
                               twitterCardType= 'summary_large_image'
                             }: HeadProps) {
  
  const [locale, setLocale] = useState('en_US');
  const [localeArray, setLocaleArray] = useState(['ru_RU', 'ua_UA']);
  
  useEffect(() => {
    switch (i18n.language) {
      case 'en':
        setLocale('en_US');
        setLocaleArray([...localeArray, 'ru_RU', 'ua_UA']);
        break;
      case 'ru':
        setLocale('ru_RU');
        setLocaleArray([...localeArray, 'en_US', 'ua_UA']);
        break;
      case 'ua':
        setLocale('ua_UA');
        setLocaleArray([...localeArray, 'en_US', 'ru_RU']);
        break;
      default:
        setLocale('en_US');
        setLocaleArray([...localeArray, 'ru_RU', 'ua_UA']);
        break;
    }
  }, []);
  
  return (
    <Helmet>
      <html lang={i18n.language}/>
      <title>
        {title}
      </title>
      <meta name="description" content={description}/>
      {/* ----------Open Graph---------- */}
      <meta property="og:title" content={cardTitle}/>
      <meta property="og:description" content={cardDescription}/>
      <meta property="og:site_name" content="Bakely"/>
      {/* Website, article, book, profile, video or music */}
      {ogType ? <meta property="og:type" content={ogType}/> : null}
      {ogUrl ? <meta property="og:url" content={ogUrl}/> : null}
      <meta property="og:determiner" content=""/>
      
      <meta property="og:locale" content={locale}/>
      <meta property="og:locale:alternate" content={localeArray[0]}/>
      <meta property="og:locale:alternate" content={localeArray[1]}/>
      
      {/* 1200x630 */}
      {imgUrl ? <meta property="og:image" content={imgUrl}/> : null}
      {imgUrlSecure ? <meta property="og:image:secure_url" content={imgUrlSecure}/> : null}
      {imgType ? <meta property="og:image:type" content={`image/${imgType}`}/> : null}
      {imgWidth ? <meta property="og:image:width" content={imgWidth}/> : null}
      {imgHeight ? <meta property="og:image:height" content={imgHeight}/> : null}
      {imgAlt ? <meta property="og:image:alt" content={imgAlt}/> : null}
      
      {/* ----------Twitter Cards---------- */}
      
      {/* summary, summary_large_image, player, app */}
      {twitterCardType ? <meta name="twitter:card" content={twitterCardType}/> : null}
      {siteTwitterAccount ? <meta name="twitter:site" content={siteTwitterAccount}/> : null}
      {cardCreatorTwitterAccount ? <meta name="twitter:creator" content={cardCreatorTwitterAccount}/> : null}
      {/* MAX: 70 chars */}
      <meta name="twitter:title" content={cardTitle}/>
      {/* MAX: 200 chars */}
      <meta name="twitter:description" content={cardDescription}/>
      {/* PNG, GIF, JPG, WEBP < 5MB | 1200x630 */}
      {imgUrl ? <meta name="twitter:image" content={imgUrl}/> : null}
      {/* MAX: 420 chars */}
      {imgAlt ? <meta name="twitter:image:alt" content={imgAlt}/> : null}
      
      {/* Structured Data */}
      {structuredDataJSON ? <script type="application/ld+json">{JSON.stringify(structuredDataJSON)}</script> : null}
    </Helmet>
  );
}
