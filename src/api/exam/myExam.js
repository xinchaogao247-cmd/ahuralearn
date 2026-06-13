import request from "../request";
import { myExamMock } from "./MyExamMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 500;

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

export async function getMyExamPageData() {
  if (useMockApi) {
    return mockResponse(myExamMock);
  }

  return request.get("/myExam");
}
