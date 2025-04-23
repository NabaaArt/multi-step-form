# Multi-Step Form Application

A responsive, feature-rich multi-step form application built with React, React Router, Zustand for state management, and Tailwind CSS for styling.

## Architecture Overview

### Folder Structure

```
multi-step-form/
├── src/
│   ├── components/
│   │   ├── ui/                 # UI components (shadcn/ui)
│   │   ├── APIcomponent.tsx    # API integration component
│   │   ├── step-progress.tsx   # Progress indicator component
│   │   └── ThemeComponent.tsx  # Theme toggle component
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Hook for responsive design
│   │   ├── use-route-protection.ts # Route protection logic
│   │   └── use-toast.ts        # Toast notification hook
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── store/
│   │   └── form-store.ts       # Zustand store for form state
│   ├── steps/
│   │   ├── personal-info/      # Step 1: Personal information
│   │   ├── preferences/        # Step 2: User preferences
│   │   └── review/             # Step 3: Review and submit
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Entry point
└── package.json                # Dependencies and scripts
```

### State Management

The application uses Zustand for state management:

- **Form State**: Manages the multi-step form data including personal information, preferences, and step completion status
- **Theme State**: Manages the application theme (light/dark)

Zustand was chosen for its simplicity, minimal boilerplate, and built-in persistence capabilities.

### Routing

The application uses React Router v6 for navigation between form steps:

- `/` - Landing page with application overview
- `/steps/personal-info` - First step for collecting personal information
- `/steps/preferences` - Second step for collecting user preferences
- `/steps/review` - Final step for reviewing and submitting the form

Route protection is implemented to prevent users from accessing later steps without completing previous ones.

## Implementation Details

### Why Zustand for State Management

Zustand was chosen over alternatives like Redux or Context API for several reasons:

1. **Simplicity**: Minimal boilerplate and easy setup
2. **Persistence**: Built-in middleware for localStorage persistence
3. **TypeScript Support**: Excellent TypeScript integration
4. **Performance**: Optimized re-renders with selective subscriptions

### Form Validation Strategy

The application uses React Hook Form with Zod schema validation:

1. **Schema-based Validation**: Zod provides type-safe validation schemas
2. **Error Handling**: Comprehensive error messages and field-level validation
3. **Performance**: Efficient validation that minimizes re-renders

### Responsive Design Approach

The application uses a mobile-first approach with Tailwind CSS and Shadcn for UI:

1. **Breakpoint System**: Responsive layouts using Tailwind's breakpoint utilities
2. **Custom Hook**: `useIsMobile` hook to conditionally render components based on screen size
3. **Flexible Layouts**: Grid and flex layouts that adapt to different screen sizes

## Extra Features

### Theme Switching

The application supports light and dark mode:
- Theme preference is stored in Zustand state
- Theme toggle is accessible from any page
- System preference detection is supported

### API Integration

The application demonstrates API integration:
- Fetches data from JSONPlaceholder API
- Displays data in a select dropdown
- Handles loading and error states

### Route Protection

The application implements route protection:
- Prevents users from skipping steps
- Redirects users to appropriate steps if prerequisites aren't met
- Uses a custom hook for reusable protection logic

### Conditional Form Fields

The application shows different form fields based on user selections:
- Student-specific options appear when "student" is selected as occupation
- Demonstrates dynamic form capabilities

## Steps to Reproduce

1. **Clone the repository**
   ```bash
   git clone https://github.com/NabaaArt/multi-step-form.git
   
   cd test1
   npm install
    npm run build
   npm run dev
