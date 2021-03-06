
export function getLocation () {
  return async function (dispatch) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = pos.coords;
      return dispatch({
        type: 'GET_LOCATION',
        data: coords
      });
    });
  };
}

export function getAutocompleteInput () {
  return {
    type: 'GET_AUTO_INPUT',
    input: ''
  };
}

export function resetGeo () {
  return {
    type: 'RESET'
  };
}
