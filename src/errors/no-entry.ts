import { BaseError } from "@little-nebulae/error";

export class KeyringNoEntryError extends BaseError<
  "KEYRING_NO_ENTRY_ERROR",
  null
> {
  readonly name = "KeyringNoEntryError";
  readonly code = "KEYRING_NO_ENTRY_ERROR";

  constructor(
    message = "Failed to find the entry for this service and username.",
  ) {
    super({ message, cause: null, meta: null });
  }
}
