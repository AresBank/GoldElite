
/**
 * Utility for AES-256-GCM encryption/decryption using Web Crypto API.
 * In a real production environment, the 'masterKey' would be managed securely 
 * and never exposed in frontend code.
 */

const ENCRYPTION_ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

// Simulated Master Key (In reality, this would come from a secure vault or derived from user credentials)
const MOCK_MASTER_KEY_RAW = 'gold-payments-elite-secure-vault-2025';

async function getEncryptionKey(rawKey: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyData = enc.encode(rawKey.padEnd(32, '0').slice(0, 32)); // Ensure 32 bytes for AES-256
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: ENCRYPTION_ALGORITHM },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptToken(plainText: string): Promise<{ encrypted: string; iv: string }> {
  const key = await getEncryptionKey(MOCK_MASTER_KEY_RAW);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // GCM standard IV length is 12 bytes
  const enc = new TextEncoder();
  
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: ENCRYPTION_ALGORITHM, iv },
    key,
    enc.encode(plainText)
  );

  return {
    encrypted: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
    iv: btoa(String.fromCharCode(...iv))
  };
}

export async function decryptToken(encryptedBase64: string, ivBase64: string): Promise<string> {
  const key = await getEncryptionKey(MOCK_MASTER_KEY_RAW);
  const iv = new Uint8Array(atob(ivBase64).split('').map(c => c.charCodeAt(0)));
  const encryptedData = new Uint8Array(atob(encryptedBase64).split('').map(c => c.charCodeAt(0)));

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: ENCRYPTION_ALGORITHM, iv },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedBuffer);
}
