import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentJobId: null,
    timeline: [],
    loading: false,
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        addTimelineMarker: (state, action) => {
            state.timeline.push(action.payload);
        },
        clearTimeline: (state) => {
            state.timeline = [];
            state.currentJobId = null;
            state.error = null;
        },
        setAppLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAppError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setCurrentJobId: (state, action) => {
            state.currentJobId = action.payload;
            state.loading = false;
        },
    },
});

export const {
    addTimelineMarker,
    clearTimeline,
    setAppLoading,
    setAppError,
    setCurrentJobId,
} = appSlice.actions;
export default appSlice.reducer;
