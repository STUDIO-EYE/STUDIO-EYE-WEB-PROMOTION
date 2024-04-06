// artwork 데이터 보고 수정 필요할 수 있음

interface IArkwork {
  id: number;
  title: string;
  client: string;
  img: string;
}

export interface IGetArtworksResult {
  data: IArkwork[];
}

export function getArtworkData() {
  return fetch("http://3.36.117.230:8080/api/projects").then((response) =>
    response.json()
  );
}
