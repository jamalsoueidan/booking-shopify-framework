//https://medium.com/@tormodhaugene/comparator-for-sorting-generic-objects-in-typescript-1ca5fb2b2815

export const sortbyText =
  <T>(getTextProperty: (object: T) => string) =>
  (objectA: T, objectB: T) => {
    const upperA = getTextProperty(objectA).toUpperCase();
    const upperB = getTextProperty(objectB).toUpperCase();
    if (upperA < upperB) {
      return -1;
    }
    if (upperA > upperB) {
      return 1;
    }
    return 0;
  };

export const sortbyDate =
  <T>(getDateProperty: (object: T) => Date) =>
  (objectA: T, objectB: T) => {
    const upperA = getDateProperty(objectA).getTime();
    const upperB = getDateProperty(objectB).getTime();
    if (upperA < upperB) {
      return -1;
    }
    if (upperA > upperB) {
      return 1;
    }
    return 0;
  };
