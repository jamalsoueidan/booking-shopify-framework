import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import React from "react";
import { BadgeStatus } from "./badge-status";

export const BasicBadgeStatus = withApplication(() => <BadgeStatus active />);
