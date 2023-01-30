import { WidgetStaff } from "@jamalsoueidan/bsb.mongodb.types";
import { useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { Avatar, Button, ButtonProps, Popover, ResourceList } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { useCallback, useState } from "react";

export type InputStaffFieldType = WidgetStaff | undefined | null;
export interface InputStaffProps {
  data?: Array<WidgetStaff>;
  field: Field<InputStaffFieldType>;
  input?: Partial<ButtonProps>;
}

export function InputStaff({ data, field, input }: InputStaffProps) {
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
      fullWidth
      {...input}
    >
      {field.value?.fullname}
    </Button>
  ) : (
    <Button onClick={togglePopoverActive} disclosure disabled={!data || data.length === 0} fullWidth {...input}>
      {t("label")}
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
    <Popover sectioned active={popoverActive} activator={activator} onClose={togglePopoverActive} ariaHaspopup={false}>
      <Popover.Pane>
        <ResourceList items={data || []} renderItem={renderItem} />
      </Popover.Pane>
    </Popover>
  );
}

const locales = {
  da: {
    label: "Vælg medarbejder",
  },
  en: {
    label: "Choose staff",
  },
};
