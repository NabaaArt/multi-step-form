import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define types for our form data
type PersonalInfo = {
  fullName: string
  email: string
  occupation: string
}
interface ThemeState {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "system", // Default to system theme
  setTheme: (theme) => set({ theme }),
}));
type Preferences = {
  interests: string[]
  notificationPreference: "email" | "push" | "none"
  themePreference: "light" | "dark" | "system"
}

type CompletedSteps = {
  personalInfo: boolean
  preferences: boolean
  review: boolean
}

// Define the store state
interface FormState {
  personalInfo: PersonalInfo | null
  preferences: Preferences | null
  completedSteps: CompletedSteps
  setPersonalInfo: (data: PersonalInfo) => void
  setPreferences: (data: Preferences) => void
  setStepCompleted: (step: keyof CompletedSteps) => void
  resetForm: () => void
}

// Create the store with persistence
export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      personalInfo: null,
      preferences: null,
      completedSteps: {
        personalInfo: false,
        preferences: false,
        review: false,
      },
      setPersonalInfo: (data) => set({ personalInfo: data }),
      setPreferences: (data) => set({ preferences: data }),
      setStepCompleted: (step) =>
        set((state) => ({
          completedSteps: {
            ...state.completedSteps,
            [step]: true,
          },
        })),
      resetForm: () =>
        set({
          personalInfo: null,
          preferences: null,
          completedSteps: {
            personalInfo: false,
            preferences: false,
            review: false,
          },
        }),
    }),
    {
      name: "multi-step-form-storage",
    },
  ),
)
