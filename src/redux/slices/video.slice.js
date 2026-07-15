import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const uploadAndProcessVideo = createAsyncThunk(
    'video/uploadAndProcess',
    async ({ localVideoUri, timelineData, userId }, { rejectWithValue }) => {
        try {
            const storage = getStorage();
            const db = getFirestore();

            // 1. Define unique cloud storage paths
            const videoFileName = `raw_videos/${userId}_${Date.now()}.mp4`;
            const storageRef = ref(storage, videoFileName);

            // 2. Perform the heavy file upload directly to Firebase Storage
            const response = await fetch(localVideoUri);
            const blob = await response.blob();
            await uploadBytesResumable(storageRef, blob);

            // 3. Log the processing job metadata in Firestore
            const jobRef = await addDoc(collection(db, "processing_jobs"), {
                userId: userId,
                rawVideoPath: videoFileName,
                timeline: timelineData, // Your Redux timeline array
                status: "queued",       // Python will switch this to "processing" then "completed"
                createdAt: new Date().toISOString(),
                outputVideoUrl: null
            });

            return { jobId: jobRef.id, videoFileName };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);