import { Box } from "@chakra-ui/react";
import { KonvaEventObject } from "konva/types/Node";
import { useEffect, useRef } from "react";
import { Stage } from "react-konva";
import { useWindowSize } from "react-use";

import { MapLayer } from "modules/game-map/containers";
import { BackToCenterButton } from "modules/game/components";
import { useStageStore } from "modules/game/store/useStageStore";

export const Board: React.FC = () => {
  const { width, height } = useWindowSize();

  const { setStageRef, stagePosition, stageScale, updatePosition, updateScale } = useStageStore();

  // * Save stage reference to store
  const stageRef = useRef<any>();
  useEffect(() => {
    if (stageRef.current) setStageRef(stageRef.current);
  }, [stageRef, setStageRef]);

  // * Handle zoom on wheel
  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 0.94;
    const stage = e.target.getStage();

    if (stage) {
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: (stage.getPointerPosition()?.x ?? 0) / oldScale - stage.x() / oldScale,
        y: (stage.getPointerPosition()?.y ?? 0) / oldScale - stage.y() / oldScale
      };

      const calculatedScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      const newScale = calculatedScale > 3 ? 3 : calculatedScale < 0.5 ? 0.5 : calculatedScale;

      updateScale(newScale);
      updatePosition({
        x: -(mousePointTo.x - (stage.getPointerPosition()?.x ?? 0) / newScale) * newScale,
        y: -(mousePointTo.y - (stage.getPointerPosition()?.y ?? 0) / newScale) * newScale
      });
    }
  };

  return (
    <>
      <Stage
        ref={stageRef}
        width={width - 128}
        height={height - 64}
        onWheel={handleZoom}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stagePosition.x}
        y={stagePosition.y}
        draggable
        onDragEnd={(e) => updatePosition(e.currentTarget.getPosition())}
      >
        <MapLayer />
      </Stage>

      <Box position="absolute" m={4} right={0} bottom={0}>
        <BackToCenterButton />
      </Box>
    </>
  );
};
