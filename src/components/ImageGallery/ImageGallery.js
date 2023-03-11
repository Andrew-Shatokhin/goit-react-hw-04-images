import PropTypes from 'prop-types';
import { Items } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export default function ImageGallery({ images }) {
  return (
    <List>
      {images.length > 0 &&
        images.map(item => <Items key={item.id} items={item} />)}
    </List>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
  PropTypes.shape({
     id: PropTypes.number.isRequired, })).isRequired
};
