import request from '../request';

export const getHeroBanners = async () => {
  return request.get('/api/v1/homepage/banners');
};

export const getTrendingCourses = async () => {
  return request.get('/api/v1/homepage/trending-courses?limit=8');
};

export const getNewRecommendations = async () => {
  return request.get('/api/v1/homepage/new-recommendations?limit=8');
};

export const searchCourses = async (keyword) => {
  return request.get(`/api/v1/courses/search?keyword=${encodeURIComponent(keyword)}`);
};

export const getCourseDetail = (courseId) => {
  return request.get(`/api/v1/courses/${courseId}`);
};

export const getEnrollmentStatus = (courseId) => {
  return request.get(`/api/v1/courses/${courseId}/enrollment-status`);
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

