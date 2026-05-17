import { myInformationMock } from "../mock/MyInformationMock";

export function getMyInformationPageData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(myInformationMock);
    }, 500);
  });
}
