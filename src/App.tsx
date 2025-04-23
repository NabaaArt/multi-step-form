import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import APIcomponent from "./components/API-component";

export default function App() {
  return (
    <div className="mx-auto flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-2xl">Multi-Step Application</CardTitle>
          <CardDescription>
            Complete all steps to submit your information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>This application demonstrates:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Multi-step form with routing</li>
            <li>Global state management with Zustand</li>
            <li>Form validation with React Hook Form and Zod</li>
            <li>Edge case handling and route protection</li>
            <li>Responsive design with Tailwind CSS</li>
          </ul>
          <APIcomponent/>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link to="/steps/personal-info">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
    
        </CardFooter>
      </Card>
    </div>
  );
}
