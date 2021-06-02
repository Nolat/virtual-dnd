import React from "react";
import { FiExternalLink, FiX } from "react-icons/fi";

import { IconButton } from "common/components";
import { useChatStore } from "modules/game-chat/store/useChatStore";

export const PopOutChatButton: React.FC = () => {
  const {
    isPoppedOut,
    togglePopOut,
    rndPos,
    setRndPos,
    resetRndPos,
    resetRndSize
  } = useChatStore();

  const onClick = () => {
    if (isPoppedOut) {
      resetRndPos();
      resetRndSize();
    }

    if (!isPoppedOut) {
      setRndPos({ x: rndPos.x - 10, y: rndPos.y + 10 });
    }

    togglePopOut();
  };

  return (
    <IconButton
      icon={isPoppedOut ? <FiX /> : <FiExternalLink />}
      aria-label={isPoppedOut ? "Pop-In" : "Pop-out"}
      tooltip={isPoppedOut ? "Pop-In" : "Pop-out"}
      tooltipPlacement="auto"
      onClick={onClick}
    />
  );
};
