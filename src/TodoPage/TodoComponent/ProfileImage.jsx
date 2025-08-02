import { useState } from 'react';
import { Avatar, IconButton, Button } from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import imageCompression from 'browser-image-compression';

const ProfileImageUpload = ({ currentImage, onImageUpdate }) => {
  const [imagePreview, setImagePreview] = useState(currentImage || null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // ตรวจสอบประเภทไฟล์
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPG and PNG files are allowed.');
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }

      try {
        // Compress the image
        const options = {
          maxSizeMB: 1, // จำกัดขนาดสูงสุดเป็น 200KB
          maxWidthOrHeight: 800, // จำกัดความกว้างหรือสูงสุดไม่เกิน 800px
          useWebWorker: true, // ใช้ Web Worker เพื่อประสิทธิภาพ
        };
        const compressedFile = await imageCompression(file, options);

        setError('');
        setSelectedFile(compressedFile);
        // Preview the compressed image
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        setError('Error compressing image.');
        console.error('Compression error:', error);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const response = await fetch('/api/update-profile-image', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        onImageUpdate(data.imageUrl);
      } else {
        setError(data.message || 'Upload failed.');
      }
    } catch (error) {
      setError('Error uploading image.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='flex flex-col py-10 lg:px-10 px-5  items-center md:gap-15 gap-10 w-full h-full'>
        <div className="text-secondary lg:text-5xl text-3xl font-bold  mx-auto">Profile</div>
      <input
        accept="image/jpeg,image/png"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload" className=''>
        <IconButton color="primary" component="span">
          <Avatar
            alt="Profile Image"
            src={imagePreview || currentImage}
            sx={{ width: {md:150 , xs:100}, height: {md:150 , xs:100} }}
          >
            {!imagePreview && !currentImage && ''}
          </Avatar>
          <CameraAltIcon
            sx={{
              fontSize: "2rem",
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: '4px',
              backgroundColor: 'white',
              borderRadius: '50%',
              
            }}
          />
        </IconButton>
      </label>
      {error && <p style={{ padding: "15px", fontSize: "20px", color: 'red' }}>{error}</p>}
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile}
        sx={{ mt: 0 , fontSize: {xs:"16px" ,md:"16px"} }}
        d
      >
        Upload Image
      </Button>
    </div>
  );
};

export default ProfileImageUpload;