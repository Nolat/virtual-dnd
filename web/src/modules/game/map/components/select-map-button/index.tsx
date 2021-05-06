import React from "react";
import { FiMap } from "react-icons/fi";

import { IconButton } from "components/icon-button";
import { useMapStore } from "modules/game/store/useMapStore";

export const SelectMapButton: React.FC = () => {
  const { mapUrl, selectMap } = useMapStore();

  return (
    <IconButton
      icon={<FiMap />}
      aria-label="Sélectionner une map"
      tooltip="Sélectionner une map"
      tooltipPlacement="auto"
      onClick={() =>
        mapUrl === ""
          ? selectMap(
              "https://mk0a2minutetabl7hq7i.kinstacdn.com/wp-content/uploads/2021/04/Sacred-Spring-Natural-Day-16x22-1.jpg"
            )
          : selectMap("")
      }
    />
  );
};
