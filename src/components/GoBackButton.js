"use client"; 

export default function GoBackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="mt-4 mx-4 px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
            &larr; Go back
        </button>
    );
}
