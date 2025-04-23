import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormStore } from "@/store/form-store";

const steps = [
  { id: "personalInfo", path: "/steps/personal-info", label: "Personal Info" },
  { id: "preferences", path: "/steps/preferences", label: "Preferences" },
  { id: "review", path: "/steps/review", label: "Review" },
];

export function StepProgress() {
  const { pathname } = useLocation();
  const { completedSteps } = useFormStore();

  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => {
        const isActive = pathname === step.path;
        const isCompleted =
          completedSteps[step.id as keyof typeof completedSteps] || false; // Ensure it’s falsy if undefined
        const previousCompleted =
          (index > 0 &&
            completedSteps[
              steps[index - 1]?.id as keyof typeof completedSteps
            ]) ||
          false;

        return (
          <div key={step.id} className="flex items-center">
            {index > 0 && (
              <div
                className={cn(
                  "h-1 w-10 md:w-24 lg:w-32 ",
                  previousCompleted ? "bg-primary" : "bg-muted"
                )}
              />
            )}

            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted bg-background"
                )}
              >
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "mt-2   text-[8px] text-center",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
