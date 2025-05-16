import React from "react";
import CommunityCard from "@/components/Community/CommunityCard";
import { useRouter } from "next/navigation";


const CommunityRecomm = ({ userSchool, resources}) => {
    const router = useRouter();
    const normalizedUserSchool = userSchool?.trim();

    if (!normalizedUserSchool) {
        return (
            <div className="border border-dashed border-gray-600 rounded-2xl p-10 mt-4 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center space-y-4">
                <h2 className="text-md text-white">
                    You haven't selected your school yet.
                </h2>
                <button
                    onClick={() => router.push("/profile")}
                    className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                    Go to Profile to Set School
                </button>
            </div>
        );
    }    

    const normalize = (str) => (str ? str.trim().toLowerCase() : "");
    const schoolResources = resources.filter(
        (resource) => normalize(resource.school) === normalize(normalizedUserSchool)
    );
    

    return (
        <div className="border border-dashed border-gray-600 rounded-2xl p-10 mt-4 bg-gradient-to-b from-gray-900 to-black">
            <h2 className="text-md text-white mb-4">
                Here are some recommended resources from your school "{normalizedUserSchool}" you might find helpful.
            </h2>

            {schoolResources.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                    {schoolResources.map((resource, index) => (
                        <CommunityCard
                            key={index}
                            title={resource.title}
                            school={resource.school}
                            date={resource.date}
                            tags={resource.tags}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-32 border rounded-lg text-gray-400">
                    N/A
                </div>
            )}
        </div>
    );
};

export default CommunityRecomm;
