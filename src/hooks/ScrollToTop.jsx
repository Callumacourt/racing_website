import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Shared hook for handling form state, validation, and submission logic.
 * Designed for use with forms that have string fields (e.g., contact and sponsor forms).
 * 
 * @param fieldnames - Array of field names to manage in the form.
 * @returns Object with form state, error state, handlers, and helpers.
 */

export default function ScrollToTop () {
    const { pathname } = useLocation();  // Get current route
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]) 
    return null;
}