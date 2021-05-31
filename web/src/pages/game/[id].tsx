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
import { ChatBox } from "modules/game-chat/components";
import { SelectMapButton } from "modules/game-map/components";
import { PlayersList } from "modules/game-players/containers";
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
    variables: { id },
    errorPolicy: "all"
  });

  const [joinGame, { loading: mutationLoading }] = useJoinGameMutation();

  useEffect(() => {
    if (data && !data?.GameUserInfo?.hasJoined) {
      if (data?.GameUserInfo?.hasPassword) {
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

  const isLoading = queryLoading || mutationLoading;
  const isMaster = session?.id === masterId;

  return (
    <>
      <Head>
        <title>{name} | Virtual D&D</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <GameContainer>{isLoading ? <Spinner /> : <Board />}</GameContainer>

      <Topbar>
        {!isLoading && (
          <>
            <PlayersList />
            <ChatBox />
          </>
        )}
      </Topbar>

      <Sidebar side="left">
        <Stack spacing={4} alignSelf="flex-end">
          {isMaster && <SelectMapButton />}
          <InvitePlayersButton />
          <ColorModeButton />
        </Stack>
      </Sidebar>

      <Sidebar side="right"></Sidebar>

      <ModalController />
    </>
  );
};

export default Game;

export const getServerSideProps: GetServerSideProps<GameProps> = async (ctx) => {
  const id = ctx.query.id as string;

  const client = getClient();

  const { data } = await client.query<GameQuery, GameQueryVariables>({
    query: GameDocument,
    variables: { id },
    errorPolicy: "all"
  });

  if (!data.Game) {
    return { notFound: true };
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
