
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormStore } from "@/store/form-store";
import {
  ArrowLeft,
  ArrowRight,
  Settings,
  Bell,
  MessageCircleMore,
  Palette,
  BookOpen,
  Tag,
} from "lucide-react";
import { useRouteProtection } from "@/hooks/use-route-protection";
import { StepProgress } from "@/components/step-progress";
import { motion } from "framer-motion";

const preferencesSchema = z.object({
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one interest.",
  }),
  notificationPreference: z.enum(["email", "push", "none"], {
    required_error: "Please select a notification preference.",
  }),
  themePreference: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme preference.",
  }),
});

type PreferencesValues = z.infer<typeof preferencesSchema>;

const interests = [
  {
    id: "technology",
    label: "Technology",
    icon: <Settings className="h-4 w-4" />,
  },
  { id: "design", label: "Design", icon: <Palette className="h-4 w-4" /> },
  { id: "business", label: "Business", icon: <Tag className="h-4 w-4" /> },
  {
    id: "marketing",
    label: "Marketing",
    icon: <MessageCircleMore className="h-4 w-4" />,
  },
];

export default function PreferencesPage() {
  const router = useNavigate();
  const { preferences, setPreferences, setStepCompleted, personalInfo } =
    useFormStore();

  // Protect this route - redirect if personal info is not completed
  useRouteProtection("personalInfo", "/steps/personal-info");

  const form = useForm<PreferencesValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      interests: preferences?.interests || [],
      notificationPreference: preferences?.notificationPreference || "email",
      themePreference: preferences?.themePreference || "system",
    },
  });

  useEffect(() => {
    // Load data from localStorage if available
    const savedData = useFormStore.getState().preferences;
    if (savedData) {
      form.reset(savedData);
    }
  }, [form]);

  // Show additional fields based on occupation
  const showEducationFields = personalInfo?.occupation === "student";

  function onSubmit(data: PreferencesValues) {
    setPreferences(data);
    setStepCompleted("preferences");


    router("/steps/review");
  }

  return (
    <Card className="w-full  lg:w-[800px] max-w-lg mx-auto shadow-lg border-t-4 border-t-primary my-20 sm:my-10 px-4 sm:px-6 md:px-8">
      <CardHeader className="space-y-1 pb-6 pt-8 ">
      <motion.div
          className="w-full flex items-center justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress indicator */}
          <StepProgress />
        </motion.div>
        <CardTitle className="text-2xl mt-5 font-bold text-center">
          Your Preferences
        </CardTitle>
        <CardDescription className="text-center text-base">
          Tell us about your preferences 
          {personalInfo?.occupation && (
            <span className="block mt-2 font-medium">
              As a{" "}
              <span className="text-primary">{personalInfo.occupation}</span>,

            </span>
          )}
        </CardDescription>

      
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem className="space-y-4">
                  <div>
                    <FormLabel className="text-base font-medium">
                      Interests
                    </FormLabel>
                    <FormDescription>
                      Select all that apply to you.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {interests.map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={interest.id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          interest.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== interest.id
                                          )
                                        );
                                  }}
                                  className="h-5 w-5 border-2"
                                />
                              </FormControl>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  {interest.icon}
                                </div>
                                <FormLabel className="font-medium cursor-pointer">
                                  {interest.label}
                                </FormLabel>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="notificationPreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="h-4 w-4 text-primary" />
                      </div>
                      <FormLabel className="text-base font-medium">
                        Notification Preference
                      </FormLabel>
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3 mt-2 p-4 rounded-lg"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            Email Notifications
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">
                            No Notifications
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="themePreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Palette className="h-4 w-4 text-primary" />
                      </div>
                      <FormLabel className="text-base font-medium">Theme Preference</FormLabel>
                    </div>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3 mt-2 bg-muted/30 p-4 rounded-lg"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="light" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">Light Theme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="dark" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">Dark Theme</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="system" className="h-5 w-5" />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer">System Default</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            {/* Conditional fields based on occupation */}
            {showEducationFields && (
              <div className="p-6 border-2 border-primary/20 rounded-lg bg-primary/5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Student-specific options
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We've noticed you're a student. These additional options
                      might interest you.
                    </p>
                  </div>
                </div>
                <div className="space-y-3 ml-2">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="student-discount"
                      className="h-5 w-5 border-2"
                    />
                    <label
                      htmlFor="student-discount"
                      className="text-base font-medium cursor-pointer"
                    >
                      I'm interested in student discounts
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="student-resources"
                      className="h-5 w-5 border-2"
                    />
                    <label
                      htmlFor="student-resources"
                      className="text-base font-medium cursor-pointer"
                    >
                      Send me educational resources
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router("/steps/personal-info")}
                className="h-12 px-5"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </Button>
              <Button
                type="submit"
                className="h-12 px-6 font-medium transition-all hover:shadow-lg"
              >
                Continue <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
