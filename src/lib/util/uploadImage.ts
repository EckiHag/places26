// const SERVER_URL = "https://beihaggis.de";
// const USERS_PATH = "api/places26/user";
// const FETCH_URL = `${SERVER_URL}/${USERS_PATH}`;

// export const uploadImage = async (imageFile: File): Promise<{ imageUrl: string; width: number; height: number } | null> => {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   try {
//     const response = await fetch(FETCH_URL, {
//       method: "POST",
//       headers: { "x-upload-password": "ga?m0Wq1jznVb<RU" },
//       body: formData,
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Failed to upload image.");
//     }

//     const { uploadResult } = await response.json();
//     return uploadResult
//       ? {
//           imageUrl: uploadResult.imageUrl,
//           width: uploadResult.width,
//           height: uploadResult.height,
//         }
//       : null;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return null;
//   }
// };
