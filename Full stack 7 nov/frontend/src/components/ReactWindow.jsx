//import { FixedSizeList as List } from "react-window";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

export default function App() {
  return (
    <div style={{ width: "300px", height: "400px" }}>
      <List
        height={400}       // viewport height
        itemCount={items.length}
        itemSize={35}      // each row height
        width={300}
      >
        {({ index, style }) => (
          <div style={style}>
            {items[index]}
          </div>
        )}
      </List>
    </div>
  );
}
