import { useMemo, useState } from "react";

import Matrix from "./Matrix";

import {
  processSequence
} from "../engine/linearAttention";

function StateScalingExperiment() {
  const sequenceLengths = [3, 5, 10, 20, 50];

  const [selectedLength, setSelectedLength] = useState(3);

  const experiment = useMemo(() => {
    const keys = [];
    const values = [];

    for (let i = 0; i < selectedLength; i++) {
      const key = [
        Math.sin(i * 0.73),
        Math.cos(i * 0.51)
      ];

      const value = [
        2 + Math.sin(i * 0.37),
        2 + Math.cos(i * 0.43)
      ];

      keys.push(key);
      values.push(value);
    }

    const result = processSequence(keys, values);

    return {
      keys,
      values,
      result
    };
  }, [selectedLength]);

  const stateElements =
    experiment.result.finalState.length *
    experiment.result.finalState[0].length;

  const historyElements = selectedLength * 4;

  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          TEST THE CLAIM
        </div>

        <h2>
          Does the State Grow With the History?
        </h2>

        <p>
          We have seen that the history can be accumulated into
          a recurrent state. Now increase the sequence length and
          watch what happens to the size of that state.
        </p>

      </div>


      <div className="token-card">

        <div className="token-header">

          <div className="token-title">
            Sequence Length Experiment
          </div>

          <div className="live-badge">
            SYNTHETIC · LIVE
          </div>

        </div>


        {/* ==================================================
            EXPLANATION
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ?
          </div>

          <div>

            <div className="question-title">
              Your prediction
            </div>

            <p>
              If more tokens arrive, do we need a larger recurrent
              state to store them?
            </p>

          </div>

        </div>


        {/* ==================================================
            LENGTH CONTROLS
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            CHOOSE SEQUENCE LENGTH
          </div>

          <div className="length-controls">

            {sequenceLengths.map((length) => (

              <button
                key={length}
                type="button"
                className={
                  selectedLength === length
                    ? "length-button active"
                    : "length-button"
                }
                onClick={() =>
                  setSelectedLength(length)
                }
              >
                {length} tokens
              </button>

            ))}

          </div>

        </div>


        {/* ==================================================
            CURRENT SEQUENCE
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            CURRENT HISTORY
          </div>

          <div className="experiment-history">

            {experiment.keys.map((key, index) => (

              <div
                className="experiment-token"
                key={index}
              >

                <span>
                  K{index + 1}
                </span>

                <span>
                  V{index + 1}
                </span>

              </div>

            ))}

          </div>

          <div className="history-caption">
            {selectedLength} key–value pairs are now part of the
            sequence history.
          </div>

        </div>


        {/* ==================================================
            STATE
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            ACCUMULATED RECURRENT STATE
          </div>

          <div className="experiment-state">

            <Matrix
              data={experiment.result.finalState}
              label={`S${selectedLength}`}
            />

          </div>

          <div className="history-caption">
            The state remains a {experiment.result.finalState.length}
            × {experiment.result.finalState[0].length} matrix.
          </div>

        </div>


        {/* ==================================================
            SIZE COMPARISON
        ================================================== */}

        <div className="state-vs-history-grid">

          <div className="state-vs-history-card">

            <div className="eyebrow">
              HISTORY
            </div>

            <h3>
              {historyElements} values
            </h3>

            <p>
              Each token contributes its own key and value.
              As the sequence grows, the explicit KV history
              grows with it.
            </p>

          </div>


          <div className="state-vs-history-card">

            <div className="eyebrow">
              RECURRENT STATE
            </div>

            <h3>
              {stateElements} values
            </h3>

            <p>
              The state dimensions stay fixed because they depend
              on the feature and value dimensions, not on the
              number of tokens processed so far.
            </p>

          </div>

        </div>


        {/* ==================================================
            RESULT
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ✓
          </div>

          <div>

            <div className="question-title">
              What did you observe?
            </div>

            <p>
              At {selectedLength} tokens, the explicit history has
              {` ${historyElements} `}
              scalar values in this toy setup, while the recurrent
              state still has only {stateElements} values.
            </p>

            <p>
              Try 3, 5, 10, 20 and 50 tokens. The sequence gets
              longer, but the state representation stays the same
              size.
            </p>

          </div>

        </div>


        {/* ==================================================
            CENTRAL IDEA
        ================================================== */}

        <div className="recall-caveat">

          <strong>
            What this demonstrates:
          </strong>

          <span>
            For fixed feature and value dimensions, the recurrent
            state has a fixed shape with respect to sequence length.
            More tokens change the numbers stored inside the state,
            not the number of state cells.
          </span>

        </div>


        {/* ==================================================
            IMPORTANT CAVEAT
        ================================================== */}

        <div className="recall-caveat">

          <strong>
            Important limitation:
          </strong>

          <span>
            A fixed-size state does not mean unlimited information
            can be preserved perfectly. Different histories can
            map to similar or identical state representations.
            That capacity–recall tradeoff is the next thing we need
            to investigate.
          </span>

        </div>

      </div>

    </section>
  );
}

export default StateScalingExperiment;