// src/redux/slices/claimSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { processClaimData } from '../../utils/claimProcessor';
import { validateClaims } from '../../utils/parseHelper';

export const processClaims = createAsyncThunk(
    'claims/processClaims',
    async (data, { rejectWithValue }) => {
        try {
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format. Expected an array of claims.");
            }
            return await processClaimData(data);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const claimSlice = createSlice({
    name: 'claims',
    initialState: {
        parsedClaims: [],
        processedClaims: [],
        loading: false,
        parseError: null,
        processError: null
    },
    reducers: {
        setParsedClaims: (state, action) => {
            try {
                const validatedClaims = validateClaims(action.payload);
                state.parsedClaims = validatedClaims;
                state.parseError = null;
            } catch (error) {
                state.parseError = error.message;
            }
        },
        setParseError: (state, action) => {
            state.parseError = action.payload;
        },
        clearClaims: (state) => {
            state.parsedClaims = [];
            state.processedClaims = [];
            state.parseError = null;
            state.processError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(processClaims.pending, (state) => {
                state.loading = true;
                state.processError = null;
            })
            .addCase(processClaims.fulfilled, (state, action) => {
                state.processedClaims = action.payload;
                state.loading = false;
            })
            .addCase(processClaims.rejected, (state, action) => {
                state.processError = action.payload;
                state.loading = false;
            });
    }
});

export const { setParsedClaims, setParseError, clearClaims } = claimSlice.actions;
export default claimSlice.reducer;