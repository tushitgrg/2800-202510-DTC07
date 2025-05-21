import React from "react";
import { useRouter } from "next/navigation";

/**
 * Component to recommend community features based on user school selection.
 * If the user has not set their school, displays a prompt card with a button
 * directing them to their profile to set it.
 * Otherwise, renders nothing.
 *
 * @param {Object} props - Component props
 * @param {string} [props.userSchool] - The school name from the user's profile
 * @returns {JSX.Element|null} A recommendation prompt or null
 */
const CommunityRecomm = ({ userSchool }) => {
  const router = useRouter();
  // Trim whitespace for a clean check
  const normalizedUserSchool = userSchool?.trim();

  // If no valid school is selected, show prompt
  if (!normalizedUserSchool) {
    return (
      <div className="border border-dashed border-gray-600 rounded-2xl p-10 mt-4 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center space-y-4">
        {/* Message telling the user to set their school */}
        <h2 className="text-md text-white">
          You haven't selected your school yet.
        </h2>
        {/* Button to navigate user to profile page */}
        <button
          onClick={() => router.push("/profile")}
          className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          Go to Profile to Set School
        </button>
      </div>
    );
  }

  // If school is set, do not render anything
  return null;
};

export default CommunityRecomm;

