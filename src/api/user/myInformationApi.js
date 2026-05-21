import { myInformationMock } from "./MyInformationMock";

export function getMyInformationPageData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(myInformationMock);
    }, 500);
  });
}
