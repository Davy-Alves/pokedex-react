import bugIcon from "../assets/types/bug.svg";
import darkIcon from "../assets/types/dark.svg";
import dragonIcon from "../assets/types/dragon.svg";
import electricIcon from "../assets/types/electric.svg";
import fairyIcon from "../assets/types/fairy.svg";
import fightingIcon from "../assets/types/fighting.svg";
import fireIcon from "../assets/types/fire.svg";
import flyingIcon from "../assets/types/flying.svg";
import ghostIcon from "../assets/types/ghost.svg";
import grassIcon from "../assets/types/grass.svg";
import groundIcon from "../assets/types/ground.svg";
import iceIcon from "../assets/types/ice.svg";
import normalIcon from "../assets/types/normal.svg";
import poisonIcon from "../assets/types/poison.svg";
import psychicIcon from "../assets/types/psychic.svg";
import rockIcon from "../assets/types/rock.svg";
import steelIcon from "../assets/types/steel.svg";
import waterIcon from "../assets/types/water.svg";

interface TypeInfo {
  icon: string;
  colorClass: string;
}

export const typeData: { [key: string]: TypeInfo } = {
  bug: { icon: bugIcon, colorClass: "bg-[#92BC2C]" },
  dark: { icon: darkIcon, colorClass: "bg-[#595761]" },
  dragon: { icon: dragonIcon, colorClass: "bg-[#0C69C8]" },
  electric: { icon: electricIcon, colorClass: "bg-[#F2D94E]" },
  fairy: { icon: fairyIcon, colorClass: "bg-[#EE90E6]" },
  fighting: { icon: fightingIcon, colorClass: "bg-[#D3425F]" },
  fire: { icon: fireIcon, colorClass: "bg-[#FBA54C]" },
  flying: { icon: flyingIcon, colorClass: "bg-[#A1BBEC]" },
  ghost: { icon: ghostIcon, colorClass: "bg-[#5F6DBC]" },
  grass: { icon: grassIcon, colorClass: "bg-[#5FBD58]" },
  ground: { icon: groundIcon, colorClass: "bg-[#DA7C4D]" },
  ice: { icon: iceIcon, colorClass: "bg-[#75D0C1]" },
  normal: { icon: normalIcon, colorClass: "bg-[#A0A29F]" },
  poison: { icon: poisonIcon, colorClass: "bg-[#B763CF]" },
  psychic: { icon: psychicIcon, colorClass: "bg-[#FA8581]" },
  rock: { icon: rockIcon, colorClass: "bg-[#C9BB8A]" },
  steel: { icon: steelIcon, colorClass: "bg-[#5695A3]" },
  water: { icon: waterIcon, colorClass: "bg-[#539DDF]" },
};
