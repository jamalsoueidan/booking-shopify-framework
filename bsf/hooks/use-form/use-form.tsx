import { useSaveBar } from "@jamalsoueidan/bsf.providers.save-bar";
import { Action } from "@shopify/polaris";
import {
  DynamicListBag,
  FieldBag,
  FormInput,
  FormWithDynamicLists,
  useForm as useShopifyForm,
} from "@shopify/react-form";
import { useEffect, useState } from "react";

interface FormReturn<T extends FieldBag, D extends DynamicListBag>
  extends Partial<FormWithDynamicLists<T, D>> {
  isSubmitted: boolean;
  isValid: boolean;
  primaryAction?: Action;
}

interface FormProps<T extends FieldBag, D extends DynamicListBag>
  extends FormInput<T, D> {
  enableSaveBar?: boolean;
}

export const useForm = <T extends FieldBag, D extends DynamicListBag>(
  form: FormProps<T, D>,
): FormReturn<T, D> => {
  const {
    updateSaveAction,
    updateDiscardAction,
    updateVisibility,
    saveAction: primaryAction,
  } = useSaveBar();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const customForm = useShopifyForm({
    ...form,
    makeCleanAfterSubmit: true,
    onSubmit: async (fieldValues) => {
      setIsSubmitted(true);
      setIsSubmitting(true);
      if (form.onSubmit) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await form.onSubmit(fieldValues as any);
        setIsSubmitting(false);
        return response;
      }
      return { status: "success" };
    },
  });

  useEffect(() => {
    updateSaveAction({ loading: false, onAction: () => customForm.submit() });
    updateDiscardAction({ onAction: () => customForm.reset() });

    return () => {
      updateVisibility(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isValidNew = isSubmitted && customForm.submitErrors.length === 0;
    if (isValidNew !== isValid) {
      setIsValid(isValidNew);
    }
  }, [isSubmitted, customForm.submitErrors, isValid]);

  useEffect(() => {
    updateVisibility(customForm.dirty);
  }, [customForm.dirty, updateVisibility]);

  useEffect(() => {
    updateSaveAction({ loading: isSubmitting });
  }, [isSubmitting, updateSaveAction]);

  return {
    isSubmitted,
    isValid,
    primaryAction,
    ...customForm,
  };
};
