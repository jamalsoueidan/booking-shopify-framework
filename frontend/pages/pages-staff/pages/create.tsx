import {
  StaffBodyCreate,
  StaffBodyUpdate,
} from "@jamalsoueidan/backend.types.staff";
import { StaffForm } from "@jamalsoueidan/frontend.components.staff.staff-form";
import { useStaffCreate } from "@jamalsoueidan/frontend.state.staff";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();
  const { create } = useStaffCreate();

  const submit = useCallback(
    async (fieldValues: StaffBodyUpdate | StaffBodyCreate) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const staff = await create(fieldValues as any);
      navigate(`../${staff.payload?._id}`);
    },
    [create, navigate],
  );

  return (
    <StaffForm
      action={submit}
      breadcrumbs={{ content: "Staff", url: "../" }}
      allowEditing={{ active: true, group: true, role: true }}
    />
  );
};
