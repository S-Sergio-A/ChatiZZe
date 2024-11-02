import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { timer } from "rxjs";
import { RootState } from "../../context/rootState.interface";
import "./Switch.css";

interface TripleSwitchProps {
  triple: boolean;
  labelFirst: any;
  labelSecond: any;
  labelThird: any;
  actionFirst: () => void;
  actionSecond: () => void;
  actionThird: () => void;
}

export default function TripleSwitch({ labelFirst, labelSecond, labelThird, actionFirst, actionSecond, actionThird }: TripleSwitchProps) {
  const [cookies] = useCookies<any>([]);

  const [firstRender, setFirstRender] = useState(true);
  // const [middleStateChanged, setMiddleStateChanged] = useState({ clicked: false, changed: false });

  const themeType = cookies["theme-type"]?.type;

  const firstRadioRef = useRef<any>(null);
  const secondRadioRef = useRef<any>(null);
  const thirdRadioRef = useRef<any>(null);
  const firstButtonRef = useRef<any>(null);
  const secondButtonRef = useRef<any>(null);
  const thirdButtonRef = useRef<any>(null);

  const pointerRef = useRef<any>(null);
  const switchRef = useRef<any>(null);

  const theme = useSelector((state: RootState) => state.theme.type);

  useEffect(() => {
    if (firstRender && firstRadioRef.current && secondRadioRef.current && thirdRadioRef.current && pointerRef.current) {
      if (themeType) {
        switch (themeType) {
          case "light":
            thirdRadioRef.current.checked = true;
            pointerRef.current.setAttribute("class", "pointer end-position");
            break;
          case "dark":
            firstRadioRef.current.checked = true;
            pointerRef.current.setAttribute("class", "pointer start-position");
            break;
          case "custom":
            secondRadioRef.current.checked = true;
            pointerRef.current.setAttribute("class", "pointer middle-position");
            break;
        }
      } else {
        thirdRadioRef.current.checked = true;
        pointerRef.current.setAttribute("class", "pointer end-position");
      }

      setFirstRender(false);
    }
  }, [firstRender, firstRadioRef, secondRadioRef, thirdRadioRef, pointerRef]);

  useEffect(() => {
    if (theme !== "custom" && pointerRef.current && pointerRef.current.classList.contains("middle")) {
      if (themeType === "light") {
        thirdRadioRef.current.checked = true;
        pointerRef.current.setAttribute("class", "pointer end-position");
      }
      if (themeType === "dark") {
        firstRadioRef.current.checked = true;
        pointerRef.current.setAttribute("class", "pointer start-position");
      }
    }
  }, [theme, pointerRef]);

  function onTripleSwitchClick(e: any) {
    if (
      firstRadioRef.current &&
      secondRadioRef.current &&
      thirdRadioRef.current &&
      pointerRef.current &&
      switchRef.current &&
      actionFirst &&
      actionSecond &&
      actionThird
    ) {
      const pointerPosition = pointerRef.current.getBoundingClientRect();
      const pointerX = pointerPosition.left;

      const switchPosition = switchRef.current.getBoundingClientRect();
      const switchX = switchPosition.left;

      if (
        firstButtonRef.current === document.activeElement ||
        secondButtonRef.current === document.activeElement ||
        thirdButtonRef.current === document.activeElement
      ) {
        if (firstButtonRef.current === document.activeElement) {
          firstRadioRef.current.checked = true;
          pointerRef.current.classList.add("start");
          actionFirst();
          timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer start-position"));
        } else if (secondButtonRef.current === document.activeElement) {
          secondRadioRef.current.checked = true;
          pointerRef.current.classList.add("middle");
          actionSecond();
          timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer middle-position"));
        } else if (thirdButtonRef.current === document.activeElement) {
          thirdRadioRef.current.checked = true;
          pointerRef.current.classList.add("end");
          actionThird();
          timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer end-position"));
        }
      } else {
        if (pointerX === switchX) {
          switch (true) {
            // anything less then 26px + 2px (pointer size + border)
            case e.clientX - switchX >= 38 && e.clientX - switchX <= 88:
              secondRadioRef.current.checked = true;
              pointerRef.current.classList.add("middle");
              actionSecond();
              timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer middle-position"));
              break;
            case e.clientX - switchX > 88:
              thirdRadioRef.current.checked = true;
              pointerRef.current.classList.add("end");
              actionThird();
              timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer end-position"));
              break;
            default:
              break;
          }
        } else if (pointerX >= switchX + 50 && pointerX < switchX + 100) {
          switch (true) {
            case e.clientX - switchX < 38:
              firstRadioRef.current.checked = true;
              pointerRef.current.classList.add("start");
              actionFirst();
              timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer start-position"));
              break;
            case e.clientX - switchX > 88:
              thirdRadioRef.current.checked = true;
              pointerRef.current.classList.add("end");
              actionThird();
              timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer end-position"));
              break;
            case e.clientX - switchX >= 38 && e.clientX - switchX <= 88:
              actionSecond();
              break;
            default:
              break;
          }
        } else if (pointerX === switchX + 100) {
          switch (true) {
            case e.clientX - switchX < 38:
              firstRadioRef.current.checked = true;
              pointerRef.current.classList.add("start");
              actionFirst();
              timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer start-position"));
              break;
            case e.clientX - switchX >= 38 && e.clientX - switchX <= 88:
              secondRadioRef.current.checked = true;
              pointerRef.current.classList.add("middle");
              actionSecond();
              timer(320).subscribe(() => pointerRef.current.setAttribute("class", "pointer middle-position"));
              break;
            default:
              break;
          }
        }
      }
    }
  }

  return (
    <div className="switch-container flex a-i-c j-c-c f-f-c-n">
      <div className="f-w flex a-i-c j-c-s-b" id="labels">
        <label className="state-label" id="first-label">
          {labelFirst}
        </label>
        <label className="state-label" id="second-label">
          {labelSecond}
        </label>
        <label className="state-label" id="third-label">
          {labelThird}
        </label>
      </div>

      <div className="tr-switch flex a-i-c j-c-s-b" role="switch" aria-labelledby="labels" onClick={onTripleSwitchClick} ref={switchRef}>
        <button className="switch-position" id="first" aria-labelledby="first-label" ref={firstButtonRef} />
        <button className="switch-position" id="second" aria-labelledby="second-label" ref={secondButtonRef} />
        <button className="switch-position" id="third" aria-labelledby="third-label" ref={thirdButtonRef} />
        <span className="pointer" ref={pointerRef} />
      </div>

      <input type="radio" name="switch" ref={firstRadioRef} />
      <input type="radio" name="switch" ref={secondRadioRef} />
      <input type="radio" name="switch" defaultChecked={true} ref={thirdRadioRef} />
    </div>
  );
}
