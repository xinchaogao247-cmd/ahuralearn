import request from "../../../api/request";
import { dashboardMock } from "../mock/dashboardMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 300;

export async function getDashboardData() {
  if (useMockApi) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dashboardMock);
      }, mockDelay);
    });
  }

  return request.get("/dashboard");
}
