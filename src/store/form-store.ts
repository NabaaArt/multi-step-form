import { create } from "zustand"
import { persist } from "zustand/middleware"

type PersonalInfo = {
  fullName: string
  email: string
  occupation: string
}
interface ThemeState {
  theme: "light" | "dark" ;
  setTheme: (theme: "light" | "dark" ) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light", 
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

interface FormState {
  personalInfo: PersonalInfo | null
  preferences: Preferences | null
  completedSteps: CompletedSteps
  setPersonalInfo: (data: PersonalInfo) => void
  setPreferences: (data: Preferences) => void
  setStepCompleted: (step: keyof CompletedSteps) => void
  resetForm: () => void
}

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
