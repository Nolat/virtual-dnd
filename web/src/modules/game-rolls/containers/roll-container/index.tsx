import { Badge, Box, Button, Flex, HStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

import { IconButton } from "common/components";
import { D100Icon, D10Icon, D12Icon, D20Icon, D4Icon, D6Icon, D8Icon } from "common/components/svg";
import { OpenRollButton } from "modules/game-rolls/components";
import { RollType, useRollStore } from "modules/game-rolls/store/useRollStore";

const RollIcon: React.FC<{ type: RollType }> = ({ type }) => {
  switch (type) {
    case RollType.D4:
      return <D4Icon />;

    case RollType.D6:
      return <D6Icon />;

    case RollType.D8:
      return <D8Icon />;

    case RollType.D10:
      return <D10Icon />;

    case RollType.D12:
      return <D12Icon />;

    case RollType.D20:
      return <D20Icon />;

    case RollType.D100:
      return <D100Icon />;

    default:
      return <></>;
  }
};

export const RollContainer: React.FC = () => {
  const { isContainerOpen, rolls, incrementCount, resetCount } = useRollStore();

  const hasCount = rolls.filter((r) => r.count > 0).length;

  return (
    <Flex>
      <AnimatePresence initial={false}>
        <motion.section
          initial="exit"
          animate={isContainerOpen ? "enter" : "exit"}
          exit="exit"
          variants={{ enter: { opacity: 1, width: "auto" }, exit: { opacity: 0, width: 0 } }}
          style={{
            position: "absolute"
          }}
        >
          <HStack overflow="hidden" spacing={3} mx={14} mt={-3} p={3}>
            {rolls.map(({ type, count }) => {
              return (
                <Box key={type} position="relative">
                  <IconButton
                    variant="solid"
                    icon={<RollIcon type={type} />}
                    aria-label={type}
                    tooltip={type}
                    tooltipPlacement="top"
                    onClick={() => incrementCount(type)}
                  />
                  {count > 0 && (
                    <Badge
                      fontSize="0.8em"
                      colorScheme="red"
                      variant="solid"
                      borderRadius="full"
                      position="absolute"
                      top={0}
                      right={0}
                      transform="translate(50%, -50%)"
                    >
                      {count}
                    </Badge>
                  )}
                </Box>
              );
            })}

            <Button disabled={!hasCount} onClick={resetCount}>
              Lancer
            </Button>
          </HStack>
        </motion.section>
      </AnimatePresence>

      <OpenRollButton />
    </Flex>
  );
};
