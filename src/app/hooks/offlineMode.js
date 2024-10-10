"use client";

import { useState, useEffect } from "react";
import { firebaseDataManager } from "../utils/firebaseDatabaseManage";


/**
 * Custom hook for managing offline mode and detecting new app versions.
 * @returns {Object} An object containing online status and new version availability.
 * @property {boolean} isOnline - Indicates whether the app is currently online.
 * @property {boolean} newVersionAvailable - Indicates whether a new version of the app is available.
 */
export function useOfflineMode() {
    const [isOnline, setIsOnline] = useState(true);
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            firebaseDataManager.syncPendingChanges(); // Sync changes when online
        };

        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
            setNewVersionAvailable(true);
            });
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return { isOnline, newVersionAvailable };
}