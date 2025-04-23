import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/form-store";

export function useRouteProtection(requiredStep: "personalInfo" | "preferences", redirectPath: string) {
  const navigate = useNavigate(); // react-router's hook to programmatically navigate
  const completedSteps = useFormStore((state) => state.completedSteps);

  useEffect(() => {
    // If the required step is not completed, redirect to the appropriate step
    if (!completedSteps[requiredStep]) {
      navigate(redirectPath); // Navigate to the redirect path
    }
  }, [completedSteps, requiredStep, redirectPath, navigate]); // Make sure navigate is included in the dependency array
}
