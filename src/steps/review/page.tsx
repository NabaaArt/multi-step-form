import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormStore } from "@/store/form-store";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useRouteProtection } from "@/hooks/use-route-protection";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { StepProgress } from "@/components/step-progress";

export default function ReviewPage() {
  const router = useNavigate();
  const { personalInfo, preferences, resetForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useRouteProtection("preferences", "/steps/preferences");

  const notificationDisplay =
    preferences?.notificationPreference === "none"
      ? "No notifications"
      : `${
          (preferences?.notificationPreference ?? "").charAt(0).toUpperCase() +
          (preferences?.notificationPreference ?? "").slice(1)
        } notifications`;

  const occupationDisplay = personalInfo?.occupation
    ? personalInfo.occupation.charAt(0).toUpperCase() +
      personalInfo.occupation.slice(1)
    : "Not specified";

  async function handleSubmit() {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  }
  function handleReset() {
    resetForm();
    router("/");
  }

  function handleBack() {
    router("/steps/preferences");
  }

  return (
    <Card className="w-full  lg:w-[800px] max-w-lg mx-auto shadow-lg border-t-4 border-t-primary my-20 sm:my-10 px-4 sm:px-6 md:px-8">
      <CardContent>
        {isSubmitted ? (
          <motion.div
            className="flex flex-col items-center justify-center py-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Submission Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for completing all steps of the form.
            </p>
            <Button onClick={handleReset}>Start Over</Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <CardHeader className="text-center">
              <motion.div
                className="w-full flex items-center justify-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Progress indicator */}
                <StepProgress />
              </motion.div>
            </CardHeader>

              <CardTitle className="text-xl font-semibold text-center">
                Review Your Information
              </CardTitle>
              <div className="text-sm text-center text-muted-foreground">
                Please review all the information 
              </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <div className="bg-muted/30 p-4 rounded-md space-y-2">
                <InfoRow label="Full Name" value={personalInfo?.fullName} />
                <InfoRow label="Email" value={personalInfo?.email} />
                <InfoRow label="Occupation" value={occupationDisplay} />
              </div>
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-medium mb-2">Preferences</h3>
              <div className="bg-muted/30 p-4 rounded-md space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-muted-foreground">Interests:</span>
                  <div className="col-span-2 flex flex-wrap">
                    {preferences?.interests.map((interest) => (
                      <Badge key={interest} className="mr-1 mb-1">
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <InfoRow label="Notifications" value={notificationDisplay} />
                {/* <InfoRow label="Theme" value={themeDisplay} /> */}
              </div>
            </motion.div>

            {personalInfo?.occupation === "student" && (
              <div className="bg-primary/10 p-4 rounded-md">
                <p className="text-sm">
                  <strong>Note:</strong> As a student, you're eligible for our
                  educational resources and discounts.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>

      {!isSubmitted && (
        <CardFooter className="flex  mt-6 justify-between">
          <Button
            variant="outline"
            className="h-12 px-5"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="h-12 px-6 font-medium transition-all hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="text-muted-foreground">{label}:</span>
      <span className="col-span-2 font-medium">{value}</span>
    </div>
  );
}
