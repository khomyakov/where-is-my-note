# Where Is My Note

This is a React-based notes application that allows users to create, update, delete, sort and search notes. The application is built with modern libraries and practices such as React, React Router, React Query, Tailwind CSS, Axios, React Hook Form, React Error Boundary, React Icons, and Virtuoso for lazy loading.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [Features](#features)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/oleksandr-devico/where-is-my-note.git
   ```
	2.	Navigate to the project directory:
  ```sh
  cd where-is-my-note
  ```
	3.	Install the dependencies:
  ```sh
  npm install
  ```

  ## Usage

  	1.	Start the development server:
    ```sh
    npm run dev
    ```

    	1.	This will start the Vite development server and open the application in your default browser.
    2.	Open the application:
  Visit http://localhost:5173 to view the application.

  ## Scripts 

  •	npm run dev: Start the development server.
	•	npm run build: Build the application for production.
	•	npm run preview: Preview the production build.
	•	npm run lint: Run ESLint to check for linting errors.
	•	npm run lint:fix: Run ESLint and fix linting errors automatically.
	•	npm run format: Format the code using Prettier.

  ## Folder Structure

  src/
  ├── api/                # API services
  │   └── api.ts          # API service file
  ├── assets/             # Assets (images, fonts, etc.)
  ├── components/         # React components
  ├── hooks/              # Custom hooks
  ├── pages/              # Page components
  ├── types/              # TypeScript types
  ├── utils/              # Utility functions
  ├── App.css             # Main CSS file
  ├── App.tsx             # Main application component
  ├── index.css           # Global CSS
  ├── main.tsx            # Entry point
  ├── router.tsx          # Router configuration
  └── vite-env.d.ts       # Vite environment definitions

  ## Features

  •	React: A JavaScript library for building user interfaces.
	•	React Router: Declarative routing for React.
	•	React Query: Data fetching, caching, synchronization, and more.
	•	Tailwind CSS: A utility-first CSS framework.
	•	Axios: Promise based HTTP client for the browser and node.js.
	•	React Hook Form: Performant, flexible, and extensible forms with easy-to-use validation.
	•	React Error Boundary: Declarative error boundaries for React.
	•	React Icons: Include popular icons in your React projects easily with react-icons.
	•	Virtuoso: React component for efficient rendering of large lists.

  ## Notes on React Query

Due to limitations with the fake API, the project updates the react-query cache directly based on the response. For a proper experience, it is recommended to uncomment the cache invalidation lines in the code.

Example: useCreateNote Hook

```sh
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createNote = async (newNote) => {
  const response = await axios.post('/api/notes', newNote);
  return response.data;
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation(createNote, {
    onSuccess: (data) => {
      // Remove the queryClient.setQueryData() calls below
      queryClient.setQueryData(['notes', 5], (oldData) => {
        const newData = {
          ...oldData,
          pages: oldData.pages.map((page) => [...page, data]),
        };
        return newData;
      });

      queryClient.setQueryData(['note', data.id], data);

      // Uncomment the lines below for proper experience with a real API
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      // queryClient.invalidateQueries({ queryKey: ['note', data.id] });
    },
  });
};
```