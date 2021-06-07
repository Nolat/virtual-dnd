import { D100Icon, D10Icon, D12Icon, D20Icon, D4Icon, D6Icon, D8Icon } from "common/components/svg";
import { DiceType } from "common/definitions/graphql/generated";

export const DiceIcon: React.FC<DiceIconProps> = ({ dice, color }) => {
  switch (dice) {
    case DiceType.D4:
      return <D4Icon color={color} />;

    case DiceType.D6:
      return <D6Icon color={color} />;

    case DiceType.D8:
      return <D8Icon color={color} />;

    case DiceType.D10:
      return <D10Icon color={color} />;

    case DiceType.D12:
      return <D12Icon color={color} />;

    case DiceType.D20:
      return <D20Icon color={color} />;

    case DiceType.D100:
      return <D100Icon color={color} />;

    default:
      return <></>;
  }
};

export interface DiceIconProps {
  dice: DiceType;
  color?: string;
}
