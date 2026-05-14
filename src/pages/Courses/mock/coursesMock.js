import gameIcon from "../../../assets/icons/game-button.png";
import devIcon from "../../../assets/icons/development.png";
import designIcon from "../../../assets/icons/design.png";
import dataIcon from "../../../assets/icons/datascience.png";
import goalImg from "../../../assets/icons/goal.png";
import reactImg from "../../../assets/images/react-course.png";
import pythonImg from "../../../assets/images/python-course.png";
import uiuxImg from "../../../assets/images/uiux-course.png";

export const coursesMock = [
  {
    id: 1,
    title: "Web Development Masterclass",
    instructor: "Sarah Drasner",
    rating: "★ 4.9",
    reviews: "(1.2k reviews)",
    status: "IN PROGRESS",
    progress: 60,
    lessons: "12/20 Lessons",
    image: reactImg,
    actionIcon: gameIcon,
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    instructor: "Jose Portner",
    rating: "★ 4.8",
    reviews: "(3.5k reviews)",
    status: "IN PROGRESS",
    progress: 35,
    lessons: "7/20 Lessons",
    image: pythonImg,
    actionIcon: gameIcon,
    progressClass: "second",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Gary Simon",
    rating: "★ 5.0",
    reviews: "(850 reviews)",
    status: "COMPLETED",
    progress: 100,
    image: uiuxImg,
    actionIcon: gameIcon,
    badgeClass: "completed",
    progressClass: "third",
  },
];

export const coursesPageMock = {
  summary: "You have 2 courses in progress this week.",
  filters: ["All", "In Progress", "Completed"],
  courses: coursesMock,
  categories: [
    {
      id: 1,
      title: "Development",
      count: 12,
      icon: devIcon,
    },
    {
      id: 2,
      title: "Design",
      count: 8,
      icon: designIcon,
    },
    {
      id: 3,
      title: "Data Science",
      count: 5,
      icon: dataIcon,
    },
  ],
  goal: {
    label: "WEEKLY GOAL",
    title: "Finish 5 lessons",
    progress: "4/5",
    icon: goalImg,
  },
};
