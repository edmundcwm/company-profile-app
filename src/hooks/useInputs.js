import React, { useState } from 'react';

export default function useInputs(initialValue) {
  const [value, setValue] = useState(initialValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange
  };
}
