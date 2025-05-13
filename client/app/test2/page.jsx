import CommunityCard from '@/components/Community/CommunityCard'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const page = () => {

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center p-6">
        {/* Header */}
        <div className="container">
          <div className="flex justify-between w-full items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button style={{ cursor: 'pointer' }}>
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>

          {/* Resource cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div className="border rounded-lg hover:shadow-md transition-shadow overflow-hidden">
                <CommunityCard />
              </div>
          </div>
        </div>
      </div>
    </>

  );

  return (
    <div>

      <CommunityCard />
    </div>
  )
}

export default page