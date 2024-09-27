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
export default function Gallery({images}) {

    /**
     * selectedImage is the state that holds the currently selected image to display in the main view.
     * Initialized to the first image in the `images` array.
     *
     * @type {string}
     */
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
            <div className="container flex flex-col items-center md:flex-row md:items-start gap-4 p-4 mx-auto">
                
                {/* Thumbnail images */}
                <div className="flex flex-row gap-1 md:flex-col">
                    {images.map((image, index) => (
                        <div 
                            key={index} 
                            className="relative w-24 h-24 cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                        >
                            <Image
                                src={image}
                                alt={`Product image ${index + 1}`}
                                className="object-contain"
                                fill
                                sizes="100%"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    ))}
                </div>
                
                
                {/* Main selected image */}
                
                    <Image
                        src={selectedImage}
                        alt={`Selected product image`}
                        className="object-contain rounded shadow-lg"
                        width={500}
                        height={500}
                        style={{ objectFit: 'contain' }}
                    />
            
            </div>
        </section>
    )
}