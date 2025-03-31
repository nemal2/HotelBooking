// src/pages/user/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import ProfileForm from "../../components/user/ProfileForm";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile(currentUser.id);
        setProfile(userData);
        setError(null);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(
          "Could not load your profile information. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.id) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      setLoading(true);
      setUpdateSuccess(false);

      await updateUserProfile(currentUser.id, updatedData);

      // Update local state with new data
      setProfile({
        ...profile,
        ...updatedData,
      });

      setUpdateSuccess(true);
      setError(null);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
      setUpdateSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset any success/error messages
    setUpdateSuccess(false);
    setError(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading && !profile) {
    return (
      <div className="profile-page">
        <div className="loading-spinner">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {error && <div className="error-alert">{error}</div>}
        {updateSuccess && (
          <div className="success-alert">
            Your profile has been updated successfully!
          </div>
        )}

        {profile ? (
          <div className="profile-content">
            <div className="profile-sidebar">
              <div className="profile-avatar">
                {profile.firstName && profile.lastName ? (
                  <div className="avatar-initials">
                    {profile.firstName.charAt(0).toUpperCase()}
                    {profile.lastName.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div className="avatar-initials">
                  {profile.name ? 
                    profile.name.charAt(0).toUpperCase() 
                    : profile.email ? profile.email.charAt(0).toUpperCase() : "U"}
                </div>
                )}
              </div>
              <div className="profile-info">
                <h2>{profile.name}</h2>
                <p className="profile-email">{profile.email}</p>
                <p className="profile-member-since">
                  Member since:{" "}
                  {new Date(
                    profile.createdAt || Date.now()
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="profile-details">
              <h2>Edit Profile Information</h2>
              <ProfileForm
                profile={profile}
                onSubmit={handleProfileUpdate}
                onCancel={handleCancel}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          <div className="profile-error">
            <p>Could not load profile information.</p>
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
