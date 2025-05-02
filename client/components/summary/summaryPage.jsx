import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function SummaryPage({ params }) {
  // Get the id from the URL parameters
  const { note } = await params;

  // Date the summary was created
  const created = new Date(note.date);

  // Format the date to Month-Day-Year
  const formattedDate = created.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="flex flex-col min-h-screen">
      <p className={"text-xs flex items-center pl-8"}>
        <ChevronLeft />
        Back to Dashboard
      </p>
      <div className="p-8">
        <h1 className="font-bold text-3xl mb-6 text-center">
          Summary Notes: {note.title}
        </h1>

        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Badge className={""}>{note.tag}</Badge>
            <Badge>Created on: {formattedDate}</Badge>
          </div>
            <Button className={""}>Share</Button>
        </div>

        <div className="text-black text-xs bg-gray-400 mt-4 p-2">
          {note.description}
        </div>
      </div>

    </section>
  );
}