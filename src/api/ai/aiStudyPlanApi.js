import request from "../request";
import { aiStudyPlanMock } from "./aiStudyPlanMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

export async function getAIStudyPlanData() {
  if (useMockApi) {
    return mockResponse(aiStudyPlanMock);
  }

  return request.get("/ai-study-plan");
}

export async function sendAIStudyPlanMessage(message) {
  if (useMockApi) {
    return mockResponse({
      role: "assistant",
      message: "Thanks, I will generate a study plan based on your answer.",
    });
  }

  return request.post("/ai-study-plan/chat", {
    message,
  });
}

export async function getAIStudyPlanLogs() {
  if (useMockApi) {
    return mockResponse(aiStudyPlanMock.logs);
  }

  return request.get("/ai-study-plan/logs");
}

export async function getRecommendedModules() {
  if (useMockApi) {
    return mockResponse(aiStudyPlanMock.recommendedModules);
  }

  return request.get("/ai-study-plan/modules");
}

export async function generateAIStudyPlan(data) {
  if (useMockApi) {
    return mockResponse({
      success: true,
      studyPlan: data,
    });
  }

  return request.post("/ai-study-plan/generate", data);
}

export async function getAIStudyPlanStatus() {
  if (useMockApi) {
    return mockResponse({
      status: "LIVE_UPDATES",
    });
  }

  return request.get("/ai-study-plan/status");
}