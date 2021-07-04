import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const fingerprint = FingerprintJS.load().then(async (result) => {
  result.get().then((response) => response);
});
