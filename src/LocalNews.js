import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import complianceUrls from "./newsURLs.json"; // Ensure the path is correct

function LocalNews() {
  const [urls, setUrls] = useState({ LocalNews: ""});
  const { cityName } = useParams();

  useEffect(() => {
    const cityData = complianceUrls[cityName] || {
      LocalNews: "",
    };
    setUrls(cityData);
  }, [cityName]);

  return (
    <div>
      <h1>{cityName} Local News</h1>
      {urls.LocalNews && (
        <div>
          <a
            href={urls.LocalNews}
            target="_blank"
            rel="noopener noreferrer"
          >
            Local News
          </a>
        </div>
      )}
      
    </div>
  );
}

export default LocalNews;
