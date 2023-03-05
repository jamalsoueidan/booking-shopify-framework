import { InputButton } from "@jamalsoueidan/frontend.components.inputs.input-button";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import {
  ButtonProps,
  Labelled,
  LabelledProps,
  Popover,
  ResourceList,
} from "@shopify/polaris";
import React, { useCallback, useId, useMemo, useState } from "react";

export type InputDropdownField = string | undefined;
export interface InputDropdownInput
  extends Partial<Pick<LabelledProps, "label" | "helpText" | "labelHidden">> {
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: ButtonProps["icon"];
  size?: ButtonProps["size"];
}

export type InputDropdownOption<T> = {
  value: T;
  label: string;
  prefix: JSX.Element;
};

export interface InputDropdownProps<T> {
  options?: Array<InputDropdownOption<T>>;
  selected?: Partial<Pick<InputDropdownOption<T>, "label" | "prefix">>;
  onChange: (item: T) => void;
  error?: string;
  input?: InputDropdownInput;
}

export function InputDropdown<T>({
  options,
  selected,
  error,
  onChange,
  input,
}: InputDropdownProps<T>) {
  const id = useId();
  const { t } = useTranslation({ id: "input-dropdown", locales });
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleResourceListItemClick = useCallback(
    (item: T) => {
      onChange(item);
      setPopoverActive(false);
    },
    [onChange],
  );

  const internalRenderItem = useCallback(
    (item: InputDropdownOption<T>) => (
      <ResourceList.Item
        id={item.label}
        media={item?.prefix}
        onClick={() => handleResourceListItemClick(item.value)}
      >
        {item.label}
      </ResourceList.Item>
    ),
    [handleResourceListItemClick],
  );

  // if disabled, don't show error msg.
  const printError = !input?.disabled && error;

  const activator = useMemo(
    () => (
      <InputButton
        disabled={input?.disabled}
        disclosure
        error={printError}
        onClick={togglePopoverActive}
        size={input?.size || "slim"}
        loading={input?.loading}
        icon={input?.icon || selected?.prefix}
      >
        {selected?.label || input?.placeholder || t("placeholder")}
      </InputButton>
    ),
    [input, printError, togglePopoverActive, selected, t],
  );

  return (
    <Labelled
      id={`${id}input-dropdown`}
      error={printError}
      helpText={input?.helpText}
      label={input?.label || t("label")}
      labelHidden={input?.labelHidden}
    >
      <Popover
        sectioned
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
      >
        <Popover.Pane>
          <ResourceList items={options || []} renderItem={internalRenderItem} />
        </Popover.Pane>
      </Popover>
    </Labelled>
  );
}

const locales = {
  da: {
    label: "Vælg",
    placeholder: "Vælg",
  },
  en: {
    label: "Choose",
    placeholder: "Choose",
  },
};
