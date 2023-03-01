import { ApiResponse } from "@jamalsoueidan/backend.types.api";
import {
  Schedule,
  ScheduleServiceCreateGroupBodyProps,
  ScheduleServiceCreateGroupQueryProps,
  ScheduleServiceCreateProps,
  ScheduleServiceCreateQueryProps,
  ScheduleServiceDestroyGroupProps,
  ScheduleServiceDestroyProps,
  ScheduleServiceGetAllProps,
  ScheduleServiceGetGroupProps,
  ScheduleServiceGetGroupReturn,
  ScheduleServiceUpdateBodyProps,
  ScheduleServiceUpdateGroupBodyProps,
  ScheduleServiceUpdateGroupQueryProps,
  ScheduleServiceUpdateQueryProps,
} from "@jamalsoueidan/backend.types.schedule";
import { useFetch } from "@jamalsoueidan/frontend.providers.fetch";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

export const useStaffSchedule = (params: ScheduleServiceGetAllProps) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<Array<Schedule>>>({
    enabled: !!params.start && !!params.end,
    queryFn: () => get({ params, url: "/schedules" }),
    queryKey: ["staff", "schedules", params],
  });

  return { data: data?.payload || [] };
};

export const useStaffScheduleCreate = (
  params: ScheduleServiceCreateQueryProps,
) => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const create = useCallback(
    async (body: ScheduleServiceCreateProps["body"]) => {
      setIsCreating(true);
      await post({ body, params, url: "/schedules" });
      await mutate(["staff", "schedules"]);
      setIsCreating(false);
    },
    [mutate, params, post],
  );

  return {
    create,
    isCreating,
  };
};

export const useStaffScheduleDestroy = ({
  schedule,
  staff,
}: ScheduleServiceDestroyProps) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const fetch = useFetch();
  const destroy = useCallback(async () => {
    setIsDestroying(true);
    await fetch.destroy({ params: { staff }, url: `/schedules/${schedule}` });
    await fetch.mutate(["staff", "schedules"]);
    setIsDestroying(false);
  }, [fetch, schedule, staff]);

  return {
    destroy,
    isDestroying,
  };
};

export const useStaffScheduleUpdate = ({
  schedule,
  staff,
}: ScheduleServiceUpdateQueryProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const update = useCallback(
    async (body: ScheduleServiceUpdateBodyProps) => {
      setIsUpdating(true);
      await put({ body, params: { staff }, url: `/schedules/${schedule}` });
      await mutate(["staff", "schedules"]);
      setIsUpdating(false);
    },
    [put, staff, schedule, mutate],
  );

  return {
    isUpdating,
    update,
  };
};

export const useStaffScheduleGetGroup = ({
  groupId,
  staff,
}: ScheduleServiceGetGroupProps) => {
  const { get } = useFetch();
  const { data } = useQuery<ApiResponse<ScheduleServiceGetGroupReturn>>({
    queryFn: () =>
      get({ params: { staff }, url: `/schedules/group/${groupId}` }),
    queryKey: ["staff", "schedules", "group", groupId, staff],
  });

  return { data: data?.payload };
};

export const useStaffScheduleDestroyGroup = ({
  groupId,
  staff,
}: ScheduleServiceDestroyGroupProps) => {
  const [isDestroying, setIsDestroying] = useState<boolean>();
  const { destroy, mutate } = useFetch();
  const destroyGroup = useCallback(async () => {
    setIsDestroying(true);
    await destroy({ params: { staff }, url: `/schedules/group/${groupId}` });
    await mutate(["staff", "schedules"]);
    setIsDestroying(false);
  }, [destroy, groupId, mutate, staff]);

  return {
    destroyGroup,
    isDestroying,
  };
};

export const useStaffScheduleCreateGroup = ({
  staff,
}: ScheduleServiceCreateGroupQueryProps) => {
  const [isCreating, setIsCreating] = useState<boolean>();
  const { post, mutate } = useFetch();
  const createGroup = useCallback(
    async (body: ScheduleServiceCreateGroupBodyProps) => {
      setIsCreating(true);
      await post({ body, params: { staff }, url: "/schedules/group" });
      await mutate(["staff", "schedules"]);
      setIsCreating(false);
    },
    [mutate, post, staff],
  );

  return {
    createGroup,
    isCreating,
  };
};

export const useStaffScheduleUpdateGroup = ({
  groupId,
  staff,
}: ScheduleServiceUpdateGroupQueryProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>();
  const { put, mutate } = useFetch();
  const updateGroup = useCallback(
    async (body: ScheduleServiceUpdateGroupBodyProps) => {
      setIsUpdating(true);
      await put({
        body,
        params: { staff },
        url: `/schedules/group/${groupId}`,
      });
      await mutate(["staff", "schedules"]);
      setIsUpdating(false);
    },
    [put, staff, groupId, mutate],
  );

  return {
    isUpdating,
    updateGroup,
  };
};
