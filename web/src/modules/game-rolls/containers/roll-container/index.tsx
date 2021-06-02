import { Badge, Box, Button, Flex, HStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import { DiceIcon, IconButton } from "common/components";
import { useRollDiceMutation } from "common/definitions/graphql/generated";
import { OpenRollButton } from "modules/game-rolls/components";
import { useRollStore } from "modules/game-rolls/store/useRollStore";

export const RollContainer: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { isContainerOpen, rolls, incrementCount, resetCount } = useRollStore();

  const hasCount = rolls.filter((r) => r.count > 0).length;

  const [rollDice, { loading }] = useRollDiceMutation();

  const onClick = async () => {
    const { data } = await rollDice({ variables: { input: { id, rolls } } });

    if (data) resetCount();
  };

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
            {rolls.map(({ dice, count }) => {
              return (
                <Box key={dice} position="relative">
                  <IconButton
                    variant="solid"
                    icon={<DiceIcon dice={dice} />}
                    aria-label={dice}
                    tooltip={dice}
                    tooltipPlacement="top"
                    onClick={() => incrementCount(dice)}
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

            <Button disabled={!hasCount} onClick={onClick} isLoading={loading}>
              Lancer
            </Button>
          </HStack>
        </motion.section>
      </AnimatePresence>

      <OpenRollButton />
    </Flex>
  );
};
