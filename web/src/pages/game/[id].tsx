import { Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ColorModeButton } from "common/components/color-mode-button";
import { getClient } from "common/definitions/apollo/client";
import {
  GameDocument,
  GameQuery,
  GameQueryVariables,
  GameUserInfoDocument,
  GameUserInfoQuery,
  useGameUserInfoQuery,
  useJoinGameMutation
} from "common/definitions/graphql/generated";
import { SelectMapButton } from "modules/game-map/components";
import { InvitePlayersButton, Sidebar, Topbar } from "modules/game/components";
import { Board, GameContainer } from "modules/game/containers";
import { ModalController } from "modules/modals/containers";
import { ModalType, useModalStore } from "modules/modals/store/useModalStore";

const Game: React.FC<GameProps> = ({ id, name, masterId }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (!loading && !session) router.replace("/");

  const { openModal } = useModalStore();

  const { data, loading: queryLoading } = useGameUserInfoQuery({
    variables: { id }
  });

  const [joinGame, { loading: mutationLoading }] = useJoinGameMutation();

  useEffect(() => {
    if (data && !data?.GameUserInfo.hasJoined) {
      if (data?.GameUserInfo.hasPassword) {
        openModal(ModalType.GAME_PASSWORD);
      } else {
        joinGame({
          variables: { input: { id } },
          update(cache) {
            cache.writeQuery<GameUserInfoQuery>({
              query: GameUserInfoDocument,
              variables: { id },
              data: {
                __typename: "Query",
                GameUserInfo: { ...data.GameUserInfo, hasJoined: true }
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
          {session?.id === masterId && <SelectMapButton />}
          <InvitePlayersButton />
          <ColorModeButton />
        </Stack>
      </Sidebar>

      <Sidebar side="right"></Sidebar>

      <GameContainer>
        {(queryLoading || mutationLoading) && <Spinner />}

        {!queryLoading && !mutationLoading && data?.GameUserInfo?.hasJoined && <Board />}
      </GameContainer>

      <ModalController />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<GameProps> = async (ctx) => {
  const id = ctx.query.id as string;

  const client = getClient();

  const { data, errors } = await client.query<GameQuery, GameQueryVariables>({
    query: GameDocument,
    variables: { id: id as string },
    errorPolicy: "all"
  });

  if (!data.Game || errors) {
    ctx.res.writeHead(301, { Location: "/404" });
    ctx.res.end();
  }

  return {
    props: { id, name: data.Game.name, masterId: data.Game.master.id }
  };
};

interface GameProps {
  id: string;
  name: string;
  masterId: string;
}

export default Game;
