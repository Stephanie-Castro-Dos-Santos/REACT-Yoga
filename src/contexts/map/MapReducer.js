export const MapReducer = (state, action) => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case "setAddresses":
      return {
        ...state,
        addresses: action.payload,
      };
    default:
      return state;
  }
};
