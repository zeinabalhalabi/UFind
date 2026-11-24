# UFind — Campus Lost and Found

UFind is a mobile application designed for Haigazian University students to report and browse lost and found belongings on campus. It was developed using React Native, Expo and Expo Router as a mobile development course project.

## Repository and submission version

- GitHub repository: https://github.com/zeinabalhalabi/UFind
- Final submission commit: 9e6442f7742fe66c44e004ae89d4b733ed921402

The submitted ZIP should contain the same project version as the repository commit identified above, excluding `node_modules` and `.expo`.

## Setup instructions

### Prerequisites

- Node.js and npm
- Expo Go on a compatible mobile device

### Installation

1. Clone the repository or extract the submitted ZIP file.
2. Open a terminal in the project root (the folder containing `package.json`).
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npx expo start
   ```

5. Open the application on an iOS device by scanning the QR code with the Camera app and opening Expo Go. Keep the computer and phone connected to the same network.

## Testing environment

- Application runtime: Expo Go
- Mobile platform: iOS (iPhone)
- Development platform: Windows

## Mock login credentials

| Field | Value |
| --- | --- |
| Email | "student@haigazian.edu.lb" |
| Password | "password2026" |

The application uses simulated authentication for demonstration purposes. Report ownership is associated with the mock user ID `user1`.

## Implemented features

- Login and sign-up interface with simulated authentication.
- Home screen displaying recent lost and found reports dynamically.
- Browse screen with search, Lost/Found filters and category filters.
- Create lost or found reports with an item name, category, location, optional description and optional photo.
- View individual report details.
- Edit and delete reports belonging to the simulated current user.
- Confirmation before deleting reports.
- Profile screen displaying user information and the three most recent owned reports.
- My Reports screen displaying all reports belonging to the current user.
- Logout navigation to the login screen.
- Sample reports and persistent local report storage using AsyncStorage.

## Navigation

The main navigation consists of four tabs: Home, Browse, Report and Profile. Users can open report details from the report lists, create or edit reports through the report form, and access their full report history from Profile.

## Data storage and reusable components

Reports are stored locally using AsyncStorage. The shared `reportStorage.js` file provides functions to retrieve and save reports. Mock reports are initialized once, and reports are serialized using `JSON.stringify()` and restored using `JSON.parse()`. Screens refresh stored reports when they gain focus using `useFocusEffect()`.

The reusable `ReportItem` component receives report data and callbacks through props. It displays report information and conditionally displays editing and deletion controls. Other reusable components include `ReportFilters`, `AppScreen`, `AppButton`, `AppTextInput` and `ImageInput`.

## Known limitations

- Reports are stored on one device only; there is no backend, remote database or synchronization between devices.
- Authentication and ownership are simulated rather than enforced by a backend.
- Profile identity and report ownership use mock user information.
- The application does not currently support marking items as recovered or resolved.
- Photo references may depend on the availability of local image files or cached image URIs.
- Clearing application storage removes locally saved reports and changes.
- Android and development-build compatibility have not been verified.

## AI-use statement

The implementation of UFind was primarily based on code examples and concepts covered in class, adapted to meet the requirements of my application. I also referred to official documentation throughout the development process.

I used AI to help me understand unfamiliar concepts and lines of code, troubleshoot errors, simplify the styling, and assist with implementing certain functionalities when I encountered difficulties.

Throughout this project, I made a conscious effort to implement as much as possible independently, consult documentation, and apply what I learned in class. Whenever I did use AI suggested code or modifications, I reviewed them and made sure I understood the underlying logic before incorporating them into my project.

