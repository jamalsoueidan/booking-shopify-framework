import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { SaveBarProvider } from "@jamalsoueidan/frontend.providers.save-bar";
import { TextField } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import { useForm } from "./use-form";

const Mock = () => {
  const { fields } = useForm({
    fields: {
      fullname: useField({
        validates: [],
        value: "",
      }),
    },
  });

  return <TextField label="Fullname" autoComplete="" {...fields?.fullname} />;
};

export const Basic = withApplication(
  () => (
    <>
      <SaveBarProvider>
        <Mock />
      </SaveBarProvider>
    </>
  ),
  { title: "useForm" },
);
