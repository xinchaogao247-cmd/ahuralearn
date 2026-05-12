import request from "../../../api/request";
import { coursesPageMock } from "../mock/coursesMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getCoursesPageData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(coursesPageMock);
      }, mockDelay);
    });
  }

  return request.get("/courses-page");
}
