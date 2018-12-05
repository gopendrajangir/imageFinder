import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Cart extends React.Component {
  
  constructor(props) {
    super(props);
  }

  renderAll() {
    return <div className="cart-images">
      {this.props.selected.map( image => {
        console.log(image);
        return (
          <div key={image} className="cart-image-group">
            <img className="cart-image" src={image} />
            <a className="btn btn-primary download-link" href={image} download="img.jpeg">Download</a>
          </div>
        )
      })}
    </div>
  }
  
  render() {
    return (
      <div className="cart-container">
        <div className="cart-button-group">
        <Link className="btn btn-primary" to="/">Searches</Link>
        {
          this.props.selected.length > 0 
          ?
          <button className="btn btn-primary">
            Download All
          </button>
          :
          null
        }
        </div>
        { this.renderAll() }
      </div>
    )
  }
}


function mapStateToProps( state ) {

  const { selected } = state.selected;

  return {
    selected
  }

}

export default connect(mapStateToProps)(Cart);