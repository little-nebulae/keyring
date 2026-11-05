import { Entry } from "@napi-rs/keyring";
import { assert, expect, test } from "vitest";

import { KeyringNoEntryError } from "@/errors/no-entry";
import { keyringDeletePassword } from "@/ops/password/delete";

const SERVICE = "keyring.password.delete.test";

// Success case
test("keyringDeletePassword should succeed at deleting an existing password", () => {
  const entry = new Entry(SERVICE, "success");
  const password = "topS3cr3tP4$$w0rd";
  entry.setPassword(password);

  const result = keyringDeletePassword({ entry });
  expect(result.success).toBe(true);
});

// Failure case
test("keyringDeletePassword should fail with a KeyringNoEntryError when no password is set", () => {
  const entry = new Entry(SERVICE, "failure");

  const result = keyringDeletePassword({ entry });
  assert(result.success === false);
  expect(result.error).toBeInstanceOf(KeyringNoEntryError);
});
