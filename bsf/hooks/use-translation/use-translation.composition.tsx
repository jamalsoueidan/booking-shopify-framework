import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
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
  },
  en: {
    lang: "English",
  },
};

const InjectTranslation = () => {
  const { t } = useTranslation({
    id: "inject",
    locales,
  });

  return <div>{t("lang")}</div>;
};

export const BasicTranslation = () => (
  <ApplicationFramePage>
    <FilesTranslation />
    <br />
    <InjectTranslation />
  </ApplicationFramePage>
);
