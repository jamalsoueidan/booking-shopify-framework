import { AlphaCard, Box, Select, Text } from "@shopify/polaris";
import { Field } from "@shopify/react-form";
import React, { memo, useCallback, useMemo } from "react";

export interface ProductStatusProps {
  active: Field<boolean | undefined>;
  disabled?: boolean;
}

export const ProductStatus = memo(
  ({ active, disabled }: ProductStatusProps) => {
    const onChange = useCallback(
      (value: string) => {
        active.onChange(value === "true");
      },
      [active],
    );

    const options = useMemo(
      () => [
        {
          label: "Activate",
          value: "true",
        },
        {
          label: "Deactivate",
          value: "false",
        },
      ],
      [],
    );

    return (
      <AlphaCard>
        <Box paddingBlockEnd="4">
          <Text variant="bodyMd" as="h1" fontWeight="semibold">
            Product status
          </Text>
        </Box>
        <Select
          label=""
          options={options}
          onChange={onChange}
          value={active.value ? "true" : "false"}
          disabled={disabled}
          onBlur={active.onBlur}
        />
      </AlphaCard>
    );
  },
);
