# Task Management App

## Overview

The Task Management App is a web application built using React and React Beautiful DND for managing tasks and their associated items through an intuitive drag-and-drop interface. The app allows users to organize tasks into different categories, add new items to each task, and reorder tasks as needed.

## Project Structure

The project follows a modular structure to enhance maintainability and readability. Here's a brief overview of the main directories and files:

- **src/**
  - **components/**
    - **DragNDrop/**
      - Contains components related to drag-and-drop functionality.
    - **Main/**
      - Contains components and styles specific to the main task management functionality.
    - **Modal/**
      - Contains components and styles related to modals for adding new items.
  - **helpers/**
    - Contains utility functions for interacting with local storage and handling background colors.
  - **types/**
    - Defines TypeScript interfaces for the data structures used in the app.
  - **assets/**
    - Placeholder for any additional assets used in the project.
- **public/**
  - Contains the `index.html` file.

## Key Files and Functions

### Local Storage Helpers

- **`helpers/get_localStoredData.ts`**
  - Exports `getDataFromLocalStorage`, a function to retrieve data from local storage.

- **`helpers/set_localStoredData.ts`**
  - Exports `setDataToLocalStorage`, a function to store data in local storage.

### Background Color Utility

- **`helpers/getBackgroundColor.ts`**
  - Exports `getBackgroundColor`, a function to determine the background color based on item priority.

### Task Interfaces

- **`src/types/task.ts`**
  - Defines TypeScript interfaces (`Item`, `Task`, and `TaskListProps`) for the data structures used in the app.

### Main Component

- **`src/components/Main/Main.tsx`**
  - The main functional component that renders the entire task management app.
  - Utilizes React Beautiful DND for drag-and-drop functionality.
  - Manages local state for tasks, handles adding items, and updates local storage on state changes.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the app using `npm start`.
4. Open the app in your browser at `http://localhost:3000`.

## Dependencies

- React
- React Beautiful DND
- UUID (v4)
- React Modal

## License

This project is licensed under the [MIT License](LICENSE.md). Feel free to use, modify, and distribute it as per the terms of the license.

## Acknowledgments

- Thanks to youtube Dave Gray, Laith.
- https://github.com/atlassian/react-beautiful-dnd/tree/master
