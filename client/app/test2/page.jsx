import CommunityCard from '@/components/Community/CommunityCard'
import React from 'react'
import { Button } from '@/components/ui/button';

const page = () => {
  const mock_resource = [
    {
      _id: "id",
      "title": "1712 Design Strategy",
      "author": null,
      "createdAt": "2025-05-13T18:41:09.337Z",
      "shareCount": 8,
      "likes": 15,
      "school": "British Columbia Institute of Technology",
      "course": "COMP1712"
    },
    {
      _id: "id",
      "title": "1510 Chapter 1",
      "author": null,
      "createdAt": "2025-05-13T18:41:09.337Z",
      "shareCount": 100,
      "likes": 54,
      "school": "British Columbia Institute of Technology",
      "course": "COMP1510"
    },
  ]

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center p-6">
        {/* Header */}
        <div className="container">
          <div className="flex justify-between w-full items-center mb-6">
            <h1 className="text-2xl font-bold">Community</h1>
            <Button style={{ cursor: 'pointer' }}>
              Sort
            </Button>
          </div>

          {/* Resource cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
              <CommunityCard
                resource={{ _id: "public" }}
                title="1712 Design Strategy"
                author= "Ragnar"
                createdAt="2025-05-13T18:41:09.337Z"
                shareCount={8}
                likes={15}
                school="British Columbia Institute of Technology"
                course="COMP1712"
              />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default page