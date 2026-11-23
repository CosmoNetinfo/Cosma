// Cifratura autenticata: una nuova IV a ogni salvataggio, chiavi soltanto in memoria.
const enc = new TextEncoder(),
  dec = new TextDecoder();
const b64 = (a) => {
  let s = "";
  for (const v of a) s += String.fromCharCode(v);
  return btoa(s);
};
const un64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
export const randomSalt = () => b64(crypto.getRandomValues(new Uint8Array(16)));
export async function derive(password, salt) {
  const material = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: un64(salt), iterations: 600000, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}
export async function seal(data, key, salt) {
  const iv = crypto.getRandomValues(new Uint8Array(12)),
    aad = enc.encode("cosma-v1");
  const bytes = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: aad },
    key,
    enc.encode(JSON.stringify(data)),
  );
  return {
    format: "cosma-encrypted",
    version: 1,
    kdf: "PBKDF2-SHA256",
    iterations: 600000,
    salt,
    iv: b64(iv),
    ciphertext: b64(new Uint8Array(bytes)),
  };
}
export function checkEnvelope(v) {
  if (
    !v ||
    v.format !== "cosma-encrypted" ||
    v.version !== 1 ||
    v.kdf !== "PBKDF2-SHA256" ||
    v.iterations !== 600000 ||
    typeof v.salt !== "string" ||
    typeof v.iv !== "string" ||
    typeof v.ciphertext !== "string" ||
    un64(v.salt).length !== 16 ||
    un64(v.iv).length !== 12 ||
    v.ciphertext.length > 40000000
  )
    throw Error("Backup cifrato non valido o versione non supportata.");
}
export async function unseal(v, key) {
  checkEnvelope(v);
  try {
    const bytes = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: un64(v.iv),
        additionalData: enc.encode("cosma-v1"),
      },
      key,
      un64(v.ciphertext),
    );
    return JSON.parse(dec.decode(bytes));
  } catch {
    throw Error("Password o PIN errati, oppure archivio danneggiato.");
  }
}
export async function encryptBackup(data, password) {
  if (password.length < 10)
    throw Error("Usa una password di almeno 10 caratteri.");
  const salt = randomSalt();
  return seal(data, await derive(password, salt), salt);
}
export async function decryptBackup(data, password) {
  checkEnvelope(data);
  return unseal(data, await derive(password, data.salt));
}
