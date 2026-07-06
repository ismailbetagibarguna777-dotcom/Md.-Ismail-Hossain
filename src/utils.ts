export const getEmojiImage = (emoji: string, size = 64): string => {
  if (!emoji) return '';
  
  // If the input is already a direct URL or local asset, return it as is
  if (
    emoji.startsWith('http://') || 
    emoji.startsWith('https://') || 
    emoji.startsWith('/') || 
    emoji.startsWith('data:') ||
    emoji.includes('.')
  ) {
    return emoji;
  }
  
  // Clean emoji string by converting to code points and filtering out variation selectors
  const codePoints = [...emoji]
    .map(c => c.codePointAt(0)!.toString(16).toLowerCase())
    .filter(hex => hex !== 'fe0f' && hex !== 'fe0e') // Strip variation selectors (FE0F and FE0E)
    .join('-');
    
  if (!codePoints) return '';
  
  // Use a highly stable and reliable Twemoji SVG CDN (via cdnjs on Cloudflare) which renders beautifully at any size
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${codePoints}.svg`;
};
