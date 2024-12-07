export function extractFileNameFromUrl(url: string): string {
  try {
    if (!url || url.includes('undefined')) {
      console.error('Invalid URL detected:', url);
      const uniqueSuffix = Math.random().toString(36).slice(-6);
      return `default_${uniqueSuffix}.jpg`;
    }

    const urlObject = new URL(url);
    const fileName = decodeURIComponent(urlObject.pathname.split('/').pop() || '');
    const validFileName = fileName.match(/^[\w,\s-]+\.[A-Za-z]{3,4}$/) ? fileName : null;

    if (!validFileName) {
      const uniqueSuffix = Math.random().toString(36).slice(-6);
      return `default_${uniqueSuffix}.jpg`;
    }

    return validFileName;
  } catch (error) {
    console.error('[Error extracting file name from URL]', error);
    const uniqueSuffix = Math.random().toString(36).slice(-6);
    return `default_${uniqueSuffix}.jpg`;
  }
}

// URL 유효성 검사
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true; // URL 유효
  } catch {
    return false; // URL 비유효
  }
};

export async function urlToFile(url: string | null, fileName?: string): Promise<File> {
  try {
    if (!url || !isValidUrl(url)) {
      console.error('[Invalid URL detected]', url);
      const uniqueSuffix = Math.random().toString(36).slice(-6);
      return new File([], fileName || `default_${uniqueSuffix}.png`, { type: 'image/png' });
    }

    // 캐시 무효화를 위해 URL에 타임스탬프 추가
    const cacheBusterUrl = `${url}?t=${Date.now()}`;

    const response = await fetch(cacheBusterUrl, {
      method: 'GET',
      mode: 'cors', // CORS 모드 활성화
      headers: {
        'Content-Type': 'application/octet-stream', // 적절한 헤더 추가
      },
    });

    if (!response.ok) {
      console.error(`[Fetch failed] Status: ${response.status}, URL: ${cacheBusterUrl}`);
      throw new Error(`[Failed to fetch resource] ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const finalFileName = fileName ? extractFileNameFromUrl(fileName) : extractFileNameFromUrl(url);

    // 확장자 중복 방지
    const sanitizedFileName = finalFileName.replace(/(\.[a-zA-Z0-9]+)+$/, (match) =>
      match.split('.').slice(0, 2).join('.'),
    );

    return new File([blob], sanitizedFileName, { type: blob.type });
  } catch (error) {
    console.error('[Error converting URL to file]', { url, fileName, error });
    const uniqueSuffix = Math.random().toString(36).slice(-6);
    return new File([], fileName || `default_${uniqueSuffix}.png`, { type: 'image/png' });
  }
}
