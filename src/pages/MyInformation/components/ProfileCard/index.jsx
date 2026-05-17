import { useState } from "react";
import { Check, Pencil, Share2, X } from "lucide-react";

import styles from "./ProfileCard.module.css";

const fallbackAvatar = "https://i.pravatar.cc/150?img=47";

function getTopbarAvatar(profileAvatar) {
  const storedUser = localStorage.getItem("userInfo");

  if (!storedUser) {
    return profileAvatar || fallbackAvatar;
  }

  try {
    const userInfo = JSON.parse(storedUser);

    return userInfo.avatar || profileAvatar || fallbackAvatar;
  } catch (error) {
    console.warn("Failed to parse stored user info", error);
    return profileAvatar || fallbackAvatar;
  }
}

export default function ProfileCard({ profile }) {
  const [profileInfo, setProfileInfo] = useState(profile);
  const [draftProfile, setDraftProfile] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(() =>
    getTopbarAvatar(profile.avatar)
  );
  const [shareLabel, setShareLabel] = useState("Share Profile");

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const nextAvatar = reader.result;
      const storedUser = localStorage.getItem("userInfo");

      setAvatarSrc(nextAvatar);

      if (storedUser) {
        try {
          const userInfo = JSON.parse(storedUser);

          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              ...userInfo,
              avatar: nextAvatar,
            })
          );
        } catch (error) {
          console.warn("Failed to update stored avatar", error);
        }
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const updateDraftField = (field, value) => {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setDraftProfile(profileInfo);
    setEditing(true);
  };

  const handleCancel = () => {
    setDraftProfile(profileInfo);
    setEditing(false);
  };

  const handleSave = () => {
    const nextProfile = {
      ...draftProfile,
      name: draftProfile.name.trim() || profileInfo.name,
      role: draftProfile.role.trim() || profileInfo.role,
      description: draftProfile.description.trim() || profileInfo.description,
    };
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      try {
        const userInfo = JSON.parse(storedUser);

        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            username: nextProfile.name,
          })
        );
      } catch (error) {
        console.warn("Failed to update stored user info", error);
      }
    }

    setProfileInfo(nextProfile);
    setDraftProfile(nextProfile);
    setEditing(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: profileInfo.name,
      text: `${profileInfo.name} - ${profileInfo.role}. ${profileInfo.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareLabel("Shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`
        );
        setShareLabel("Copied Link");
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = `${shareData.text} ${shareData.url}`;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setShareLabel("Copied Link");
      }

      window.setTimeout(() => {
        setShareLabel("Share Profile");
      }, 1800);
    } catch (error) {
      if (error.name !== "AbortError") {
        setShareLabel("Share Failed");
        window.setTimeout(() => {
          setShareLabel("Share Profile");
        }, 1800);
      }
    }
  };

  return (
    <section className={styles.profileCard}>
      <label className={styles.avatarWrap} title="Change avatar">
        <img
          src={avatarSrc}
          alt={profileInfo.name}
          onError={() => setAvatarSrc(fallbackAvatar)}
        />
        <span className={styles.avatarOverlay}>Change</span>
        <input
          type="file"
          accept="image/*"
          className={styles.avatarInput}
          onChange={handleAvatarChange}
        />
      </label>

      {editing ? (
        <div className={styles.editForm}>
          <label>
            Name
            <input
              value={draftProfile.name}
              onChange={(event) => updateDraftField("name", event.target.value)}
            />
          </label>

          <label>
            Role
            <input
              value={draftProfile.role}
              onChange={(event) => updateDraftField("role", event.target.value)}
            />
          </label>

          <label>
            Bio
            <textarea
              rows="4"
              value={draftProfile.description}
              onChange={(event) =>
                updateDraftField("description", event.target.value)
              }
            />
          </label>
        </div>
      ) : (
        <>
          <h1>{profileInfo.name}</h1>
          <p className={styles.role}>{profileInfo.role}</p>
          <p className={styles.description}>{profileInfo.description}</p>
        </>
      )}

      <div className={styles.profileActions}>
        {editing ? (
          <>
            <button
              className={`${styles.actionButton} ${styles.saveButton}`}
              type="button"
              onClick={handleSave}
            >
              <Check size={18} strokeWidth={2.3} />
              <span>Save Profile</span>
            </button>

            <button
              className={styles.actionButton}
              type="button"
              onClick={handleCancel}
            >
              <X size={18} strokeWidth={2.3} />
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <button
            className={styles.actionButton}
            type="button"
            onClick={handleEdit}
          >
            <Pencil size={18} strokeWidth={2.3} />
            <span>Edit Profile</span>
          </button>
        )}

        <button
          className={styles.actionButton}
          type="button"
          onClick={handleShare}
        >
          <Share2 size={18} strokeWidth={2.3} />
          <span>{shareLabel}</span>
        </button>
      </div>
    </section>
  );
}
