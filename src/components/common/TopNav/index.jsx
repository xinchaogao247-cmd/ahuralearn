import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bell } from "lucide-react";

import { getNotificationsData } from "../../../api/notification/notifications";
import { logoutAccount } from "../../../api/user/user";

import styles from "./TopNav.module.css";
import logoImage from "../../../assets/images/logo.png";

const notificationsUpdatedEvent = "notifications-updated";
const notificationStateKey = "__ahuralearnNotificationState";

function getNotificationState() {
  if (!window[notificationStateKey]) {
    window[notificationStateKey] = {
      acknowledgedPlanIds: [],
      deletedPlanIds: [],
    };
  }

  return window[notificationStateKey];
}

function getUnreadNotificationCount(plans = []) {
  const { acknowledgedPlanIds, deletedPlanIds } = getNotificationState();

  return plans.filter(
    (plan) =>
      !acknowledgedPlanIds.includes(plan.id) && !deletedPlanIds.includes(plan.id)
  ).length;
}

/**
 * 初学者指南：TopNav 顶栏组件
 *
 * 该组件提供全局顶部导航功能：
 * - Logo
 * - Homepage 跳转
 * - 搜索框
 * - Learn with AI 跳转
 * - My Profile 显示
 * - 通知未读数量
 * - 用户头像下拉菜单
 * - 登出功能
 */
export default function TopNav() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const [notificationCount, setNotificationCount] = useState(0);

  const [userInfo, setUserInfo] = useState({
    username: "Guest",
    email: "guest@example.com",
    enrolledCourses: 0,
    avatar: "https://via.placeholder.com/150",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      try {
        setUserInfo(JSON.parse(storedUser));
      } catch (err) {
        console.warn("Failed to parse stored user info", err);
      }
    } else {
      setUserInfo({
        username: "Student 01",
        email: "student01@gmail.com",
        enrolledCourses: 3,
        avatar: "https://i.pravatar.cc/150?img=47",
      });
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    const updateNotificationCount = async () => {
      try {
        const notificationsData = await getNotificationsData();

        if (!ignore) {
          setNotificationCount(
            getUnreadNotificationCount(notificationsData.expiringPlans ?? [])
          );
        }
      } catch (err) {
        if (!ignore) {
          console.warn("Failed to load notification count", err);
        }
      }
    };

    updateNotificationCount();

    window.addEventListener(notificationsUpdatedEvent, updateNotificationCount);
    window.addEventListener("storage", updateNotificationCount);

    return () => {
      ignore = true;
      window.removeEventListener(
        notificationsUpdatedEvent,
        updateNotificationCount
      );
      window.removeEventListener("storage", updateNotificationCount);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAccount();
    } catch (err) {
      console.warn(
        "Logout request failed, proceeding to clear local state.",
        err
      );
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");

      navigate("/login");
    }
  };

  return (
    <div className={styles.topNavContainer}>
      <div className={styles.navLeft}>
        <div className={styles.logoArea}>
          <img
            src={logoImage}
            alt="AhuraLearn Logo"
            className={styles.logoIcon}
          />
          <h1 className={styles.logoTitle}>AhuraLearn</h1>
        </div>

        <div className={styles.navHomepage}>
          <Link to="/homepage" className={styles.navLinkItem}>
            Homepage
          </Link>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} onClick={handleSearch} />

        <input
          type="text"
          placeholder="What do you want to learn?"
          className={styles.searchInput}
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className={styles.navRight}>
        <div className={styles.navExtraLinks}>
          <Link
            to="/featureHub"
            className={`${styles.navLinkItem} ${styles.navLearnWithAI}`}
          >
            Learn with AI
          </Link>

          <Link to="/dashboard" className={styles.navLinkItem}>
            My Profile
          </Link>
        </div>

        <div className={styles.navRightIcons}>
          <Link
            to="/notifications"
            className={styles.notificationIconWrapper}
            aria-label="View notifications"
          >
            <Bell size={20} />

            {notificationCount > 0 && (
              <span className={styles.notificationBadge}>
                {notificationCount}
              </span>
            )}
          </Link>

          <div className={styles.avatarWrapper}>
            <img
              src={userInfo.avatar}
              alt="User Avatar"
              className={styles.avatarImage}
            />

            <div className={styles.profileDropdownMenu}>
              <div className={styles.dropdownUserInfo}>
                <h3 className={styles.dropdownUsername}>
                  {userInfo.username}
                </h3>
                <p className={styles.dropdownEmail}>{userInfo.email}</p>
                <p className={styles.dropdownEnrolled}>
                  Enrolled Courses: {userInfo.enrolledCourses}
                </p>
              </div>

              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
