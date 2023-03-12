import { faker } from "@faker-js/faker";
import { Tag } from "@jamalsoueidan/backend.types.tag";
import { WidgetStaff } from "@jamalsoueidan/backend.types.widget";
import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { AlphaCard, Button, Icon } from "@shopify/polaris";
import { DynamicSourceMajor, FavoriteMajor } from "@shopify/polaris-icons";
import { useField } from "@shopify/react-form";
import React, { useEffect, useState } from "react";
import {
  InputDropdown,
  InputDropdownField,
  InputDropdownOption,
} from "./input-dropdown";

const data: WidgetStaff[] = [
  {
    fullname: "jamal swueidan",
    staff: "63bb71c898f50e4f24c883a8",
    tag: Tag.all_day,
  },
  {
    fullname: "sara soueidan",
    staff: "63bb71e798f50e4f24c883b9",
    tag: Tag.middle_of_week,
  },
];
const options: Array<InputDropdownOption<string>> = data.map((d) => ({
  label: d.fullname,
  prefix: (
    <Icon
      source={faker.helpers.arrayElement([DynamicSourceMajor, FavoriteMajor])}
    />
  ),
  value: d.staff,
}));

export const Basic = withApplication(() => {
  const field = useField<InputDropdownField>(undefined);

  return (
    <>
      <AlphaCard>
        <InputDropdown
          options={options}
          error={field.error}
          onChange={field.onChange}
          selected={options.find((o) => o.value === field.value)}
        />
      </AlphaCard>
      <div>
        <pre>staffId: {field?.value}</pre>
      </div>
    </>
  );
});

export const Error = withApplication(
  () => {
    const field = useField<InputDropdownField>(undefined);
    useEffect(() => {
      field.setError("error");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <AlphaCard>
          <InputDropdown options={options} {...field} />
        </AlphaCard>
        <div>
          <pre>staffId: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Error" },
);

export const DisabledWithError = withApplication(
  () => {
    const field = useField<InputDropdownField>(undefined);
    const [staff, setStaff] = useState<Array<InputDropdownOption<string>>>([]);

    useEffect(() => {
      field.setError("fejl");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <AlphaCard>
          <InputDropdown
            options={staff}
            input={{
              disabled: !staff || staff.length === 0,
              helpText: "klik på knap og vælge bruger",
            }}
            {...field}
          />
        </AlphaCard>
        <br />
        <Button onClick={() => setStaff(options)}>Load staff</Button>
        <div>
          <pre>staffId: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Disabled with error" },
);

export const LazyLoad = withApplication(
  () => {
    const field = useField<InputDropdownField>(undefined);
    const [staff, setStaff] = useState<Array<InputDropdownOption<string>>>([]);

    return (
      <>
        <AlphaCard>
          <InputDropdown
            options={staff}
            input={{
              disabled: !staff || staff.length === 0,
              helpText: "klik på knap og vælge bruger",
            }}
            {...field}
          />
        </AlphaCard>
        <br />
        <Button onClick={() => setStaff(options)}>Load staff</Button>
        <div>
          <pre>staffId: {field.value}</pre>
        </div>
      </>
    );
  },
  { title: "Lazyload" },
);
