const BASIC_PATH = "http://3.35.54.100:8080/";

export interface IFAQ {
  id: number;
  title: string;
  content: string;
}

export interface IGetFAQData {
  data: IFAQ[];
}

export interface IGetFAQDetailData {
  data: IFAQ;
}

export function getFAQData() {
  return fetch(`${BASIC_PATH}api/faq`).then((response) => response.json());
}

export function getFAQDetailData(id: number) {
  return fetch(`${BASIC_PATH}api/faq/${id}`).then((response) =>
    response.json()
  );
}
