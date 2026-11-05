import { Entry } from "@napi-rs/keyring";
import { describe, expect, onTestFinished, test } from "vitest";

import { keyringSetPassword } from "@/ops/password/set";

const SERVICE = "keyring.password.set.test";

// Success cases
describe("keyringSetPassword should succeed at setting", () => {
  test("a new password", () => {
    const entry = new Entry(SERVICE, "success");
    onTestFinished(() => {
      entry.deletePassword();
    });
    const password = "topS3cr3tP4$$w0rd";

    const result = keyringSetPassword({ entry, password });
    expect(result.success).toBe(true);
  });
});
