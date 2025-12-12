import React, { useState, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";

export default function ListVirtualizedWithPagination() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const pageSize = 20; // items per page

  // Fetch data function
  const fetchData = async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=${pageSize}`
      );
      const newItems = response.data;
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newItems]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div style={{ height: 500, width: 400, margin: "20px auto" }}>
      <Virtuoso
        style={{ height: "100%", width: "100%" }}
        data={data}
        endReached={() => {
          if (hasMore && !loading) {
            setPage((prev) => prev + 1);
          }
        }}
        itemContent={(index, item) => (
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
        )}
      />
      {loading && <p style={{ textAlign: "center" }}>Loading more...</p>}
    </div>
  );
}
