const BLOCKED_DOMAINS = [
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "guerrillamailblock.com", "grr.la",
  "dispostable.com", "trashmail.com", "fakeinbox.com", "tempail.com",
  "maildrop.cc", "10minutemail.com", "getnada.com", "temp-mail.org",
  "mohmal.com", "burnermail.io", "mailnesia.com"
];

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return { valid: false, error: "Email is required" };
  }
  
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: "Please enter a valid email address" };
  }
  
  const domain = trimmed.split("@")[1]?.toLowerCase();
  if (!domain) {
    return { valid: false, error: "Please enter a valid email address" };
  }
  
  if (BLOCKED_DOMAINS.includes(domain)) {
    return { valid: false, error: "Disposable email addresses are not accepted. Please use your real email." };
  }
  
  return { valid: true };
}
