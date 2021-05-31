import { PubSub } from "graphql-subscriptions";

export const pubSub = new PubSub();

export const subscriptionIterator = (topic: string, onClose?: () => void) => {
  const iterator = pubSub.asyncIterator(topic);
  const savedReturn = iterator.return;

  iterator.return = async () => {
    if (onClose) await onClose();

    return savedReturn
      ? savedReturn.call(iterator)
      : Promise.resolve({ value: undefined, done: true });
  };

  return iterator;
};
