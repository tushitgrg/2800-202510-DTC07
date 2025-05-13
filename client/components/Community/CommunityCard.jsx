import { Badge } from "@/components/ui/badge";

const CommunityCard = () => {
  const title = "Untitled Resource";
  const date = "May 12, 2025";
  const tags = ["Example", "Tag", "Demo"];

  return (
    <div className="relative flex flex-col justify-between p-4 h-full bg-black rounded-lg border border-gray-700 pb-6">

      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, idx) => (
          <Badge
            key={`tag-${idx}`}
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            variant="secondary"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="absolute bottom-2 right-4 text-gray-400 text-sm">
        {date}
      </div>
    </div>
  );
};

export default CommunityCard;
