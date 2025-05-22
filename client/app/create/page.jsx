"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  Brain,
  Lightbulb,
  Check,
  X,
  Sparkles,
  Zap,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  generateFlashcardPrompt,
  generateQuizPrompt,
  generateSummaryPrompt,
} from "@/lib/prompts";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ServerUrl } from "@/lib/urls";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

/**
 * @typedef {Object} QuizSettings
 * @property {number} questionCount - The number of questions for the quiz.
 * @property {string} difficulty - The difficulty level of the quiz (e.g., "easy", "medium", "hard").
 * @property {string[]} questionTypes - An array of question types to include (e.g., "multiple-choice", "true-false").
 */

/**
 * @typedef {Object} FlashcardSettings
 * @property {number} cardCount - The number of flashcards to generate.
 * @property {string} complexity - The complexity level of the flashcards (e.g., "easy", "medium", "hard").
 * @property {string} style - The style of the flashcards (e.g., "standard").
 */

/**
 * @typedef {Object} SummarySettings
 * @property {string} length - The desired length of the summary (e.g., "short", "medium", "long").
 * @property {string[]} focusAreas - An array of focus areas for the summary (e.g., "key-concepts", "definitions").
 */

/**
 * Renders the Create Page component, allowing users to upload study material and generate
 * various content types like quizzes, flashcards, and summaries.
 * @returns {JSX.Element} The CreatePage component.
 */
export default function CreatePage() {
  useAuth(); // Custom hook for authentication
  const router = useRouter(); // Next.js router for navigation

  // State variables for managing the component's UI and data
  const [currentStep, setCurrentStep] = useState("upload"); // Current step in the content creation process
  const [selectedContentTypes, setSelectedContentTypes] = useState([]); // Array to store selected content types (quiz, flashcards, summary)
  const [youtubeUrl, setyoutubeUrl] = useState(""); // YouTube URL input
  const [file, setFile] = useState(null); // Currently selected file (PDF only)
  const [isDragging, setIsDragging] = useState(false); // Flag for drag-and-drop file upload
  const [uploadProgress, setUploadProgress] = useState(0); // Progress of file upload

  const fileInputRef = useRef(null); // Reference to the hidden file input element
  const [titleText, settitleText] = useState(""); // Title for the generated content (optional)
  const [progressV, setprogressV] = useState(0); // Progress value for the processing step

  /** @type {[QuizSettings, Function]} */
  const [quizSettings, setQuizSettings] = useState({
    questionCount: 10,
    difficulty: "medium",
    questionTypes: ["multiple-choice", "true-false"],
  });

  /** @type {[FlashcardSettings, Function]} */
  const [flashcardSettings, setFlashcardSettings] = useState({
    cardCount: 20,
    complexity: "medium",
    style: "standard",
  });

  /** @type {[SummarySettings, Function]} */
  const [summarySettings, setSummarySettings] = useState({
    length: "medium",
    focusAreas: ["key-concepts", "definitions"],
  });

  const sizeLimit = 50 * 1024 * 1024; // 50 MB file size limit

  /**
   * Validates if a given URL is a valid YouTube URL.
   * @param {string} url - The URL to validate.
   * @returns {boolean} True if the URL is a valid YouTube URL, false otherwise.
   */
  function isValidYouTubeUrl(url) {
    const youtubeRegex =
      /^https:\/\/(www\.youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}([&?]\S*)?$/;
    return youtubeRegex.test(url);
  }

  /**
   * Resets all form states to their initial values.
   */
  const resetForm = () => {
    setCurrentStep("upload");
    setSelectedContentTypes([]);
    setyoutubeUrl("");
    setFile(null);
    setIsDragging(false);
    setUploadProgress(0);
    settitleText("");
    setprogressV(0);
    setQuizSettings({
      questionCount: 10,
      difficulty: "medium",
      questionTypes: ["multiple-choice", "true-false"],
    });
    setFlashcardSettings({
      cardCount: 20,
      complexity: "medium",
      style: "standard",
    });
    setSummarySettings({
      length: "medium",
      focusAreas: ["key-concepts", "definitions"],
    });
  };

  /**
   * Handles file selection from the input field.
   * Accepts only one PDF file and checks its size against the limit.
   * @param {Event} e - The change event from the file input.
   */
  const handleFileSelect = (e) => {
    setyoutubeUrl(""); // Clear YouTube URL if a file is selected
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        if (selectedFile.size < sizeLimit) {
          setFile(selectedFile);
        } else {
          toast.error("File too large!", {
            duration: 4000,
            position: "bottom-right",
          });
        }
      } else {
        toast.error("Only PDF files are supported.", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    }
  };

  /**
   * Handles the drag enter event for the file drop zone.
   * @param {Event} e - The drag event.
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /**
   * Handles the drag leave event for the file drop zone.
   * @param {Event} e - The drag event.
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handles the drag over event for the file drop zone.
   * @param {Event} e - The drag event.
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handles the drop event for the file drop zone.
   * Accepts only one file and checks its size.
   * @param {Event} e - The drop event.
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        if (droppedFile.size < sizeLimit) {
          setFile(droppedFile);
        } else {
          toast.error("File too large!", {
            duration: 4000,
            position: "bottom-right",
          });
        }
      } else {
        toast.error("Only PDF files are supported.", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    }
  };

  /**
   * Effect hook to simulate progress during the "processing" step.
   * Increments progressV until 95% is reached.
   */
  useEffect(() => {
    if (currentStep === "processing") {
      const interval = setInterval(() => {
        setprogressV((v) => {
          if (v >= 95) {
            clearInterval(interval);
            return v;
          }
          return v + 1;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  /**
   * Removes the currently selected file.
   */
  const removeFile = () => {
    setFile(null);
  };

  /**
   * Handles moving to the next step in the content creation process.
   * Performs validation and API calls based on the current step.
   */
  const handleNext = async () => {
    if (currentStep === "upload") {
      if (!file && !isValidYouTubeUrl(youtubeUrl)) {
        toast.error("Please upload a PDF file or provide a valid YouTube URL.", {
          duration: 4000,
          position: "bottom-right",
        });
        return;
      }
      setCurrentStep("select");
    } else if (currentStep === "select") {
      if (selectedContentTypes.length === 0) {
        toast.error("Please select at least one content type.", {
          duration: 4000,
          position: "bottom-right",
        });
        return;
      }
      setCurrentStep("settings");
    } else if (currentStep === "settings") {
      setCurrentStep("processing");
      let apiBody = new FormData();
      if (file) {
        apiBody.append("pdf", file);
      }
      apiBody.append("title", titleText);
      apiBody.append("youtubeUrl", youtubeUrl);

      // Append prompt data based on selected content types
      if (selectedContentTypes.includes("quiz")) {
        apiBody.append("quizPrompt", generateQuizPrompt(quizSettings));
      }
      if (selectedContentTypes.includes("flashcards")) {
        apiBody.append(
          "flashcardPrompt",
          generateFlashcardPrompt(flashcardSettings),
        );
      }
      if (selectedContentTypes.includes("summary")) {
        apiBody.append("summaryPrompt", generateSummaryPrompt(summarySettings));
      }

      try {
        const resp = await fetch(`${ServerUrl}/resources`, {
          method: "POST",
          body: apiBody,
          credentials: "include",
        });
        const data = await resp.json();
        if (resp.status === 500) {
          toast.error(data.error, {
            duration: 4000,
            position: "bottom-right",
          });
          resetForm();
          return;
        }
        router.push(`/resource/${data.resourceID}`);
      } catch (e) {
        console.error("Error during resource creation:", e);
        toast.error("Error connecting to the backend!", {
          duration: 4000,
          position: "bottom-right",
        });
        resetForm();
      }
    }
  };

  /**
   * Handles moving back to the previous step in the content creation process.
   */
  const handleBack = () => {
    if (currentStep === "select") {
      setCurrentStep("upload");
    } else if (currentStep === "settings") {
      setCurrentStep("select");
    }
  };

  /**
   * Formats a file size in bytes to a human-readable string (e.g., "1.23 MB").
   * @param {number} bytes - The file size in bytes.
   * @returns {string} The formatted file size string.
   */
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <main className="container py-12 md:py-16 relative px-10 md:px-0">
      {/* Background elements for visual appeal */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-30"
          animate={{
            x: [0, -20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl opacity-30"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Progress steps indicator */}
      <div className="mb-12">
        <div className="flex justify-between max-w-3xl mx-auto mb-8">
          {["Upload", "Select", "Settings", "Processing"].map((step, index) => {
            const stepKey = step.toLowerCase();
            const isActive = currentStep === stepKey;
            const isPast =
              (currentStep === "select" && index === 0) ||
              (currentStep === "settings" && index <= 1) ||
              (currentStep === "processing" && index <= 2);

            return (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`size-10 rounded-full flex items-center justify-center font-medium mb-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isPast
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isPast ? <Check className="size-5" /> : index + 1}
                </div>
                <span
                  className={`text-sm ${
                    isActive
                      ? "text-foreground font-medium"
                      : isPast
                        ? "text-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative h-1 bg-muted rounded-full max-w-3xl mx-auto">
          {/* Animated progress bar */}
          <motion.div
            className="absolute h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width:
                currentStep === "upload"
                  ? "0%"
                  : currentStep === "select"
                    ? "33%"
                    : currentStep === "settings"
                      ? "66%"
                      : "100%",
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Form content based on current step */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {currentStep === "upload" && (
            <motion.div
              key="upload"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="text-center">
                <Badge
                  className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                  variant="secondary"
                >
                  Step 1
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Upload Your Study Material
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Upload your notes, textbooks, or any study material you want
                  to learn from. We support PDF files.
                </p>
              </motion.div>

              {/* File upload drag and drop area */}
              <motion.div
                variants={itemVariants}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf" // Accept only PDF files
                />

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Upload className="size-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      Drag and drop your PDF file here
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse your files (Max 50MB)
                    </p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full"
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* OR divider and YouTube URL input */}
              <motion.div variants={itemVariants}>
                <p className="text-center p-2 text-2xl">OR</p>
                <Input
                  type="url"
                  className={`${isValidYouTubeUrl(youtubeUrl) ? "input-valid" : "input-invalid"}`}
                  placeholder="YouTube URL"
                  value={youtubeUrl}
                  onChange={(e) => setyoutubeUrl(e.currentTarget.value)}
                  disabled={!!file} // Disable if a file is selected
                />
              </motion.div>

              {/* Display selected file details */}
              {file && (
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-lg font-medium">Selected File</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-muted/20 p-3 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="size-5" />
                        </div>
                        <div>
                          <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation button for upload step */}
              <motion.div variants={itemVariants} className="flex justify-end">
                <Button
                  onClick={handleNext}
                  className="rounded-full"
                  disabled={!file && !isValidYouTubeUrl(youtubeUrl)}
                >
                  Continue
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Select Content Type */}
          {currentStep === "select" && (
            <motion.div
              key="select"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="text-center">
                <Badge
                  className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                  variant="secondary"
                >
                  Step 2
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  What Would You Like to Create?
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose what type of study material you want our AI to generate
                  from your uploaded content.
                </p>
              </motion.div>

              {/* Content type selection cards */}
              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-3 gap-6"
              >
                {[
                  {
                    type: "quiz",
                    title: "Quiz",
                    description:
                      "Generate interactive quizzes with various question types to test your knowledge.",
                    icon: <Brain className="size-6" />,
                    color: "from-blue-600 to-blue-800",
                  },
                  {
                    type: "flashcards",
                    title: "Flashcards",
                    description:
                      "Create digital flashcards with questions on one side and answers on the other.",
                    icon: <Lightbulb className="size-6" />,
                    color: "from-purple-600 to-purple-800",
                  },
                  {
                    type: "summary",
                    title: "Summary",
                    description:
                      "Generate concise summaries that capture the key points from your materials.",
                    icon: <FileText className="size-6" />,
                    color: "from-pink-600 to-pink-800",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.type}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card
                      className={`h-full overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedContentTypes.includes(item.type)
                          ? "border-primary shadow-lg shadow-primary/20"
                          : "border-border/40 hover:border-primary/50"
                      }`}
                      onClick={() => {
                        setSelectedContentTypes((prev) => {
                          if (prev.includes(item.type)) {
                            return prev.filter((type) => type !== item.type);
                          } else {
                            return [...prev, item.type];
                          }
                        });
                      }}
                    >
                      <CardContent className="p-6 flex flex-col h-full">
                        <div
                          className={`size-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}
                        >
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground flex-grow">
                          {item.description}
                        </p>

                        <div className="mt-6 flex items-center">
                          <div
                            className={`size-5 rounded-md border flex items-center justify-center mr-2 ${
                              selectedContentTypes.includes(item.type)
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                            }`}
                          >
                            {selectedContentTypes.includes(item.type) && (
                              <Check className="size-3 text-primary-foreground" />
                            )}
                          </div>
                          <span
                            className={
                              selectedContentTypes.includes(item.type)
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            }
                          >
                            {selectedContentTypes.includes(item.type)
                              ? "Selected"
                              : "Select this option"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Navigation buttons for select step */}
              <motion.div
                variants={itemVariants}
                className="flex justify-between"
              >
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="rounded-full"
                  disabled={selectedContentTypes.length === 0}
                >
                  Continue
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 3: Settings */}
          {currentStep === "settings" && (
            <motion.div
              key="settings"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-8"
            >
              <motion.div variants={itemVariants} className="text-center">
                <Badge
                  className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                  variant="secondary"
                >
                  Step 3
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Customize Your Content
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Configure the settings for each type of content you&apos;ve
                  selected.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border-border/40">
                  <CardContent className="p-6 pt-6 space-y-8">
                    {/* Optional title input */}
                    <Input
                      type={"text"}
                      placeholder={"Add a title (optional)"}
                      value={titleText}
                      onChange={(e) => settitleText(e.currentTarget.value)}
                    />
                    {/* Render settings for each selected content type */}
                    {selectedContentTypes.map((type, index) => (
                      <div key={type}>
                        {index > 0 && (
                          <div className="border-t border-border/40 my-6"></div>
                        )}

                        <h3 className="text-xl font-bold mb-6 flex items-center">
                          <div
                            className={`size-8 rounded-full flex items-center justify-center mr-3 text-white
                              ${type === "quiz" ? "bg-blue-600" : type === "flashcards" ? "bg-purple-600" : "bg-pink-600"}`}
                          >
                            {type === "quiz" ? (
                              <Brain className="size-4" />
                            ) : type === "flashcards" ? (
                              <Lightbulb className="size-4" />
                            ) : (
                              <FileText className="size-4" />
                            )}
                          </div>
                          {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                          Settings
                        </h3>

                        {/* Quiz Settings */}
                        {type === "quiz" && (
                          <div className="space-y-6 pl-11">
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <Label htmlFor="questionCount">
                                  Number of Questions:{" "}
                                  {quizSettings.questionCount}
                                </Label>
                                <span className="text-muted-foreground text-sm">
                                  {quizSettings.questionCount} questions
                                </span>
                              </div>
                              <Slider
                                id="questionCount"
                                min={5}
                                max={30}
                                step={1}
                                value={[quizSettings.questionCount]}
                                onValueChange={(value) =>
                                  setQuizSettings({
                                    ...quizSettings,
                                    questionCount: value[0],
                                  })
                                }
                                className="py-4"
                              />
                            </div>

                            <div className="space-y-4">
                              <Label>Difficulty Level</Label>
                              <div className="grid grid-cols-3 gap-4">
                                {["easy", "medium", "hard"].map((level) => (
                                  <Button
                                    key={level}
                                    type="button"
                                    variant={
                                      quizSettings.difficulty === level
                                        ? "default"
                                        : "outline"
                                    }
                                    className="rounded-lg capitalize"
                                    onClick={() =>
                                      setQuizSettings({
                                        ...quizSettings,
                                        difficulty: level,
                                      })
                                    }
                                  >
                                    {level}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <Label>Question Types</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  {
                                    id: "multiple-choice",
                                    label: "Multiple Choice",
                                  },
                                  { id: "true-false", label: "True/False" },
                                ].map((qType) => (
                                  <div
                                    key={qType.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={qType.id}
                                      checked={quizSettings.questionTypes.includes(
                                        qType.id,
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setQuizSettings({
                                            ...quizSettings,
                                            questionTypes: [
                                              ...quizSettings.questionTypes,
                                              qType.id,
                                            ],
                                          });
                                        } else {
                                          setQuizSettings({
                                            ...quizSettings,
                                            questionTypes:
                                              quizSettings.questionTypes.filter(
                                                (t) => t !== qType.id,
                                              ),
                                          });
                                        }
                                      }}
                                      className="rounded border-border text-primary focus:ring-primary"
                                    />
                                    <Label
                                      htmlFor={qType.id}
                                      className="cursor-pointer"
                                    >
                                      {qType.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Flashcard Settings */}
                        {type === "flashcards" && (
                          <div className="space-y-6 pl-11">
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <Label htmlFor="cardCount">
                                  Number of Flashcards:{" "}
                                  {flashcardSettings.cardCount}
                                </Label>
                                <span className="text-muted-foreground text-sm">
                                  {flashcardSettings.cardCount} cards
                                </span>
                              </div>
                              <Slider
                                id="cardCount"
                                min={10}
                                max={50}
                                step={5}
                                value={[flashcardSettings.cardCount]}
                                onValueChange={(value) =>
                                  setFlashcardSettings({
                                    ...flashcardSettings,
                                    cardCount: value[0],
                                  })
                                }
                                className="py-4"
                              />
                            </div>

                            <div className="space-y-4">
                              <Label>Complexity Level</Label>
                              <div className="grid grid-cols-3 gap-4">
                                {["easy", "medium", "hard"].map((level) => (
                                  <Button
                                    key={level}
                                    type="button"
                                    variant={
                                      flashcardSettings.complexity === level
                                        ? "default"
                                        : "outline"
                                    }
                                    className="rounded-lg capitalize"
                                    onClick={() =>
                                      setFlashcardSettings({
                                        ...flashcardSettings,
                                        complexity: level,
                                      })
                                    }
                                  >
                                    {level}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <Label>Flashcard Style</Label>
                              <RadioGroup
                                value={flashcardSettings.style}
                                onValueChange={(value) =>
                                  setFlashcardSettings({
                                    ...flashcardSettings,
                                    style: value,
                                  })
                                }
                                className="flex flex-col md:flex-row gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="standard"
                                    id="style-standard"
                                  />
                                  <Label htmlFor="style-standard">
                                    Standard (Term/Definition)
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="question-answer"
                                    id="style-question-answer"
                                  />
                                  <Label htmlFor="style-question-answer">
                                    Question/Answer
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        )}

                        {/* Summary Settings */}
                        {type === "summary" && (
                          <div className="space-y-6 pl-11">
                            <div className="space-y-4">
                              <Label>Summary Length</Label>
                              <div className="grid grid-cols-3 gap-4">
                                {["short", "medium", "long"].map((len) => (
                                  <Button
                                    key={len}
                                    type="button"
                                    variant={
                                      summarySettings.length === len
                                        ? "default"
                                        : "outline"
                                    }
                                    className="rounded-lg capitalize"
                                    onClick={() =>
                                      setSummarySettings({
                                        ...summarySettings,
                                        length: len,
                                      })
                                    }
                                  >
                                    {len}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <Label>Focus Areas</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                  { id: "key-concepts", label: "Key Concepts" },
                                  { id: "definitions", label: "Definitions" },
                                  { id: "examples", label: "Examples" },
                                  {
                                    id: "applications",
                                    label: "Applications",
                                  },
                                ].map((focus) => (
                                  <div
                                    key={focus.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={focus.id}
                                      checked={summarySettings.focusAreas.includes(
                                        focus.id,
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSummarySettings({
                                            ...summarySettings,
                                            focusAreas: [
                                              ...summarySettings.focusAreas,
                                              focus.id,
                                            ],
                                          });
                                        } else {
                                          setSummarySettings({
                                            ...summarySettings,
                                            focusAreas:
                                              summarySettings.focusAreas.filter(
                                                (f) => f !== focus.id,
                                              ),
                                          });
                                        }
                                      }}
                                      className="rounded border-border text-primary focus:ring-primary"
                                    />
                                    <Label
                                      htmlFor={focus.id}
                                      className="cursor-pointer"
                                    >
                                      {focus.label}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Navigation buttons for settings step */}
              <motion.div
                variants={itemVariants}
                className="flex justify-between"
              >
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="rounded-full"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back
                </Button>
                <Button onClick={handleNext} className="rounded-full">
                  Create Content
                  <Sparkles className="ml-2 size-4" />
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 4: Processing */}
          {currentStep === "processing" && (
            <motion.div
              key="processing"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="space-y-8 text-center"
            >
              <motion.div variants={itemVariants}>
                <Badge
                  className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium"
                  variant="secondary"
                >
                  Step 4
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Generating Your Content...
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Please wait while our AI processes your material and creates
                  your customized study aids. This may take a few moments.
                </p>
              </motion.div>

              {/* Processing animation and progress bar */}
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
                <div className="relative size-24">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Zap className="size-10 text-primary animate-pulse" />
                  </motion.div>
                </div>
                <Progress value={progressV} className="w-full max-w-sm" />
                <p className="text-sm text-muted-foreground">
                  Processing: {progressV.toFixed(0)}%
                </p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Clock className="size-4 mr-2" />
                  Estimated time: 1-2 minutes
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}