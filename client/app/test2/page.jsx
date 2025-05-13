import CommunityCard from '@/components/Community/CommunityCard'
import React from 'react'
import { Button } from '@/components/ui/button';

const page = () => {
  const num_cards = 15;
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
            {Array.from({ length: num_cards }).map((_, i) => (
              <div
                key={i}
                className="border rounded-lg hover:shadow-md transition-shadow overflow-hidden"
              >
                <CommunityCard />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}

export default page