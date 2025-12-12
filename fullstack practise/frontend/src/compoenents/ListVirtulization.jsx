import React from "react";
import { FixedSizeList as List } from "react-window/dist/index.esm.js";

const data = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

export default function ListVirtualization() {
  return (
    <List
      height={400}       // Viewport height
      width={300}        // Viewport width
      itemCount={data.length}
      itemSize={40}      // Height of each row
    >
      {({ index, style }) => (
        <div style={style}>
          {data[index]}
        </div>
      )}
    </List>
  );
}
