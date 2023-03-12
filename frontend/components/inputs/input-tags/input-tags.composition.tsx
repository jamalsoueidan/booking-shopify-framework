import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputTags, InputTagsField } from "./input-tags";

export const Basic = withApplication(
  () => {
    const field = useField<InputTagsField>(undefined);
    return (
      <>
        <AlphaCard>
          <InputTags field={field} />
        </AlphaCard>
        <div>
          <pre>choice: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Tag Input" },
);

export const BasicLabelHidden = withApplication(
  () => {
    const field = useField<InputTagsField>(undefined);
    return (
      <>
        <AlphaCard>
          <InputTags field={field} input={{ labelHidden: true }} />
        </AlphaCard>
        <div>
          <pre>choice: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Tag Input" },
);
