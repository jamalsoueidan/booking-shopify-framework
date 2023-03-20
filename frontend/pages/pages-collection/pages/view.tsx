import { ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/backend.types.product";
import { FormErrors } from "@jamalsoueidan/frontend.components.form-errors";
import { LoadingPage } from "@jamalsoueidan/frontend.components.loading.loading-page";
import { ProductNotification } from "@jamalsoueidan/frontend.components.product.product-notification";
import { ProductOptions } from "@jamalsoueidan/frontend.components.product.product-options";
import { ProductStaff } from "@jamalsoueidan/frontend.components.product.product-staff";
import { ProductStatus } from "@jamalsoueidan/frontend.components.product.product-status";
import { useForm } from "@jamalsoueidan/frontend.hooks.use-form";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import {
  useProductGet,
  useProductUpdate,
} from "@jamalsoueidan/frontend.state.product";
import {
  AlphaStack,
  Badge,
  Columns,
  Form,
  Page,
  PageActions,
} from "@shopify/polaris";
import { useDynamicList, useField } from "@shopify/react-form";
import React from "react";
import { useParams } from "react-router-dom";

export const View = () => {
  const { t } = useTranslation({ id: "collection-product-view", locales });
  const params = useParams();
  const { data: product } = useProductGet({ id: params.id || "" });
  const { update } = useProductUpdate({
    id: params.id || "",
  });

  const staff = useDynamicList<ProductServiceUpdateBodyStaffProperty>(
    product?.staff || [],
    (staff: ProductServiceUpdateBodyStaffProperty) => staff,
  );

  const { fields, submit, submitErrors, primaryAction } = useForm({
    dynamicLists: {
      staff: useDynamicList<ProductServiceUpdateBodyStaffProperty>(
        product?.staff || [],
        (staff: ProductServiceUpdateBodyStaffProperty) => staff,
      ),
    },
    fields: {
      active: useField({
        validates: [],
        value: product?.active || false,
      }),
      buffertime: useField({
        validates: [],
        value: product?.buffertime,
      }),
      duration: useField({
        validates: [],
        value: product?.duration,
      }),
    },
    onSubmit: async (fieldValues) => {
      await update({
        active: fieldValues.active,
        buffertime: fieldValues.buffertime,
        duration: fieldValues.duration,
        staff: staff.value,
      });
      return { status: "success" };
    },
  });

  if (!product || !submit || !fields) {
    return <LoadingPage title={t("loading")} />;
  }

  return (
    <Form onSubmit={submit}>
      <Page
        fullWidth
        title={product?.title}
        titleMetadata={
          <Badge status={product.active ? "attention" : "info"}>
            {product.active ? t("active") : t("deactive")}
          </Badge>
        }
        backAction={{ content: "Collections", url: "../" }}
      >
        <FormErrors errors={submitErrors} />
        {product.staff.length === 0 && <ProductNotification />}
        <Columns columns={["twoThirds", "oneThird"]} gap="4" alignItems="start">
          <ProductStaff product={product} field={staff} />
          <AlphaStack gap="4">
            <ProductStatus
              active={fields.active}
              disabled={product.staff.length === 0}
            />
            <ProductOptions
              buffertime={fields.buffertime}
              duration={fields.duration}
            />
          </AlphaStack>
        </Columns>
        <br />
        <PageActions primaryAction={primaryAction} />
      </Page>
    </Form>
  );
};

const locales = {
  da: {
    active: "Aktiv",
    deactive: "Deaktiv",
    loading: "Henter produkt detailer",
  },
  en: {
    active: "Active",
    deactive: "Deactive",
    loading: "Loading product details",
  },
};
