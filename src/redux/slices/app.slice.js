import { createSlice } from "@reduxjs/toolkit";
import { uploadAndProcessVideo } from "./video.slice"; // Import the Thunk action

const initialState = {
    currentJobId: null,
    timeline: [],         // Holds the timestamp array: [{ time: 3500, prompt: "cyberpunk" }]
    loading: false,
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // Optimized for speed: Fast inline push to memory array
        addTimelineMarker: (state, action) => {
            state.timeline.push(action.payload);
        },
        // Clear state when a user starts over or finishes a video job
        clearTimeline: (state) => {
            state.timeline = [];
            state.currentJobId = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadAndProcessVideo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadAndProcessVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.currentJobId = action.payload.jobId;
                state.timeline = []; // Flush tracking cache once pushed to cloud
            })
            .addCase(uploadAndProcessVideo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to upload video asset";
            });
    },
});

export const { addTimelineMarker, clearTimeline } = appSlice.actions;
export default appSlice.reducer;