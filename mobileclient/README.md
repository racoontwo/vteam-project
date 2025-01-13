# Mobile client

## Environment Variables

To run the project locally, you need to configure a few environment variables. These variables should be placed in a `.env` file located in the mobile-client folder.

### Required Environment Variables:
- VITE_API_KEY: Your API key to authenticate requests to the backend API.
- VITE_BASE_URL: The base URL for the backend API (http://localhost:5001 for local development).

### Example .env file:

```
VITE_API_KEY="6b00bafa-4f70-463b-a4c3-1234c317a09f"
VITE_BASE_URL="http://localhost:5001"
```

### Example .env file for mock api:

```
VITE_API_KEY="6b00bafa-4f70-463b-a4c3-1234c317a09f"
VITE_BASE_URL="http://localhost:4000"
```

### React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
