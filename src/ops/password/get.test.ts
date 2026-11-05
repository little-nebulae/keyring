import { unwrap } from "@little-nebulae/result";
import { Entry } from "@napi-rs/keyring";
import { expect, onTestFinished, test } from "vitest";

import { keyringGetPassword } from "@/ops/password/get";

const SERVICE = "keyring.password.get.test";

// Success case
test("keyringGetPassword should succeed at getting an existing password", () => {
  const entry = new Entry(SERVICE, "success");
  const password = "topS3cr3tP4$$w0rd";
  entry.setPassword(password);
  onTestFinished(() => {
    entry.deletePassword();
  });

  const got = unwrap(keyringGetPassword({ entry }));
  expect(got).toBe(password);
});
