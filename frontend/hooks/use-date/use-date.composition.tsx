import { withApplication } from "@jamalsoueidan/bit-dev.preview.with-application";
import { Box, Divider, Text, TextContainer, TextField } from "@shopify/polaris";
import { useField } from "@shopify/react-form";
import React from "react";
import { useDate } from "./use-date";

/*
// Send to backend
  const copenhagen = new Date() // europe/copenhagen time
  const local = zonedTimeToUtc(copenhagen, "Europe/Copenhagen") // convert to JSON
  console.log("convert to json", local.toJSON()) // convert to JSON

  console.log("show copenhagen time", format(copenhagen, "yyyy-MM-dd HH:mm:ss")) //show time
  console.log("show istanbul time", format(local, "Europe/Istanbul", "yyyy-MM-dd HH:mm:ss")) //Show time
  console.log("show copenhagen time", format(local, "Europe/Copenhagen", "yyyy-MM-dd HH:mm:ss")) //Show time


  // Read from backend
  const istanbul = new Date(local.toJSON()) // europe/istanbul time
  console.log("show istanbul time", format(istanbul, "Europe/Istanbul", "yyyy-MM-dd HH:mm:ss")) //Show time
  console.log("show copenhagen time from istanbul", format(istanbul, "Europe/Copenhagen", "yyyy-MM-dd HH:mm:ss")) //Show tim
  console.log(istanbul.toJSON())

  const toCopenhagen = utcToZonedTime(istanbul, 'Europe/Copenhagen');
  console.log("show copenhagen time from utc", format(toCopenhagen, "yyyy-MM-dd HH:mm:ss")) //Show tim
  console.log(toCopenhagen.toJSON())
*/

export const ToBackend = withApplication(() => {
  const { timeZone, toUtc, format } = useDate();

  const copenhagen = new Date();
  const local = toUtc(copenhagen);

  return (
    <>
      <Box paddingBlockStart="8" paddingBlockEnd="8">
        <Text variant="headingLg" as="h1">
          To backend ({local.toJSON()})
        </Text>
        <Divider />
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            Current timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone}
            )
          </Text>
          <Text variant="bodyMd" as="span">
            {format(
              local,
              "PPPppp",
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            )}
          </Text>
        </TextContainer>
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            {timeZone}:
          </Text>
          <Text variant="bodyMd" as="span">
            {format(local, "PPPppp")}
          </Text>
        </TextContainer>
      </Box>
    </>
  );
});

export const FromBackend = withApplication(() => {
  const { timeZone, format } = useDate();
  const field = useField<string>(new Date().toJSON());
  const local = new Date(field.value); // europe/copenhagen time

  return (
    <>
      <Box paddingBlockStart="8" paddingBlockEnd="8">
        <TextField label="Value" autoComplete="off" {...field} />
        <Text variant="headingLg" as="h1">
          From backend:
        </Text>
        <Divider />
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            Current timezone ({Intl.DateTimeFormat().resolvedOptions().timeZone}
            )
          </Text>
          <Text variant="bodyMd" as="span">
            {format(
              local,
              "PPPppp",
              Intl.DateTimeFormat().resolvedOptions().timeZone,
            )}
          </Text>
        </TextContainer>
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            {timeZone}:
          </Text>
          <Text variant="bodyMd" as="span">
            {format(local, "yyyy-MM-dd HH:mm:ss")}
          </Text>
        </TextContainer>
      </Box>
    </>
  );
});
