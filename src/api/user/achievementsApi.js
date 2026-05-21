import request from "../request";
import { achievementsMock } from "./achievementsMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 500;

export async function getAchievementsData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(achievementsMock);
      }, mockDelay);
    });
  }

  return request.get("/achievements");
}
