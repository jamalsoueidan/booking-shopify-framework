import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import {
  AlphaCard,
  Button,
  ButtonGroup,
  FormLayout,
  Icon,
  Inline,
  Select,
  Text,
} from "@shopify/polaris";
import { ClockMajor } from "@shopify/polaris-icons";
import { Field } from "@shopify/react-form";
import React, { memo, useCallback, useMemo } from "react";

export type ProductOptionsProps = {
  buffertime: Field<number | undefined>;
  duration: Field<number | undefined>;
};

export const ProductOptions = memo(
  ({ duration, buffertime }: ProductOptionsProps) => {
    const { t } = useTranslation({
      id: "collections-product-options",
      locales,
    });

    const options = useMemo(
      () => [
        { label: "0 min", value: "0" },
        { label: "5 min", value: "5" },
        { label: "10 min", value: "10" },
        { label: "15 min", value: "15" },
        { label: "20 min", value: "20" },
        { label: "25 min", value: "25" },
        { label: "30 min", value: "30" },
      ],
      [],
    );

    const selectLabel = useMemo(
      () => (
        <Inline gap="2">
          <Icon source={ClockMajor} />
          <Text as="span" variant="bodyMd">
            {t("buffertime.label")}
          </Text>
        </Inline>
      ),
      [t],
    );

    const onChangeSelect = useCallback(
      (value: string) => buffertime.onChange(parseInt(value, 10)),
      [buffertime],
    );

    const onChange = useCallback(
      (value: number) => () => duration.onChange(value),
      [duration],
    );

    return (
      <>
        <AlphaCard>
          <FormLayout>
            <Text variant="bodyMd" as="span" fontWeight="semibold">
              {t("duration.label")}
            </Text>
            <ButtonGroup segmented>
              <Button pressed={duration.value === 30} onClick={onChange(30)}>
                30 min
              </Button>
              <Button pressed={duration.value === 45} onClick={onChange(45)}>
                45 min
              </Button>
              <Button pressed={duration.value === 60} onClick={onChange(60)}>
                60 min
              </Button>
            </ButtonGroup>
          </FormLayout>
        </AlphaCard>
        <AlphaCard>
          <FormLayout>
            <Text variant="bodyMd" as="span" fontWeight="semibold">
              {t("duration.help")}
            </Text>
            <Select
              label={selectLabel}
              options={options}
              helpText={t("buffertime.help")}
              value={buffertime.value?.toString()}
              onChange={onChangeSelect}
            />
          </FormLayout>
        </AlphaCard>
      </>
    );
  },
);

const locales = {
  da: {
    buffertime: {
      help: "Pause tid mellem møderne",
      label: "Pausetid",
    },
    description: "Ændre indstillinger for dette product?",
    duration: {
      help: "Hvor længe kommer behandling til at tag tid?",
      label: "Behandlingstid",
    },
    title: "Indstillinger",
  },
  en: {
    buffertime: {
      help: "Free time between meetings",
      label: "Buffertime",
    },
    description: "Change options for this product?",
    duration: {
      help: "How long should your meeting last?",
      label: "Meeting duration",
    },
    title: "Settings",
  },
};
