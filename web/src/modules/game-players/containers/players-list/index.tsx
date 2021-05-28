import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import cache from "common/definitions/apollo/cache";
import {
  OnlinePlayersDocument,
  OnlinePlayersQuery,
  useMeQuery,
  useOnOnlinePlayersChangedSubscription,
  useOnlinePlayersQuery
} from "common/definitions/graphql/generated";
import { PlayerLabel } from "modules/game-players/components";

export const PlayersList: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data } = useOnlinePlayersQuery({
    variables: { id }
  });

  const { data: meData } = useMeQuery();

  useOnOnlinePlayersChangedSubscription({
    variables: { id },
    onSubscriptionData: ({ subscriptionData }) => {
      cache.writeQuery<OnlinePlayersQuery>({
        query: OnlinePlayersDocument,
        variables: { id },
        data: { ...data, Game: { onlinePlayers: subscriptionData.data.onlinePlayersChanged } }
      });
    }
  });

  return (
    <Stack direction="row" alignItems="center" ml="100px">
      {data?.Game?.onlinePlayers?.map((player, index) => {
        return (
          <PlayerLabel
            key={index}
            name={player.name}
            color={player.color}
            isMe={meData?.me.id === player.user.id}
          />
        );
      })}
    </Stack>
  );
};
