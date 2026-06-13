import request from '../request';
import { coursesPageMock } from './coursesMock';

const useMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false';
const mockDelay = 300;

function mockResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, mockDelay);
  });
}

export const getHeroBanners = async () => {
  return request.get('/api/v1/homepage/banners');
};

export const getTrendingCourses = async () => {
  return request.get('/api/v1/homepage/trendingCourses?limit=8');
};

export const getNewRecommendations = async () => {
  return request.get('/api/v1/homepage/newRecommendations?limit=8');
};

export const searchCourses = async (keyword) => {
  return request.get(`/api/v1/courses/search?keyword=${encodeURIComponent(keyword)}`);
};

export async function getCoursesPageData() {
  if (useMockApi) {
    return mockResponse(coursesPageMock);
  }

  return request.get('/coursesPage');
}

export const getCourseDetail = (courseId) => {
  return request.get(`/api/v1/courses/${courseId}`);
};

export const getEnrollmentStatus = (courseId) => {
  return request.get(`/api/v1/courses/${courseId}/enrollmentStatus`);
};

export const enrollCourse = (courseId) => {
  return request.post(`/api/v1/courses/${courseId}/enroll`);
};

export const getCourseLearningDetails = (courseId) => {
  return request.get(`/api/v1/learning/courses/${courseId}`);
};

export const saveVideoProgress = (lessonId, progressTime) => {
  return request.post(`/api/v1/learning/lessons/${lessonId}/progress`, { progressTime });
};

export const markLessonComplete = (lessonId) => {
  return request.post(`/api/v1/learning/lessons/${lessonId}/complete`);
};
