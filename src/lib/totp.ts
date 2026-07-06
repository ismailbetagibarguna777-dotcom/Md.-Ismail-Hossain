/**
 * Google Authenticator 2FA TOTP Generator and Verifier
 * Uses native Web Crypto API for secure SHA-1 HMAC calculations.
 * No external dependencies required.
 */

// Convert Base32 string to Uint8Array
export function base32ToBytes(base32: string): Uint8Array {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const cleaned = base32.toUpperCase().replace(/[\s-]/g, "").replace(/=+$/, "");
  const len = cleaned.length;
  const bytes = new Uint8Array(Math.floor((len * 5) / 8));
  
  let bits = 0;
  let value = 0;
  let index = 0;
  
  for (let i = 0; i < len; i++) {
    const val = base32chars.indexOf(cleaned[i]);
    if (val === -1) continue;
    
    value = (value << 5) | val;
    bits += 5;
    
    if (bits >= 8) {
      bytes[index++] = (value >>> (bits - 8)) & 255;
      bits -= 8;
    }
  }
  return bytes;
}

// Generate TOTP code using Web Crypto API
export async function generateTOTP(secretBase32: string, timeOffsetSeconds: number = 0): Promise<string> {
  try {
    const keyBytes = base32ToBytes(secretBase32);
    if (keyBytes.length === 0) return "000000";
    
    const epoch = Math.round(Date.now() / 1000) + timeOffsetSeconds;
    const timeStep = Math.floor(epoch / 30);
    
    // Convert timeStep to 8-byte big-endian array
    const timeBytes = new Uint8Array(8);
    let temp = timeStep;
    for (let i = 7; i >= 0; i--) {
      timeBytes[i] = temp & 0xff;
      temp = Math.floor(temp / 256);
    }
    
    // Import raw key into Web Crypto
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBytes,
      { name: "HMAC", hash: { name: "SHA-1" } },
      false,
      ["sign"]
    );
    
    // Sign the time step bytes
    const signatureBuffer = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      timeBytes
    );
    
    const signature = new Uint8Array(signatureBuffer);
    
    // Dynamic truncation
    const offset = signature[signature.length - 1] & 0xf;
    const binary =
      ((signature[offset] & 0x7f) << 24) |
      ((signature[offset + 1] & 0xff) << 16) |
      ((signature[offset + 2] & 0xff) << 8) |
      (signature[offset + 3] & 0xff);
    
    const otp = binary % 1000000;
    return otp.toString().padStart(6, "0");
  } catch (error) {
    console.error("Error generating TOTP:", error);
    return "000000";
  }
}

// Verify TOTP token with +/- 1 window drift allowance
export async function verifyTOTP(secretBase32: string, token: string): Promise<boolean> {
  const cleanedToken = token.trim().replace(/\s/g, "");
  if (cleanedToken.length !== 6) return false;
  
  for (let offset = -1; offset <= 1; offset++) {
    const expected = await generateTOTP(secretBase32, offset * 30);
    if (expected === cleanedToken) {
      return true;
    }
  }
  return false;
}
