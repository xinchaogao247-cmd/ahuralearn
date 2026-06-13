import request from "../request";
import { aiStudyPlanMock } from "./aiStudyPlanMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

/**
 * 模拟接口延迟，方便本地开发时观察真实请求的加载状态。
 * @param {*} data 需要返回的模拟数据
 * @returns {Promise<*>}
 */
function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

/**
 * 获取左侧边栏的历史会话列表。
 * @returns {Promise}
 */
export const fetchHistorySessions = () => {
  return request.get("/api/ai/sessions");
};

/**
 * 根据会话 ID 获取某个历史会话的聊天记录。
 * @param {string|number} sessionId 会话 ID
 * @returns {Promise}
 */
export const fetchSessionMessages = (sessionId) => {
  return request.get(`/api/ai/sessions/${sessionId}/messages`);
};

/**
 * 发送用户关于课程推荐的提问。
 * @param {object} payload 包含 { sessionId, userMessage }
 * @returns {Promise}
 */
export const sendRecommendMessage = (payload) => {
  return request.post("/api/ai/recommend", payload);
};

/**
 * 获取 AI 学习计划页面初始化数据。
 * @returns {Promise<object>}
 */
export async function getAIStudyPlanData() {
  if (useMockApi) {
    return mockResponse(aiStudyPlanMock);
  }

  return request.get("/aiStudyPlan");
}

/**
 * 向 AI 学习计划对话发送一条用户消息。
 * @param {string} message 用户输入内容
 * @returns {Promise<object>}
 */
export async function sendAIStudyPlanMessage(message) {
  if (useMockApi) {
    return mockResponse({
      role: "assistant",
      message: "Thanks, I will generate a study plan based on your answer.",
    });
  }

  return request.post("/aiStudyPlan/chat", {
    message,
  });
}

/**
 * 获取 AI 学习计划生成过程日志。
 * @returns {Promise<Array<string>>}
 */
export async function getAIStudyPlanLogs() {
  if (useMockApi) {
    return mockResponse(aiStudyPlanMock.aiLogs);
  }

  return request.get("/aiStudyPlan/logs");
}

/**
 * 获取 AI 推荐的学习模块列表。
 * @returns {Promise<Array<object>>}
 */
export async function getRecommendedModules() {
  if (useMockApi) {
    return mockResponse(aiStudyPlanMock.recommendedModules);
  }

  return request.get("/aiStudyPlan/modules");
}

/**
 * 根据用户配置生成 AI 学习计划。
 * @param {object} data 生成学习计划所需的用户配置
 * @returns {Promise<object>}
 */
export async function generateAIStudyPlan(data) {
  if (useMockApi) {
    return mockResponse({
      success: true,
      studyPlan: data,
    });
  }

  return request.post("/aiStudyPlan/generate", data);
}

/**
 * 获取 AI 学习计划生成状态。
 * @returns {Promise<object>}
 */
export async function getAIStudyPlanStatus() {
  if (useMockApi) {
    return mockResponse({
      status: "LIVE_UPDATES",
    });
  }

  return request.get("/aiStudyPlan/status");
}
