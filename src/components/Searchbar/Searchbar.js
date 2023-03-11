import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { Header, Form, SearchFormButton, Input } from './Searchbar.styled';

export default function Searchbar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value.toLowerCase());

  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {

      return toast.warn('The search string cannot be empty!', {
        position: toast.POSITION.TOP_CENTER,
      });

    }

    onSearch(value);
    setValue('');

  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ImSearch>Search</ImSearch>
        </SearchFormButton>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </Form>
      <ToastContainer autoClose={1500} />
    </Header>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};


