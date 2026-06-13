import { useState } from "react";

import { showToast } from "../../common/toast";
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
    const age = draftProfile.email.trim();
    const gender = draftProfile.goal.trim();
    const region = draftProfile.preferredField.trim();
    const birthday = draftProfile.currentFocus.trim();

    if (!age || !gender || !region || !birthday) {
      showToast("Please complete all learning profile fields.", "warning");
      return;
    }

    const nextProfile = {
      email: age,
      goal: gender,
      preferredField: region,
      currentFocus: birthday,
    };

    setProfileInfo(nextProfile);
    setDraftProfile(nextProfile);
    setEditing(false);
    showToast("Learning profile updated successfully.", "success");
  };

  return (
    <section className={styles.profileInfoCard}>
      <h2>Learning Profile</h2>

      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <span>Age</span>
          {editing ? (
            <input
              value={draftProfile.email}
              onChange={(event) => updateDraftField("email", event.target.value)}
            />
          ) : (
            <strong>{profileInfo.email}</strong>
          )}
        </div>

        <div className={styles.infoItem}>
          <span>Gender</span>
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
          <span>Region</span>
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
          <span>Birthday</span>
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
