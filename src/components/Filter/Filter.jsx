import PropTypes from 'prop-types';
import React from 'react';

export const Filter = ({onChange}) => {
  return (
    <>
      <h3>Find contacts by name</h3>
      <input type='text' name='filter' onChange={onChange} />
    </>
  );
};
Filter.propTypes = {
  onChange: PropTypes.func.isRequired
}