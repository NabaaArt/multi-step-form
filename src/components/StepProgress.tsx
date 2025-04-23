
import { motion } from "framer-motion"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <motion.div
      className="w-full flex items-center justify-center mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-2 rounded-full transition-all duration-300 ${
              index === currentStep ? "bg-primary shadow-md scale-105" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </motion.div>
  )
}
