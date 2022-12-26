export interface SetCookieValues {
  name?: string;
  value: string;
  domain?: string | undefined;
  expires?: Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  path?: string | undefined;
  sameSite?: true | false | "lax" | "strict" | "none" | undefined;
  secure?: boolean | undefined;
}

export interface SetCookieOptionsList {
  decodeValues?: boolean;
  map?: false;
  silent?: boolean;
}
export interface SetCookieOptionsMap {
  decodeValues?: boolean;
  map?: true;
  silent?: boolean;
}
export type SetCookieOptions = SetCookieOptionsList | SetCookieOptionsMap;

export type SetCookieParseResultList = SetCookieValues[];
export type SetCookieParseResultMap = { [key: string]: SetCookieValues };
export type SetCookieParseResult =
  | SetCookieParseResultList
  | SetCookieParseResultMap;
