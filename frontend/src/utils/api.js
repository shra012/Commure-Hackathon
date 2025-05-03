// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://commure.shra012.com'; // Updated with correct port 8000

// Helper function to transform data to API format
const transformToApiFormat = (claims) => {
    return claims.map((claim) => ({
        claim_id: claim.claimId,
        codes: claim.procedureCodes,
        modifier:
            typeof claim.modifiers === 'string'
                ? claim.modifiers
                : Array.isArray(claim.modifiers) && claim.modifiers.length > 0
                    ? claim.modifiers[0]
                    : '0',
    }));
};

// Helper function to transform a single claim to API format
const transformSingleClaimToApiFormat = (claim) => {
    return {
        claim_id: claim.claimId,
        codes: claim.procedureCodes,
        modifier:
            typeof claim.modifiers === 'string'
                ? claim.modifiers
                : Array.isArray(claim.modifiers) && claim.modifiers.length > 0
                    ? claim.modifiers[0]
                    : '0',
    };
};

const api = {
    // Method to validate a batch of claims
    validateClaims: async (claimsData) => {
        try {
            const dataToSend =
                Array.isArray(claimsData) &&
                    claimsData.length > 0 &&
                    claimsData[0].claimId !== undefined
                    ? transformToApiFormat(claimsData)
                    : claimsData;

            console.log('Sending data to batch API:', dataToSend);

            const response = await axios.post(
                `${API_BASE_URL}/validate/batch`,
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    },

    // New method to validate a single claim
    validateSingleClaim: async (claimData) => {
        try {
            // Check if we need to transform the data
            const dataToSend = claimData.claimId !== undefined
                ? transformSingleClaimToApiFormat(claimData)
                : claimData;

            console.log('Sending data to single claim API:', dataToSend);

            const response = await axios.post(
                `${API_BASE_URL}/validate/single`,
                dataToSend,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            return response.data;
        } catch (error) {
            return handleApiError(error);
        }
    }
};

// Helper function to handle API errors consistently
function handleApiError(error) {
    if (
        error.message &&
        (error.message.includes('Network Error') ||
            error.code === 'ERR_NETWORK')
    ) {
        console.error(
            'CORS Error: Unable to connect to the API due to CORS restrictions'
        );
        throw new Error(
            'Unable to connect to the API. This could be due to CORS restrictions.'
        );
    }

    if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('Status:', error.response.status);
        throw new Error(
            error.response.data?.message || 'API responded with an error'
        );
    }

    console.error('API Error:', error);
    throw error;
}

export default api;