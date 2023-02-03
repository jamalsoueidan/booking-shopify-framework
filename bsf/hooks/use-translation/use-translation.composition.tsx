import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
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
    lang: "Dansk",
    option: {
      zero: "Ingen fundet",
      other: "{count} fundet",
    },
    details: "Besøg { link }",
    link: "Se console",
  },
  en: {
    lang: "English",
    option: {
      zero: "Nothing exists",
      other: "{count} found",
    },
    details: "See { link }",
    link: "See console",
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
      {tdynamic("option", { count: 0 })} - {tdynamic("option", { count: 1 })} - {tdynamic("option", { count: 10 })}
      <br />
      {tdynamic("details", { link: <Link onClick={console.log}>{t("link")}</Link> })}
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
