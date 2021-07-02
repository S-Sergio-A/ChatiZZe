import React, { useRef, useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { timer } from "rxjs";
// import question from "../../../assets/images/icons/question.svg";
import { Button } from "../button/Button";

interface InputTooltipProps {
  overlayPlacement: "top" | "bottom" | "right" | "left";
  tooltipId: string;
  tooltipText: string;
}

export const InputTooltip = ({ overlayPlacement = "bottom", tooltipId = "", tooltipText = "This is a tooltip" }: InputTooltipProps) => {
  const [show, setShow] = useState(false);
  const [swing, setSwing] = useState(false);
  const [t] = useTranslation();
  const target = useRef<any>(null);

  const PopoverC = React.forwardRef(({ popper, tooltipId, tooltipText, children, show, ...props }: any, ref: any) => {
    return (
      <Popover id={tooltipId} ref={ref} content {...props}>
        <Popover.Title as="h3">{tooltipId}</Popover.Title>
        <Popover.Content>
          {tooltipText}
          {children}
        </Popover.Content>
      </Popover>
    );
  });

  return (
    <React.Fragment>
      <OverlayTrigger
        trigger="click"
        placement={overlayPlacement}
        overlay={<PopoverC tooltipId={tooltipId} tooltipText={tooltipText} />}
        target={target.current}
        defaultShow={false}
        show={show}
      >
        <Button
          ariaLabel={t("button.tooltip")}
          className="Btn-P I-T Icon-Tooltip"
          onClick={() => setShow(!show)}
          onMouseEnter={() => {
            timer(100).subscribe(() => setSwing(true));
          }}
          onMouseLeave={() => {
            timer(600).subscribe(() => setSwing(false));
          }}
          type="button"
        >
          <img src="" alt="" className={`Icon ${swing ? "Rotation" : ""}`} />
        </Button>
      </OverlayTrigger>
    </React.Fragment>
  );
};
