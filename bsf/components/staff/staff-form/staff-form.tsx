import { FormErrors } from "@jamalsoueidan/bsf.components.form-errors";
import { useForm } from "@jamalsoueidan/bsf.hooks.use-form";
import { usePosition } from "@jamalsoueidan/bsf.hooks.use-position";
import { useToast } from "@jamalsoueidan/bsf.hooks.use-toast";
import { useTranslation } from "@jamalsoueidan/bsf.hooks.use-translation";
import React from "react";
import { Staff, StaffBodyUpdate } from "@jamalsoueidan/bsb.bsb-pkg";
import { Validators } from "@jamalsoueidan/bsf.helpers.validators";
import {
  Box,
  BreadcrumbsProps,
  Card,
  Form,
  FormLayout,
  Image,
  Layout,
  Page,
  PageActions,
  Select,
  TextField,
} from "@shopify/polaris";
import { lengthMoreThan, notEmpty, useField } from "@shopify/react-form";
import { useCallback } from "react";
import { da, en } from "./translations";
import { memo } from "react";

export interface StaffFormProps {
  action: (body: StaffBodyUpdate) => void;
  breadcrumbs?: BreadcrumbsProps["breadcrumbs"];
  titleMetadata?: React.ReactNode;
  data?: Staff;
  disallowEditing?: Record<string, boolean>;
}

export const StaffForm = memo(
  ({
    action,
    breadcrumbs,
    titleMetadata,
    data,
    disallowEditing = { group: true, active: true },
  }: StaffFormProps) => {
    const { options } = usePosition();
    const { show } = useToast();
    const { t } = useTranslation({ id: "staff", locales: { da, en } });

    //https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
    const { fields, submit, submitErrors, primaryAction } = useForm({
      fields: {
        fullname: useField({
          value: data?.fullname || "",
          validates: [
            notEmpty("Fullname is required"),
            lengthMoreThan(3, "Fullname must be more than 3 characters"),
          ],
        }),
        email: useField({
          value: data?.email || "",
          validates: [
            notEmpty("Email is required"),
            Validators.isEmail("Invalid email"),
          ],
        }),
        phone: useField({
          value: data?.phone || "",
          validates: [
            notEmpty("Phone is required"),
            Validators.isPhoneNumber("Invalid phonenumber"),
          ],
        }),
        avatar: useField({
          value: data?.avatar || "",
          validates: [notEmpty("avatarUrl is required")],
        }),
        position: useField({
          value: data?.position || options[0].value,
          validates: [notEmpty("position must be selected")],
        }),
        postal: useField<number | undefined>({
          value: data?.postal || undefined,
          validates: [notEmpty("postal must be filled")],
        }),
        address: useField({
          value: data?.address || "",
          validates: [notEmpty("postal must be filled")],
        }),
        ...(disallowEditing.group
          ? {
              group: useField({
                value: data?.group || "",
                validates: [notEmpty("group must be filled")],
              }),
            }
          : null),
        ...(disallowEditing.active
          ? {
              active: useField({
                value: data?.active || true,
                validates: [],
              }),
            }
          : null),
      },
      onSubmit: async (fieldValues) => {
        action(fieldValues);
        show({ content: data ? "Staff has been updated" : "Staff created" });
        return { status: "success" };
      },
    });

    const changePostal = useCallback(
      (value: string) => fields?.postal.onChange(parseInt(value)),
      [fields?.postal.onChange]
    );

    return (
      <Form onSubmit={submit!}>
        <Page
          fullWidth
          title={data ? data?.fullname : t("title")}
          breadcrumbs={breadcrumbs}
          titleMetadata={titleMetadata}
        >
          <Layout>
            <FormErrors errors={submitErrors} />
            <Layout.AnnotatedSection title={t("staff.title")}>
              <Card sectioned>
                <FormLayout>
                  <TextField
                    label={t("staff.fullname.label")}
                    type="text"
                    autoComplete="fullname"
                    placeholder={t("staff.fullname.placeholder")}
                    {...fields?.fullname}
                  />
                  <TextField
                    label={t("staff.email.label")}
                    type="email"
                    autoComplete="email"
                    placeholder={t("staff.email.placeholder")}
                    helpText={<span>{t("staff.email.help")}</span>}
                    {...fields?.email}
                  />
                  <TextField
                    label={t("staff.phone.label")}
                    type="text"
                    autoComplete="phone"
                    placeholder={t("staff.phone.placeholder")}
                    helpText={<span>{t("staff.phone.help")}</span>}
                    {...fields?.phone}
                  />
                  <TextField
                    label={t("staff.address.label")}
                    type="text"
                    autoComplete="address"
                    placeholder={t("staff.address.placeholder")}
                    {...fields?.address}
                  />
                  <TextField
                    label={t("staff.postal.label")}
                    type="text"
                    autoComplete="postal"
                    placeholder={t("staff.postal.placeholder")}
                    helpText={<span>{t("staff.postal.help")}</span>}
                    {...fields?.postal}
                    value={fields?.postal?.value?.toString()}
                    onChange={changePostal}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection title={t("staff.position.title")}>
              <Card sectioned>
                <FormLayout>
                  <Select
                    label={t("staff.position.label")}
                    options={options}
                    {...fields?.position}
                  />
                  {disallowEditing.group ? (
                    <TextField
                      label={t("staff.group.label")}
                      type="text"
                      autoComplete="false"
                      placeholder={t("staff.group.placeholder")}
                      helpText={<span>{t("staff.group.help")}</span>}
                      {...fields?.group}
                    />
                  ) : null}
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection title={t("image.title")}>
              <Card>
                <Card.Section>
                  <TextField
                    label={t("staff.avatarUrl.label")}
                    type="text"
                    autoComplete="avatarUrl"
                    placeholder={t("staff.avatarUrl.placeholder")}
                    helpText={<span>{t("staff.avatarUrl.help")}</span>}
                    {...fields?.avatar}
                  />
                  {fields?.avatar.value && (
                    <Box paddingBlockStart="4">
                      <Image
                        source={fields?.avatar.value}
                        alt="avatar url"
                        width="100px"
                      />
                    </Box>
                  )}
                </Card.Section>
              </Card>
            </Layout.AnnotatedSection>
          </Layout>
          <br />
          <PageActions primaryAction={primaryAction} />
        </Page>
      </Form>
    );
  }
);
