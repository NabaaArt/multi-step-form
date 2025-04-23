import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormStore } from "@/store/form-store";
import { ArrowRight, User, Mail, Briefcase } from "lucide-react";
import { StepProgress } from "@/components/step-progress";
import { motion } from "framer-motion";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  occupation: z.string().min(1, {
    message: "Please select an occupation.",
  }),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoPage() {
  const router = useNavigate();
  const { personalInfo, setPersonalInfo, setStepCompleted } = useFormStore();

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: personalInfo?.fullName || "",
      email: personalInfo?.email || "",
      occupation: personalInfo?.occupation || "",
    },
  });

  useEffect(() => {
    // Load data from localStorage if available
    const savedData = useFormStore.getState().personalInfo;
    if (savedData) {
      form.reset(savedData);
    }
  }, [form]);

  function onSubmit(data: PersonalInfoValues) {
    setPersonalInfo(data);
    setStepCompleted("personalInfo");
    console.log("personalInfo", personalInfo);

    router("/steps/preferences");
  }

  return (
    <Card className="w-full  lg:w-[800px] max-w-lg mx-auto shadow-lg border-t-4 border-t-primary my-20 sm:my-10 px-4 sm:px-6 md:px-8">
      <CardHeader className="space-y-4 pb-4 pt-6 text-center">
        <motion.div
          className="w-full flex items-center justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress indicator */}
          <StepProgress />
        </motion.div>
        <CardTitle className="text-xl sm:text-2xl font-bold">
          Personal Information
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Please enter your basic information 
        </CardDescription>
      </CardHeader>

      <CardContent className=" pb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="pl-10 h-11 border-muted bg-muted/30 focus-visible:ring-primary/50"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter your full name 
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                        className="pl-10 h-11 border-muted bg-muted/30 focus-visible:ring-primary/50"
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    We'll use this email to contact you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-sm font-medium">
                    Occupation
                  </FormLabel>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="pl-10 h-11 border-muted bg-muted/30 focus-visible:ring-primary/50">
                          <SelectValue placeholder="Select your occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormDescription className="text-xs">
                    Select your current role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-11 text-sm font-medium transition-all hover:shadow-md"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
