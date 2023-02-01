import { InputLabelButton } from "@jamalsoueidan/bsf.components.inputs.input-label-button";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import {
  AutoSelection,
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

import React, { useState } from "react";

export interface InputAutoCompleteInput extends Partial<Pick<LabelledProps, "label" | "error" | "helpText">> {
  placeholder?: string;
  loading?: boolean;
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

export const InputAutoComplete = ({ options, onSelect, onSearch, selectedOption, input }: InputAutoCompleteProps) => {
  const { t } = useTranslation({ id: "input-auto-complete", locales });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleQueryChange = (query: string) => {
    setQuery(query);

    if (query.length >= 2) {
      onSearch(query);
      return;
    }
    onSearch(null);
  };

  const handleQueryClear = () => {
    handleQueryChange("");
  };

  const handleOpenPicker = () => {
    setPickerOpen(true);
  };

  const handleClosePicker = () => {
    setPickerOpen(false);
    handleQueryChange("");
  };

  const handleOnSelect = (value: string) => {
    const option = options.find((o) => o.value === value);
    onSelect(option);
    handleClosePicker();
  };

  const listboxId = "SearchableListboxInPopover";

  const activator = (
    <InputLabelButton
      label={input?.label || t("label")}
      error={input?.error}
      onClick={handleOpenPicker}
      loading={input?.loading}
    >
      {selectedOption?.label || t("label")}
    </InputLabelButton>
  );

  const textFieldMarkup = (
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
          onChange={handleQueryChange}
          onClearButtonClick={handleQueryClear}
        />
      </StopPropagation>
    </div>
  );

  const segmentList = options?.map(({ label, value }) => {
    const isSelected = selectedOption?.value === value;

    return (
      <Listbox.Option key={value} value={value.toString()} selected={isSelected}>
        <Listbox.TextOption selected={isSelected}>{label}</Listbox.TextOption>
      </Listbox.Option>
    );
  });

  const lazyLoadingMarkup = input?.loading ? <Listbox.Loading accessibilityLabel="Loading" /> : null;

  const noResultsMarkup =
    options.length === 0 ? (
      <Stack alignment="center" vertical>
        <Text variant="bodyMd" as="span" color="subdued">
          {t("not_found", { query })}
        </Text>
      </Stack>
    ) : null;

  const listboxMarkup = (
    <Listbox
      enableKeyboardControl
      autoSelection={AutoSelection.None}
      accessibilityLabel="Search for and select a segment"
      customListId={listboxId}
      onSelect={handleOnSelect}
    >
      {segmentList}
      {noResultsMarkup}
      {lazyLoadingMarkup}
    </Listbox>
  );

  return (
    <Popover
      active={pickerOpen}
      activator={activator}
      ariaHaspopup="listbox"
      preferredAlignment="left"
      autofocusTarget="first-node"
      onClose={handleClosePicker}
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
              height: `calc(${options.length * 41}px + ${options.length === 0 ? 38 : 0}px)`,
              position: "relative",
              width: "310px",
            }}
          >
            {listboxMarkup}
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
