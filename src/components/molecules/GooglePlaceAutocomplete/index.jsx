import React, { useState, useEffect, useRef } from "react";

let autoComplete;

const handleScriptLoad = (updateQuery, autoCompleteRef) => {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {
      types: ["geocode"],
    }
  );
  autoComplete.addListener("place_changed", () => {
    handlePlaceSelect(updateQuery);
  });
};

const handlePlaceSelect = async (updateQuery) => {
  const addressObject = autoComplete.getPlace();
  const query = formatQuery(addressObject);
  updateQuery(query);
};

const formatQuery = (addressObject) => {
  const parseAddress = {};
  const diccionario = [
    "administrative_area_level_1",
    "administrative_area_level_2",
    "postal_code",
    "country",
    "locality",
    "sublocality_level_1",
  ];

  addressObject.address_components.forEach((address) => {
    const type = address.types[0];

    if (!diccionario.includes(type)) return;
    if (type === "country") {
      parseAddress.country_long = address.long_name;
      parseAddress.country_short = address.short_name;
    } else {
      parseAddress[type] = address.long_name;
    }
  });

  parseAddress.location_lat = addressObject.geometry.location.lat();
  parseAddress.location_lng = addressObject.geometry.location.lng();
  parseAddress.address = addressObject.formatted_address;

  return parseAddress;
};

const GooglePlaceAutocomplete = ({ className, query, setQuery }) => {
  const [address, setAddress] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef);
  }, []);

  useEffect(() => {
    setAddress(query.address);
  }, [query]);

  return (
    <input
      ref={autoCompleteRef}
      onChange={(event) => setAddress(event.target.value)}
      placeholder="Enter a City"
      value={address}
      className={className}
    />
  );
};

/*
const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.id = "googlePlace";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("body")[0].appendChild(script);
};
*/
/*
const remove = () => {
  document.getElementById("googlePlace").remove();
};
*/

export default GooglePlaceAutocomplete;
