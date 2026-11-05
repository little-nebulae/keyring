import type { Entry } from "@napi-rs/keyring";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

import { KeyringNoEntryError } from "@/errors/no-entry";

export function keyringDeletePassword({ entry }: { entry: Entry }) {
  return attempt({
    tryFn: () => {
      const isDeleted = entry.deletePassword();
      if (!isDeleted) {
        throw new KeyringNoEntryError();
      }
    },
    catchFn: (error) => {
      if (error instanceof KeyringNoEntryError) {
        return error;
      }
      return new UnexpectedError({
        message: composeErrorMessage({
          operation: "delete password with keyring",
        }),
        cause: error,
        meta: null,
      });
    },
  });
}
