import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";

export default function VirtuosoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ height: 400, width: 400, margin: "20px auto" }}>
      <Virtuoso
        style={{ height: "100%", width: "100%" }}
        totalCount={data.length}
        itemContent={(index) => {
          const item = data[index];
          return (
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                background: index % 2 === 0 ? "#f9f9f9" : "#fff",
              }}
            >
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </div>
          );
        }}
      />
    </div>
  );
}
