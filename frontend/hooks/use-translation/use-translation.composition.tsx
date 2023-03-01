/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import { ApplicationFramePage } from "@jamalsoueidan/bit-dev.preview.application";
import { Link } from "@shopify/polaris";
import React from "react";
import da from "./translations/da.json";
import en from "./translations/en.json";
import { useTranslation } from "./use-translation";

const FilesTranslation = () => {
  const { t } = useTranslation({
    id: "file",
    locales: { da, en },
  });

  return <div>{t("all")}</div>;
};

const locales = {
  da: {
    details: "Besøg { link }",
    lang: "Dansk",
    link: "Se console",
    option: {
      other: "{count} fundet",
      zero: "Ingen fundet",
    },
  },
  en: {
    details: "See { link }",
    lang: "English",
    link: "See console",
    option: {
      other: "{count} found",
      zero: "Nothing exists",
    },
  },
};

const ExternalTranslation = () => {
  const { t, tdynamic } = useTranslation({
    id: "inject",
    locales,
  });

  return (
    <div>
      {t("lang")}
      <br />
      {tdynamic("option", { count: 0 })} - {tdynamic("option", { count: 1 })} -{" "}
      {tdynamic("option", { count: 10 })}
      <br />
      {tdynamic("details", {
        link: <Link onClick={console.log}>{t("link")}</Link>,
      })}
    </div>
  );
};

export const Basic = () => (
  <ApplicationFramePage>
    <FilesTranslation />
    <br />
    <ExternalTranslation />
  </ApplicationFramePage>
);
