import { InputLabelButton } from "@jamalsoueidan/frontend.components.inputs.input-label-button";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import {
  AutoSelection,
  ButtonProps,
  Icon,
  LabelledProps,
  Listbox,
  Popover,
  Scrollable,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

import React, { useCallback, useId, useMemo, useState } from "react";

export interface InputAutoCompleteInput
  extends Partial<Pick<LabelledProps, "label" | "error" | "helpText">> {
  placeholder?: string;
  loading?: boolean;
  icon?: ButtonProps["icon"];
}

export interface InputAutoCompleteOption {
  label: string;
  value: string;
}

export interface InputAutoCompleteProps {
  options: InputAutoCompleteOption[];
  onSelect: (value: InputAutoCompleteOption | undefined) => void;
  onSearch: (value: string | null) => void;
  selectedOption: InputAutoCompleteOption | undefined;
  input?: InputAutoCompleteInput;
}

export const InputAutoComplete = ({
  options,
  onSelect,
  onSearch,
  selectedOption,
  input,
}: InputAutoCompleteProps) => {
  const { t } = useTranslation({ id: "input-auto-complete", locales });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onTextFieldChange = useCallback(
    (query: string) => {
      setQuery(query);

      if (query.length >= 2) {
        onSearch(query);
        return;
      }
      onSearch(null);
    },
    [onSearch],
  );

  const onTextFieldClear = useCallback(() => {
    onTextFieldChange("");
  }, [onTextFieldChange]);

  const showDropdown = useCallback(() => {
    setPickerOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setPickerOpen(false);
    onTextFieldChange("");
  }, [onTextFieldChange]);

  const handleOnSelect = useCallback(
    (value: string) => {
      const option = options.find((o) => o.value === value);
      onSelect(option);
      closeDropdown();
    },
    [closeDropdown, onSelect, options],
  );

  const id = useId();
  const listboxId = `${id}-input-auto-complete`;

  const activator = useMemo(
    () => (
      <InputLabelButton
        labelled={{
          error: input?.error,
          helpText: input?.helpText,
          label: input?.label || t("label"),
        }}
        button={{
          icon: input?.icon,
          loading: input?.loading,
          onClick: showDropdown,
        }}
      >
        {selectedOption?.label || t("label")}
      </InputLabelButton>
    ),
    [
      input?.error,
      input?.helpText,
      input?.label,
      input?.icon,
      input?.loading,
      t,
      showDropdown,
      selectedOption?.label,
    ],
  );

  const textFieldMarkup = useMemo(
    () => (
      <div style={{ padding: "12px" }}>
        <StopPropagation>
          <TextField
            focused
            clearButton
            labelHidden
            label={t("placeholder")}
            placeholder={t("placeholder")}
            autoComplete="off"
            value={query}
            prefix={<Icon source={SearchMinor} />}
            ariaActiveDescendant={selectedOption?.value?.toString()}
            ariaControls={listboxId}
            onChange={onTextFieldChange}
            onClearButtonClick={onTextFieldClear}
          />
        </StopPropagation>
      </div>
    ),
    [
      listboxId,
      onTextFieldChange,
      onTextFieldClear,
      query,
      selectedOption?.value,
      t,
    ],
  );

  const listMarkup = useMemo(
    () =>
      options?.map(({ label, value }) => {
        const isSelected = selectedOption?.value === value;

        return (
          <Listbox.Option
            key={value}
            value={value.toString()}
            selected={isSelected}
          >
            <Listbox.TextOption selected={isSelected}>
              {label}
            </Listbox.TextOption>
          </Listbox.Option>
        );
      }),
    [options, selectedOption?.value],
  );

  const loadingMarkup = useMemo(
    () => input?.loading && <Listbox.Loading accessibilityLabel="Loading" />,
    [input?.loading],
  );

  const emptyMarkup = useMemo(
    () =>
      options.length === 0 && (
        <Stack alignment="center" vertical>
          <Text variant="bodyMd" as="span" color="subdued">
            {t("not_found", { query })}
          </Text>
        </Stack>
      ),
    [options.length, query, t],
  );

  const markup = useMemo(
    () => (
      <Listbox
        enableKeyboardControl
        autoSelection={AutoSelection.None}
        accessibilityLabel="Search for and select a segment"
        customListId={listboxId}
        onSelect={handleOnSelect}
      >
        {listMarkup}
        {emptyMarkup}
        {loadingMarkup}
      </Listbox>
    ),
    [emptyMarkup, handleOnSelect, listMarkup, listboxId, loadingMarkup],
  );

  return (
    <Popover
      active={pickerOpen}
      activator={activator}
      ariaHaspopup="listbox"
      preferredAlignment="left"
      autofocusTarget="first-node"
      onClose={closeDropdown}
    >
      <Popover.Pane fixed>
        <div
          style={{
            alignItems: "stretch",
            borderTop: "1px solid #DFE3E8",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "stretch",
            overflow: "hidden",
            position: "relative",
            width: "100%",
          }}
        >
          {textFieldMarkup}

          <Scrollable
            shadow
            style={{
              borderBottomLeftRadius: "var(--p-border-radius-2)",
              borderBottomRightRadius: "var(--p-border-radius-2)",
              height: `calc(${options.length * 41}px + ${
                options.length === 0 ? 38 : 0
              }px)`,
              position: "relative",
              width: "310px",
            }}
          >
            {markup}
          </Scrollable>
        </div>
      </Popover.Pane>
    </Popover>
  );
};

const StopPropagation = ({ children }: React.PropsWithChildren<unknown>) => {
  const stopEventPropagation = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={stopEventPropagation} onTouchStart={stopEventPropagation}>
      {children}
    </div>
  );
};

const locales = {
  da: {
    label: "Vælge kunde",
    not_found: 'Intet fundet med søgord "{query}"',
    placeholder: "Indtast søgord...",
  },
  en: {
    label: "Choose customer",
    not_found: 'No segments found matching "{query}"',
    placeholder: "Enter keyword...",
  },
};
