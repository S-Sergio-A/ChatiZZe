import React from 'react';
import { useTranslation } from 'react-i18next';
import cross from '../../../../assets/images/icons/cross.svg';
import { Button } from '../Button';
import './CloseButton.css';

interface CloseButtonProps {
  ariaLabel: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CloseButton({ ariaLabel, onClick }: CloseButtonProps) {
  const [t] = useTranslation();

  return (
    <Button ariaLabel={ariaLabel} onClick={onClick} type="button" className="btn-e btn-c">
      <img src={cross} alt="" />
    </Button>
  );
}
