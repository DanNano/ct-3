import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import complianceUrls from "./ElecdRepURLs.json"; // Ensure the path is correct

function ElectedRepresentatives() {
  const [urls, setUrls] = useState({ ElectedRepresentatives: ""});
  const { cityName } = useParams();

  useEffect(() => {
    const cityData = complianceUrls[cityName] || {
      ElectedRepresentatives: "",
    };
    setUrls(cityData);
  }, [cityName]);

  return (
    <div>
      <h1>{cityName} Government Officials</h1>
      {urls.ElectedRepresentatives && (
        <div>
          <a
            href={urls.ElectedRepresentatives}
            target="_blank"
            rel="noopener noreferrer"
          >
            Elected Representatives
          </a>
        </div>
      )}
      
    </div>
  );
}

export default ElectedRepresentatives;
