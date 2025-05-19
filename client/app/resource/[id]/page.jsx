import MainResources from "@/components/Resources/MainResources";
import { redirect } from "next/navigation";
import React from "react";

/**
 * Resource Page
 *
 * This page dynamically loads and displays a specific learning resource.
 * It gets the resource `id` from the URL and passes it to `MainResources`.
 * Redirects to a 404 page if the `id` is invalid or loading fails.
 */
const page = async ({ params }) => {
  try {
    const { id } = await params;

    return <MainResources id={id} />;
  } catch {
    return redirect("/not-found");
  }
};

export default page;
