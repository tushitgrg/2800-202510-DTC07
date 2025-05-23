"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  BookOpen,
  Brain,
  FileText,
  Lightbulb,
  GraduationCap,
} from "lucide-react";

/**
 * FeaturesSection component renders a section showcasing AI-powered study tools.
 * It uses framer-motion for animation and displays feature cards with icons, titles, and descriptions.
 *
 * @component
 * @returns {JSX.Element} The FeaturesSection React component.
 */
const FeaturesSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const features = [
    {
      title: "AI Quiz Generator",
      description:
        "Create custom quizzes from any study material in seconds with advanced AI.",
      icon: <Brain className="size-5" />,
    },
    {
      title: "Smart Flashcards",
      description:
        "Generate interactive flashcards that adapt to your learning progress.",
      icon: <Lightbulb className="size-5" />,
    },
    {
      title: "Instant Summaries",
      description:
        "Transform lengthy texts into concise, easy-to-understand summaries.",
      icon: <FileText className="size-5" />,
    },
    {
      title: "Study Analytics",
      description:
        "Track your progress and identify areas that need more attention.",
      icon: <Zap className="size-5" />,
    },
    {
      title: "Collaborative Learning",
      description:
        "Share study materials and quizzes with classmates for group learning.",
      icon: <GraduationCap className="size-5" />,
    },
    {
      title: "Multi-format Content",
      description:
        "Convert your study materials between different formats to suit your learning style.",
      icon: <BookOpen className="size-5" />,
    },
  ];

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <section id="features" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI-Powered Study Tools
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Our platform uses advanced AI to help you create study materials,
            test your knowledge, and master any subject faster.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
