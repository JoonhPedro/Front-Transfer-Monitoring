import styled from 'styled-components'

export const SeachFormContainer = styled.form`
  display: flex;
  gap: 1rem;
  width: auto;

  input {
    flex: 2;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }
`

export const ButtonSearch = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  border: 0;
  padding: 1rem;
  background: transparent;
  border: 1px solid ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['green-300']};
  font-weight: bold;
  border-radius: 6px;

  &:hover {
    background: ${(props) => props.theme['green-500']};
    border-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s;
    cursor: pointer;
  }
`

export const Select = styled.select`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: transparent;
  border: none;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:focus {
    border-color: ${(props) => props.theme['green-500']};
    outline: none;
  }
  option {
    color: ${(props) => props.theme['gray-700']};
    padding: 1rem;
  }
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><path d="M6 9l6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
`
