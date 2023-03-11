import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import threeDots from './Loader/Loader';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';

import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { getImages } from 'services/getImages';
import { Items } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';

export default function App({ toggleModal, modalImage, showModal }) {

  const [imageSearch, setImageSearch] = useState(null);
  const [imageArray, setImageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [, setError] = useState(null);
  const [loadMoreBtnShown, setLoadMoreBtnShown] = useState(true);


  const handleSubmit = imageSearch => {
    setImageSearch(imageSearch);
    setPage(1);
    setImageArray([]);
  };

  const onLoadMoreBtn = () => {
    setPage(page => page + 1);
    setLoading(true);
  };

   useEffect(() => {
     if (imageSearch === null) {
       return;
     }

     getImages(imageSearch, page)
       .then(data => {
         if (data.total === 0) {
           setLoading(false);
           return toast.error(`Nothing was found for ${imageSearch}`, {
             position: toast.POSITION.TOP_CENTER,
           });
         }

         if (data.hits.length < 12) {
           setLoadMoreBtnShown(false);
         }

         setImageArray(prevState => [...prevState, ...data.hits]);
         setLoading(false);
       })
       .catch(error => {
         setError(error);
       });


   }, [imageSearch, page]);



  return (
    <Layout>
      <Searchbar onSearch={handleSubmit} />

      {imageArray.length > 0 && (
        <ImageGallery>
          {imageArray.map(item => (
            <Items key={item.id} items={item} />
          ))}
        </ImageGallery>
      )}

      {showModal && modalImage && (
        <Modal onClose={toggleModal} modalImage={modalImage} />
      )}

      {imageArray.length > 0 && !loading && loadMoreBtnShown && (
        <Button onLoadMore={onLoadMoreBtn} />
      )}

      {loading && threeDots}
      <ToastContainer autoClose={1500} />

      <GlobalStyle />
    </Layout>
  );

}



