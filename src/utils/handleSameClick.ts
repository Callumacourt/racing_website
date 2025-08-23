import { Location } from "react-router-dom";

/**
 * Utility function that scrolls the user to the top of the page if they navigate to the route they're already on
 * @param e - Mouse event (user clicking on a link to a route)
 * @param location - The current route the user is on
 * @param targetPath  - The route the user is attempting to navigate to
 */

const handleSameClick = (
  e: React.MouseEvent,
  location: Location,
  targetPath: string
) => {
  if (location.pathname === targetPath) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default handleSameClick;