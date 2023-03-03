import { addDays, addMonths, subMonths } from "date-fns";
import { sortByDate, sortByText } from "./helper-array";

type Person = {
  name: string;
  age: number;
  date: Date;
};

const date1 = addDays(new Date(), 1);
const date2 = addMonths(new Date(), 1);
const date3 = addDays(new Date(), 5);
const date4 = subMonths(new Date(), 2);

describe("test helper-array", () => {
  it("should sort by text", () => {
    const unsortedPeople: Person[] = [
      { age: 32, date: date1, name: "Bob" },
      { age: 55, date: date2, name: "Andrew" },
      { age: 101, date: date3, name: "Olga" },
      { age: 21, date: date4, name: "Caroline" },
    ];

    const sortedPeople = [...unsortedPeople].sort(
      sortByText((unsortedPeople) => unsortedPeople.name),
    );

    expect(sortedPeople[0]).toMatchObject(unsortedPeople[1]);
    expect(sortedPeople[1]).toMatchObject(unsortedPeople[0]);
    expect(sortedPeople[2]).toMatchObject(unsortedPeople[3]);
    expect(sortedPeople[3]).toMatchObject(unsortedPeople[2]);
  });

  it("should sort by date", () => {
    const unsortedPeople: Person[] = [
      { age: 32, date: date1, name: "Bob" },
      { age: 55, date: date2, name: "Andrew" },
      { age: 101, date: date3, name: "Olga" },
      { age: 21, date: date4, name: "Caroline" },
    ];

    const sortedPeople = [...unsortedPeople].sort(
      sortByDate((unsortedPeople) => unsortedPeople.date),
    );

    expect(sortedPeople[0]).toMatchObject(unsortedPeople[3]);
    expect(sortedPeople[1]).toMatchObject(unsortedPeople[0]);
    expect(sortedPeople[2]).toMatchObject(unsortedPeople[2]);
    expect(sortedPeople[3]).toMatchObject(unsortedPeople[1]);
  });
});
