import React from 'react'
import Ehab from "@/assets/images/ehab-cartoon.png"
import SignInImage from "@/assets/images/sign-in.png"
import RecipesImage from "@/assets/images/recipes-page.png"
import RecipeImage from "@/assets/images/recipe-page.png"
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoFacebook, IoLogoLinkedin, IoLogoGithub } from "react-icons/io";


const About = () => {
  return (
    <div className="flex gap-12 ">
      <div className='w-64 hidden md:flex flex-col gap-2 pt-10' style={{ boxShadow: '3px 0 3px rgba(0, 0, 0, 0.3)' }}>
        <Link href="#foodya">Foodya</Link>
        <Link href="#developer">Developer</Link>
        <Link href="#functionality">Functionality</Link>
        <Link href="#technologies">Technologies</Link>
        <Link href="#contact">Contact me</Link>
      </div>
      <div className='w-full min-h-screenfill pt-10 text-lg mb-10'>
      <h1 id={"foodya"} className='text-3xl font-bold mb-2'>About <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#FB6D48]  to-[#FFAF45] font-extrabold'>Foodya</span></h1>
      <p >Welcome to Foodya! Foodya is a platform for sharing delicious food recipes publicly.</p>
      
      <h2 id={"developer"} className='text-2xl font-bold mb-2 mt-4'>About the Developer</h2>
      <Image src={Ehab} alt="Ehab Mohammed" width={200} height={200} className='rounded-full border-2 border-[#FB6D48] mb-2'/>
      <p>Foodya was developed by Ehab Mohammed. I am passionate about creating web applications that bring value to users.</p>
      
      <h2 id={"functionality"} className='text-2xl font-bold mb-2 mt-4'>App Functionality</h2>
      <ul>
        <li>Users can sign up and log in using credentials or Facebook.</li>
        <Image src={SignInImage} alt="Home page" className='w-[300px] md:w-[600px]'/>
        <li>Users can view and search for food recipes from the <Link href={"/recipes"} className="text-[#FB6D48]">recipes</Link> page.</li>
        <li>Only logged-in users with credentials can publish recipes from the <Link href={"/recipes"} className="text-[#FB6D48]">recipes</Link> page.</li>
        <Image src={RecipesImage} alt="Recipes page" className='w-[300px] md:w-[600px]'/>
        <li>Users can view recipe instructions and ingredients, as well as the publisher, by clicking on any recipe in the <Link href={"/recipes"} className="text-[#FB6D48]">recipes</Link> page.</li>
        <li>Only logged-in users with credentials can edit or delete recipes.</li>
        <Image src={RecipeImage} alt="Recipe page" className='w-[300px] md:w-[600px]'/>
      </ul>
      <h2 id={"technologies"} className='text-2xl font-bold mb-2 mt-4'>Technologies Used</h2>
      <ul>
        <li>
          <Link href={"https://nextjs.org/"} className='underline text-[#FB6D48]'><strong>Next.js:</strong></Link> A powerful React framework that enables server-side rendering and static site generation, making the app fast and SEO-friendly.
        </li>
        <li>
          <Link href={"https://www.typescriptlang.org/"} className='underline text-[#FB6D48]'><strong>TypeScript:</strong></Link> A typed superset of JavaScript that helps catch errors early and improves code quality and maintainability.
        </li>
        <li>
          <Link href={"https://tailwindcss.com/"} className='underline text-[#FB6D48]'><strong>Tailwind CSS:</strong></Link> A utility-first CSS framework that allows for rapid UI development with a set of predefined classes.
        </li>
        <li>
          <Link href={"https://daisyui.com/"} className='underline text-[#FB6D48]'><strong>DaisyUI:</strong></Link> A plugin for Tailwind CSS that provides a set of beautiful, pre-designed UI components, enhancing the development process.
        </li>
        <li>
          <Link href={"https://headlessui.com/"} className='underline text-[#FB6D48]'><strong>Headless UI:</strong></Link> A set of completely unstyled, fully accessible UI components designed to integrate seamlessly with Tailwind CSS.
        </li>
        <li>
          <Link href={"https://next-auth.js.org/"} className='underline text-[#FB6D48]'><strong>NextAuth:</strong></Link> A complete open-source authentication solution for Next.js applications, providing a variety of authentication methods.
        </li>
        <li>
          <Link href={"https://www.mongodb.com/"} className='underline text-[#FB6D48]'><strong>MongoDB:</strong></Link> A NoSQL database that stores data in flexible, JSON-like documents, making it easy to work with and scale.
        </li>
        <li>
          <Link href={"https://uploadthing.com/"} className='underline text-[#FB6D48]'><strong>Uploadthing:</strong></Link> A service for handling file storage, allowing users to upload and manage images for their recipes.
        </li>
        <li>
          <Link href={"https://vercel.com/"} className='underline text-[#FB6D48]'><strong>Vercel:</strong></Link> A cloud platform for static sites and Serverless Functions that enables you to deploy websites and applications quickly and reliably.
        </li>
      </ul>
      <h2 id={"contact"} className='text-2xl font-bold mb-2 mt-4'>Contact me</h2>
      <div className={"flex items-center text-2xl gap-2"}>
        <Link href={"https://www.facebook.com/profile.php?id=100037787358784"}><IoLogoFacebook /></Link>
        <Link href={"https://www.linkedin.com/in/ehab-mohamed-8286241b8/"}><IoLogoLinkedin /></Link>
        <Link href={"https://github.com/ehabmohamed6699"}><IoLogoGithub /></Link>
      </div>
      </div>
    </div>
  )
}

export default About