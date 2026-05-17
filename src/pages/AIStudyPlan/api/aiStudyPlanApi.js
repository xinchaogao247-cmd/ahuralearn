import request from "../../../api/request";
import { aiStudyPlanMock } from "../mock/aiStudyPlanMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getAIStudyPlanData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(aiStudyPlanMock);
      }, mockDelay);
    });
  }

  return request.get("/ai-study-plan");
}
