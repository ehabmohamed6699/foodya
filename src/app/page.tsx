import Image from "next/image";
import blobImage from "@/assets/images/blob.png"
import pastaImage from "@/assets/images/pasta.png"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex md:flex-row flex-col-reverse h-fit md:h-screenfill md:pb-0 pb-10">
      <div className="md:w-1/2 w-full flex flex-col gap-10 md:items-start items-center h-inherit md:pt-32 pt-16">
        <h1 className="text-[#FB6D48] font-extrabold text-4xl md:text-left text-center">#1 website for sharing recipes</h1>
        <p className="md:text-left text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi sunt fugiat sint quam veritatis, eos ipsam ullam vero rerum voluptatibus, sapiente praesentium, consequatur nihil quas voluptatum enim temporibus quo corporis.</p>
        <Link href={"/recipes"} className="px-6 py-3 rounded-full transition-all duration-500 bg-gradient-to-r from-[#FB6D48]  to-[#FFAF45] text-white">Explore recipes</Link>
      </div>
      <div className="md:w-1/2 w-full relative flex items-center  md:h-inherit md:justify-end justify-center">
        <Image src={blobImage} alt="blob" className="w-[280px] md:w-[500px] 3xl:w-[600px] md:-mt-20"/>
        <Image src={pastaImage} alt="pasta" className="absolute md:top-32 2xl:top-48  md:left-10 2xl:left-48 w-64 md:w-96 pasta"/>
      </div>
    </div>
  );
}
