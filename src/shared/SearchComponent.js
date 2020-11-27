import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.foreground.secondary};
`;

const SearchButton = styled.button`
  border: 0;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.foreground.primary};
  outline: none;

  &:focus {
    outline: none;
  }
`;

const SearchInput = styled.input`
  border: 0;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.searchBck};
  min-width: 350px;
  outline: none;
  color: ${({ theme }) => theme.foreground.secondary};
`;

export default function SearchComponent({
  onSeach,
  placeholder = 'Search ...',
}) {
  const [searchInput, setSearchInput] = useState('');

  const emitOnSearch = () => onSeach?.(searchInput);

  const handleOnKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.code === 'Enter') {
      emitOnSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchButton onClick={emitOnSearch}>
        <FontAwesomeIcon
          icon='search'
          transform={{ rotate: 90 }}
        ></FontAwesomeIcon>
      </SearchButton>

      <SearchInput
        type='text'
        placeholder={placeholder}
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        onKeyPress={handleOnKeyPress}
      ></SearchInput>
    </SearchContainer>
  );
}
