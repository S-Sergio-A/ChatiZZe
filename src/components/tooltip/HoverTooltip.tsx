export {};
// import React, { useContext } from 'react';
// import { useTranslation } from 'react-i18next';
// import curveArrow from '../../../assets/images/icons/curve-arrow.svg';
// import { ToastContext } from '../../context/toast/ToastContext';
// import useWindowDimensions from '../../utils/useWindowDimensions';
// import { useTouchDevice } from '../../utils/useTouchDevice';
// import './Tooltip.css';
//
// export const HoverTooltip = () => {
//   const { showCookie } = useContext(ToastContext);
//   const { width } = useWindowDimensions();
//   const { isTouchDevice } = useTouchDevice();
//   const [ t ] = useTranslation();
//
//   return (
//     <React.Fragment>
//       {(toast.hoverTipShow && width > 768) ? (
//         <div className="Hover-Tooltip flex J-C-C a-i-c f-f-c-n" style={{ top: toast.tipTop }}>
//           <img src={curveArrow} alt="" className="Image-100-50"/>
//           <p>
//             {isTouchDevice ? t('hover') : t('click')}
//           </p>
//         </div>
//         )
//         :
//         null}
//     </React.Fragment>
//   );
// };
