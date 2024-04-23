import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import complianceUrls from "./ComURLs.json"; // Ensure the path is correct

function CodeOfCompliance() {
  const [urls, setUrls] = useState({ CodeOfCompliance: "", publicForms: [] });
  const { cityName } = useParams();

  useEffect(() => {
    const cityData = complianceUrls[cityName] || {
      CodeOfCompliance: "",
      publicForms: [],
    };
    setUrls(cityData);
  }, [cityName]);

  return (
    <div>
      <h1>{cityName} Code of Compliance and Public Forms</h1>
      <h2>Code Of Compliance</h2>
      {urls.CodeOfCompliance && (
        <div>
          <a
            href={urls.CodeOfCompliance}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code of Compliance
          </a>
        </div>
      )}
      <h2>Public Forms</h2>
      {urls.publicForms && urls.publicForms.length > 0 ? (
        urls.publicForms.map((form, index) => (
          <div key={index}>
            <a href={form.url} target="_blank" rel="noopener noreferrer">
              {form.name}
            </a>
          </div>
        ))
      ) : (
        <p>No public forms available.</p>
      )}
    </div>
  );
}

export default CodeOfCompliance;
