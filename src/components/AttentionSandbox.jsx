import { useState } from "react";

import Matrix from "./Matrix";
import Vector from "./Vector";

import {
  featureMap,
  readState,
  standardAttention,
  processSequence
} from "../engine/linearAttention";

function AttentionSandbox() {
  const [keys, setKeys] = useState([
    [1, 0],
    [0, 1],
    [1, 1]
  ]);

  const [values, setValues] = useState([
    [5, 2],
    [3, 1],
    [2, 4]
  ]);

  const [query, setQuery] = useState([1, 0]);

  const result = processSequence(keys, values);

  const linearOutput = readState(
    result.finalState,
    result.finalNormalization,
    query
  );

  const standardResult = standardAttention(
    query,
    keys,
    values
  );

  function updateKey(tokenIndex, dimensionIndex, value) {
    const updatedKeys = keys.map((key, index) =>
      index === tokenIndex
        ? key.map((item, dimension) =>
            dimension === dimensionIndex
              ? Number(value)
              : item
          )
        : [...key]
    );

    setKeys(updatedKeys);
  }

  function updateValue(tokenIndex, dimensionIndex, value) {
    const updatedValues = values.map((currentValue, index) =>
      index === tokenIndex
        ? currentValue.map((item, dimension) =>
            dimension === dimensionIndex
              ? Number(value)
              : item
          )
        : [...currentValue]
    );

    setValues(updatedValues);
  }

  function updateQuery(dimensionIndex, value) {
    const updatedQuery = [...query];

    updatedQuery[dimensionIndex] = Number(value);

    setQuery(updatedQuery);
  }

  function resetSandbox() {
    setKeys([
      [1, 0],
      [0, 1],
      [1, 1]
    ]);

    setValues([
      [5, 2],
      [3, 1],
      [2, 4]
    ]);

    setQuery([1, 0]);
  }

  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          FREE EXPERIMENT
        </div>

        <h2>
          Sandbox: Break the Mechanism Yourself
        </h2>

        <p>
          You now know the update rule. Change the keys,
          values, or query and observe how information moves
          through the complete computation.
        </p>

      </div>


      <div className="token-card">

        <div className="token-header">

          <div className="token-title">
            Linear Attention Sandbox
          </div>

          <div className="live-badge">
            LIVE
          </div>

        </div>


        {/* ==================================================
            INSTRUCTIONS
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ?
          </div>

          <div>

            <div className="question-title">
              Try to predict what will change.
            </div>

            <p>
              Change one number at a time. Watch whether the
              change affects the feature map, contribution,
              recurrent state, query output, or attention weights.
            </p>

          </div>

        </div>


        {/* ==================================================
            TOKEN CONTROLS
        ================================================== */}

        {keys.map((key, tokenIndex) => (

          <div
            className="state-box"
            key={tokenIndex}
          >

            <div className="state-title">
              TOKEN {tokenIndex + 1}
            </div>

            <div className="controls">

              <div className="control-group">

                <label>
                  Key K{tokenIndex + 1}
                </label>

                <div className="input-row">

                  {key.map((value, dimensionIndex) => (

                    <input
                      key={dimensionIndex}
                      type="number"
                      step="0.1"
                      value={value}
                      onChange={(event) =>
                        updateKey(
                          tokenIndex,
                          dimensionIndex,
                          event.target.value
                        )
                      }
                    />

                  ))}

                </div>

              </div>


              <div className="control-group">

                <label>
                  Value V{tokenIndex + 1}
                </label>

                <div className="input-row">

                  {values[tokenIndex].map(
                    (value, dimensionIndex) => (

                      <input
                        key={dimensionIndex}
                        type="number"
                        step="0.1"
                        value={value}
                        onChange={(event) =>
                          updateValue(
                            tokenIndex,
                            dimensionIndex,
                            event.target.value
                          )
                        }
                      />

                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        ))}


        {/* ==================================================
            QUERY CONTROL
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            QUERY CONTROL
          </div>

          <div className="controls">

            <div className="control-group">

              <label>
                Query Q
              </label>

              <div className="input-row">

                {query.map((value, dimensionIndex) => (

                  <input
                    key={dimensionIndex}
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(event) =>
                      updateQuery(
                        dimensionIndex,
                        event.target.value
                      )
                    }
                  />

                ))}

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            FEATURE MAPS
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            FEATURE MAPS
          </div>

          <div className="flow">

            {keys.map((key, index) => (

              <Vector
                key={index}
                data={featureMap(key)}
                label={`φ(K${index + 1})`}
              />

            ))}

          </div>

        </div>


        {/* ==================================================
            CONTRIBUTIONS
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            TOKEN CONTRIBUTIONS
          </div>

          <div className="flow">

            {result.contributions.map(
              (contribution, index) => (

                <Matrix
                  key={index}
                  data={contribution}
                  label={`C${index + 1}`}
                />

              )
            )}

          </div>

        </div>


        {/* ==================================================
            RECURRENT STATES
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            RECURRENT STATES
          </div>

          <div className="flow">

            {result.states.map((state, index) => (

              <Matrix
                key={index}
                data={state}
                label={`S${index + 1}`}
              />

            ))}

          </div>

        </div>


        {/* ==================================================
            FINAL STATE
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            FINAL STATE READ
          </div>

          <div className="flow">

            <Vector
              data={query}
              label="Q"
            />

            <div className="flow-arrow">
              →
            </div>

            <Matrix
              data={result.finalState}
              label="S₃"
            />

            <div className="flow-arrow">
              →
            </div>

            <Vector
              data={linearOutput}
              label="Linear Output"
            />

          </div>

        </div>


        {/* ==================================================
            STANDARD ATTENTION COMPARISON
        ================================================== */}

        <div className="state-vs-history-grid">

          <div className="state-vs-history-card">

            <div className="eyebrow">
              LINEAR ATTENTION
            </div>

            <h3>
              Read the state
            </h3>

            <Vector
              data={linearOutput}
              label="Output"
            />

            <p>
              The query reads the accumulated recurrent state
              through the feature-map formulation.
            </p>

          </div>


          <div className="state-vs-history-card">

            <div className="eyebrow">
              STANDARD ATTENTION
            </div>

            <h3>
              Read the history
            </h3>

            <Vector
              data={standardResult.weights}
              label="Attention Weights"
            />

            <Vector
              data={standardResult.output}
              label="Output"
            />

            <p>
              The query produces a separate weight for each
              previous key and combines their values.
            </p>

          </div>

        </div>


        {/* ==================================================
            RESET
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ↺
          </div>

          <div>

            <div className="question-title">
              Want to start again?
            </div>

            <p>
              Reset the sandbox and try a different experiment.
            </p>

          </div>

        </div>

        <button
          type="button"
          className="check-button"
          onClick={resetSandbox}
        >
          Reset Sandbox
        </button>


        {/* ==================================================
            TEACHING NOTE
        ================================================== */}

        <div className="recall-caveat">

          <strong>
            Teaching model:
          </strong>

          <span>
            This sandbox uses a deliberately tiny 2-dimensional
            feature and value space so that every intermediate
            computation remains visible. Real linear-attention
            systems operate at much larger dimensions and may use
            additional mechanisms such as gating, positional
            information, normalization and different feature maps.
          </span>

        </div>

      </div>

    </section>
  );
}

export default AttentionSandbox;
