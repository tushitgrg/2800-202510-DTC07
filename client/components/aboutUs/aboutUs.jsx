"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Users, Target, UserCircle2, Code2, Lightbulb } from "lucide-react"

const AboutUs = () => {
    const teamCards = [
        { name: "Tushit Garg", role: "Our Captain", icon: <Lightbulb className="size-6" />, description:"A slightly small genius teenager who’s not quite of legal drinking age, but probably has 5+ years of dev experience. Always “busy” for no apparent reason... kids these days." },
        { name: "Woojin Song", role: "Our Best Scrum Master & Spokesman", icon: <UserCircle2 className="size-6" />, description: "When you hear “wait a minute,” you know you’ve messed something up. The ultimate translator for non-native speakers, a lifesaver for all docs and grammar. Online nearly 24/7." },
        { name: "Emanuel Molla", role: "Our Backend Developer", icon: <Target className="size-6" />, description: "Solves all our Git issues, APIs, and database mysteries. We suspect he’s a robot. He only stands up when it’s time to fix something critical. Rumor has it, his headset is directly routed into the backend." },
        { name: "Jimmy Cho", role: "Our Frontend Developer", icon: <Users className="size-6" />, description: "Low energy consumption. Just feed him iced coffee, smoke, and alcohol, then watch him create world-class UX/UI. Favorite line: “Good for you.” You better find him before 10 PM. After that, good luck. A low-key party king." },
        { name: "Tracy Chung", role: "Our Placeholder", icon: <Code2 className="size-6" />, description: "The 5th Group mate, because every team needs five members." },
    ]

    const SectionHeader = ({ badge, title, text }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-4"
        >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                {badge}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight pt-4">{title}</h2>
            <p className="max-w-prose text-muted-foreground text-sm sm:text-base leading-relaxed px-4 sm:px-0">
                {text}
            </p>

        </motion.div>
    )

    return (
        <section id="about" className="w-full py-5 md:py-32 ">
            <div className="container px-8 md:px-8 space-y-10">
                <SectionHeader
                    badge="About Us"
                    title="Why We Built Scholiast"
                    text="Studying should not feel like a constant uphill battle. As students ourselves, we have experienced the frustration of messy notes, overwhelming PDFs, and the uncertainty of what or how to review. Scholiast was created out of that challenge. It is an AI-powered study companion that turns your own materials into interactive flashcards, quizzes, and summaries. The goal is to help you study faster, stay focused, and truly retain what you learn. Scholiast is built with empathy and designed to be the learning tool we always wished existed. Now, we are sharing it with others who need it too."
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center space-y-4"
                >
                    <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                        Who We Are
                    </Badge>

                    <div className="relative w-full px-4 sm:px-0">
                        <Carousel className="w-full max-w-sm sm:max-w-xl mx-auto">
                            <CarouselContent>
                                {teamCards.map((member, index) => (
                                    <CarouselItem key={index} className="basis-full flex justify-center">
                                        <div className="w-full max-w-sm rounded-xl border border-border/40 bg-muted/10 p-3 backdrop-blur shadow-md hover:-translate-y-1 transition-transform duration-300 text-center">
                                            <div className="flex flex-col items-center space-y-2 mb-4">
                                                <div className="p-2 bg-primary/10 text-primary rounded-full">
                                                    {member.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-muted-foreground text-sm">{member.description}</div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="ml-10" />
                            <CarouselNext className="mr-10" />
                        </Carousel>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutUs


