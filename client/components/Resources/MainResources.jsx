"use client";

import { useEffect } from "react";
import { useState } from "react";

import ResourceComp from "./ResourceComp";
import { useRouter } from "next/navigation";
import { ServerUrl } from "@/lib/urls";
import Loading from "../Loading";

export default function MainResources({ id }) {
    const router = useRouter()
    const [resourceData, setresourceData] = useState(null)
    const getData = async () => {
        try {
            const response = await fetch(`${ServerUrl}/resources/${id}`, {
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
            {resourceData ? <ResourceComp resourceData={resourceData} /> : <Loading/>}
        </div>
    );
}