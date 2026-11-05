import { BaseError } from "@little-nebulae/error";

export class KeyringSecretServiceUnavailableError extends BaseError<
  "KEYRING_SECRET_SERVICE_UNAVAILABLE_ERROR",
  Error
> {
  readonly name = "KeyringSecretServiceUnavailableError";
  readonly code = "KEYRING_SECRET_SERVICE_UNAVAILABLE_ERROR";

  constructor({ message, cause }: { message?: string; cause: Error }) {
    super({ message: message ?? cause.message, cause, meta: null });
  }
}
