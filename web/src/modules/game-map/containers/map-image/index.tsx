import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

import { useMapStore } from "modules/game-map/store/useMapStore";
import { useStageStore } from "modules/game/store/useStageStore";

export const MapImage: React.FC = () => {
  const { stageRef } = useStageStore();
  const { mapUrl } = useMapStore();

  // * Load image
  const [image] = useImage(mapUrl);

  return (
    <Image
      image={image}
      x={(stageRef?.getWidth() - image?.width || 0) / 2}
      y={(stageRef?.getHeight() - image?.height || 0) / 2}
      onMouseEnter={() => {
        stageRef.container().style.cursor = "move";
      }}
      onMouseLeave={() => {
        stageRef.container().style.cursor = "default";
      }}
    />
  );
};
