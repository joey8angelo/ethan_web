import React, {
  useState,
  useRef,
  cloneElement,
  type ReactElement,
} from "react";

import styles from "./HoverToggle.module.css";

interface HoverToggleProps {
  secondary: React.ReactElement<{ style?: React.CSSProperties }>;
  showDelay?: number;
  hideDelay?: number;
  onToggle?: (isVisible: boolean) => void;
  children?: React.ReactElement;
  className?: string;
}

function cloneElementWithStyles(
  element: ReactElement<{ style?: React.CSSProperties }>,
  additionalProps: {
    style?: React.CSSProperties;
    [key: string]: unknown;
  },
): ReactElement {
  const existingStyle = element.props.style || {};
  const newProps = {
    ...element.props,
    ...additionalProps,
    style: {
      ...existingStyle,
      ...additionalProps.style,
    },
  };
  return cloneElement(element, newProps);
}

export default function HoverToggle({
  secondary,
  showDelay = 0,
  hideDelay = 0,
  onToggle = () => {},
  children,
  className,
}: HoverToggleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      onToggle(true);
    }, showDelay);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      onToggle(false);
    }, hideDelay);
  };

  React.useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const existingStyle =
    (secondary.props as React.HTMLAttributes<HTMLElement>).style || {};

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.hoverToggleContainer} ${className || ""}`}
    >
      {children}
      {cloneElementWithStyles(secondary, {
        style: {
          ...existingStyle,
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? "visible" : "hidden",
          pointerEvents: isVisible ? "auto" : "none",
          transition:
            "opacity 0.2s ease, visibility 0.2s ease, pointer-events 0.2s ease",
        },
      })}
    </div>
  );
}
