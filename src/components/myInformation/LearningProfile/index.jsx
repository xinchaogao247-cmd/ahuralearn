import { useState } from "react";

import styles from "./LearningProfile.module.css";

export default function LearningProfile({ learningProfile }) {
  const [profileInfo, setProfileInfo] = useState(learningProfile);
  const [draftProfile, setDraftProfile] = useState(learningProfile);
  const [editing, setEditing] = useState(false);

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
      email: draftProfile.email.trim() || profileInfo.email,
      goal: draftProfile.goal.trim() || profileInfo.goal,
      preferredField:
        draftProfile.preferredField.trim() || profileInfo.preferredField,
      currentFocus: draftProfile.currentFocus.trim() || profileInfo.currentFocus,
    };

    setProfileInfo(nextProfile);
    setDraftProfile(nextProfile);
    setEditing(false);
  };

  return (
    <section className={styles.profileInfoCard}>
      <h2>Learning Profile</h2>

      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <span>Email Address</span>
          {editing ? (
            <input
              type="email"
              value={draftProfile.email}
              onChange={(event) => updateDraftField("email", event.target.value)}
            />
          ) : (
            <strong>{profileInfo.email}</strong>
          )}
        </div>

        <div className={styles.infoItem}>
          <span>Learning Goal</span>
          {editing ? (
            <input
              value={draftProfile.goal}
              onChange={(event) => updateDraftField("goal", event.target.value)}
            />
          ) : (
            <strong>{profileInfo.goal}</strong>
          )}
        </div>

        <div className={styles.infoItem}>
          <span>Preferred Field</span>
          {editing ? (
            <input
              value={draftProfile.preferredField}
              onChange={(event) =>
                updateDraftField("preferredField", event.target.value)
              }
            />
          ) : (
            <strong>{profileInfo.preferredField}</strong>
          )}
        </div>

        <div className={styles.infoItem}>
          <span>Current Focus</span>
          {editing ? (
            <input
              value={draftProfile.currentFocus}
              onChange={(event) =>
                updateDraftField("currentFocus", event.target.value)
              }
            />
          ) : (
            <strong>{profileInfo.currentFocus}</strong>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {editing ? (
          <>
            <button
              className={`${styles.updateButton} ${styles.saveButton}`}
              type="button"
              onClick={handleSave}
            >
              Save Learning Profile
            </button>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className={styles.updateButton}
            type="button"
            onClick={handleEdit}
          >
            Update Learning Profile
          </button>
        )}
      </div>
    </section>
  );
}
