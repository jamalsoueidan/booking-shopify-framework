import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Card } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import { InputTags, InputTagsField } from "./input-tags";

export const Basic = withApplication(
  () => {
    const field = useField<InputTagsField>(undefined);
    return (
      <>
        <Card sectioned>
          <InputTags field={field} />
        </Card>
        <div>
          <pre>choice: {field.value}</pre>
        </div>
      </>
    );
  },
  { pageTitle: "Tag Input" },
);

export const BasicLabelHidden = withApplication(
  () => {
    const field = useField<InputTagsField>(undefined);
    return (
      <>
        <Card sectioned>
          <InputTags field={field} input={{ labelHidden: true }} />
        </Card>
        <div>
          <pre>choice: {field.value}</pre>
        </div>
      </>
    );
  },
  { pageTitle: "Tag Input" },
);
