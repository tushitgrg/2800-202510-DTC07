"use client"
import { motion } from "framer-motion"
import {


  Star,

} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const TestinomialSection = () => {
  return (
    <section id="testimonials" className="w-full py-20 md:py-32">
    <div className="container px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
      >
        <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
          Testimonials
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Students Love Scholiast</h2>
        <p className="max-w-[800px] text-muted-foreground md:text-lg">
          See how our platform has helped students improve their grades and study more efficiently.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            quote:
              "Scholiast helped me ace my biology final. The AI-generated quizzes identified exactly what I needed to focus on.",
            author: "Alex Chen",
            role: "Pre-Med Student, Stanford",
            rating: 5,
          },
          {
            quote:
              "The flashcard feature is incredible! I memorized all my chemistry formulas in half the time it would normally take me.",
            author: "Sophia Rodriguez",
            role: "Chemistry Major, MIT",
            rating: 5,
          },
          {
            quote:
              "As a student with ADHD, the summary tool has been a game-changer. It helps me focus on the key concepts without getting overwhelmed.",
            author: "Jamie Taylor",
            role: "Psychology Student, NYU",
            rating: 5,
          },
          {
            quote:
              "I used Scholiast to prepare for the MCAT and improved my score by 15 points. The personalized quizzes were exactly what I needed.",
            author: "Michael Park",
            role: "Medical School Applicant",
            rating: 5,
          },
          {
            quote:
              "The collaborative features let my study group create and share materials. We all got A's on our final project!",
            author: "Emma Johnson",
            role: "Business Major, Berkeley",
            rating: 5,
          },
          {
            quote:
              "I was struggling with my law courses until I found Scholiast. The summaries helped me understand complex legal concepts quickly.",
            author: "Daniel Garcia",
            role: "Law Student, Columbia",
            rating: 5,
          },
        ].map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, j) => (
                      <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                    ))}
                </div>
                <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default TestinomialSection