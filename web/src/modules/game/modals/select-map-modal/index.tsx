import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { SimpleGrid } from "@chakra-ui/layout";
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "@chakra-ui/modal";
import Fuse from "fuse.js";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiMap, FiTrash } from "react-icons/fi";

import { IconButton } from "components/icon-button";
import { AssetPreview, SearchInput } from "modules/game/components";
import { useMapStore } from "modules/game/store/useMapStore";
import { useModalStore } from "modules/game/store/useModalStore";

import maps from "./maps.json";

export const SelectMapModal: React.FC = () => {
  const { mapUrl, selectMap } = useMapStore();
  const { closeModal } = useModalStore();

  // * Handle search
  const [searchText, setSearchText] = useState<string>();
  const [list, setList] = useState(maps.list);

  useEffect(() => {
    if (searchText) {
      const fuse = new Fuse(maps.list, { keys: ["name"], threshold: 0.2 });

      setList(fuse.search(searchText).map((element) => element.item));
    } else {
      setList(maps.list);
    }
  }, [searchText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value !== "" ? setSearchText(e.target.value) : setSearchText(undefined);
  };

  // * Handle selection
  const [clickedMap, setClickedMap] = useState<number>();

  useEffect(() => {
    if (mapUrl) {
      const map = maps.list.find((item) => item.imageUrl === mapUrl);
      setClickedMap(map.id);
    } else setClickedMap(undefined);
  }, [mapUrl]);

  const onSelect = () => {
    if (clickedMap) {
      const map = maps.list.find((item) => item.id === clickedMap);
      selectMap(map.imageUrl);
      closeModal();
    }
  };

  const onUnselect = () => {
    setClickedMap(undefined);
    selectMap("");
  };

  return (
    <>
      <ModalHeader>
        <Icon as={FiMap} mr={4} />
        Sélectionner ou importer une map
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SearchInput placeholder="Rechercher une map" onChange={handleChange} />

        <SimpleGrid columns={5} spacing={4} mt={4}>
          {list.map(({ id, name, width, height, imageUrl }: any) => (
            <AssetPreview
              key={id}
              name={name}
              badgeText={`${height}x${width}`}
              imageUrl={imageUrl}
              isSelected={clickedMap === id}
              onClick={() => setClickedMap(id)}
            />
          ))}
        </SimpleGrid>
      </ModalBody>

      <ModalFooter>
        <Button width="100%" onClick={onSelect}>
          Sélectionner
        </Button>
        <IconButton
          icon={<FiTrash size={20} />}
          aria-label={`Déselectionner la map actuelle`}
          tooltip={`Déselectionner la map actuelle`}
          tooltipPlacement="auto"
          variant="solid"
          ml={2}
          onClick={onUnselect}
        />
      </ModalFooter>
    </>
  );
};
