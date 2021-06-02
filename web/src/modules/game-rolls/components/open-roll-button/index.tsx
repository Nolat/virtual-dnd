import { FiX } from "react-icons/fi";

import { IconButton } from "common/components";
import { D20Icon } from "common/components/svg";
import { useRollStore } from "modules/game-rolls/store/useRollStore";

export const OpenRollButton: React.FC = () => {
  const { isContainerOpen, toggleContainer, resetCount } = useRollStore();

  const onClick = () => {
    if (isContainerOpen) resetCount();

    toggleContainer();
  };

  return (
    <IconButton
      icon={isContainerOpen ? <FiX /> : <D20Icon />}
      aria-label="Lancer les dés"
      tooltip="Lancer les dés"
      tooltipPlacement="auto"
      onClick={onClick}
    />
  );
};
