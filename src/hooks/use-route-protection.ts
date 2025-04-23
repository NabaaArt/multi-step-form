import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "@/store/form-store";

export function useRouteProtection(requiredStep: "personalInfo" | "preferences", redirectPath: string) {
  const navigate = useNavigate(); 
  const completedSteps = useFormStore((state) => state.completedSteps);

  useEffect(() => {
    if (!completedSteps[requiredStep]) {
      navigate(redirectPath); 
    }
  }, [completedSteps, requiredStep, redirectPath, navigate]);
}
