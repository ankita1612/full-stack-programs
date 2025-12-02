import { useState, useDeferredValue ,useEffect } from "react";

export default function UseDeferredValue() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // 1️⃣ Defer value so UI doesn't freeze
  const deferredSearch = useDeferredValue(search);

  // 2️⃣ Debounce API call (300ms)
  useEffect(() => {
    // if (!deferredSearch) {
    //     console.log("deferredSearch-->"+deferredSearch)
    //   setResults([]);
    //   return;
    // }

    const timer = (() => {
        
        let condition='';
        if(deferredSearch)
        {
            condition=`/search?q=${deferredSearch}`
        }
        
      fetch(`https://dummyjson.com/users`+condition)
        .then(res => res.json())
        .then(data => setResults(data.users || []));
    })
    timer()

    return () => clearTimeout(timer);
  }, [deferredSearch]);

  return (
    <div>
      <h2>Search Users (API + useDeferredValue)</h2>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."/>
      <p>Typing is smooth, results update slightly later.</p>
      {/* Heavy rendering part */}
      <div>
        {results.map((user) => (
          <div key={user.id}>
            {user.firstName} {user.lastName}
          </div>
        ))}
      </div>
    </div>
  );
}


 function UseDeferredValue1() {
  const [search, setSearch] = useState("");

  // Deferred version of search
  const deferredSearch = useDeferredValue(search);

  // Imagine this is a very heavy list
  const items = Array.from({ length: 5000 }, (_, i) => `Item ${i}`);

  // Only heavy filtering uses deferred value
  const filtered = items.filter(item =>
    item.toLowerCase().includes(deferredSearch.toLowerCase())
  );

  return (
    <div>
      <h2>Search</h2>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type to filter..."
      />

      <p>Typing is always smooth. List updates slightly slower.</p>

      <div>
        {filtered.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </div>
  );
}
