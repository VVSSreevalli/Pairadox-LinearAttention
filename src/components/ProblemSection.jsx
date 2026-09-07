function ProblemSection() {
  return (
    <section className="section">

      <div className="section-header">
        <div className="eyebrow">
          THE PROBLEM
        </div>

        <h2>
          The Past Keeps Growing
        </h2>

        <p>
          In causal attention, a new token can look back at
          everything that came before it.
        </p>
      </div>

      <div className="token-card">

        <div className="token-header">
          <div className="token-title">
            Growing KV History
          </div>

          <div className="live-badge">
            CONCEPT
          </div>
        </div>

        <div className="history-flow">

          <div className="history-token">
            <div className="history-label">
              TOKEN 1
            </div>

            <VectorPlaceholder
              label="K₁, V₁"
            />
          </div>

          <div className="history-arrow">
            →
          </div>

          <div className="history-token">
            <div className="history-label">
              TOKEN 2
            </div>

            <VectorPlaceholder
              label="K₂, V₂"
            />
          </div>

          <div className="history-arrow">
            →
          </div>

          <div className="history-token">
            <div className="history-label">
              TOKEN 3
            </div>

            <VectorPlaceholder
              label="K₃, V₃"
            />
          </div>

          <div className="history-arrow">
            →
          </div>

          <div className="history-token future-token">
            <div className="history-label">
              TOKEN 4...
            </div>

            <VectorPlaceholder
              label="K₄, V₄..."
            />
          </div>

        </div>

        <div className="history-caption">
          The sequence grows → the available KV history grows.
        </div>

      </div>

      <div className="question-card">

        <div className="question-mark">
          ?
        </div>

        <div>
          <div className="question-title">
            Can we keep the useful information without
            carrying the entire history forward?
          </div>

          <p>
            That is the key idea we are going to investigate.
          </p>
        </div>

      </div>

      <div className="idea-card">

        <div className="eyebrow">
          LINEAR ATTENTION
        </div>

        <h3>
          Accumulate. Then read.
        </h3>

        <p>
          Instead of requiring a later query to revisit every
          previous key–value pair, we can accumulate their
          contributions into a fixed-dimensional recurrent state.
        </p>

        <div className="idea-flow">

          <div className="idea-step">
            <span>1</span>
            <strong>Receive a token</strong>
            <small>Kₜ, Vₜ</small>
          </div>

          <div className="idea-arrow">
            →
          </div>

          <div className="idea-step">
            <span>2</span>
            <strong>Update the state</strong>
            <small>Sₜ = Sₜ₋₁ + Cₜ</small>
          </div>

          <div className="idea-arrow">
            →
          </div>

          <div className="idea-step">
            <span>3</span>
            <strong>Read with a query</strong>
            <small>Q → Sₜ → output</small>
          </div>

        </div>

      </div>

    </section>
  );
}

function VectorPlaceholder({ label }) {
  return (
    <div className="vector-placeholder">
      {label}
    </div>
  );
}

export default ProblemSection;