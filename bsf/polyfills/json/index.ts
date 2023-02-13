var reISO =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
var parse = JSON.parse;

function dateParser(key, value) {
  if (typeof value === "string") {
    var a = reISO.exec(value);
    if (a) {
      return new Date(value);
    }
  }
  return value;
}

JSON.parse = function (data) {
  return parse(data, dateParser);
};
