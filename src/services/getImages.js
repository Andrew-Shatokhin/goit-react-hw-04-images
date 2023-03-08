import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32826694-227c236c87c03694788342456';


export const getImages = (searchText, page) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Can't find ${searchText}`));
  });
};
getImages.propTypes = {
  searchText: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
