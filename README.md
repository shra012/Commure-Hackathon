# ClaimsGuard.ai

## Overview

ClaimsGuard.ai is a React-based web application designed to streamline the process of validating medical claim codes. The application allows users to input claim data in JSON format, parse and validate the claims, and receive instant feedback on the validation results.

## Features

- **JSON Input**: Enter claim data directly in JSON format with syntax highlighting
- **Claim Preview**: View parsed claims in a clean table format before submission
- **Validation Results**: Review claim validation outcomes with detailed approval status
- **Code Compatibility**: Validate procedure codes, modifiers, and their compatibility
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Application Flow

1. **Input Claims Data**: Enter JSON-formatted claim data in the left panel
2. **Parse Claims**: Click "Parse Claims" to validate the format and structure
3. **Preview Claims**: Review the parsed claims in the table preview
4. **Submit Claims**: Click "Submit All" to validate all claims or submit individual claims
5. **View Results**: See validation results with approval status and detailed feedback

## Tech Stack

- **React**: Front-end UI library
- **Redux Toolkit**: State management
- **Axios**: API communication
- **PapaParse**: CSV parsing (for file upload feature)

## Architecture

The application follows a component-based architecture with Redux for state management:

### Key Components

- **ClaimInput**: Handles JSON input and file uploads
- **ClaimTableDisplay**: Displays parsed claims for preview
- **ClaimResults**: Container for displaying validation results
- **ValidationResults**: Shows status and statistics of validated claims

### Redux Store

- **claimSlice**: Manages claim data, processing, and validation state
- **parseSlice**: Handles raw data parsing and transformation

### API Communication

The application communicates with a backend validation service via RESTful API endpoints:
- `/validate/batch`: Validates multiple claims
- `/validate/single`: Validates individual claims

## Setup and Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Internet connection for API access

### Installation Steps

1. Clone the repository
   ```
   git clone https://github.com/your-org/medclaim-validation.git
   cd medclaim-validation
   ```

2. Install dependencies
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Configure API endpoint (if needed)
   - Open `src/utils/api.js`
   - Update the `API_BASE_URL` constant to point to your validation service

4. Start the development server
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Access the application
   - Open your browser and navigate to `http://localhost:3000`

## Usage Example

### Sample JSON Input

```json
[
  {
    "claim_id": "C1",
    "codes": ["0001A", "0591T"],
    "modifier": "1"
  },
  {
    "claim_id": "C2",
    "codes": ["90460", "90461"],
    "modifier": "0"
  }
]
```

### Expected Output

After validation, the system will display results indicating whether each claim is approved or requires adjustments, along with detailed compatibility information for the submitted procedure codes and modifiers.

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify the API endpoint in `api.js`
   - Check network connectivity
   - Ensure CORS is properly configured on the server

2. **Invalid JSON Format**
   - Validate your JSON structure
   - Ensure arrays are properly formatted
   - Check for missing commas or brackets

3. **Empty Validation Results**
   - Confirm the API service is responding
   - Check browser console for errors
   - Verify the format of your claim data matches API expectations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

[MIT License](LICENSE)

## Contact
- Product Lead  - Shreyas durairajalu - Shreyasdurairajalu@gmail.com
- Lead FrontEnd Engineer - Suryakangeyan - suryakangeyankg@gmail.com
- Lead BackEnd Engineer - ShravanKumar - shravankumar.nagarajan@gmail.com
