import { StaffBodyUpdate } from "@jamalsoueidan/backend.types.staff";
import { BadgeStatus } from "@jamalsoueidan/frontend.components.badge-status";
import { StaffForm } from "@jamalsoueidan/frontend.components.staff.staff-form";
import { useNavigate } from "@jamalsoueidan/frontend.providers.settings";
import {
  useStaffGet,
  useStaffUpdate,
} from "@jamalsoueidan/frontend.state.staff";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: staff } = useStaffGet({ userId: params.id || "" });
  const { update } = useStaffUpdate({ userId: params.id || "" });

  const submit = useCallback(
    async (fieldValues: StaffBodyUpdate) => {
      await update(fieldValues);
      navigate(`../${staff?._id}`);
    },
    [update, navigate, staff],
  );

  if (!staff) {
    return <></>;
  }

  return (
    <StaffForm
      data={staff}
      action={submit}
      breadcrumbs={{ content: "Staff", url: `../${staff._id}` }}
      titleMetadata={<BadgeStatus active={staff.active} />}
      allowEditing={{ active: true, group: true, role: true }}
    />
  );
};
