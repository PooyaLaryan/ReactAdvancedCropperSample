import React, { useRef, useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/corners.css';

const ImageCropper = () => {
    const [image, setImage] = useState(null); // Store uploaded image
    const cropperRef = useRef(null); // Reference to Cropper component
    const [croppedImageBase64, setCroppedImageBase64] = useState(null); // Store cropped base64 image

    // Handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // Set the image as base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Get the base64 of cropped image
    const handleGetCroppedImage = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCanvas();
            if (canvas) {
                const base64Image = canvas.toDataURL(); // Convert canvas to base64
                setCroppedImageBase64(base64Image);
                console.log('Cropped Image Base64:', base64Image);
            }
        }
    };

    return (
        <div>
            <h1>React Advanced Cropper Example</h1>
            
            {/* Image upload input */}
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            
            {/* Cropper component */}
            {image && (
                <div style={{ width: '500px', height: '500px' }}>
                    <Cropper
                        ref={cropperRef}
                        src={image}
                        // stencilProps={{
                        //     aspectRatio: 1,
                        // }}
                        style={{
                            height: '500px',
                            width: '100%',
                        }}
                    />
                </div>
            )}
            
            {/* Button to get cropped base64 image */}
            <button onClick={handleGetCroppedImage}>Get Cropped Image</button>
            
            {/* Display cropped image */}
            {croppedImageBase64 && (
                <div>
                    <h2>Cropped Image:</h2>
                    <img src={croppedImageBase64} alt="Cropped" />
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
