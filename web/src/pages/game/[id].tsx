import { Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

import { ColorModeButton } from "common/components/color-mode-button";
import { getClient } from "common/definitions/apollo/client";
import {
  GameDocument,
  GameQuery,
  GameQueryVariables,
  JoinGameInfoDocument,
  JoinGameInfoQuery,
  useJoinGameInfoQuery,
  useJoinGameMutation
} from "common/definitions/graphql/generated";
import { SelectMapButton } from "modules/game-map/components";
import { ModalController } from "modules/game-modals/containers";
import { GameModalType, useGameModalStore } from "modules/game-modals/store/useGameModalStore";
import { Sidebar, Topbar } from "modules/game/components";
import { Board, GameContainer } from "modules/game/containers";

const Game: React.FC<GameProps> = ({ id, name }) => {
  const { openModal } = useGameModalStore();

  const { data, loading: queryLoading } = useJoinGameInfoQuery({ variables: { id } });

  const [joinGame, { loading: mutationLoading }] = useJoinGameMutation();

  useEffect(() => {
    if (data && !data?.JoinGameInfo.hasJoined) {
      if (data?.JoinGameInfo.hasPassword) {
        openModal(GameModalType.GAME_PASSWORD);
      } else {
        joinGame({
          variables: { id },
          update(cache) {
            cache.writeQuery<JoinGameInfoQuery>({
              query: JoinGameInfoDocument,
              variables: { id },
              data: {
                __typename: "Query",
                JoinGameInfo: { ...data.JoinGameInfo, hasJoined: true }
              }
            });
          }
        });
      }
    }
  }, [data, joinGame, id, openModal]);

  return (
    <>
      <Head>
        <title>{name} | Virtual D&D</title>
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

      <GameContainer>
        {(queryLoading || mutationLoading) && <Spinner />}

        {!(queryLoading || mutationLoading) && data?.JoinGameInfo.hasJoined && <Board />}
      </GameContainer>

      <ModalController />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<GameProps> = async (ctx) => {
  const id = ctx.query.id as string;

  const client = getClient(ctx);

  const { data } = await client.query<GameQuery, GameQueryVariables>({
    query: GameDocument,
    variables: { id: id as string }
  });

  if (!data.Game) {
    ctx.res.writeHead(301, { Location: "/404" });
    ctx.res.end();
  }

  return {
    props: { id, name: data.Game.name }
  };
};

interface GameProps {
  id: string;
  name: string;
}

export default Game;
