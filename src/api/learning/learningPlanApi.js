import request from "../request";
import { learningPlanMockData } from "./learningPlanMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

export async function getLearningPlanData() {
  if (useMockApi) {
    return mockResponse(learningPlanMockData);
  }

  return request.get("/learning-plan");
}

export async function createStudyPlan(newPlan) {
  if (useMockApi) {
    return mockResponse(newPlan);
  }

  return request.post("/learning-plan", newPlan);
}

export async function updateStudyPlan(id, updatedPlan) {
  if (useMockApi) {
    return mockResponse({
      id,
      ...updatedPlan,
    });
  }

  return request.put(`/learning-plan/${id}`, updatedPlan);
}

export async function deleteStudyPlan(id) {
  if (useMockApi) {
    return mockResponse({
      success: true,
      id,
    });
  }

  return request.delete(`/learning-plan/${id}`);
}

export async function completeStudyPlan(id) {
  if (useMockApi) {
    return mockResponse({
      success: true,
      id,
    });
  }

  return request.patch(`/learning-plan/${id}/complete`);
}

export async function generateAIStudyPlan(data) {
  if (useMockApi) {
    return mockResponse(data);
  }

  return request.post("/learning-plan/ai-suggest", data);
}