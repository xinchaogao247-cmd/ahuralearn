import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { logoutAccount } from '../../../api/user/user';
import {
  getUnreadNotificationCount,
  notificationsUpdatedEvent,
} from '../../../api/notification/notificationStorage';
import styles from './TopNav.module.css';
import logoImage from "../../../assets/images/logo.png";

const fallbackUserInfo = {
  username: 'Student 01',
  email: 'student01@gmail.com',
  enrolledCourses: 3,
  avatar: 'https://i.pravatar.cc/150?img=47'
};

function getInitialUserInfo() {
  const storedUser = localStorage.getItem('userInfo');

  if (!storedUser) {
    return fallbackUserInfo;
  }

  try {
    return JSON.parse(storedUser);
  } catch (err) {
    console.warn("Failed to parse stored user info", err);
    return fallbackUserInfo;
  }
}

export default function TopNav() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userInfo] = useState(getInitialUserInfo);
  const [notificationCount, setNotificationCount] = useState(
    getUnreadNotificationCount
  );

  useEffect(() => {
    const updateNotificationCount = () => {
      setNotificationCount(getUnreadNotificationCount());
    };

    window.addEventListener(notificationsUpdatedEvent, updateNotificationCount);
    window.addEventListener("storage", updateNotificationCount);

    return () => {
      window.removeEventListener(
        notificationsUpdatedEvent,
        updateNotificationCount
      );
      window.removeEventListener("storage", updateNotificationCount);
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (searchKeyword.trim() !== '') {
        navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAccount();
    } catch (err) {
      console.warn("Logout request failed, proceeding to clear local state.", err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  };

  return (
    <div className={styles.topNavContainer}>
      <div className={styles.navLeft}>
        <div className={styles.logoArea}>
          <img src={logoImage} alt="AhuraLearn Logo" className={styles.logoIcon} />
          <h1 className={styles.logoTitle}>AhuraLearn</h1>
        </div>

        <div className={styles.navHomepage}>
          <Link to="/homepage" className={styles.navLinkItem}>Homepage</Link>
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
          <Link to="#" className={`${styles.navLinkItem} ${styles.navLearnWithAI}`}>Learn with AI</Link>
          <Link to="/" className={styles.navLinkItem}>My Profile</Link>
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
            <img src={userInfo.avatar} alt="User Avatar" className={styles.avatarImage} />

            <div className={styles.profileDropdownMenu}>
              <div className={styles.dropdownUserInfo}>
                <h3 className={styles.dropdownUsername}>{userInfo.username}</h3>
                <p className={styles.dropdownEmail}>{userInfo.email}</p>
                <p className={styles.dropdownEnrolled}>Enrolled Courses: {userInfo.enrolledCourses}</p>
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
