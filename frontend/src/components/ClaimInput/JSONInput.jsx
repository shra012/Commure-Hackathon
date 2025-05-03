// src/components/ClaimInput/JSONInput.jsx
import '../../index.css';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
    setParsedClaims,
    setParseError,
    setValidationResults,
} from '../../redux/slices/claimSlice';
import {
    parseJSON,
    validateClaims,
} from '../../utils/parseHelper';
import api from '../../utils/api';

const JSONInput = () => {
    const [jsonText, setJsonText] = useState('');
    const [isProcessing, setIsProcessing] =
        useState(false);
    const [hasProcessed, setHasProcessed] =
        useState(false);
    const dispatch = useDispatch();

    // Helper function to transform to API format
    const transformToApiFormat = (claims) => {
        return claims.map((claim) => ({
            claim_id: claim.claimId,
            codes: claim.procedureCodes,
            modifier:
                claim.modifiers &&
                claim.modifiers.length > 0
                    ? typeof claim.modifiers === 'string'
                        ? claim.modifiers
                        : claim.modifiers[0]
                    : '0',
        }));
    };

    const handleParse = async () => {
        try {
            if (!jsonText.trim()) {
                dispatch(
                    setParseError('Please enter JSON data')
                );
                return;
            }

            setIsProcessing(true);

            // Parse the JSON
            const data = parseJSON(jsonText);

            // Validate the claims using the helper function
            const validatedData = validateClaims(data);

            console.log(
                'Validated data:',
                validatedData
            );

            // Set parsed claims in Redux store
            dispatch(setParsedClaims(validatedData));

            // Prepare API formatted data
            const apiFormattedData =
                transformToApiFormat(validatedData);
            console.log(
                'Sending to API:',
                apiFormattedData
            );

            try {
                // Call API directly instead of using thunk
                const response = await api.validateClaims(
                    apiFormattedData
                );
                console.log('API Response:', response);

                // Manually set validation results
                dispatch(setValidationResults(response));
            } catch (apiError) {
                console.error('API Error:', apiError);
                dispatch(
                    setParseError(
                        `API Error: ${apiError.message}`
                    )
                );
            }

            setIsProcessing(false);
            setHasProcessed(true);

            // Reset the "processed" state after 3 seconds
            setTimeout(() => {
                setHasProcessed(false);
            }, 3000);
        } catch (error) {
            console.error('Parse error:', error);
            dispatch(setParseError(error.message));
            setIsProcessing(false);
        }
    };

    const handlePaste = () => {
        navigator.clipboard
            .readText()
            .then((text) => {
                setJsonText(text);
            })
            .catch((err) => {
                console.error(
                    'Failed to read clipboard:',
                    err
                );
            });
    };

    const clearText = () => {
        setJsonText('');
        setHasProcessed(false);
        dispatch(setParsedClaims([]));
    };

    return (
        <div className="mt-6 px-4 pl-6">
            <div className="flex justify-between items-center mb-3 pl-6">
                <h3 className="section-description">
                    Paste JSON Claims Data
                </h3>
                <div className="flex items-center justify-end space-x-4">
                    <button
                        onClick={handlePaste}
                        className="btn btn-outline px-4 py-1 text-sm font-medium rounded-md hover:bg-gray-100 transition"
                    >
                        Paste
                    </button>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                    <button
                        onClick={clearText}
                        className="btn btn-outline px-4 py-1 text-sm font-medium rounded-md hover:bg-gray-100 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="relative">
        <textarea
            className="input textarea"
            style={{boxSizing: 'border-box', padding: '1rem', margin: '0.5rem 0'}}
            placeholder='[{"claim_id": "C1", "codes": ["0001A", "0591T"], "modifier": "1"}]'
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
        />

                {jsonText && (
                    <span className="absolute bottom-2 right-2 text-xs text-gray-500">
            {jsonText.length} characters
          </span>
                )}
            </div>

            <button
                onClick={handleParse}
                disabled={
                    isProcessing || !jsonText.trim()
                }
                className={`
                    btn 
                    btn-outline
                    ${hasProcessed ? 'btn-success' : 'btn-primary'} 
                    mx-auto 
                    mt-3 
                    ${isProcessing || !jsonText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} 
                    transition-colors 
                    duration-200
                `.replace(/\s+/g, ' ').trim()}
            >
                {isProcessing ? (
                    <>Processing...</>
                ) : hasProcessed ? (
                    <>Processed Successfully</>
                ) : (
                    <>Parse Claims</>
                )}
            </button>

        </div>
    );
};

export default JSONInput;
