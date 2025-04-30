import React from 'react'
import Link from "next/link"


const Footer = () => {
  return (
<footer class=" w-screen ">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center sm:justify-between">
    <div className="flex items-center gap-2 font-bold">
       <img src="/header-icon.svg" className="w-10 h-10"/>
        <span className="text-2xl">Scholiast</span>
      </div>

      <p class="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right dark:text-gray-400">
        Copyright &copy; 2025. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  )
}

export default Footer