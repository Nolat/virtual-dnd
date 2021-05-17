import React from "react";

import { MapImage } from "modules/game-map/components";
import { Layer } from "modules/game/containers";

export const MapLayer: React.FC = () => {
  return (
    <Layer>
      <MapImage />
    </Layer>
  );
};
