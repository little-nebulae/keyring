import type { Result } from "@little-nebulae/result";
import type { EntryOptions } from "@napi-rs/keyring";

import {
  composeErrorMessage,
  isError,
  UnexpectedError,
} from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";
import { Entry } from "@napi-rs/keyring";
import { platform } from "node:os";

import { KeyringEntry } from "@/entry/class";
import { KeyringSecretServiceUnavailableError } from "@/errors/secret-service-unavailable";

export function createKeyringEntry({
  service,
  username,
}: {
  service: string;
  username: string;
}): Result<KeyringEntry, UnexpectedError<unknown, null>>;
export function createKeyringEntry({
  service,
  username,
  options,
}: {
  service: string;
  username: string;
  options: { linux: { store: "secret-service" } };
}): Result<
  KeyringEntry,
  KeyringSecretServiceUnavailableError | UnexpectedError<unknown, null>
>;
export function createKeyringEntry({
  service,
  username,
  options,
}: {
  service: string;
  username: string;
  options: { linux: { store: "keyutils" } };
}): Result<KeyringEntry, UnexpectedError<unknown, null>>;
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
    catchFn: (error) => {
      if (
        options?.linux?.store === "secret-service" &&
        platform() === "linux" &&
        isError(error)
      ) {
        return new KeyringSecretServiceUnavailableError({ cause: error });
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "create a keyring entry",
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
