import { FaGithub, FaHeart } from "react-icons/fa";
import IconImage from "../../../assets/images/icon.webp";
import Button from "../../global/Button";
import { electron } from "../../../constant/contextBridge";
import { Tooltip } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function AboutSection() {
  const handleOpenGithub = () => {
    electron.openLink("https://github.com/Dalufishe/palserver-GUI");
  };

  const handleOpenDonation = () => {
    electron.openLink("https://www.buymeacoffee.com/dalufish");
  };

  return (
    <div className="flex gap-2 p-2 bg-bg2 rounded-lg items-center relative">
      <Link to="/server-settings" className="flex gap-2">
        <img src={IconImage} alt="icon" className="w-6 h-6" />
        <span>palserver GUI</span>
      </Link>
      <div className="absolute right-2 flex gap-2 items-center">
        <Button onClick={handleOpenDonation}>
          <FaHeart color="pink" />
        </Button>

        <Button onClick={handleOpenGithub}>
          <FaGithub />
        </Button>
      </div>
    </div>
  );
}
