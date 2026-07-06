/**
 * Helper to resolve the correct API base URL for deployment environments.
 * If VITE_API_URL is configured in environment variables (e.g., when deploying 
 * static frontend on GitHub Pages and proxying to Vercel/Netlify for Gemini API),
 * it will prepend that URL. Otherwise, it defaults to relative paths.
 */
export function getApiUrl(endpoint: string): string {
  const meta = import.meta as any;
  const baseUrl = meta.env?.VITE_API_URL || '';
  if (!baseUrl) {
    return endpoint;
  }
  
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${cleanBase}${cleanEndpoint}`;
}
