import React, { useLayoutEffect, useRef } from "react";

export default function UseLayoutDemo() {
  const listRef = useRef();

  useLayoutEffect(() => {
    const el = listRef.current;
    el.scrollTop = el.scrollHeight; // scroll BEFORE paint
    console.log(el.scrollTop);
  }, []);

  return (
    <>
      <div ref={listRef} style={{ height: 300, overflowY: "scroll" }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i}>
            hai <br />
          </div>
        ))}

        <hr />
        <div>hai</div>
        <br />

        <hr />
        <div>hai</div>
        <br />

        <hr />
        <div>hai</div>
        <br />
      </div>
    </>
  );
}
