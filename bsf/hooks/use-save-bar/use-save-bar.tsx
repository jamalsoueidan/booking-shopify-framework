import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import { SaveBarContext, SaveBarContextType } from "@jamalsoueidan/bsf.providers.save-bar";
import { useContext, useEffect } from "react";

const locales = {
  da: {
    discard: "Annullere",
    save: "Gem",
    unsaved: "Ikke-gemte ændringer",
  },
  en: {
    discard: "Discard",
    save: "Save",
    unsaved: "Unsaved changes",
  },
};

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
    const { form } = context;
    if (form) {
      context.setContextualSaveBar({
        discardAction: {
          content: t("discard"),
          onAction: () => form.reset && form.reset(),
        },
        message: t("unsaved"),
        saveAction: {
          content: t("save"),
          disabled: !form.dirty,
          loading: form.submitting,
          onAction: () => form.submit && form?.submit(),
        },
      });
    }
  }, [context, context.form, t]);

  useEffect(() => {
    context.setForm({ show });
  }, [context, show]);

  return {
    ...context,
  };
};
