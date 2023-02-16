import { faker } from "@faker-js/faker";
import { Tag, WidgetStaff } from "@jamalsoueidan/bsb.types";
import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Button, Card, Icon } from "@shopify/polaris";
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
      <Card title="Basic" sectioned>
        <InputDropdown
          options={options}
          error={field.error}
          onChange={field.onChange}
          selected={options.find((o) => o.value === field.value)}
        />
      </Card>
      <div>
        <pre>staffId: {field?.value}</pre>
      </div>
    </>
  );
});

export const Error = withApplication(() => {
  const field = useField<InputDropdownField>(undefined);
  useEffect(() => {
    field.setError("error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card title="Error" sectioned>
        <InputDropdown options={options} {...field} />
      </Card>
      <div>
        <pre>staffId: {field.value}</pre>
      </div>
    </>
  );
});

export const DisabledWithError = withApplication(() => {
  const field = useField<InputDropdownField>(undefined);
  const [staff, setStaff] = useState<Array<InputDropdownOption<string>>>([]);

  useEffect(() => {
    field.setError("fejl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card title="Disabled with error" sectioned>
        <InputDropdown
          options={staff}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
          {...field}
        />
      </Card>
      <br />
      <Button onClick={() => setStaff(options)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value}</pre>
      </div>
    </>
  );
});

export const LazyLoad = withApplication(() => {
  const field = useField<InputDropdownField>(undefined);
  const [staff, setStaff] = useState<Array<InputDropdownOption<string>>>([]);

  return (
    <>
      <Card title="LazyLoad" sectioned>
        <InputDropdown
          options={staff}
          input={{
            disabled: !staff || staff.length === 0,
            helpText: "klik på knap og vælge bruger",
          }}
          {...field}
        />
      </Card>
      <br />
      <Button onClick={() => setStaff(options)}>Load staff</Button>
      <div>
        <pre>staffId: {field.value}</pre>
      </div>
    </>
  );
});
