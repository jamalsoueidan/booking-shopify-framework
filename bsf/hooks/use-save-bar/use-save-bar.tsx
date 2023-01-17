import { useContext, useEffect } from "react";
import {
  SaveBarContextType,
  SaveBarContext,
} from "@jamalsoueidan/bsf.providers.save-bar";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";

const locales = [
  {
    save: "Gem",
    discard: "Annullere",
    unsaved: "Ikke-gemte ændringer",
  },
  {
    save: "Save",
    discard: "Discard",
    unsaved: "Unsaved changes",
  },
];

export interface UseSaveBarProps {
  show: boolean;
}

export const useSaveBar = ({ show }: UseSaveBarProps): SaveBarContextType => {
  const context = useContext<SaveBarContextType>(SaveBarContext);
  if (context === undefined) {
    throw new Error("useSaveBar must be used within a SaveBarProvider");
  }

  const { t } = useTranslation({ id: "use-save-bar", locales });

  useEffect(() => {
    const form = context.form;
    if (form) {
      context.setContextualSaveBar({
        saveAction: {
          content: t("save"),
          loading: form.submitting,
          disabled: !form.dirty,
          onAction: () => form.submit && form?.submit(),
        },
        discardAction: {
          content: t("discard"),
          onAction: () => form.reset && form.reset(),
        },
        message: t("unsaved"),
      });
    }
  }, [context.form]);

  useEffect(() => {
    context.setForm({ show });
  }, [show]);

  return {
    ...context,
  };
};
