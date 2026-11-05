import { Entry } from "@napi-rs/keyring";
import { expect, test } from "vitest";

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
