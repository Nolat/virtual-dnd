import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import React from "react";
import { FiSearch } from "react-icons/fi";

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChange }) => {
  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <FiSearch />
      </InputLeftElement>
      <Input
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        focusBorderColor="blue.300"
      />
    </InputGroup>
  );
};

export interface SearchInputProps {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
