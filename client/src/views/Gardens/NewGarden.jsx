import React from 'react';

function NewGarden() {
  return (
    <div>
      <h1>Create a new Garden</h1>
      <form>
        <label htmlFor="input-name">Garden Name</label>
        <input type="text" name="name" id="input-name" />
        <button>Create</button>
      </form>
    </div>
  );
}

export default NewGarden;
