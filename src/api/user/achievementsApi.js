import request from "../request";
import { achievementsMock } from "./achievementsMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 500;

export async function getAchievementsData() {
  if (useMockApi) {
    // 当前使用 mock 数据；关闭 VITE_USE_MOCK_API 后可直接走真实接口。
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(achievementsMock);
      }, mockDelay);
    });
  }

  return request.get("/achievements");
}
