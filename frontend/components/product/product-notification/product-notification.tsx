import { Banner, Box } from "@shopify/polaris";
import React, { memo } from "react";

export const ProductNotification = memo(() => (
  <Box paddingBlockEnd="4">
    <Banner title="Tilføj staff til produktet" status="warning">
      <p>
        Før denne service kan aktiveres, skal du først tilføje medarbejder til
        produktet
      </p>
    </Banner>
  </Box>
));
