import { myExamMock } from "../mock/MyExamMock";

export function getMyExamPageData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(myExamMock);
    }, 500);
  });
}
