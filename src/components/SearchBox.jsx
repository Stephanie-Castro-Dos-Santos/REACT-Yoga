import React, { useEffect, useState } from "react";
import { SearchBox as MapboxSearchBox } from "@mapbox/search-js-react";

export const SearchBox = ({ defaultAddress, onSelect }) => {
  const mbToken = import.meta.env.VITE_MAPBOX_TOKEN;

  //console.log(defaultAddress);

  const [searchResult, setSearchResult] = useState({
    location: defaultAddress?.location || "",
    coordinates: defaultAddress?.coordinates || null,
  });

  useEffect(() => {
    // Inicializa con el valor predeterminado si existe
    if (defaultAddress) {
      setSearchResult(defaultAddress);
    }
  }, [defaultAddress]);

  const handleRetrieve = (result) => {
    //console.log(result);
    const { coordinates, full_address } = result.features[0].properties;
    const newAddress = {
      location: full_address,
      coordinates: [coordinates.longitude, coordinates.latitude],
    };

    setSearchResult(newAddress);
    onSelect(newAddress); // Notifica el cambio al padre
  };

  return (
    <MapboxSearchBox
      accessToken={mbToken}
      value={searchResult.location}
      onRetrieve={handleRetrieve}
      options={{ placeholder: "Buscar una dirección" }}
    />
  );
};
