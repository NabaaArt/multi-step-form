import ThemedComponent from "@/components/ThemeComonent";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <main className="w-full  min-h-screen bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white relative">
      <div className="fixed top-4 right-4 z-50">
        <ThemedComponent />
      </div>

      <div className="container mx-auto  px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </main>
  );
}
