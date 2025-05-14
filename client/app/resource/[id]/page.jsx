import MainResources from "@/components/Resources/MainResources";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({ params }) => {
  try {
    const { id } = await params;

    return <MainResources id={id} />;
  } catch {
    return redirect("/not-found");
  }
};

export default page;
