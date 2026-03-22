# Eloquent Case Study

Reference interface implementation for the Eloquent AI Agent Deployment Manager assignment.

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS v4
- Vite

## Running Locally

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/    # Reusable UI components (Card, Button, MetricCard, etc.)
  context/       # React Context for state management
  data/          # User data and transaction generation
  pages/         # Dashboard and UserDetail pages
  utils/         # KPI computation and user stats
```
