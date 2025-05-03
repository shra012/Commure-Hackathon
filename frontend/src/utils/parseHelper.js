import Papa from 'papaparse';

// Parse JSON data
export const parseJSON = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error(`Invalid JSON: ${error.message}`);
    }
};

// Parse CSV data
export const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
                } else {
                    resolve(results.data);
                }
            },
            error: (error) => {
                reject(new Error(`CSV parsing error: ${error.message}`));
            }
        });
    });
};

export const validateClaims = (claims) => {
    if (!Array.isArray(claims)) {
        throw new Error("Claims data must be an array");
    }

    const validatedClaims = claims.map((claim, index) => {
        const errors = [];

        // Check for required fields
        if (!claim.claimId) {
            errors.push("Missing claim ID");
        }

        // Check for procedure codes
        if (!claim.procedureCodes && !claim.procedures) {
            errors.push("Missing procedure codes");
        }

        // Format procedure codes consistently
        let procedures = [];
        if (claim.procedureCodes) {
            // Handle case where procedureCodes is a string or array of strings
            procedures = Array.isArray(claim.procedureCodes)
                ? claim.procedureCodes.map(code => ({ code, modifiers: [] }))
                : [{ code: claim.procedureCodes, modifiers: [] }];
        } else if (claim.procedures) {
            // Handle case where procedures is already an array of objects
            procedures = Array.isArray(claim.procedures)
                ? claim.procedures
                : [claim.procedures];
        }

        // Apply modifiers if they exist at claim level
        if (claim.modifiers && procedures.length > 0) {
            // If modifiers exist at claim level but not at procedure level, apply to all procedures
            if (Array.isArray(claim.modifiers)) {
                procedures = procedures.map(proc => ({
                    ...proc,
                    modifiers: proc.modifiers?.length ? proc.modifiers : claim.modifiers
                }));
            }
        }

        return {
            ...claim,
            procedures,
            index, // Keep track of original index
            isValid: errors.length === 0,
            errors
        };
    });

    return validatedClaims;
};