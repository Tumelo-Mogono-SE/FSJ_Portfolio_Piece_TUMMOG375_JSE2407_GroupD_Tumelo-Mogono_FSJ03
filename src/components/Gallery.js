"use client"
import { useState } from "react"
import Image from "next/image";

/**
 * Gallery is a client-side image gallery component that allows users to view and select 
 * an image from a list of images. Clicking on a thumbnail updates the main displayed image.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string[]} props.images - An array of image URLs to be displayed in the gallery.
 * @returns {JSX.Element} - JSX to render the image gallery component.
 */
export default function Gallery({images}){

    /**
     * selectedImage is the state that holds the currently selected image to display in the main view.
     * Initialized to the first image in the `images` array.
     *
     * @type {string}
     */
    const [ selectedImage, setSelectedImage ] = useState(images[0]);
    

    return(
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
            <div className="container flex flex-col items-center md:flex-row md:items-start gap-4 p-4 mx-auto">
            <div className="flex flex-row gap-1 md:flex-col">
                    {
                        images.map((image, index) => (
                            <Image
                                key={index}
                                alt={`Image ${index}`} 
                                className="w-24 h-24 rounded shadow-lg object-contain dark:bg-gray-500 aspect-square cursor-pointer"
                                width={96}
                                height={96}
                                src={image}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))
                    }
                </div>
                <div className="relative w-full max-w-lg h-auto aspect-w-16 aspect-h-9">
                    <Image 
                        src={selectedImage}
                        alt=""
                        layout="fill"
                        style={{ objectFit: 'contain'}}
                        className="rounded shadow-lg"
                    />
                </div>
                {/* <img src={selectedImage} alt="" className="w-full h-auto max-w-lg rounded shadow-lg object-contain" /> */}
            </div>
        </section>
    )
}
