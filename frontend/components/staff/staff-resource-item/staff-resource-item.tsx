/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@jamalsoueidan/frontend.providers.settings";
import {
  AlphaStack,
  Avatar,
  AvatarProps,
  Box,
  Stack,
  Text,
  ThumbnailProps,
} from "@shopify/polaris";
import React, { ReactNode } from "react";

export type StaffResourceItemProps = {
  title: string;
  desc: string;
  media?: React.ReactElement<AvatarProps | ThumbnailProps>;
  action?: ReactNode;
  url?: string;
  isLast?: boolean;
  isFirst?: boolean;
};

export const StaffResourceItem = ({
  title,
  desc,
  media,
  url,
  action,
}: StaffResourceItemProps) => (
  <Link url={url}>
    <AlphaStack fullWidth>
      <Box
        paddingInlineStart="4"
        paddingInlineEnd="4"
        paddingBlockStart="3"
        paddingBlockEnd="3"
        borderBlockStart="divider"
      >
        <Stack alignment="center">
          {media || <Avatar customer size="medium" name={title} />}
          <Stack.Item fill>
            <Text as="h1" variant="bodyMd" fontWeight="bold">
              {title}
            </Text>
            <Text as="span" variant="bodyMd">
              {desc}
            </Text>
          </Stack.Item>
          {action && <Stack.Item>{action}</Stack.Item>}
        </Stack>
      </Box>
    </AlphaStack>
  </Link>
);
