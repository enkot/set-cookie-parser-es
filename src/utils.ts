export function isNonEmptyString(str: string) {
  return typeof str === "string" && !!str.trim();
}

// Parses name-value-pair according to rfc6265bis draft
export function parseNameValuePair(str: string) {
  let name: string | undefined = "";
  let value = "";
  const nameValueArr = str.split("=");

  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
  } else {
    value = str;
  }

  return { name, value };
}
