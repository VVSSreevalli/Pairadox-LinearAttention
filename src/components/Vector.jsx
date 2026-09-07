function Vector({ data, label }) {
  return (
    <div className="vector-card">
      {label && <div className="vector-label">{label}</div>}

      <div className="vector">
        [
        {data.map((value, index) => (
          <span className="vector-value" key={index}>
            {Number(value).toFixed(2)}
            {index < data.length - 1 && ", "}
          </span>
        ))}
        ]
      </div>
    </div>
  );
}

export default Vector;
