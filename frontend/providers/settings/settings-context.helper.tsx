import React, { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LinkComponent({ url, children, external, ...rest }: any) {
  const handleClick = useCallback(() => {
    // eslint-disable-next-line no-console
    throw new Error("implement your own linkComponent in SettingsProvider");
  }, []);

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
}

export const useNavigate = () => () => {
  if (typeof window === "undefined")
    throw new Error("cannot use native navigator outside of browser. ");
};
