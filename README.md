# User Authentication App

## Objective
This project is a React Native application built with Expo that implements Login and Signup functionality using the React Context API to manage the authentication state. It aims to demonstrate an understanding of authentication flows, state management, form handling, and navigation.

## Features
- **Authentication Context**: Manages global authentication state with functions for login, signup, and logout.
- **Screens**:
  - **Login Screen**: 
    - Input fields for Email and Password.
    - Login button to trigger authentication.
    - Error messages for invalid input.
    - Navigation to Signup screen.
  - **Signup Screen**: 
    - Input fields for Name, Email, and Password.
    - Signup button to create a new user.
    - Error messages for missing fields and invalid input.
    - Navigation back to Login screen.
  - **Home Screen**: 
    - Displays the logged-in user's name and email.
    - Logout button to return to the Login screen.
- **Persist Authentication**: Uses AsyncStorage to keep users logged in after closing and reopening the app.
- **Navigation**: Navigation between screens is managed using Expo Router, providing seamless transitions and enhancing the overall user experience.
- **Password Visibility Toggle**: An eye icon to toggle the visibility of the password field.

## Setup Instructions

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
