import React from "react";
import { FiLock, FiUnlock } from "react-icons/fi";

import { IconButton } from "common/components";
import { useChatStore } from "modules/game-chat/store/useChatStore";

export const PinChatButton: React.FC = () => {
  const { isPinned, togglePin } = useChatStore();

  return (
    <IconButton
      icon={isPinned ? <FiLock /> : <FiUnlock />}
      aria-label={isPinned ? "Débloquer le tchat" : "Bloquer le tchat"}
      tooltip={isPinned ? "Débloquer le tchat" : "Bloquer le tchat"}
      tooltipPlacement="auto"
      onClick={togglePin}
    />
  );
};
