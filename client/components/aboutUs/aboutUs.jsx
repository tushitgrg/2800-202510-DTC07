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
        { name: "Tushit Garg", role: "placeholder", icon: <Lightbulb className="size-6" /> },
        { name: "Woojin Song", role: "placeholder", icon: <Code2 className="size-6" /> },
        { name: "Emanuel Molla", role: "placeholder", icon: <Target className="size-6" /> },
        { name: "Jimmy Cho", role: "placeholder", icon: <Users className="size-6" /> },
        { name: "Tracy Chung", role: "placeholder", icon: <UserCircle2 className="size-6" /> },
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">{text}</p>
        </motion.div>
    )

    return (
        <section id="about" className="w-full py-20 md:py-32 bg-background">
            <div className="container px-4 md:px-6 space-y-20">
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

                    <div className="w-full sm:max-w-md md:max-w-xl mt-10 relative flex justify-center">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {teamCards.map((member, index) => (
                                    <CarouselItem key={index} className="basis-full flex justify-center">
                                        <div className="w-full max-w-sm rounded-xl border border-border/40 bg-muted/10 p-6 backdrop-blur shadow-md hover:-translate-y-1 transition-transform duration-300 text-center">
                                            <div className="flex flex-col items-center space-y-2 mb-4">
                                                <div className="p-2 bg-primary/10 text-primary rounded-full">
                                                    {member.icon}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-muted-foreground text-sm">[ placeholder ]</div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default AboutUs


