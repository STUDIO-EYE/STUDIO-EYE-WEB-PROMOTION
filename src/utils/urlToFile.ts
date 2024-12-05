export async function urlToFile(url: string, fileName: string): Promise<File> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    console.log(blob);
    return new File([blob], fileName);
  } catch (error) {
    console.error('Error URL to file:', error);
    throw error;
  }
}
