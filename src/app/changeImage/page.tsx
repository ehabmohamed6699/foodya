"use client";
 
import { UploadButton } from "@/utils/uploadthing";
import { useSession } from "next-auth/react";
 
export default function Home() {
    const {data:session} = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
            if(res){
                // console.log(res)
                const result = await fetch('/api/users', {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({image:res[0]?.url, email:session?.user?.email})
                  })
            }
        //   console.log("Files: ", res);
        //   alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
        //   alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}