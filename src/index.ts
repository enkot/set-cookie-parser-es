import {
  SetCookieValues,
  SetCookieOptions,
  SetCookieOptionsMap,
  SetCookieOptionsList,
  SetCookieParseResult,
  SetCookieParseResultList,
  SetCookieParseResultMap,
} from "./types";
import { isNonEmptyString, parseNameValuePair } from "./utils";

const defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
};

export function parseString(setCookieValue, options: SetCookieOptions = {}) {
  options = { ...defaultParseOptions, ...options };

  const parts = setCookieValue
    .split(";")
    .filter((str) => isNonEmptyString(str));
  const nameValuePairStr = parts.shift();
  const parsed = parseNameValuePair(nameValuePairStr);
  const name = parsed.name;
  let value = parsed.value;

  try {
    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
  } catch (error) {
    console.error(
      `set-cookie-parser-es encountered an error while decoding a cookie with value "${value}". 
Set options.decodeValues to false to disable this feature.`,
      error
    );
  }

  const cookie: SetCookieValues = {
    name,
    value,
  };

  for (const part of parts) {
    const sides = part.split("=");
    const key = sides.shift().trimStart().toLowerCase();
    const value = sides.join("=");

    switch (key) {
      case "expires": {
        cookie.expires = new Date(value);

        break;
      }
      case "max-age": {
        cookie.maxAge = Number.parseInt(value, 10);

        break;
      }
      case "secure": {
        cookie.secure = true;

        break;
      }
      case "httponly": {
        cookie.httpOnly = true;

        break;
      }
      case "samesite": {
        cookie.sameSite = value;

        break;
      }
      default: {
        cookie[key] = value;
      }
    }
  }

  return cookie;
}

export function parse(
  input: string | string[],
  options?: SetCookieOptionsList
): SetCookieParseResultList;
export function parse(
  input: string | string[],
  options?: SetCookieOptionsMap
): SetCookieParseResultMap;
export function parse(
  input: string | string[],
  options: SetCookieOptions = {}
): SetCookieParseResult {
  options = { ...defaultParseOptions, ...options };

  if (!input) {
    return options.map ? {} : [];
  }

  if (!Array.isArray(input)) {
    input = [input];
  }

  if (!options.map) {
    return input
      .filter((str) => isNonEmptyString(str))
      .map((str) => parseString(str, options));
  }

  const cookies = {};

  for (const str of input) {
    if (!isNonEmptyString(str)) {
      continue;
    }

    const cookie = parseString(str, options);

    if (cookie.name) {
      cookies[cookie.name] = cookie;
    }
  }

  return cookies;
}

/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/
export function splitCookiesString(cookiesString: string) {
  const cookiesStrings: string[] = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;

  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }

  function notSpecialChar() {
    ch = cookiesString.charAt(pos);

    return ch !== "=" && ch !== ";" && ch !== ",";
  }

  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;

    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        // ',' is a cookie separator if we have later first '=', not ';' or ','
        lastComma = pos;
        pos += 1;

        skipWhitespace();
        nextStart = pos;

        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }

        // currently special character
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          // we found cookies separator
          cookiesSeparatorFound = true;
          // pos is inside the next cookie, so back up and return it.
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          // in param ',' or param separator ';',
          // we continue from that comma
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }

    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }

  return cookiesStrings;
}
