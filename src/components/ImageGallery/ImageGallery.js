import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Component } from 'react';
import PropTypes from 'prop-types';
import threeDots from '../Loader/Loader';
import { Items } from 'components/ImageGalleryItem/ImageGalleryItem';
import { getImages } from 'services/getImages';
import { List } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';

export default class ImageGallery extends Component {
  state = {
    query: '',
    entryData: [],
    loading: false,
    page: 1,
    error: null,
    loadMoreBtnShown: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.value;
    const currentQuery = this.props.value;
    const prevPage = prevState.page;
    const currentPage = this.state.page;
    const prevStateQuery = prevState.query;

    if (prevQuery !== currentQuery) {
      this.setState(prev => ({
        ...prev,
        entryData: [],
        page: 1,
        query: currentQuery,
        loadMoreBtnShown: true,
      }));
    }

    if (
      prevStateQuery !== this.state.query ||
      (prevPage !== currentPage && currentPage !== 1)
    ) {
      this.setState({ loading: true, page: currentPage });

      getImages(currentQuery, currentPage)
        .then(data => {
          if (data.total === 0) {
            this.setState({ loading: false });
            return toast.error(`Nothing was found for ${currentQuery}`, {
              position: toast.POSITION.TOP_CENTER,
            });
          }

          if (data.hits.length < 12) {
            this.setState({ loadMoreBtnShown: false });
          }

          this.setState(state => ({
            entryData: [...state.entryData, ...data.hits],
            loading: false,
          }));
        })
        .catch(error => this.setState({ error }));
      // .finally(() => this.setState({ loading: false }));
    }
  }

  // handleDataAdd = () => {
  //   this.setState({

  //     page: 1,
  //     entryData: [],
  //     loading: true,
  //     loadMoreBtnShown: true,
  //   });

  // };

  onLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
  };

  render() {
    const { entryData, loading, loadMoreBtnShown } = this.state;
    return (
      <div>
        <List>
          {entryData.length > 0 &&
            entryData.map(item => <Items items={item} key={item.id} />)}
        </List>
        {entryData.length > 0 && !loading && loadMoreBtnShown && (
          <Button onLoadMore={this.onLoadMoreBtn} />
        )}
        {loading && threeDots}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
