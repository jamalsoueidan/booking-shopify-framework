import { ApplicationFramePage } from "@jamalsoueidan/bsd.preview.application";
import { Card, Icon } from "@shopify/polaris";
import { CustomerPlusMajor } from "@shopify/polaris-icons";
import { Field, useField } from "@shopify/react-form";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { InputAutoComplete, InputAutoCompleteOption } from "./input-auto-complete";
import mock from "./mock";

type CustomerAutoDompleteField = { customerId: number; fullName: string } | undefined;

interface CustomerAutoCompleteProps {
  field: Field<CustomerAutoDompleteField>;
}

const CustomerInputAutoComplete = ({ field }: CustomerAutoCompleteProps) => {
  const [value, setValue] = useState<string>("a");
  const [loading] = useState<boolean>(false);

  const options: Array<InputAutoCompleteOption> = useMemo(() => {
    const data =
      value.length > 2 ? mock?.filter((r) => r.firstName.indexOf(value) > -1 || r.lastName.indexOf(value) > -1) : mock;
    return data.map((r) => ({
      label: `${r.firstName} ${r.lastName}`,
      value: r.customerId.toString(),
    }));
  }, [value]);

  const onSelect = useCallback(
    (option: InputAutoCompleteOption | undefined) => {
      if (option) {
        field.onChange({
          customerId: parseInt(option.value.toString(), 10),
          fullName: option.label,
        });
      } else {
        field.onChange(undefined);
      }
    },
    [field],
  );

  const onSearch = useCallback((value: string | null) => {
    setValue(value || "a");
  }, []);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === field.value?.customerId?.toString()),
    [field.value?.customerId, options],
  );

  const icon = <Icon source={CustomerPlusMajor} color="critical" />;

  return (
    <InputAutoComplete
      options={options}
      onSelect={onSelect}
      onSearch={onSearch}
      selectedOption={selectedOption}
      input={{ error: field.error, icon, loading }}
    />
  );
};

export const BasicInputAutoComplete = () => {
  const field = useField<CustomerAutoDompleteField>(undefined);
  return (
    <ApplicationFramePage>
      <Card sectioned>
        <CustomerInputAutoComplete field={field} />
      </Card>
    </ApplicationFramePage>
  );
};

export const BasicInputAutoCompleteWithError = () => {
  const field = useField<CustomerAutoDompleteField>(undefined);

  useEffect(() => {
    field.setError("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApplicationFramePage>
      <Card sectioned>
        <CustomerInputAutoComplete field={field} />
      </Card>
    </ApplicationFramePage>
  );
};
