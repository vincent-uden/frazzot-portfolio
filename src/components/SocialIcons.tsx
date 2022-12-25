import {
  faArtstation,
  faDeviantart,
  faFacebook,
  faInstagram,
  faPatreon,
  faYoutube,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  color: string;
  size: string;
}

interface BaseProps {
  color: string;
  href: string;
  icon: IconDefinition;
  size: string;
  label: string;
}

export const SocialIcon = ({ color, href, icon, size, label }: BaseProps) => {
  return (
    <a href={href} aria-label={label}>
      <FontAwesomeIcon
        className={`text-${color} w-${size} h-${size} mx-2 transition-transform hover:scale-125 md:mx-4`}
        icon={icon}
      />
    </a>
  );
};

export const InstagramIcon = ({ color, size }: Props) => {
  return (
    <SocialIcon
      color={color}
      href="https://www.instagram.com/frazzotart/"
      icon={faInstagram}
      size={size}
      label="Instagram"
    />
  );
};

export const YoutubeIcon = ({ color, size }: Props) => {
  return (
    <SocialIcon
      color={color}
      href="https://www.youtube.com/channel/UCCFN53DU4TQ8Ll2jLP8OZsw"
      icon={faYoutube}
      size={size}
      label="Youtube"
    />
  );
};

export const PatreonIcon = ({ color, size }: Props) => {
  return (
    <SocialIcon
      color={color}
      href="https://www.patreon.com/Frazzot/posts"
      icon={faPatreon}
      size={size}
      label="Patreon"
    />
  );
};

export const ArtstationIcon = ({ color, size }: Props) => {
  return (
    <SocialIcon
      color={color}
      href="https://www.artstation.com/frazzot"
      icon={faArtstation}
      size={size}
      label="ArtStation"
    />
  );
};

export const FacebookIcon = ({ color, size }: Props) => {
  return (
    <SocialIcon
      color={color}
      href="https://www.facebook.com/Frazzotart"
      icon={faFacebook}
      size={size}
      label="Facebook"
    />
  );
};

export const DeviantartIcon = ({ color, size }: Props) => {
  return (
    <SocialIcon
      color={color}
      href="https://www.deviantart.com/frazzot"
      icon={faDeviantart}
      size={size}
      label="DeviantArt"
    />
  );
};
