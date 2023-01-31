import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { Avatar, Button, ButtonProps, Labelled, LabelledProps, Popover, ResourceList } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useId, useState } from "react";

export type InputStaffField = WidgetStaff | undefined | null;

export interface InputStaffInput extends Partial<Omit<ButtonProps, "children">>, Partial<LabelledProps> {
  placeholder?: string;
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

  const activator = field.value ? (
    <Button
      onClick={togglePopoverActive}
      size="slim"
      disclosure
      icon={<Avatar size="small" source={field.value.avatar} name={field.value.fullname} />}
      {...input}
    >
      {field.value?.fullname}
    </Button>
  ) : (
    <Button onClick={togglePopoverActive} disclosure disabled={!data || data.length === 0} {...input}>
      {input?.placeholder || t("placeholder")}
    </Button>
  );

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
    <Labelled
      id={`${id}-input-staff`}
      label={input?.label || t("label")}
      error={field.error}
      helpText={input?.helpText}
    >
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
