import { useState } from "react";

function RecallExperiment() {
  const [tokenCount, setTokenCount] = useState(3);

  const stateNumbers = 4;

  const historyNumbers = tokenCount * 4;

  const historyRatio = Math.min(
    (tokenCount / 50) * 100,
    100
  );

  const stateRatio = (stateNumbers / 50) * 100;

  return (
    <section className="section">

      {/* ==================================================
          SECTION HEADER
      ================================================== */}

      <div className="section-header">

        <div className="eyebrow">
          SYNTHETIC · TEACHING SIMPLIFICATION
        </div>

        <h2>
          Where Did the Information Go?
        </h2>

        <p>
          Increase the sequence length and compare how much
          information must be carried forward in the two
          representations.
        </p>

      </div>


      {/* ==================================================
          EXPERIMENT CARD
      ================================================== */}

      <div className="recall-card">

        <div className="recall-header">

          <div>

            <div className="recall-title">
              History vs Recurrent State
            </div>

            <div className="recall-subtitle">
              Same sequence · different representation
            </div>

          </div>

          <div className="live-badge">
            SYNTHETIC
          </div>

        </div>


        {/* ==================================================
            TOKEN SLIDER
        ================================================== */}

        <div className="recall-control">

          <div className="recall-control-header">

            <label>
              Number of tokens
            </label>

            <strong>
              {tokenCount}
            </strong>

          </div>

          <input
            className="token-slider"
            type="range"
            min="3"
            max="50"
            value={tokenCount}
            onChange={(event) =>
              setTokenCount(Number(event.target.value))
            }
          />

          <div className="slider-labels">
            <span>3</span>
            <span>25</span>
            <span>50</span>
          </div>

        </div>


        {/* ==================================================
            COMPARISON
        ================================================== */}

        <div className="recall-comparison">

          {/* ------------------------------------------
              STANDARD HISTORY
          ------------------------------------------ */}

          <div className="recall-panel">

            <div className="recall-panel-header">

              <div>
                <span className="recall-panel-label">
                  STANDARD ATTENTION
                </span>

                <h3>
                  KV History
                </h3>
              </div>

              <div className="recall-count">
                {historyNumbers} values
              </div>

            </div>


            <div className="history-visual">

              {Array.from(
                { length: tokenCount },
                (_, index) => (

                  <div
                    className="history-mini-token"
                    key={index}
                  >
                    <span>
                      K{index + 1}
                    </span>

                    <span>
                      V{index + 1}
                    </span>
                  </div>

                )
              )}

              {tokenCount >= 12 && (
                <div className="history-more">
                  + {tokenCount - 12} more tokens
                </div>
              )}

            </div>


            <div className="storage-bar">

              <div className="storage-bar-label">
                <span>
                  Representation size
                </span>

                <span>
                  grows with sequence length
                </span>
              </div>

              <div className="storage-track">

                <div
                  className="storage-fill history-fill"
                  style={{
                    width: `${historyRatio}%`
                  }}
                />

              </div>

            </div>


            <p className="recall-description">
              Each new token adds another key–value pair to
              the history that must remain available.
            </p>

          </div>


          {/* ------------------------------------------
              LINEAR STATE
          ------------------------------------------ */}

          <div className="recall-panel">

            <div className="recall-panel-header">

              <div>
                <span className="recall-panel-label">
                  KERNELIZED LINEAR ATTENTION
                </span>

                <h3>
                  Recurrent State
                </h3>
              </div>

              <div className="recall-count">
                {stateNumbers} values
              </div>

            </div>


            <div className="state-visual">

              <div className="state-matrix-mini">

                <div className="mini-cell">
                  S₁₁
                </div>

                <div className="mini-cell">
                  S₁₂
                </div>

                <div className="mini-cell">
                  S₂₁
                </div>

                <div className="mini-cell">
                  S₂₂
                </div>

              </div>

              <div className="state-visual-arrow">
                ↑
              </div>

              <div className="state-accumulation">
                Tokens keep contributing to the same state
              </div>

            </div>


            <div className="storage-bar">

              <div className="storage-bar-label">
                <span>
                  Representation size
                </span>

                <span>
                  fixed for fixed dimensions
                </span>
              </div>

              <div className="storage-track">

                <div
                  className="storage-fill state-fill"
                  style={{
                    width: `${stateRatio}%`
                  }}
                />

              </div>

            </div>


            <p className="recall-description">
              Instead of retaining every past key–value pair
              in this representation, their contributions are
              accumulated into a fixed-dimensional state.
            </p>

          </div>

        </div>


        {/* ==================================================
            OBSERVATION
        ================================================== */}

        <div className="recall-observation">

          <div className="observation-icon">
            →
          </div>

          <div>

            <div className="observation-title">
              What should you notice?
            </div>

            <p>

              At <strong>{tokenCount} tokens</strong>, the
              toy KV history contains{" "}
              <strong>{historyNumbers} values</strong>,
              while the recurrent state still contains only{" "}
              <strong>4 values</strong>.

            </p>

          </div>

        </div>


        {/* ==================================================
            IMPORTANT CAVEAT
        ================================================== */}

        <div className="recall-caveat">

          <strong>
            Important:
          </strong>

          <span>
            This is a teaching simplification. The state is
            fixed with respect to sequence length only when
            the feature and value dimensions are fixed. Real
            models also have training-time activations and
            other memory costs.
          </span>

        </div>

      </div>

    </section>
  );
}

export default RecallExperiment;