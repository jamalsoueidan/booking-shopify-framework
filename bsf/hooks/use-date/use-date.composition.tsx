import { withApplication } from "@jamalsoueidan/bsd.preview.with-application";
import { Box, Divider, Text, TextContainer } from "@shopify/polaris";
import React from "react";
import { useDate } from "./use-date";

const date = new Date();

export const Basic = withApplication(() => {
  const { format, timeZone, toUtc, toTimeZone } = useDate();

  const timeZoneFormat = format(date, "PPPppp", timeZone);
  const timezoneToUtc = toUtc(date, timeZone);

  console.log(toTimeZone(new Date(timeZoneFormat)));

  return (
    <>
      <Box paddingBlockStart="8" paddingBlockEnd="8">
        <Text variant="headingLg" as="h1">
          Format:
        </Text>
        <Divider />
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            Locale
          </Text>
          <Text variant="bodyMd" as="span">
            {format(
              date,
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
            {timeZoneFormat}
          </Text>
        </TextContainer>
      </Box>
      <Box paddingBlockStart="8" paddingBlockEnd="8">
        <Text variant="headingLg" as="h1">
          toUtc (back to server):
        </Text>
        <Divider />
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            Locale
          </Text>
          <Text variant="bodyMd" as="span">
            {toUtc(date).toJSON()}
          </Text>
        </TextContainer>
        <TextContainer>
          <Text variant="bodyMd" as="p" fontWeight="bold">
            {timeZone}:
          </Text>
          <Text variant="bodyMd" as="span">
            {timezoneToUtc.toJSON()}
          </Text>
        </TextContainer>
      </Box>
    </>
  );
});

const timeZones = [
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Astrakhan",
  "Europe/Athens",
  "Europe/Belgrade",
  "Europe/Berlin",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Chisinau",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Helsinki",
  "Europe/Istanbul",
  "Europe/Kaliningrad",
  "Europe/Kiev",
  "Europe/Kirov",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Minsk",
  "Europe/Monaco",
  "Europe/Moscow",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Samara",
  "Europe/Saratov",
  "Europe/Simferopol",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Tirane",
  "Europe/Ulyanovsk",
  "Europe/Uzhgorod",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Volgograd",
  "Europe/Warsaw",
  "Europe/Zaporozhye",
  "Europe/Zurich",
];
