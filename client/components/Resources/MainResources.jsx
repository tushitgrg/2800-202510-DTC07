"use client";

import { use, useEffect } from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "@/components/quizzes/quiz";
import Flashcards from "@/components/flashcards/flashcard";
import { date } from "zod";
import ResourceComp from "./ResourceComp";
import { useRouter } from "next/navigation";

export default function MainResources({ id }) {
    const router = useRouter()
    const [resourceData, setresourceData] = useState(null)
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/resources/${id}`, {
                credentials: 'include'
            })

            const data = await response.json()
            if (!response.ok || !data) {
                router.push('/not-found')
            }
            setresourceData(data)
        } catch {
            router.push('/not-found')
        }

    }
    useEffect(() => {
        getData()
    }, [])



    return (
        <div>
            {resourceData ? <ResourceComp resourceData={resourceData} /> : <div>Loading</div>}
        </div>
    );
}