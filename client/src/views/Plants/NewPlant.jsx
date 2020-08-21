import React from 'react';

function NewPlant() {
  return (
    <div>
      <h1>Add a new Plant</h1>
      <form>
        <label htmlFor="input-name">Plant Name</label>
        <input type="text" name="name" id="input-name" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default NewPlant;
