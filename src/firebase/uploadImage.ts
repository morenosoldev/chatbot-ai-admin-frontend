import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
import { v4 } from 'uuid';
import firebase_app from './config';

interface ImageUploaderHook {
  uploadFile: (imageUpload: File) => Promise<string>;
}

const storage = getStorage(firebase_app);

const useImageUploader = (): ImageUploaderHook => {
  const uploadFile = async (imageUpload: File): Promise<string> => {
    if (!imageUpload) {
      throw new Error('No file provided for upload.');
    }

    try {
      const blob = await convertToBlob(imageUpload);
      const imageRef: StorageReference = ref(
        storage,
        `images/${imageUpload.name + v4()}`,
      );

      const snapshot = await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(snapshot.ref);

      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const convertToBlob = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result as ArrayBuffer], {
          type: file.type,
        });
        resolve(blob);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return { uploadFile };
};

export default useImageUploader;
