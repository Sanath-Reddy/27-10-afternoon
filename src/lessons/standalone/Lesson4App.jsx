import { useState, useCallback } from "react";
import Child from "../../components/Child";

function Lesson4App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Rahul");
  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  console.log("Parent component rendered");
  return (
    <main className="standalone-app-container">
      <h1>useCallback Example</h1>
      <h2>Count: {count}</h2>
      <button className="btn-secondary" onClick={() => setCount(count + 1)}>Increase Count</button>
      <hr />
      <h2>Name: {name}</h2>
      <button className="btn-secondary" onClick={() => setName(name === "Rahul" ? "Amit" : "Rahul")}>Change Name</button>
      <hr />
      <Child onClick={handleClick} />
    </main>
  );
}

export default Lesson4App;
