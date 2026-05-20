/**
 * Cloudinary Upload Utility with Rate Limiting
 * Max 3 uploads per minute to prevent DDOS
 */

const CLOUDINARY_CLOUD_NAME = "dzkakk190";
const CLOUDINARY_PRESET = "protfolio";
const RATE_LIMIT_PER_MINUTE = 3;

// Simple in-memory rate limiter
let uploadQueue = [];
const RATE_WINDOW_MS = 60000; // 1 minute

function cleanOldUploads() {
  const now = Date.now();
  uploadQueue = uploadQueue.filter(timestamp => (now - timestamp) < RATE_WINDOW_MS);
}

export async function uploadToCloudinary(file) {
  cleanOldUploads();
  
  if (uploadQueue.length >= RATE_LIMIT_PER_MINUTE) {
    throw new Error(`Rate limit exceeded. Max ${RATE_LIMIT_PER_MINUTE} uploads per minute.`);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    uploadQueue.push(Date.now());
    
    return {
      url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}

export function getRemainingUploads() {
  cleanOldUploads();
  return RATE_LIMIT_PER_MINUTE - uploadQueue.length;
}
