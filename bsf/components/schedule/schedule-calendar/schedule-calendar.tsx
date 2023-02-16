import { CalendarType } from "@jamalsoueidan/bsf.components.calendar/calendar";
import {
  InputTags,
  InputTagsField,
} from "@jamalsoueidan/bsf.components.inputs.input-tags";
import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { Button, ButtonGroup, Icon, Stack, Text } from "@shopify/polaris";
import { ResetMinor } from "@shopify/polaris-icons";
import { useField } from "@shopify/react-form";
import React, { useCallback, useMemo, useRef } from "react";
import { ScheduleCalendarCore, ScheduleCalendarProps } from "./schedule-core";

export const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  const { format } = useDate();
  const ref = useRef<CalendarType>(null);
  const tag = useField<InputTagsField>(undefined);

  const handleToday = useCallback(() => {
    tag.onChange(undefined);
    ref.current?.getApi().today();
  }, [tag]);

  const handlePrev = useCallback(() => {
    ref.current?.getApi().prev();
  }, []);

  const handleNext = useCallback(() => {
    ref.current?.getApi().next();
  }, []);

  const currentDate = useMemo(
    () => ref.current?.getApi().getDate() || new Date(),
    [],
  );

  const data = useMemo(() => {
    const { data } = props;
    return tag.value ? data.filter((d) => d.tag === tag.value) : data;
  }, [props, tag.value]);

  const icon = <Icon source={ResetMinor} />;

  return (
    <>
      <Stack>
        <Stack.Item fill>
          <Text as="h1" variant="heading3xl">
            {format(currentDate, "LLLL yyyy")}
          </Text>
        </Stack.Item>
        <Stack>
          <Button onClick={handleToday} icon={icon} />

          <ButtonGroup segmented>
            <Button onClick={handlePrev}>&#60;</Button>
            <Button onClick={handleNext}>&#62;</Button>
          </ButtonGroup>

          <InputTags
            field={tag}
            input={{
              label: "Filtre tag",
              labelHidden: true,
              placeholder: "Filtre tag",
              size: "medium",
            }}
          />
        </Stack>
      </Stack>

      <ScheduleCalendarCore
        {...props}
        headerToolbar={{
          center: "",
          left: "",
          right: "",
        }}
        data={data}
        ref={ref}
      />
    </>
  );
};
