import React from "react";

import { Layer } from "modules/game/containers";

import { MapImage } from "../map-image";

export const MapLayer: React.FC = () => {
  return (
    <Layer>
      <MapImage />
    </Layer>
  );
};
