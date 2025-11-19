import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function UseMemoEg() {
  console.log("page render")
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [cntr,setCntr]= useState(0);

const  incr=() =>{
    setCntr(cntr+1)
  }
  // 🔹 Fetch API data
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // 🔥 useMemo used for filtering
  const filteredPosts = useMemo(() => {
    console.log("memo use Filtering posts...");
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts Filter (useMemo Example)</h1>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={incr}>+</button>
      <h2>Results ({filteredPosts.length})</h2>

      {filteredPosts.map((post) => (
        <div
          key={post.id}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        >
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
