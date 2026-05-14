import request from "../../../api/request";
import { learningProgressMock } from "../mock/learningProgressMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getLearningProgress() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(learningProgressMock);
      }, mockDelay);
    });
  }

  return request.get("/learning-progress");
}
