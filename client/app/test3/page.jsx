import CommunityRecomm from "@/components/Community/communityRec";

const sampleResources = [
    {
        title: "AI Note Helper",
        school: "BCIT",
        date: "May 13, 2025",
        tags: ["Notes", "AI"],
    },
    {
        title: "Quiz Pro",
        school: "BCIT",
        date: "May 10, 2025",
        tags: ["Quiz", "Automation"],
    },
];

const TestPage = () => {
    return (
        <div className="p-4 bg-black min-h-screen">
            <CommunityRecomm userSchool="BCIT" resources={sampleResources} />
        </div>
    );
};

export default TestPage;
