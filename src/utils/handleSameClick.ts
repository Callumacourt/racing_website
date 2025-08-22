import { Location } from "react-router-dom";

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