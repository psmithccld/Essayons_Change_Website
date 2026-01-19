/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // Remove whitespace
  url = url.trim();
  
  // Match various YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/, // Just the ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Checks if a URL is a valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null;
}

/**
 * Converts a YouTube URL to an embed URL with parameters to improve compatibility
 * Uses youtube-nocookie.com for privacy-enhanced embeds and adds origin parameter
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  
  // Get current origin for the embed - helps with Error 153 issues
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  
  // Add parameters to improve embed compatibility and fix Error 153
  const params = new URLSearchParams({
    rel: '0',           // Don't show related videos
    modestbranding: '1', // Minimal YouTube branding
    enablejsapi: '1',   // Enable JS API for better control
  });
  
  // Add origin parameter if available (helps with embed restrictions)
  if (origin) {
    params.set('origin', origin);
  }
  
  // Use youtube-nocookie.com for privacy-enhanced embeds (also helps with some embed issues)
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
