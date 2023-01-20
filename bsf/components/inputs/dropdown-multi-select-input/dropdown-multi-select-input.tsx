import { Autocomplete, InlineError, Stack, Tag } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useEffect, useState } from "react";

export interface DropdownMultiSelectInputProps {
  field: Field<string[]>;
  label: string;
  placeholder?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

export const DropdownMultiSelectInput = ({
  field,
  label,
  placeholder,
  options: defaultOptions,
}: DropdownMultiSelectInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(defaultOptions);

  useEffect(() => {
    setOptions(defaultOptions);
    field.onChange([]);
  }, defaultOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === "") {
        setOptions(defaultOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = defaultOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [defaultOptions]
  );

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...field.value];
      options.splice(options.indexOf(tag), 1);
      field.onChange(options);
    },
    [field.value]
  );

  const verticalContentMarkup =
    field.value.length > 0 ? (
      <Stack spacing="extraTight" alignment="center">
        {field.value.map((option) => {
          let tagLabel = "";
          tagLabel = option.replace("_", " ");
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </Stack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      autoComplete="off"
      onChange={updateText}
      label={label}
      value={inputValue}
      placeholder={placeholder}
      verticalContent={verticalContentMarkup}
    />
  );

  return (
    <>
      <Autocomplete
        allowMultiple
        options={options}
        selected={field.value}
        textField={textField}
        onSelect={field.onChange}
      />
      <InlineError message={field.error || ""} fieldID={""} />
    </>
  );
};
