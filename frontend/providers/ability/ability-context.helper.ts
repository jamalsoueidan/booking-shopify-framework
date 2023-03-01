import { defineAbilityFor } from "./ability-context.define";

export const getAbilityFromToken = () => {
  const parse = parseJwt(localStorage.getItem("token") || "");
  return defineAbilityFor(parse);
};

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      // eslint-disable-next-line func-names
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}
