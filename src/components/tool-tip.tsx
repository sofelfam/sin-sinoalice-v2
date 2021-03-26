import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from "react-dom";
import { css } from '@emotion/core';
import 'twin.macro';

interface tooltipProps {
  children?: React.ReactNode | undefined;
  element: JSX.Element | string;
}

const TooltipArrow: React.FCX = (props) => {
  return <div tw='transform -translate-x-2/4 border-solid' {...props}>{props.children}</div>
}

const ToolTipComponent = React.memo(({ element, overflow, ...rest }: { element: JSX.Element | string, overflow: boolean }) => {
  return (
    <>
      {overflow && <TooltipArrow css={css`width: max-content;border-width: 5px;border-color: transparent transparent rgba(0, 0, 0, 0.68) transparent;`} />}
      <div tw='w-max transform -translate-x-2/4 p-4 text-sm rounded text-white bg-transb-68 z-50' {...rest}>
        {element}
      </div>
      {!overflow && <TooltipArrow css={css`width: max-content;border-width: 5px;border-color: rgba(0, 0, 0, 0.68) transparent transparent transparent;`} />}
    </>
  );
});

const ToolTipPortal: React.FCX<{
  element: JSX.Element | string
  targetElement: HTMLElement;
}> = ({ element, targetElement }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState(false);
  const handleOverflow = useCallback((check: boolean) => {
    setOverflow(check);
  }, []);
  useEffect(() => {
    if (ref.current) {
      const anchorRect = targetElement.getBoundingClientRect();
      const tooltipsRect = ref.current.getBoundingClientRect();
      handleOverflow(anchorRect.top - tooltipsRect.height < 0);
      const position = {
        top: anchorRect.top - tooltipsRect.height + window.scrollY,
        bottom: anchorRect.top + anchorRect.height + window.scrollY,
        left: anchorRect.left + anchorRect.width / 2 + window.scrollX
      };
      ref.current.style.top = `${anchorRect.top - tooltipsRect.height < 0 ? position.bottom : position.top}px`;
      ref.current.style.left = `${position.left}px`;
      ref.current.style.position = `absolute`;
    }
  }, [targetElement]);

  return createPortal(
    <div ref={ref}>
      <ToolTipComponent element={element} overflow={overflow} />
    </div>,
    document.getElementById('portal') as Element
  );
};

const Tooltip = (props: tooltipProps) => {
  const { children, element, ...rest } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  const handleShow = useCallback((check: boolean) => {
    setShow(check);
  }, []);

  return (
    <>
      {(show && ref.current) && <ToolTipPortal element={element} targetElement={ref.current} />}
      <div
        tw='inline-block'
        onMouseEnter={() => handleShow(true)}
        onMouseLeave={() => handleShow(false)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

export default Tooltip;