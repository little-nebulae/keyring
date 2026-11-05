import type { Entry } from "@napi-rs/keyring";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import { KeyringNoEntryError } from "@/errors/no-entry";

export function keyringGetPassword({ entry }: { entry: Entry }) {
  return attempt({
    tryFn: () => {
      const password = entry.getPassword();
      if (password === null) {
        throw new KeyringNoEntryError();
      }
      return password;
    },
    catchFn: (error) => {
      if (error instanceof KeyringNoEntryError) {
        return error;
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "get password with keyring",
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
