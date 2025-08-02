import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

const SettingContent = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    email: ""
  });
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    password: false
  });
  const [tempValues, setTempValues] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  });
  const [error, setError] = useState(null); // Added for error handling

  useEffect(() => {
    if (!token || token.trim() === "") {
      navigate("/login");
      return;
    }

    const loadProfileInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/profileinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data; // Removed incorrect array access
        setProfileInfo({
          username: userData.username || "",
          email: userData.email || ""
        });
        setTempValues({
          username: userData.username || "",
          email: userData.email || "",
          currentPassword: "",
          newPassword: ""
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };
    loadProfileInfo();
  }, [token, navigate]);

  const handleEditToggle = (field) => {
    setEditMode(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    setError(null); // Clear error when entering edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (field) => {
    try {
      
      setError(null);
      await axios.put(
        "http://localhost:3000/profile",
        { [field]: tempValues[field] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileInfo(prev => ({
        ...prev,
        [field]: tempValues[field]
      }));
      setEditMode(prev => ({
        ...prev,
        [field]: false
      }));
     
    } catch (err) {
      console.error("Error updating profile:", err);
      setTempValues(prev => ({
        ...prev,
        [field]: profileInfo[field]
      }));
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      setError("success change password");
      if (!tempValues.currentPassword || !tempValues.newPassword) {
        setError("Both current and new passwords are required");
        return;
      }

      await axios.put(
        "http://localhost:3000/change-password",
        {
          currentPassword: tempValues.currentPassword,
          newPassword: tempValues.newPassword
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTempValues(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: ""
      }));
      setEditMode(prev => ({
        ...prev,
        password: false
      }));

    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  const handleCancel = (field) => {
    setTempValues(prev => ({
      ...prev,
      [field]: profileInfo[field]
    }));
    setEditMode(prev => ({
      ...prev,
      [field]: false
    }));
    setError(null);
  };

  const handleCancelPassword = () => {
    setTempValues(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: ""
    }));
    setEditMode(prev => ({
      ...prev,
      password: false
    }));
    setError(null);
  };

  return (
    <div
      className="lg:p-10 p-5 w-full transition-all duration-300 ease-in-out overflow-y-auto box"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="w-full h-full flex md:flex-row flex-col overflow-y-auto bg-white shadow-2xl rounded-2xl">
        <div className="flex flex-col justify-evenly items-center gap-10 w-full md:p-10 px-5 py-10 shadow-xl">
          {error && (
            <Box sx={{ color: "red", mb: 2, textAlign: "center" }}>
              {error}
            </Box>
          )}
          
          {/* Profile Information Form */}
          <form className="flex justify-end xl:max-w-[1100px] lg:max-w-[700px] max-md:max-w-[350px] md:flex-row flex-col gap-4 md:rounded-xl md:bg-gray-100 md:p-6 w-full">
            <Box
              sx={{
                bgcolor: "#7F8CAA",
                color: "white",
                p: "1rem",
                borderRadius: 1,
                height: "auto",
                width: { sm: "100%", md: "40%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "1.25rem", md: "1.5rem", lg: "1.75rem" }
              }}
            >
              Profile Information
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  name="username"
                  value={editMode.username ? tempValues.username : profileInfo.username}
                  onChange={handleInputChange}
                  disabled={!editMode.username}
                  InputProps={{
                    endAdornment: (
                      <>
                        {!editMode.username ? (
                          <IconButton onClick={() => handleEditToggle("username")}>
                            <Edit />
                          </IconButton>
                        ) : (
                          <>
                            <IconButton onClick={() => handleSaveProfile("username")}>
                              <Save color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleCancel("username")}>
                              <Cancel color="error" />
                            </IconButton>
                          </>
                        )}
                      </>
                    )
                  }}
                />
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={editMode.email ? tempValues.email : profileInfo.email}
                  onChange={handleInputChange}
                  disabled={!editMode.email}
                  InputProps={{
                    endAdornment: (
                      <>
                        {!editMode.email ? (
                          <IconButton onClick={() => handleEditToggle("email")}>
                            <Edit />
                          </IconButton>
                        ) : (
                          <>
                            <IconButton onClick={() => handleSaveProfile("email")}>
                              <Save color="primary" />
                            </IconButton>
                            <IconButton onClick={() => handleCancel("email")}>
                              <Cancel color="error" />
                            </IconButton>
                          </>
                        )}
                      </>
                    )
                  }}
                />
              </Box>
            </Box>
          </form>

          {/* Change Password Form */}
          <form className="flex justify-end xl:max-w-[1100px] lg:max-w-[700px] max-md:max-w-[350px] md:flex-row flex-col gap-4 md:rounded-xl md:bg-gray-100 md:p-6 w-full">
            <Box
              sx={{
                bgcolor: "#7F8CAA",
                color: "white",
                p: "1rem",
                borderRadius: 1,
                height: "auto",
                width: { sm: "100%", md: "40%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: { xs: "1.25rem", md: "1.5rem", lg: "1.75rem" }
              }}
            >
              Change Password
            </Box>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <TextField
                label="Current Password"
                variant="outlined"
                fullWidth
                type="password"
                name="currentPassword"
                value={tempValues.currentPassword}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                disabled={!editMode.password}
              />
              <TextField
                label="New Password"
                variant="outlined"
                fullWidth
                type="password"
                name="newPassword"
                value={tempValues.newPassword}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                disabled={!editMode.password}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {!editMode.password ? (
                  <Button 
                    variant="contained" 
                    onClick={() => handleEditToggle("password")}
                    sx={{ width: { xs: "100%", lg: "55%" }, bgcolor: "#7F8CAA" }}
                  >
                    Change Password
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="contained" 
                      onClick={handleChangePassword}
                      sx={{ 
                        width: { xs: "48%", lg: "25%" }, 
                        bgcolor: "#7F8CAA",
                        mr: 1
                      }}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outlined" 
                      onClick={handleCancelPassword}
                      sx={{ width: { xs: "48%", lg: "25%" } }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingContent;