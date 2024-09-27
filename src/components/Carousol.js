import { Carousel } from "flowbite-react";
import Image from "next/image";

/**
 * CarouselCompound Component
 * 
 * Displays a carousel of images with custom navigation controls.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {string[]} props.images - An array of image URLs to be displayed in the carousel.
 * 
 * @returns {JSX.Element} The CarouselCompound component.
 */
export function CarouselCompound({ images }) {

    const handleControlClick = (event) => {
        event.preventDefault();
    };

    return (
        <div className="w-full h-52">
            <Carousel 
                leftControl={
                    <button
                        onClick={handleControlClick}
                        className="bg-white/30  text-white p-2 rounded-full dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                    >
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                }

                rightControl={
                    <button
                        onClick={handleControlClick}
                        className="bg-white/30  text-white p-2 rounded-full dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
                    >
                        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                }
            >
                {images.map((image, index) => (
                    <div className="relative w-full h-full" key={index}>
                        <Image
                            key={index}
                            src={image}
                            alt={`Product image ${index + 1}`}
                            className="object-contain w-full h-full"
                            style={{ objectFit: 'contain'}}
                            layout="fill"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}


