import Head from "next/head";

import { Board } from "modules/game/components";
import { Sidebar } from "modules/game/components/sidebar";
import { Topbar } from "modules/game/components/topbar";

const Game = () => {
  return (
    <>
      <Head>
        <title>GAME</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Topbar></Topbar>
      <Sidebar side="left"></Sidebar>
      <Sidebar side="right"></Sidebar>

      <Board></Board>
    </>
  );
};

export default Game;
