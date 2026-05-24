import request from "../request";
import { myInformationMock } from "./MyInformationMock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== "false";
const mockDelay = 500;

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

export async function getMyInformationPageData() {
  if (useMockApi) {
    return mockResponse(myInformationMock);
  }

  return request.get("/my-information");
}

export async function updateProfile(profileData) {
  if (useMockApi) {
    return mockResponse(profileData);
  }

  return request.put("/profile", profileData);
}

export async function updateLearningProfile(learningProfileData) {
  if (useMockApi) {
    return mockResponse(learningProfileData);
  }

  return request.put(
    "/profile/learning-profile",
    learningProfileData
  );
}

export async function uploadAvatar(formData) {
  if (useMockApi) {
    return mockResponse({
      avatarUrl: "/mock-avatar.png",
    });
  }

  return request.post("/profile/avatar", formData);
}

export async function shareProfile(data) {
  if (useMockApi) {
    return mockResponse({
      success: true,
    });
  }

  return request.post("/profile/share", data);
}