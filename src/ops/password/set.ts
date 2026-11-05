import type { Entry } from "@napi-rs/keyring";

import { composeErrorMessage, UnexpectedError } from "@little-nebulae/error";
import { attempt } from "@little-nebulae/result";

export function keyringSetPassword({
  entry,
  password,
}: {
  entry: Entry;
  password: string;
}) {
  return attempt({
    tryFn: () => entry.setPassword(password),
    catchFn: (error) =>
      new UnexpectedError({
        message: composeErrorMessage({
          operation: "set password with keyring",
        }),
        cause: error,
        meta: null,
      }),
  });
}
