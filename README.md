# SOC Dashboard

This is a Security Operations Center (SOC) Dashboard application built with React, TypeScript, and Vite. It provides real-time monitoring, incident management, and policy configuration for network security.

## Features

- **Monitoring Dashboard**: Real-time traffic analysis, system health monitoring, threat map visualization, and alert notifications.
- **Incident Management**: Kanban-style board for tracking security incidents through detection, investigation, mitigation, and resolution stages. Includes drag-and-drop functionality and detailed incident views.
- **Policy Management**: Configuration interface for firewall rules, IP blacklisting, and IP whitelisting.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules / Standard CSS
- **State Management**: React Context & Hooks

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/components`: Reusable UI components (Header, Notification, etc.)
- `src/features`: Feature-specific modules (Monitoring, Incidents, Policies)
- `src/types`: TypeScript type definitions
- `src/data`: Mock data for development
