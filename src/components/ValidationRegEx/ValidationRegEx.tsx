export const emailCheck = (email: string) => {
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  if (!emailRegEx.test(email)) {
    return false;
  }
  return true;
};

export const phoneFaxCheck = (phoneFax: string) => {
  const phoneFaxRegEx = /^(0\d{1,2})-(\d{3,4})-(\d{4})$/;
  if (!phoneFaxRegEx.test(phoneFax) || phoneFax === '') {
    return false;
  }
  return true;
};

export const linkCheck = (url: string) => {
  const urlRegex = /^(https?|ftp):\/\/([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}(\/[^\s]*)?$/i;
  if (!urlRegex.test(url.trim())) {
    return false;
  }
  return true;
};
