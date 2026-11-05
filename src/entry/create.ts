import type { EntryOptions } from "@napi-rs/keyring";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { Entry } from "@napi-rs/keyring";

import { KeyringEntry } from "@/entry/class";

export function createKeyringEntry({
  service,
  username,
  options,
}: {
  service: string;
  username: string;
  options?: EntryOptions;
}) {
  return attempt({
    tryFn: () =>
      new KeyringEntry({ entry: new Entry(service, username, options) }),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a keyring entry",
        }),
        cause: error,
        meta: null,
      }),
  });
}
