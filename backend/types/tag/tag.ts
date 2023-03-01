export enum Tag {
  "weekday" = "weekday",
  "weekend" = "weekend",
  "all_day" = "all_day",
  "end_of_week" = "end_of_week",
  "start_of_week" = "start_of_week",
  "middle_of_week" = "middle_of_week",
}

export const TagKeys = Object.values(Tag).filter(
  (x, i, a) => a.indexOf(x) === i,
);
