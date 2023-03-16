import { Staff } from "@jamalsoueidan/backend.types.staff";
import { BadgeStatus } from "@jamalsoueidan/frontend.components.badge-status";
import { usePosition } from "@jamalsoueidan/frontend.hooks.use-position";
import { useTranslation } from "@jamalsoueidan/frontend.hooks.use-translation";
import { useAbility } from "@jamalsoueidan/frontend.providers.ability";
import { useStaff } from "@jamalsoueidan/frontend.state.staff";
import {
  AlphaCard,
  Avatar,
  Page,
  ResourceItem,
  ResourceList,
  Text,
} from "@shopify/polaris";

import React, { useCallback } from "react";

export const List = () => {
  const { t } = useTranslation({ id: "staff", locales });
  const ability = useAbility();
  const { data } = useStaff();
  const { selectPosition } = usePosition();

  const renderItems = useCallback(
    (item: Staff) => {
      const { _id, fullname, active, avatar, position, phone } = item;
      const media = (
        <Avatar customer size="medium" name={fullname} source={avatar} />
      );

      return (
        <ResourceItem
          id={_id}
          url={_id}
          media={media}
          accessibilityLabel={`View details for ${fullname}`}
        >
          <Text variant="headingSm" as="h6">
            {fullname} <BadgeStatus active={active} />
          </Text>
          <div>
            {selectPosition(position)}, {phone}
            <br />
          </div>
        </ResourceItem>
      );
    },
    [selectPosition],
  );

  return (
    <Page
      fullWidth
      title={t("title")}
      primaryAction={
        ability.can("create", "staff")
          ? {
              content: t("add"),
              url: "new",
            }
          : null
      }
    >
      <AlphaCard padding="0">
        <ResourceList
          resourceName={{
            plural: t("resource.plural"),
            singular: t("resource.singular"),
          }}
          items={data || []}
          renderItem={renderItems}
        />
      </AlphaCard>
    </Page>
  );
};

const locales = {
  da: {
    add: "Tilføj ny medarbejder",
    resource: {
      plural: "medarbejder",
      singular: "medarbejder",
    },
    title: "Medarbejder ",
  },
  en: {
    add: "Add staff member",
    resource: {
      plural: "customers",
      singular: "customer",
    },
    title: "Staff",
  },
};
