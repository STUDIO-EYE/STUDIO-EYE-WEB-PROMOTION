export function extractFileNameFromUrl(url: string): string {
  try {
    if (!url || url.includes('undefined')) {
      console.error('Invalid URL detected:', url);
      // 고유 파일 이름을 추가하여 충돌 방지
      const uniqueSuffix = Math.random().toString(36).slice(-6);
      return `default_${uniqueSuffix}.jpg`;
    }

    const urlObject = new URL(url);
    let fileName = decodeURIComponent(urlObject.pathname.split('/').pop() || '');

    // 파일 이름이 유효하지 않으면 기본값 반환
    if (!fileName || fileName === 'undefined') {
      const uniqueSuffix = Math.random().toString(36).slice(-6);
      return `default_${uniqueSuffix}.jpg`;
    }

    return fileName;
  } catch (error) {
    console.error('Error extracting file name from URL:', error);
    const uniqueSuffix = Math.random().toString(36).slice(-6);
    return `default_${uniqueSuffix}.jpg`;
  }
}

// URL 유효성 검사 함수
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url); // URL이 유효하면 true 반환
    return true;
  } catch {
    return false; // 유효하지 않으면 false 반환
  }
};

// URL을 File 객체로 변환하는 함수
export async function urlToFile(url: string | null, fileName?: string): Promise<File> {
  try {
    if (!url || !isValidUrl(url)) {
      console.error('Invalid URL detected:', url);
      const uniqueSuffix = Math.random().toString(36).slice(-6); // 고유값 추가
      return new File([], fileName || `default_${uniqueSuffix}.png`, { type: 'image/png' }); // 기본값 반환
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const finalFileName = fileName ? extractFileNameFromUrl(fileName) : extractFileNameFromUrl(url);

    // 중복 확장자 제거 및 최종 파일 이름 처리
    const sanitizedFileName = finalFileName.replace(/(\.[a-zA-Z0-9]+)+$/, (match) =>
      match.split('.').slice(0, 2).join('.'),
    );

    return new File([blob], sanitizedFileName, { type: blob.type });
  } catch (error) {
    console.error('[Error converting URL to file]', { url, fileName, error });
    const uniqueSuffix = Math.random().toString(36).slice(-6); // 고유값 추가
    return new File([], fileName || `default_${uniqueSuffix}.png`, { type: 'image/png' }); // 기본값 반환
  }
}
