export function extractFileNameFromUrl(url: string): string {
  try {
    if (!url || url.includes('undefined')) {
      console.error('Invalid URL:', url);
      return 'default.png'; // 기본값
    }

    const urlObject = new URL(url);
    let fileName = decodeURIComponent(urlObject.pathname.split('/').pop() || 'default.png');

    // 파일 이름이 유효하지 않을 경우 기본값 설정
    if (!fileName || fileName === 'undefined') {
      return 'default.png';
    }

    const maxFileNameLength = 50; // 파일 이름 길이 제한
    const extensionMatch = fileName.match(/\.[^/.]+$/); // 확장자 확인
    const extension = extensionMatch ? extensionMatch[0] : '.png'; // 확장자가 없으면 `.png`
    const baseName = fileName.replace(/\.[^/.]+$/, ''); // 확장자 제거

    // 파일 이름 길이 제한 적용
    if (baseName.length > maxFileNameLength - extension.length) {
      const truncatedName = baseName.slice(0, maxFileNameLength - extension.length - 5); // 고유값 포함 길이 조정
      const uniqueSuffix = Math.random().toString(36).slice(-4); // 고유 식별자 추가
      fileName = `${truncatedName}_${uniqueSuffix}${extension}`;
    }

    return fileName;
  } catch (error) {
    console.error('Error extracting file name from URL:', error);
    return 'default.png'; // 기본값 반환
  }
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url); // URL 생성이 성공하면 유효
    return true;
  } catch {
    return false; // 실패 시 false 반환
  }
};

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

    // 이미 `File` 형태의 데이터가 있으면 처리 반복 방지
    if (finalFileName.includes('.png.png')) {
      console.warn(`Skipping redundant processing for: ${finalFileName}`);
      return new File([blob], finalFileName.replace(/(\.png)+$/, '.png'), { type: blob.type });
    }

    return new File([blob], finalFileName, { type: blob.type });
  } catch (error) {
    console.error('[Error converting URL to file]', { url, fileName, error });
    return new File([], fileName || 'default.png', { type: 'image/png' }); // 기본값 반환
  }
}
