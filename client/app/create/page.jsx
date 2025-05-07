"use client"


import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Upload, FileText, Brain, Lightbulb, Check, X, Sparkles, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { generateFlashcardPrompt, generateQuizPrompt, generateSummaryPrompt } from "@/lib/prompts"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"


export default function CreatePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("upload")
  // Update the useState for contentType to be an array
  const [selectedContentTypes, setSelectedContentTypes] = useState([])
  // Update the file state to handle a single file instead of an array
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
const [titleText, settitleText] = useState("")
const [progressV, setprogressV] = useState(0)
  // Quiz settings
  const [quizSettings, setQuizSettings] = useState({
    questionCount: 10,
    difficulty: "medium",
    questionTypes: ["multiple-choice", "true-false"],
  })

  // Flashcard settings
  const [flashcardSettings, setFlashcardSettings] = useState({
    cardCount: 20,
    complexity: "medium",
    style: "standard",
  })

  // Summary settings
  const [summarySettings, setSummarySettings] = useState({
    length: "medium",
    focusAreas: ["key-concepts", "definitions"],
  })

  // Handle file selection
  // Update the handleFileSelect function to only accept one PDF file
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
      }
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      }
    }
  }
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
      }, 50);
  
      return () => clearInterval(interval);
    }
  }, [currentStep]);
  

  const removeFile = () => {
    setFile(null)
  }

  const handleNext =async () => {
    if (currentStep === "upload") {
      if (!file) return
      setCurrentStep("select")
    } else if (currentStep === "select") {
      if (selectedContentTypes.length === 0) return
      setCurrentStep("settings")
    } else if (currentStep === "settings") {
      setCurrentStep("processing")
      let apiBody = new FormData()
      apiBody.append('pdf', file)
      apiBody.append('title', titleText)
      if(selectedContentTypes.includes("quiz")){
        apiBody.append("quizPrompt",  generateQuizPrompt(quizSettings)) 
      }
      if(selectedContentTypes.includes("flashcards")){
        apiBody.append("flashcardPrompt", generateFlashcardPrompt(flashcardSettings))
      }
      if(selectedContentTypes.includes("summary")){
        apiBody.append("summaryPrompt",generateSummaryPrompt(summarySettings))
      }
try{

  

  const resp = await fetch('http://localhost:3001/resources', {
    method: "POST",
    body: apiBody,
     credentials: 'include'
  })
  const data= await resp.json()
  router.push(`/resource/${data.resourceID}`)
}catch(e){
  console.log(e)
  alert("Errrror") //change this to a toast
}
      
  
      
    }
  }

  // Handle back step
  const handleBack = () => {
    if (currentStep === "select") {
      setCurrentStep("upload")
    } else if (currentStep === "settings") {
      setCurrentStep("select")
    }
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0 },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
   
     

      <main className="container py-12 md:py-16 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl opacity-30"
            animate={{
              x: [0, -20, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl opacity-30"
            animate={{
              x: [0, 20, 0],
              y: [0, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
        </div>

        {/* Progress steps */}
        <div className="mb-12">
          <div className="flex justify-between max-w-3xl mx-auto mb-8">
            {["Upload", "Select", "Settings", "Processing"].map((step, index) => {
              const stepKey = step.toLowerCase()
              const isActive = currentStep === stepKey
              const isPast =
                (currentStep === "select" && index === 0) ||
                (currentStep === "settings" && index <= 1) ||
                (currentStep === "processing" && index <= 2)

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
                      isActive ? "text-foreground font-medium" : isPast ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="relative h-1 bg-muted rounded-full max-w-3xl mx-auto">
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

        {/* Form content */}
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
                  <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                    Step 1
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Your Study Material</h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Upload your notes, textbooks, or any study material you want to learn from. We support PDF, DOCX,
                    TXT, and image files.
                  </p>
                </motion.div>

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
                  {/* Update the file input to only accept PDF files */}
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf" />

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Upload className="size-8" />
                    </div>
                    <div>
                      {/* Update the drag and drop text */}
                      <h3 className="text-xl font-medium mb-2">Drag and drop your PDF file here</h3>
                      <p className="text-muted-foreground mb-4">or click to browse your files</p>
                      <Button onClick={() => fileInputRef.current?.click()} className="rounded-full">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Replace the files.length check with file check */}
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
                            <p className="font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
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

                <motion.div variants={itemVariants} className="flex justify-end">
                  {/* Update the continue button to check for a single file */}
                  <Button onClick={handleNext} className="rounded-full" disabled={!file || isUploading}>
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
                  <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                    Step 2
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">What Would You Like to Create?</h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Choose what type of study material you want our AI to generate from your uploaded content.
                  </p>
                </motion.div>

                {/* Modify the content type selection section in Step 2 */}
                {/* Replace the existing content type selection code with this */}
                <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      type: "quiz",
                      title: "Quiz",
                      description: "Generate interactive quizzes with various question types to test your knowledge.",
                      icon: <Brain className="size-6" />,
                      color: "from-blue-600 to-blue-800",
                    },
                    {
                      type: "flashcards",
                      title: "Flashcards",
                      description: "Create digital flashcards with questions on one side and answers on the other.",
                      icon: <Lightbulb className="size-6" />,
                      color: "from-purple-600 to-purple-800",
                    },
                    {
                      type: "summary",
                      title: "Summary",
                      description: "Generate concise summaries that capture the key points from your materials.",
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
                              return prev.filter((type) => type !== item.type)
                            } else {
                              return [...prev, item.type]
                            }
                          })
                        }}
                      >
                        <CardContent className="p-6 flex flex-col h-full">
                          <div
                            className={`size-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4`}
                          >
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground flex-grow">{item.description}</p>

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
                              {selectedContentTypes.includes(item.type) ? "Selected" : "Select this option"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="rounded-full">
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  {/* Update the next button in step 2 */}
                  <Button onClick={handleNext} className="rounded-full" disabled={selectedContentTypes.length === 0}>
                    Continue
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Settings */}
            {/* Update the settings step to show settings for all selected content types */}
            {/* Replace the existing settings step content with this */}
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
                  <Badge className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                    Step 3
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">Customize Your Content</h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Configure the settings for each type of content you've selected.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                 
                  <Card className="border-border/40">
                    <CardContent className="p-6 pt-6 space-y-8">
                    <Input type={'text'} placeholder={"Add a title (optional)"} value={titleText} onChange={(e)=>settitleText(e.currentTarget.value)}/>
                      {selectedContentTypes.map((type, index) => (
                        <div key={type}>
                          {index > 0 && <div className="border-t border-border/40 my-6"></div>}

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
                            {type.charAt(0).toUpperCase() + type.slice(1)} Settings
                          </h3>

                          {/* Quiz Settings */}
                          {type === "quiz" && (
                            <div className="space-y-6 pl-11">
                              <div className="space-y-4">
                                <div className="flex justify-between">
                                  <Label htmlFor="questionCount">
                                    Number of Questions: {quizSettings.questionCount}
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
                                    setQuizSettings({ ...quizSettings, questionCount: value[0] })
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
                                      variant={quizSettings.difficulty === level ? "default" : "outline"}
                                      className="rounded-lg capitalize"
                                      onClick={() => setQuizSettings({ ...quizSettings, difficulty: level })}
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
                                    { id: "multiple-choice", label: "Multiple Choice" },
                                    { id: "true-false", label: "True/False" },
                                  ].map((type) => (
                                    <div key={type.id} className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={type.id}
                                        checked={quizSettings.questionTypes.includes(type.id)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setQuizSettings({
                                              ...quizSettings,
                                              questionTypes: [...quizSettings.questionTypes, type.id],
                                            })
                                          } else {
                                            setQuizSettings({
                                              ...quizSettings,
                                              questionTypes: quizSettings.questionTypes.filter((t) => t !== type.id),
                                            })
                                          }
                                        }}
                                        className="rounded border-border text-primary focus:ring-primary"
                                      />
                                      <Label htmlFor={type.id} className="cursor-pointer">
                                        {type.label}
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
                                  <Label htmlFor="cardCount">Number of Flashcards: {flashcardSettings.cardCount}</Label>
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
                                    setFlashcardSettings({ ...flashcardSettings, cardCount: value[0] })
                                  }
                                  className="py-4"
                                />
                              </div>

                              <div className="space-y-4">
                                <Label>Complexity Level</Label>
                                <div className="grid grid-cols-3 gap-4">
                                  {["basic", "medium", "advanced"].map((level) => (
                                    <Button
                                      key={level}
                                      type="button"
                                      variant={flashcardSettings.complexity === level ? "default" : "outline"}
                                      className="rounded-lg capitalize"
                                      onClick={() => setFlashcardSettings({ ...flashcardSettings, complexity: level })}
                                    >
                                      {level}
                                    </Button>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <Label>Card Style</Label>
                                <RadioGroup
                                  value={flashcardSettings.style}
                                  onValueChange={(value) =>
                                    setFlashcardSettings({ ...flashcardSettings, style: value })
                                  }
                                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                  {[
                                    { value: "standard", label: "Standard (Term → Definition)" },
                                    { value: "reversed", label: "Reversed (Definition → Term)" },
                                    { value: "question", label: "Question & Answer" },
                                    { value: "cloze", label: "Cloze Deletion" },
                                  ].map((style) => (
                                    <div key={style.value} className="flex items-center space-x-2">
                                      <RadioGroupItem value={style.value} id={`${style.value}-flashcard`} />
                                      <Label htmlFor={`${style.value}-flashcard`}>{style.label}</Label>
                                    </div>
                                  ))}
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
                                  {["short", "medium", "comprehensive"].map((length) => (
                                    <Button
                                      key={length}
                                      type="button"
                                      variant={summarySettings.length === length ? "default" : "outline"}
                                      className="rounded-lg capitalize"
                                      onClick={() => setSummarySettings({ ...summarySettings, length: length })}
                                    >
                                      {length}
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
                                  
                                  ].map((area) => (
                                    <div key={area.id} className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={area.id}
                                        checked={summarySettings.focusAreas.includes(area.id)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSummarySettings({
                                              ...summarySettings,
                                              focusAreas: [...summarySettings.focusAreas, area.id],
                                            })
                                          } else {
                                            setSummarySettings({
                                              ...summarySettings,
                                              focusAreas: summarySettings.focusAreas.filter((a) => a !== area.id),
                                            })
                                          }
                                        }}
                                        className="rounded border-border text-primary focus:ring-primary"
                                      />
                                      <Label htmlFor={area.id} className="cursor-pointer">
                                        {area.label}
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

                <motion.div variants={itemVariants} className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="rounded-full">
                    <ArrowLeft className="mr-2 size-4" />
                    Back
                  </Button>
                  <Button onClick={handleNext} className="rounded-full">
                    Generate Content
                    <Sparkles className="ml-2 size-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 4: Processing */}
            {/* Update the processing step to show all selected content types */}
            {/* Replace the existing processing step content with this */}
            {currentStep === "processing" && (
              <motion.div
                key="processing"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="space-y-8"
              >
                <motion.div variants={itemVariants} className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Creating Your {selectedContentTypes.length > 1 ? "Content" : selectedContentTypes[0]}
                  </h1>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our AI is analyzing your material and generating{" "}
                    {selectedContentTypes.length > 1
                      ? selectedContentTypes
                          .map((type, i, arr) => (i === arr.length - 1 ? `and ${type}` : `${type}, `))
                          .join("")
                      : `your ${selectedContentTypes[0]}`}
                    . This may take a few moments.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-12">
                  <div className="relative size-32 mb-8">
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-4 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-8 rounded-full border-4 border-t-transparent border-r-primary border-b-transparent border-l-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="size-10 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-6 max-w-md text-center">
                    <h3 className="text-xl font-medium">AI Processing</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing content...</span>
                        <span>{progressV}%</span>
                      </div>
                      <Progress value={progressV} className="h-2" />
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                      <div className="flex items-center gap-3">
                        <Check className="size-5 text-green-500" />
                        <span>Extracting key concepts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="size-5 text-green-500" />
                        <span>Identifying important terms</span>
                      </div>
                      {selectedContentTypes.map((type, index) => (
                        <div key={type} className="flex items-center gap-3">
                          {index === 0 ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="size-5 text-primary"
                            >
                              <Zap className="size-5" />
                            </motion.div>
                          ) : (
                            <div className="size-5 text-muted-foreground" />
                          )}
                          <span className={index > 0 ? "text-muted-foreground" : ""}>
                            Generating {type.charAt(0).toUpperCase() + type.slice(1)}
                            {index === 0 && "..."}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="size-5" />
                        <span>Finalizing output</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                  <Button variant="outline" className="rounded-full" disabled>
                    <Clock className="mr-2 size-4" />
                    Processing...
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    
  )
}
