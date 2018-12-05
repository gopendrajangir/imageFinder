import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Images extends React.Component {

  constructor(props) {
    super(props);
    this.selectImage = this.selectImage.bind(this);
    this.removeSearchesHelper = this.removeSearchesHelper.bind(this);
    this.removeSelectedHelper = this.removeSelectedHelper.bind(this);
  }

  selectImage(url) {
    return () => {
      this.props.addRemove(url);
    }
  }

  removeSearchesHelper() {
    return () => {
      this.props.removeSearches();
    }
  }

  removeSelectedHelper() {
    return () => {
      this.props.removeSelected(this.props.selected);
    }
  }

  renderImages() {
    return (
      <div className="images-wrapper">
        {
          this.props.prevImages.map((image) => {
            return (
              <div onClick={this.selectImage(image)} key={image} className="image-group">
                <img className="image" src={image} />
                {
                  this.props.selected.includes(image) 
                  ?
                  <div className="tick"><i className="fas fa-check-double"></i></div>
                  :
                  null
                }
              </div>
            )
          })
        }
        {
          this.props.isLoading 
          ?
          <div className="image-group">
            <p>Loading...</p> 
          </div> 
          : 
          null
        }
        {
          this.props.error 
          ? 
          <div className="image-group">
            <p>Error Occured</p> 
          </div>
          : 
          null
        }
        {
          !this.props.isLoading && !this.props.error && this.props.url != null 
          ? 
          <div onClick={this.selectImage(this.props.url)}  key={this.props.url} className="image-group">
            <img className="image" src={this.props.url} />
            {
              this.props.selected.includes(this.props.url) 
              ?
              <div className="tick"><i className="fas fa-check-double"></i></div>
              :
              null
            }
          </div>
          : 
          null
        }  
      </div>
    )
  }

  render() {
    return(
      <div className="images-container">
        {
          this.props.prevImages.length > 0 || this.props.url != null
          ?
          <div className="cart-button-group">
            <button onClick={this.removeSearchesHelper()} className="btn btn-primary">Remove Searches</button>
            {
              this.props.selected.length > 0 
              ?
              <Link className="btn btn-primary" to="/cart" >
                Download Now
              </Link>
              :
              null
            }
            {
              this.props.selected.length > 0 
              ?
              <button onClick={this.removeSelectedHelper()} className="btn btn-primary">
                Remove
              </button>
              :
              null
            }
          </div>
          : 
          null
        }
        { this.renderImages() }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRemove(url) {
      dispatch({type: 'ADD_REMOVE', url})
    },
    removeSearches() {
      dispatch({type: 'REMOVE_SEARCHES'});
    },
    removeSelected(selected) {
      dispatch({type: 'REMOVE_SELECTED', selected});
    }
  }
}

function mapStateToProps( state ) {
  
  const { isLoading, url, prevImages, error } = state.data;
  const { selected } = state.selected;

  return {
    isLoading,
    url,
    prevImages,
    error,
    selected
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Images);