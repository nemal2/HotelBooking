// src/pages/user/ProfilePage.jsx
import { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import ProfileForm from "../../components/user/ProfileForm";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import { useAuth } from "../../contexts/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { currentUser, login } = useAuth();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await getUserProfile(currentUser.id);
        setProfile(profileData);
      } catch (err) {
        setError('Failed to load your profile. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);
  
  const handleUpdateProfile = async (updatedProfile) => {
    try {
      setLoading(true);
      const updated = await updateUserProfile(currentUser.id, updatedProfile);
      setProfile(updated);
      
      // Update local storage with new user data
      const updatedUser = { ...currentUser, ...updated };
      login(updatedUser, localStorage.getItem('authToken'));
      
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !profile) return <div className="loading">Loading your profile...</div>;
  if (error && !profile) return <div className="error">{error}</div>;
  
  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <h1>My Profile</h1>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        
        {!isEditing && profile && (
          <div className="profile-details">
            <div className="profile-info">
              <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> {profile.address || 'Not provided'}</p>
            </div>
            
            <button 
              className="edit-btn" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
        
        {isEditing && profile && (
          <ProfileForm 
            profile={profile} 
            onSubmit={handleUpdateProfile} 
            onCancel={() => setIsEditing(false)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;