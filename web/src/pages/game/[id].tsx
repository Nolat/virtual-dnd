import { Stack } from "@chakra-ui/layout";
import Head from "next/head";

import { ColorModeButton } from "components/color-mode-button";
import { Board } from "modules/game/components";
import { Sidebar } from "modules/game/components/sidebar";
import { Topbar } from "modules/game/components/topbar";

const Game = () => {
  return (
    <>
      <Head>
        <title>Game</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Topbar></Topbar>
      <Sidebar side="left">
        <Stack spacing={2} alignSelf="flex-end">
          <ColorModeButton />
        </Stack>
      </Sidebar>
      <Sidebar side="right"></Sidebar>

      <Board></Board>
    </>
  );
};

export default Game;
