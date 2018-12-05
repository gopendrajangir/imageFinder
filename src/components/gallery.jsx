import React from 'react';
import SearchBar from '../containers/search_bar';
import Images from '../containers/images';

export default (props) => {
  return (
    <div className="container">
      <SearchBar />
      <Images />
    </div>
  )
}