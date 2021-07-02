export {}
// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Carousel } from 'react-bootstrap';
// import './About.css';
//
// export default function About() {
//   const [ t ] = useTranslation();
//   const { width } = useWindowDimensions();
//
//   return (
//     <div className="Page-About Grid">
//       <Head title={t('about.seo.title')} description={t('about.seo.description')}/>
//       <section className="B-T Grid">
//         <header className="flex J-C-C a-i-c T-C">
//           <h1>
//             {t('about.header')}
//           </h1>
//         </header>
//         {width > 1199 ? (
//           <ul className="I-L flex J-C-S-B a-i-c F-F-R-N">
//             <li>
//               <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
//                 imageName="about_1_xgbygc.jpg" alt=""
//               />
//             </li>
//             <li>
//               <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
//                 imageName="about_2_wngn5h.jpg" alt=""
//               />
//             </li>
//             <li>
//               <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
//                 imageName="about_3_yuunir.jpg" alt=""
//               />
//             </li>
//           </ul>
//         )
//           : (
//             <Carousel prevIcon={PrevIcon(t('button.prev'))} nextIcon={NextIcon(t('button.next'))} touch
//               interval={null} className="F-W" fade>
//               <Carousel.Item>
//                 <div className="flex a-i-c J-C-C">
//                   <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
//                     imageName="about_1_xgbygc.jpg" alt=""
//                   />
//                 </div>
//               </Carousel.Item>
//               <Carousel.Item>
//                 <div className="flex a-i-c J-C-C">
//                   <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
//                     imageName="about_2_wngn5h.jpg" alt=""
//                   />
//                 </div>
//               </Carousel.Item>
//               <Carousel.Item>
//                 <div className="flex a-i-c J-C-C">
//                   <CloudinaryImage imageWidth={300} imageHeight={380} folders="about"
//                     imageName="about_3_yuunir.jpg" alt=""
//                   />
//                 </div>
//               </Carousel.Item>
//             </Carousel>
//           )}
//       </section>
//       <section className="B-M Nunito flex J-C-C a-i-c">
//         <article className="Appeal flex J-C-C a-i-c f-f-c-n">
//           <p>
//             {t('about.appeal.firstPart')}
//           </p>
//           <p>
//             {t('about.appeal.secondPart')}
//           </p>
//           <p>
//             {t('about.appeal.thirdPart')}
//           </p>
//           <p>
//             {t('about.appeal.fourthPart')}
//           </p>
//           <p>
//             {t('about.appeal.fifthPart')}
//           </p>
//           <p>
//             {t('about.appeal.sixthPart')}
//           </p>
//         </article>
//       </section>
//       <section className="B-B Nunito flex J-C-C a-i-c f-f-c-n">
//         <header className="T-C">
//           <h1 className="Playfair">
//             {t('about.feedbacks.header')}
//           </h1>
//         </header>
//         <blockquote className="Quote Italic">
//           {t('about.feedbacks.first')}
//           <cite>{t('about.feedbacks.first.author')}</cite>
//         </blockquote>
//         <blockquote className="Quote Italic">
//           {t('about.feedbacks.second')}
//           <cite>{t('about.feedbacks.second.author')}</cite>
//         </blockquote>
//         <blockquote className="Quote Italic">
//           {t('about.feedbacks.third')}
//           <cite>{t('about.feedbacks.third.author')}</cite>
//         </blockquote>
//       </section>
//     </div>
//   );
// }
