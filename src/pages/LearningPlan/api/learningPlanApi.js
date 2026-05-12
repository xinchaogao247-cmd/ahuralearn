import request from "../../../api/request";
import { learningPlanMockData } from "../mock/learningPlanMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getLearningPlanData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(learningPlanMockData);
      }, mockDelay);
    });
  }

  return request.get("/learning-plan");
}
