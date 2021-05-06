import { Stack } from "@chakra-ui/layout";
import Head from "next/head";

import { ColorModeButton } from "components/color-mode-button";
import { Board, Sidebar, Topbar } from "modules/game/components";
import { SelectMapButton } from "modules/game/map/components";
import { ModalController } from "modules/game/modals";

const Game = () => {
  return (
    <>
      <Head>
        <title>Game</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Topbar></Topbar>

      <Sidebar side="left">
        <Stack spacing={4} alignSelf="flex-end">
          <SelectMapButton />
          <ColorModeButton />
        </Stack>
      </Sidebar>

      <Sidebar side="right"></Sidebar>

      <Board />

      <ModalController />
    </>
  );
};

export default Game;
