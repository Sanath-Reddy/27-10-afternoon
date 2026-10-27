import { memo } from "react";

function Child({ onClick, onRender }) {
  console.log("Child component rendered");
  if (typeof onRender === "function") {
    onRender();
  }
  return (
    <div className="child-component-box">
      <div className="memo-badge">Wrapped with React.memo()</div>
      <p className="child-hint">
        Child only re-renders if its props change. Because <code>handleClick</code> is wrapped in <code>useCallback</code>, its reference stays stable!
      </p>
      <button 
        type="button" 
        id="child-action-btn"
        className="btn-action child-btn" 
        onClick={onClick}
      >
        Child Button (Click Me)
      </button>
    </div>
  );
}

export default memo(Child);
