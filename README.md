# Donezo

A comprehensive Todoist clone built with Next.js 15, featuring advanced task management, collaboration, and productivity tracking.

## Overview

Donezo is a full-stack TypeScript application that replicates and extends Todoist's functionality with modern web technologies. Built using the Server Actions + TanStack Query architecture pattern for optimal performance and user experience.

## Key Features

- **Task Management**: Create, organize, and track tasks with priority levels, due dates, and labels
- **Project Organization**: Group tasks into projects with custom sections and hierarchies
- **Collaboration**: Share projects, assign tasks, and leave comments with team members
- **Productivity Tracking**: Karma system and activity logs to monitor progress
- **Real-time Updates**: Optimistic updates with proper rollback handling
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Framework**: Next.js 15 with App Router and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **State Management**: Zustand for client-side state
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS v4 with custom theming
- **UI Components**: Radix UI primitives with custom components
- **Build**: Turbopack for development
- **Icons**: Lucide React for consistent iconography

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Commands

- `npm run dev` - Start development server with Turbopack (localhost:3000)
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## TODO List

### Core Features
- [ ] User Authentication & Registration
- [ ] Task CRUD Operations
- [ ] Project Management
- [ ] Task Hierarchy & Sections
- [ ] Due Dates & Reminders
- [ ] Labels & Filters
- [ ] Task Comments
- [ ] File Attachments

### Collaboration
- [ ] Project Sharing
- [ ] Team Member Invitations
- [ ] Task Assignment
- [ ] Activity Feed
- [ ] Real-time Notifications

### Advanced Features
- [ ] Karma System
- [ ] Productivity Analytics
- [ ] Custom Templates
- [ ] Bulk Operations
- [ ] Keyboard Shortcuts
- [ ] Offline Support
- [ ] Mobile App (React Native)

### Infrastructure
- [ ] Email Notifications
- [ ] Data Export/Import
- [ ] API Documentation
- [ ] Performance Optimization
- [ ] Security Audit
- [ ] Deployment Pipeline
- [ ] Monitoring & Analytics

## Architecture

The application follows the Server Actions + TanStack Query pattern:
- **80% Server Actions**: Type-safe CRUD operations with built-in CSRF protection
- **20% API Routes**: Complex operations, file uploads, external integrations
- **Optimistic Updates**: Immediate UI feedback with proper rollback handling
- **State Management**: Zustand stores for UI state, TanStack Query for server state

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT