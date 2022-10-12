import React from 'react';
import './App.css';

function Search({term, searchKeyword}) {
  
    function handleSearch(e){
        searchKeyword(e.target.value);
    }

  return (
    <>
    <h1 style={{color:"white"}}>BOOK, JUST A CLICK AWAY!</h1>
      <input 
      className='input-field'
      type='text'
      value={term}
      placeholder="Enter a book name"
      onChange={handleSearch}>
      </input>
    </>
  )
}

export default Search