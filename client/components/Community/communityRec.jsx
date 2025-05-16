import React from "react";
import { useRouter } from "next/navigation";


const CommunityRecomm = ({ userSchool }) => {
    const router = useRouter();
    const normalizedUserSchool = userSchool?.trim();

    if (!normalizedUserSchool) {
        return (
            <div className="border border-dashed border-gray-600 rounded-2xl p-10 my-4 bg-gradient-to-b flex flex-col items-center space-y-4">
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
    
    return null;
       
};

export default CommunityRecomm;
