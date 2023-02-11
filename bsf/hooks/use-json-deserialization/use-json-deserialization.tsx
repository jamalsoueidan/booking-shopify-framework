import { useDate } from "@jamalsoueidan/bsf.hooks.use-date";
import { useCallback, useMemo } from "react";

export function useJsonDeserialization<T>(data: T) {
  const { toTimeZone } = useDate();

  const parseDates = useCallback(
    (obj: any) => {
      const dtrx2 = /\d{4}-\d{2}-\d{2}/;
      // iterate properties
      for (let pName in obj) {
        // make sure the property is 'truthy'
        if (obj[pName]) {
          var value = obj[pName];
          // determine if the property is an array
          if (Array.isArray(value)) {
            for (var ii = 0; ii < value.length; ii++) {
              parseDates(value[ii]);
            }
          }
          // determine if the property is an object
          else if (typeof value == "object") {
            parseDates(value);
          }
          // determine if the property is a string containing a date
          else if (typeof value == "string" && dtrx2.test(value)) {
            // parse and replace
            obj[pName] = toTimeZone(obj[pName]);
          }
        }
      }
      return obj;
    },
    [toTimeZone],
  );

  const newData = useMemo(
    () => parseDates(JSON.parse(JSON.stringify(data))),
    [parseDates],
  );

  return newData;
}
