import Matrix from "./Matrix";
import Vector from "./Vector";

function StateVsHistory({
  keys,
  values,
  query,
  state,
  linearOutput,
  standardWeights,
  standardOutput
}) {
  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          CONNECT THE IDEAS
        </div>

        <h2>
          Can the State Stand In for the History?
        </h2>

        <p>
          Standard attention reads the previous key–value pairs
          directly. Kernelized linear attention first accumulates
          their contributions into a recurrent state, then reads
          that state with the query.
        </p>

      </div>


      <div className="token-card">

        {/* STANDARD ATTENTION */}

        <div className="token-header">

          <div className="token-title">
            Standard Attention · Read the History
          </div>

          <div className="live-badge">
            LIVE
          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            THE QUERY CAN ACCESS EACH PREVIOUS KV PAIR
          </div>

          <div className="flow">

            <div>

              <div className="state-title">
                KV HISTORY
              </div>

              <div className="history-stack">

                {keys.map((key, index) => (

                  <div
                    className="history-row"
                    key={index}
                  >

                    <span>
                      K{index + 1}
                    </span>

                    <Vector
                      data={key}
                    />

                    <span>
                      V{index + 1}
                    </span>

                    <Vector
                      data={values[index]}
                    />

                  </div>

                ))}

              </div>

            </div>


            <div className="flow-arrow">
              →
            </div>


            <Vector
              data={query}
              label="Query Q"
            />


            <div className="flow-arrow">
              →
            </div>


            <div className="output-box">

              <div className="state-title">
                ATTENTION WEIGHTS
              </div>

              <Vector
                data={standardWeights}
              />

              <div className="state-title">
                OUTPUT
              </div>

              <Vector
                data={standardOutput}
              />

            </div>

          </div>

        </div>


        {/* DIVIDER */}

        <div className="state-vs-history-divider">

          <span>
            SAME HISTORY
          </span>

        </div>


        {/* LINEAR ATTENTION */}

        <div className="token-header">

          <div className="token-title">
            Kernelized Linear Attention · Read the State
          </div>

          <div className="live-badge">
            LIVE
          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            THE HISTORY HAS ALREADY BEEN ACCUMULATED
          </div>

          <div className="flow">

            <div>

              <div className="state-title">
                KV HISTORY
              </div>

              <div className="history-compact">

                <span>
                  K₁,V₁
                </span>

                <span>
                  K₂,V₂
                </span>

                <span>
                  K₃,V₃
                </span>

              </div>

            </div>


            <div className="flow-arrow">
              →
            </div>


            <div>

              <div className="state-title">
                ACCUMULATE
              </div>

              <div className="accumulate-symbol">
                C₁ + C₂ + C₃
              </div>

            </div>


            <div className="flow-arrow">
              →
            </div>


            <Matrix
              data={state}
              label="State S₃"
            />


            <div className="flow-arrow">
              →
            </div>


            <Vector
              data={query}
              label="Query Q"
            />


            <div className="flow-arrow">
              →
            </div>


            <div className="output-box">

              <div className="state-title">
                OUTPUT
              </div>

              <Vector
                data={linearOutput}
              />

            </div>

          </div>

        </div>


        {/* OBSERVATION */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ?
          </div>

          <div>

            <div className="question-title">
              What changed?
            </div>

            <p>
              The query still asks about the same sequence.
              What changes is what the query has to access.
            </p>

          </div>

        </div>


        {/* COMPARISON */}

        <div className="state-vs-history-grid">

          <div className="state-vs-history-card">

            <div className="eyebrow">
              STANDARD ATTENTION
            </div>

            <h3>
              Query the history
            </h3>

            <p>
              The query interacts with the previous keys and
              uses their attention weights to combine the values.
            </p>

            <div className="mini-equation">
              Q + {"{K₁,K₂,K₃}"} → weights → output
            </div>

          </div>


          <div className="state-vs-history-card">

            <div className="eyebrow">
              LINEAR ATTENTION
            </div>

            <h3>
              Query the accumulated state
            </h3>

            <p>
              The key–value contributions have already been
              combined into the recurrent state before the query
              arrives.
            </p>

            <div className="mini-equation">
              Q + S₃ + z₃ → output
            </div>

          </div>

        </div>


        {/* CENTRAL CLAIM */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ✓
          </div>

          <div>

            <div className="question-title">
              The connection
            </div>

            <p>
              Once the history has been accumulated into the
              state, the query can read from that state instead
              of explicitly revisiting every stored key–value
              pair in this formulation.
            </p>

          </div>

        </div>


        {/* IMPORTANT CAVEAT */}

        <div className="recall-caveat">

          <strong>
            Important:
          </strong>

          <span>
            The two outputs do not have to be identical.
            Kernelized linear attention uses a different
            attention formulation from standard softmax attention.
            We are comparing the information-access pattern,
            not claiming that both mechanisms compute exactly
            the same function.
          </span>

        </div>

      </div>

    </section>
  );
}

export default StateVsHistory;