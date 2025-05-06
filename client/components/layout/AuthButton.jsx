'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import { getUserClient } from '@/lib/clientAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';


const AuthButton = ({ className = "" }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserClient().then(setUser);
    }, []);

    return (

        <div>

            {user ? (
 <DropdownMenu>
   <DropdownMenuTrigger asChild>
                <Button className={`rounded-full hover:cursor-pointer ${className}`}>


                    {user.name}
                    <img src={user.avatar} className='rounded-full w-8 h-8  border-black border-[0.1px]' />
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
          <LogOut />
          <span>Log out</span>
         
        </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

            ) : (
                <a href='http://localhost:3001/auth/google'>
                    <Button className={`rounded-full hover:cursor-pointer ${className}`}>
                        Get Started
                        <ChevronRight className="ml-1 size-4" />
                    </Button>
                </a>
            )}
        </div>

    );
};

export default AuthButton;
