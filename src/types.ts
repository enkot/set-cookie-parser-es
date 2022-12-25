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

export type SetCookieParseResult =
  | SetCookieValues[]
  | {
      [key: string]: SetCookieValues;
    };

export interface SetCookieOptions {
  decodeValues?: boolean;
  map?: boolean;
  silent?: boolean;
}
