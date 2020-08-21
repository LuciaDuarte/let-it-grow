import React from 'react';

function Search() {
  return (
    <div>
      <form>
        <label htmlFor="input-search">Search for a veggie</label>
        <input type="text" name="name" id="input-search" />
        <button>Search</button>
      </form>
    </div>
  );
}

export default Search;
