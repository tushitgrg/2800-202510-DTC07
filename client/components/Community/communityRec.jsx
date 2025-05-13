import React from "react";
import CommunityCard from "@/components/Community/CommunityCard";

const CommunityRecomm = ({ userSchool = "BCIT", resources = [] }) => {
    const schoolResources = resources.filter(
        (resource) => resource.school === userSchool
    );

    return (
        <div className="border border-dashed border-gray-600 rounded-2xl p-10 mt-4 bg-gradient-to-b from-gray-900 to-black">
            <h2 className="text-md text-white mb-4">
                Here are some recommended resources from your school "{userSchool}" you might find helpful.
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
