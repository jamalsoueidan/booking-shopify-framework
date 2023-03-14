import React, { useCallback } from "react";
import { LinkComponentProps } from "./settings-context.types";

export const Navigate = () => (to: string, options?: { replace?: boolean }) =>
  // eslint-disable-next-line no-console
  console.log(to, options);

export const LinkComponent = ({
  url,
  children,
  external,
  ...rest
}: LinkComponentProps) => {
  const handleClick = useCallback(() => {
    // eslint-disable-next-line no-console
    throw new Error("implement your own linkComponent in SettingsProvider");
  }, []);

  if (url.length === 0) {
    return <>{children}</>;
  }

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a {...rest} href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <a {...rest} onClick={handleClick} role="alert">
      {children}
    </a>
  );
};
