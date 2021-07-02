import React, { useEffect, useRef, useState } from 'react';
import './Checkbox.css';

interface CheckboxProps {
  className: string;
  onClick: Function;
}

const Checkbox = ({ className, onClick }: CheckboxProps) => {
  const [nativeFocused, setNativeFocused] = useState(false);
  const [checked, setChecked] = useState(false);
  const nativeCheckboxRef = useRef(null);

  function useCheckbox(checkboxRef:  React.MutableRefObject<any>) {
    useEffect(() => {
      function nativeWasChecked() {
        if (checkboxRef.current) {
          if (checkboxRef.current.focused) {
            setNativeFocused(true);
          } else {
            setNativeFocused(false);
          }
        }
      }

      document.addEventListener('focus', nativeWasChecked);
      return () => {
        document.removeEventListener('focus', nativeWasChecked);
      };
    }, [ checkboxRef ]);
  }

  useCheckbox(nativeCheckboxRef);

  const styledBoxStyles = {
    background: checked ? '#711604' : '',
    boxShadow: nativeFocused ? '0 0 0 3px pink' : '',
    WebkitBoxShadow: nativeFocused ? '0 0 0 3px pink' : '',
    MozBoxShadow: nativeFocused ? '0 0 0 3px pink' : '',
    OBoxShadow: nativeFocused ? '0 0 0 3px pink' : ''
  };

  return (
    <div className={`checkbox-c ${(className ? className : '')}`}>
      <input type="checkbox" className="h-checkbox" ref={nativeCheckboxRef}
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          onClick();
        }}
      />
      <div className="s-checkbox flex j-c-c a-i-c" style={styledBoxStyles} onClick={() => {
        setChecked(!checked);
        onClick();
      }}>
        <svg className="icon" style={checked ? { visibility: 'visible' } : { visibility: 'hidden' }} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
    </div>
  );
};

export default Checkbox;
