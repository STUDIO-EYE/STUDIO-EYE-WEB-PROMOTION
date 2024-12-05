function extractFileNameFromUrl(url: string): string {
  try {
    const urlObject = new URL(url);
    let fileName = urlObject.pathname.split('/').pop() || 'default.png';

    // URL 인코딩된 문자 디코딩
    fileName = decodeURIComponent(fileName);

    // 파일 이름에서 확장자를 추출
    const hasExtension = fileName.includes('.');
    if (!hasExtension) {
      fileName += '.png'; // 확장자가 없으면 기본 확장자 추가
    }

    // 파일 이름이 너무 길면 자르기
    if (fileName.length > 100) {
      const extension = fileName.split('.').pop(); // 확장자 추출
      fileName = fileName.slice(0, 50) + (extension ? `.${extension}` : '');
    }

    return fileName;
  } catch (error) {
    console.error('Invalid URL:', url);
    return 'default.png';
  }
}

export async function urlToFile(url: string, fileName?: string): Promise<File> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // 파일 이름을 URL에서 추출하거나 제공된 파일 이름 사용
    let finalFileName = fileName || extractFileNameFromUrl(url);

    // 파일 이름이 너무 길거나 이미 저장된 S3 URL처럼 보이면 간단한 이름으로 변경
    if (finalFileName.length > 100 || finalFileName.includes('http')) {
      finalFileName = extractFileNameFromUrl(url);
    }

    return new File([blob], finalFileName, { type: blob.type });
  } catch (error) {
    console.error('Error converting URL to file:', error);
    throw error;
  }
}
