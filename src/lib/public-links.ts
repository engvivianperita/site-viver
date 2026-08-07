/** Impede que endereços temporários ou de desenvolvimento sejam exibidos ao público. */
export function safePublicUrl(value?: string) {
  const url = value?.trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return "";
    if (["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(parsed.hostname.toLowerCase())) return "";
    const searchable = `${parsed.hostname}${parsed.pathname}`.toLowerCase();
    if (searchable.includes("chatgpt") || searchable.includes("vdeolisantos")) return "";
    return parsed.toString();
  } catch {
    return "";
  }
}
