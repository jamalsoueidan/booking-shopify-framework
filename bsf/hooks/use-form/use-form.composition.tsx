import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { SaveBarProvider } from "@jamalsoueidan/bsf.providers.save-bar";
import { TextField } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import { useForm } from "./use-form";

const Mock = () => {
  const { fields } = useForm({
    fields: {
      fullname: useField({
        value: "",
        validates: [],
      }),
    },
  });

  return <TextField label="Fullname" autoComplete="" {...fields?.fullname} />;
};

export const BasicuseForm = () => {
  return (
    <ApplicationFramePage title="useForm()">
      <SaveBarProvider>
        <Mock />
      </SaveBarProvider>
    </ApplicationFramePage>
  );
};
