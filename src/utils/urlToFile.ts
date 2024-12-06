// 파일 이름을 URL에서 추출하는 함수
export function extractFileNameFromUrl(url: string): string {
  try {
    if (!url || url.includes('undefined')) {
      console.error('Invalid URL:', url);
      return 'default.png'; // 기본값 반환
    }

    const urlObject = new URL(url);
    let fileName = decodeURIComponent(urlObject.pathname.split('/').pop() || 'default.png');

    const maxFileNameLength = 50; // 파일 이름 길이 제한
    const extensionMatch = fileName.match(/\.[^/.]+$/); // 확장자 추출
    const extension = extensionMatch ? extensionMatch[0] : '.png'; // 확장자가 없으면 기본값 설정
    const baseName = fileName.replace(/\.[^/.]+$/, ''); // 확장자 제거

    // 파일 이름이 너무 길면 고유 식별자 추가
    if (baseName.length > maxFileNameLength - extension.length) {
      const truncatedName = baseName.slice(0, maxFileNameLength - extension.length - 5);
      const uniqueSuffix = Math.random().toString(36).slice(-4); // 고유값 추가
      fileName = `${truncatedName}_${uniqueSuffix}${extension}`;
    }

    return fileName;
  } catch (error) {
    console.error('Error extracting file name from URL:', error);
    return 'default.png'; // 에러 발생 시 기본값 반환
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
      return new File([], fileName || 'default.png', { type: 'image/png' }); // 기본값 반환
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const finalFileName = fileName ? extractFileNameFromUrl(fileName) : extractFileNameFromUrl(url);

    // 중복된 확장자 처리 방지
    const sanitizedFileName = finalFileName.replace(/(\.[a-zA-Z0-9]+)+$/, (match) =>
      match.split('.').slice(0, 2).join('.'),
    );

    return new File([blob], sanitizedFileName, { type: blob.type });
  } catch (error) {
    console.error('[Error converting URL to file]', { url, fileName, error });
    return new File([], fileName || 'default.png', { type: 'image/png' }); // 기본값 반환
  }
}
