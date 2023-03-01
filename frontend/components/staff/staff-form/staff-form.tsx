import {
  Staff,
  StaffBodyUpdate,
  StaffRole,
} from "@jamalsoueidan/backend.types.staff";
import { FormErrors } from "@jamalsoueidan/frontend.components.form-errors";
import { Validators } from "@jamalsoueidan/frontend.helpers.validators";
import { useForm } from "@jamalsoueidan/frontend.hooks.use-form";
import { usePosition } from "@jamalsoueidan/frontend.hooks.use-position";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useToast } from "@jamalsoueidan/frontend.providers.toast";
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
import React, { memo, useCallback, useMemo } from "react";
import { da, en } from "./translations";

export interface StaffFormProps {
  action: (body: StaffBodyUpdate) => void;
  breadcrumbs?: BreadcrumbsProps["breadcrumbs"];
  titleMetadata?: React.ReactNode;
  data?: Staff;
  allowEditing?: Record<string, boolean>;
}

export const StaffForm = memo(
  ({
    action,
    breadcrumbs,
    titleMetadata,
    data,
    allowEditing = {},
  }: StaffFormProps) => {
    const { options } = usePosition();
    const { show } = useToast();
    const { t, tdynamic } = useTranslation({
      id: "staff-form",
      locales: { da, en },
    });

    const group = useField({
      validates: [notEmpty("group must be filled")],
      value: data?.group || "",
    });

    const roleOptions = useMemo(
      () =>
        Object.entries(StaffRole)
          .filter(([, value]) => !Number.isNaN(Number(value)))
          .map(([label, value]) => ({
            label: tdynamic(`roles.${label}`) as unknown as string,
            value: value.toString(),
          })),
      [tdynamic],
    );

    const role = useField<StaffRole>({
      validates: [notEmpty("role must be filled")],
      value: data?.role || StaffRole.user,
    });

    const active = useField({
      validates: [],
      value: data?.active || true,
    });

    // https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
    const { fields, submit, submitErrors, primaryAction } = useForm({
      fields: {
        address: useField({
          validates: [notEmpty(t("address.error"))],
          value: data?.address || "",
        }),
        avatar: useField({
          validates: [notEmpty(t("avatar.error"))],
          value: data?.avatar || "",
        }),
        email: useField({
          validates: [
            notEmpty(t("email.error_empty")),
            Validators.isEmail(t("email.empty_invalid_email")),
          ],
          value: data?.email || "",
        }),
        fullname: useField({
          validates: [
            notEmpty(t("fullname.error_empty")),
            lengthMoreThan(3, t("fullname.error_short")),
          ],
          value: data?.fullname || "",
        }),
        phone: useField({
          validates: [
            notEmpty(t("phone.error_empty")),
            Validators.isPhoneNumber(t("phone.error_invalid")),
          ],
          value: data?.phone || "",
        }),
        position: useField({
          validates: [notEmpty(t("position.empty"))],
          value: data?.position || options[0].value,
        }),
        postal: useField<number | undefined>({
          validates: [notEmpty(t("postal.empty"))],
          value: data?.postal || undefined,
        }),
        ...(allowEditing.group
          ? {
              group,
            }
          : null),
        ...(allowEditing.active
          ? {
              active,
            }
          : null),
        ...(allowEditing.role
          ? {
              role,
            }
          : null),
      },
      onSubmit: async (fieldValues) => {
        action(fieldValues);
        show({ content: data ? t("updated") : t("created") });
        return { status: "success" };
      },
    });

    const changePostal = useCallback(
      (value: string) => fields?.postal.onChange(parseInt(value, 10)),
      [fields?.postal],
    );

    const onSubmit = useCallback(() => {
      if (submit) {
        submit();
      }
    }, [submit]);

    return (
      <Form onSubmit={onSubmit}>
        <Page
          fullWidth
          title={data ? data?.fullname : t("title")}
          breadcrumbs={breadcrumbs}
          titleMetadata={titleMetadata}
        >
          <Layout>
            <FormErrors errors={submitErrors} />
            <Layout.AnnotatedSection title={t("form.title")}>
              <Card sectioned>
                <FormLayout>
                  <TextField
                    label={t("fullname.label")}
                    type="text"
                    autoComplete="fullname"
                    placeholder={t("fullname.placeholder")}
                    {...fields?.fullname}
                  />
                  <TextField
                    label={t("email.label")}
                    type="email"
                    autoComplete="email"
                    placeholder={t("email.placeholder")}
                    helpText={<span>{t("email.help")}</span>}
                    {...fields?.email}
                  />
                  <TextField
                    label={t("phone.label")}
                    type="text"
                    autoComplete="phone"
                    placeholder={t("phone.placeholder")}
                    helpText={<span>{t("phone.help")}</span>}
                    {...fields?.phone}
                  />
                  <TextField
                    label={t("address.label")}
                    type="text"
                    autoComplete="address"
                    placeholder={t("address.placeholder")}
                    {...fields?.address}
                  />
                  <TextField
                    label={t("postal.label")}
                    type="text"
                    autoComplete="postal"
                    placeholder={t("postal.placeholder")}
                    helpText={<span>{t("postal.help")}</span>}
                    {...fields?.postal}
                    value={fields?.postal?.value?.toString()}
                    onChange={changePostal}
                  />
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection title={t("user.title")}>
              <Card sectioned>
                <FormLayout>
                  <Select
                    label={t("position.label")}
                    options={options}
                    {...fields?.position}
                  />
                  {allowEditing.group ? (
                    <TextField
                      label={t("group.label")}
                      type="text"
                      autoComplete="false"
                      placeholder={t("group.placeholder")}
                      helpText={<span>{t("group.help")}</span>}
                      {...fields?.group}
                    />
                  ) : null}
                  {allowEditing.role ? (
                    <Select
                      label={t("role.label")}
                      placeholder={t("role.placeholder")}
                      helpText={<span>{t("role.help")}</span>}
                      options={roleOptions}
                      value={role.value.toString()}
                      onChange={(value) => role.onChange(parseInt(value, 10))}
                    />
                  ) : null}
                </FormLayout>
              </Card>
            </Layout.AnnotatedSection>
            <Layout.AnnotatedSection title={t("image.title")}>
              <Card>
                <Card.Section>
                  <TextField
                    label={t("avatar.label")}
                    type="text"
                    autoComplete="avatar"
                    placeholder={t("avatar.placeholder")}
                    helpText={<span>{t("avatar.help")}</span>}
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
  },
);
