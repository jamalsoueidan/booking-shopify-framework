import { WidgetStaff } from "@jamalsoueidan/bsb.types";
import { InputButton, useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { Avatar, ButtonProps, Labelled, LabelledProps, Popover, ResourceList } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useId, useMemo, useState } from "react";

export type InputStaffField = WidgetStaff | undefined | null;

export interface InputStaffInput extends Partial<Pick<LabelledProps, "label" | "helpText">> {
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: ButtonProps["icon"];
}

export interface InputStaffProps {
  data?: Array<WidgetStaff>;
  field: Field<InputStaffField>;
  input?: InputStaffInput;
}

export function InputStaff({ data, field, input }: InputStaffProps) {
  const id = useId();
  const { t } = useTranslation({ id: "input-staff", locales });
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) => !popoverActive), []);

  const handleResourceListItemClick = useCallback(
    (item: WidgetStaff) => {
      field.onChange(item);
      setPopoverActive(false);
    },
    [field],
  );

  // if disabled, don't show error msg.
  const error = input?.disabled ? undefined : field?.error;

  const activator = useMemo(() => {
    const icon = field.value ? (
      <Avatar size="small" source={field.value?.avatar} name={field.value?.fullname} />
    ) : undefined;

    return (
      <InputButton
        disabled={input?.disabled}
        disclosure
        error={error}
        icon={icon}
        onClick={togglePopoverActive}
        size={icon ? "slim" : "medium"}
      >
        {field.value?.fullname || input?.placeholder || t("placeholder")}
      </InputButton>
    );
  }, [error, field.value, input?.disabled, input?.placeholder, t, togglePopoverActive]);

  const renderItem = (item: WidgetStaff) => (
    <ResourceList.Item
      id={item.fullname}
      media={<Avatar size="small" source={item.avatar} name={item.fullname} />}
      onClick={() => handleResourceListItemClick(item)}
    >
      {item.fullname}
    </ResourceList.Item>
  );

  return (
    <Labelled id={`${id}input-staff`} error={error} helpText={input?.helpText} label={input?.label || t("label")}>
      <Popover
        sectioned
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
        ariaHaspopup={false}
      >
        <Popover.Pane>
          <ResourceList items={data || []} renderItem={renderItem} />
        </Popover.Pane>
      </Popover>
    </Labelled>
  );
}

const locales = {
  da: {
    label: "Vælg medarbejder",
    placeholder: "Vælg medarbejder",
  },
  en: {
    label: "Choose staff",
    placeholder: "Choose staff",
  },
};
