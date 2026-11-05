import type { Entry } from "@napi-rs/keyring";

import { keyringDeletePassword } from "@/ops/password/delete";
import { keyringGetPassword } from "@/ops/password/get";
import { keyringSetPassword } from "@/ops/password/set";

export class KeyringEntry {
  readonly #entry: Entry;

  constructor({ entry }: { entry: Entry }) {
    this.#entry = entry;
  }

  setPassword({ password }: { password: string }) {
    return keyringSetPassword({ entry: this.#entry, password });
  }

  getPassword() {
    return keyringGetPassword({ entry: this.#entry });
  }

  deletePassword() {
    return keyringDeletePassword({ entry: this.#entry });
  }
}
