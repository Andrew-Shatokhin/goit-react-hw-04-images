import { ButtonLoadMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore}) => {
  return (
    <ButtonLoadMore type="button" onClick={onLoadMore} >
      Load More
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
