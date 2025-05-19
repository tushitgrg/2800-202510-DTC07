"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";


/**
 * Renders the FAQ section with animated appearance and an accordion
 * containing frequently asked questions and their answers.
 * 
 * @component
 * @returns {JSX.Element} The FAQ section component
 */
const FaqSection = () => {
  return (
    <section id="faq" className="w-full py-20 md:py-32">
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
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about our AI study platform.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                question: "How does the AI generate quizzes and flashcards?",
                answer:
                  "Our AI analyzes your study materials to identify key concepts, facts, and relationships. It then creates questions that test your understanding of these concepts, with varying difficulty levels to ensure comprehensive learning.",
              },
              {
                question: "Can I use Scholiast for any subject?",
                answer:
                  "Yes! Scholiast works for virtually any subject - from biology and chemistry to history, literature, law, medicine, and more. The AI adapts to the content you provide and generates appropriate study materials.",
              },
              {
                question: "How accurate are the AI-generated summaries?",
                answer:
                  "Our AI is trained to extract the most important information from your study materials. While no summary can capture 100% of the content, our users report that the summaries cover 90-95% of key concepts, making them excellent for review and reinforcement.",
              },
              {
                question: "Can I share my study materials with classmates?",
                answer:
                  "Yes! The Premium and Group plans allow you to share your generated quizzes, flashcards, and summaries with others. The Group plan specifically includes collaborative features for study groups.",
              },
              {
                question: "Is my data secure?",
                answer:
                  "Absolutely. We take data security very seriously. Your uploaded study materials and generated content are encrypted and never shared with third parties. We comply with FERPA and other educational privacy regulations.",
              },
              {
                question:
                  "Can I use Scholiast to prepare for standardized tests?",
                answer:
                  "Yes! Many students use Scholiast to prepare for tests like the SAT, ACT, MCAT, LSAT, and more. Upload your study guides or textbooks, and our AI will generate targeted practice questions and summaries.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-border/40 py-2"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
