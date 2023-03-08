import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { Header, Form, SearchFormButton, Input } from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    value: '',

  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.value.trim() === '') {
      toast.warn('The search string cannot be empty!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    this.props.onSearch(this.state.value);
    this.setState({ value: ''});
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch>Search</ImSearch>
          </SearchFormButton>

          <Input
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form>
        <ToastContainer autoClose={1500} />
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
