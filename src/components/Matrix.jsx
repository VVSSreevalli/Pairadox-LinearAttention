function Matrix({ data, label, highlight = false }) {
  return (
    <div className={`matrix-card ${highlight ? "highlight" : ""}`}>
      {label && <div className="matrix-label">{label}</div>}

      <div className="matrix">
        <span className="bracket left">[</span>

        <div className="matrix-values">
          {data.map((row, rowIndex) => (
            <div className="matrix-row" key={rowIndex}>
              {row.map((value, columnIndex) => (
                <div className="matrix-cell" key={columnIndex}>
                  {Number(value).toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <span className="bracket right">]</span>
      </div>
    </div>
  );
}

export default Matrix;