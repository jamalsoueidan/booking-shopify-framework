/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "@jamalsoueidan/frontend.providers.settings";
import {
  AlphaStack,
  Avatar,
  AvatarProps,
  Box,
  Inline,
  Text,
  ThumbnailProps,
} from "@shopify/polaris";
import React, { ReactNode } from "react";

export type StaffResourceItemProps = {
  title: string;
  desc?: string;
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
  <Link url={url || ""}>
    <AlphaStack>
      <Box
        paddingInlineStart="4"
        paddingInlineEnd="4"
        paddingBlockStart="3"
        paddingBlockEnd="3"
        borderBlockStart="divider"
      >
        <Inline align="space-between">
          <Inline gap="2">
            {media || <Avatar customer size="medium" name={title} />}
            <AlphaStack>
              <Text as="h1" variant="bodyMd" fontWeight="bold">
                {title}
              </Text>
              <Text as="span" variant="bodyMd">
                {desc}
              </Text>
            </AlphaStack>
          </Inline>
          {action && <Inline align="end">{action}</Inline>}
        </Inline>
      </Box>
    </AlphaStack>
  </Link>
);
