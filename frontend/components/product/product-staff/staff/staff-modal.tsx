import {
  ProductServiceGetAvailableStaffReturn,
  ProductServiceUpdateBodyStaffProperty,
} from "@jamalsoueidan/backend.types.product";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import { usePosition } from "@jamalsoueidan/frontend.hooks.use-position";
import { useTag } from "@jamalsoueidan/frontend.hooks.use-tag";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useProductStaff } from "@jamalsoueidan/frontend.state.product";
import { Modal, OptionList, Spinner, Text } from "@shopify/polaris";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormContext } from "./form-context";

export interface StaffModalProps {
  productId: string;
  show: boolean;
  close: () => void;
}

export const StaffModal = ({ show, close }: StaffModalProps) => {
  const { t } = useTranslation({
    id: "collection-staff-modal",
    locales: {
      da: {
        close: "Luk",
        done: "Færdig",
        title: "Medarbejder",
      },
      en: {
        close: "Close",
        done: "Done",
        title: "Staff",
      },
    },
  });

  const { data } = useProductStaff();
  const {
    field: { value, fields, addItem, removeItems },
  } = useContext(FormContext);
  const [selected, setSelected] = useState<
    Array<ProductServiceUpdateBodyStaffProperty>
  >([]);

  const toggle = useCallback(
    (value: ProductServiceUpdateBodyStaffProperty) => {
      // first we remove the selected Staff
      const newSelected = selected.filter((s) => s._id !== value._id);
      // then if tag is NOT null, we the selected staff
      if (value.tag) {
        newSelected.push(value);
      }
      setSelected(() => newSelected);
    },
    [selected, setSelected],
  );

  const didChange = useMemo(
    () => JSON.stringify(value) !== JSON.stringify(selected),
    [value, selected],
  );

  const submit = useCallback(() => {
    if (didChange) {
      removeItems(fields.map((_, index) => index));
      selected.forEach((s) => addItem(s));
    }
    close();
  }, [didChange, close, removeItems, fields, selected, addItem]);

  // onOpen update selected to correspond to the useForm
  useEffect(() => {
    setSelected(() => [...value]);
  }, [value]);

  const choices = useMemo(() => {
    if (!data) {
      return <></>;
    }

    const sorted = [...data].sort((a, b) => (a.fullname > b.fullname ? 1 : -1));
    return sorted.map((staff) => (
      <ChoiceStaff
        key={staff._id}
        staff={staff}
        toggle={toggle}
        selected={selected}
      />
    ));
  }, [data, selected, toggle]);

  return (
    <Modal
      open={show}
      onClose={close}
      title={t("title")}
      primaryAction={{
        content: t("done"),
        disabled: !didChange,
        onAction: submit,
      }}
      secondaryActions={[
        {
          content: t("close"),
          onAction: close,
        },
      ]}
    >
      <>
        {data?.length === 0 && (
          <Modal.Section>
            <Text variant="bodyLg" as="p">
              Ingen medarbejder har registeret arbejdstimer
            </Text>
          </Modal.Section>
        )}
        {!choices && (
          <Modal.Section>
            <div style={{ textAlign: "center" }}>
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
          </Modal.Section>
        )}
        {choices}
      </>
    </Modal>
  );
};

interface ChoiceStaffProps {
  staff: ProductServiceGetAvailableStaffReturn;
  selected: Array<ProductServiceUpdateBodyStaffProperty>;
  toggle: (value: ProductServiceUpdateBodyStaffProperty) => void;
}

const ChoiceStaff = ({ staff, selected, toggle }: ChoiceStaffProps) => {
  const { selectTagLabel } = useTag();
  const { selectPosition } = usePosition();

  const choices = useMemo(
    () =>
      [...staff.tags].sort().map((t) => ({
        label: selectTagLabel(t),
        value: t,
      })),
    [selectTagLabel, staff.tags],
  );

  const handleChange = useCallback(
    (value: Tag[]) => {
      const { tags, ...spreadStaff } = staff;
      toggle({ ...spreadStaff, tag: value[0] });
    },
    [toggle, staff],
  );

  const choiceSelected = selected
    .filter((s) => s._id === staff._id)
    .map((s) => s.tag);

  return (
    <OptionList
      title={`${staff.fullname}, ${selectPosition(staff.position)}`}
      options={choices}
      selected={choiceSelected}
      onChange={handleChange}
      allowMultiple
    />
  );
};
