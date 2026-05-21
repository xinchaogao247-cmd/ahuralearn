import request from "../request";
import { aiStudyPlanMock } from "./aiStudyPlanMock";

/**
 * 是否使用 Mock API 数据。
 *
 * 当 VITE_USE_MOCK_API 不等于 "false" 时，
 * 默认使用本地 mock 数据，而不是请求真实后端接口。
 */
const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";

/**
 * 模拟 API 请求延迟时间（毫秒）。
 *
 * 用于模拟真实网络请求加载效果。
 */
const mockDelay = 300;

/**
 * 获取 AI 学习计划页面数据。
 *
 * 开发阶段：
 * 返回本地 mock 数据，并模拟网络延迟。
 *
 * 后期接入后端：
 * 会自动请求真实 API 接口。
 */
export async function getAIStudyPlanData() {
  // 使用本地 mock 数据
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(aiStudyPlanMock);
      }, mockDelay);
    });
  }

  // 请求真实后端接口
  return request.get("/ai-study-plan");
}
