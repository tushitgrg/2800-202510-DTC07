import React from "react";
import { useRouter } from "next/navigation";

const CommunityRecomm = ({ userSchool }) => {
  const router = useRouter();
  const normalizedUserSchool = userSchool?.trim();

<<<<<<< HEAD
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

  return null;
=======
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
       
>>>>>>> 4bc31f89d7c59c842f32d308e34c3bb89d237d75
};

export default CommunityRecomm;
