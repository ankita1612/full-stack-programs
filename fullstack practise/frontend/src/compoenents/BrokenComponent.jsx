// BrokenComponent.jsx
export default function BrokenComponent() {
  const obj = null;
  return <h2>{obj.name}</h2>;  // ❌ This will cause an error
}
