"use client"
import { useState } from "react"

export default function Gallery({images}){

    const [ selectedImage, setSelectedImage ] = useState(images[0]);
    

    return(
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
            <div className="container flex flex-col items-center md:flex-row md:items-start gap-4 p-4 mx-auto">
            <div className="flex flex-col gap-1 md:">
                    {
                        images.map((image, index) => (
                            <img
                                key={index}
                                alt={`Image ${index}`} 
                                className="w-24 h-24 rounded shadow-lg object-contain dark:bg-gray-500 aspect-square cursor-pointer"
                                src={image}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))
                    }
                </div>
                <img src={selectedImage} alt="" className="w-full h-auto max-w-lg rounded shadow-lg object-contain" />
                
                {/* <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?0" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?1" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?2" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?3" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?4" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?5" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?6" />
                <img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src="https://source.unsplash.com/random/200x200/?7" />
                <img src="https://source.unsplash.com/random/302x302/" alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square" /> */}
            </div>
        </section>
    )
}
