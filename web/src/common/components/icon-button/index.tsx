import {
  IconButton as CIconButton,
  IconButtonProps as CIconButtonProps,
  Placement,
  Tooltip
} from "@chakra-ui/react";

export const IconButton: React.FC<IconButtonProps> = ({ tooltip, tooltipPlacement, ...props }) => {
  return (
    <Tooltip
      data-testid="icon-button-tooltip"
      hasArrow
      label={tooltip}
      placement={tooltipPlacement}
    >
      <CIconButton data-testid="icon-button" variant="outline" {...props} />
    </Tooltip>
  );
};

export interface IconButtonProps extends CIconButtonProps {
  tooltipPlacement: Placement;
  tooltip: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
