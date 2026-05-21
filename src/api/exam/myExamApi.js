import request from "../request";
import { myExamMock } from "./MyExamMock";

/**
 * 是否使用 Mock API 数据。
 */
const useMockApi =
  import.meta.env.VITE_USE_MOCK_API !== "false";

/**
 * 模拟 API 请求延迟时间（毫秒）。
 */
const mockDelay = 500;

/**
 * 获取 My Exam 页面数据。
 *
 * 开发阶段：
 * 返回本地 mock 数据。
 *
 * 后期接入后端：
 * 请求真实 API 接口。
 */
export async function getMyExamPageData() {
  // 使用本地 mock 数据
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(myExamMock);
      }, mockDelay);
    });
  }

  // 请求真实后端接口
  return request.get("/my-exam");
}
