import React, { ReactElement, useEffect, useRef } from "react";
import { Layer as CanvasLayer } from "react-konva";

import theme from "definitions/chakra/theme";

export const Layer: React.FC<LayerProps> = ({ children }) => {
  // * Add border radius
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) ref.current.getCanvas()._canvas.style.borderTopLeftRadius = theme.radii["4xl"];
  }, []);

  return <CanvasLayer ref={ref}>{children}</CanvasLayer>;
};

export interface LayerProps {
  children: ReactElement | ReactElement[];
}