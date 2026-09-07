import { useState } from "react";

import Matrix from "./components/Matrix";
import Vector from "./components/Vector";
import StateUpdate from "./components/StateUpdate";
import PredictionChallenge from "./components/PredictionChallenge";
import ProblemSection from "./components/ProblemSection";
import ChangeExplanation from "./components/ChangeExplanation";
import StateVsHistory from "./components/StateVsHistory";
import StateScalingExperiment from "./components/StateScalingExperiment";
import StateCapacityExperiment from "./components/StateCapacityExperiment";
import BDHConnection from "./components/BDHConnection";
import AttentionSandbox from "./components/AttentionSandbox";
import ExplainItBack from "./components/ExplainItBack";
import ResearchSources from "./components/ResearchSources";

import {
  featureMap,
  readState,
  standardAttention,
  processSequence
} from "./engine/linearAttention";

function App() {
  const [key1, setKey1] = useState([1, 0]);
  const [value1, setValue1] = useState([5, 2]);

  const key2 = [0, 1];
  const key3 = [1, 1];

  const value2 = [3, 1];
  const value3 = [2, 4];

  const query = [1, 0];

  const keys = [key1, key2, key3];
  const values = [value1, value2, value3];

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

  function handleKey1Change(index, value) {
    const updatedKey = [...key1];

    updatedKey[index] = Number(value);

    setKey1(updatedKey);
  }

  function handleValue1Change(index, value) {
    const updatedValue = [...value1];

    updatedValue[index] = Number(value);

    setValue1(updatedValue);
  }

  return (
    <div className="app">

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="hero">

        <div className="eyebrow">
          PAIRADOX · LINEAR ATTENTION LABORATORY
        </div>

        <h1>
          Where Did the Past Go?
        </h1>

        <p>
          Change Token 1 and watch how its information
          is accumulated into a recurrent state in real time.
        </p>

      </section>


      {/* ==================================================
          PROBLEM
      ================================================== */}

      <ProblemSection />


      {/* ==================================================
          TOKEN 1 CONTROLS
      ================================================== */}

      <section className="section">

        <div className="section-header">

          <h2>
            Interactive Token 1
          </h2>

          <p>
            Change the key or value and observe how the
            entire recurrent state changes.
          </p>

        </div>

        <div className="token-card">

          <div className="token-header">

            <div className="token-title">
              Token 1 Controls
            </div>

            <div className="live-badge">
              LIVE
            </div>

          </div>

          <div className="controls">

            <div className="control-group">

              <label>
                Key K₁
              </label>

              <div className="input-row">

                {key1.map((value, index) => (

                  <input
                    key={index}
                    type="number"
                    value={value}
                    onChange={(event) =>
                      handleKey1Change(
                        index,
                        event.target.value
                      )
                    }
                  />

                ))}

              </div>

            </div>


            <div className="control-group">

              <label>
                Value V₁
              </label>

              <div className="input-row">

                {value1.map((value, index) => (

                  <input
                    key={index}
                    type="number"
                    value={value}
                    onChange={(event) =>
                      handleValue1Change(
                        index,
                        event.target.value
                      )
                    }
                  />

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          TOKEN 1
      ================================================== */}

      <section className="section">

        <div className="section-header">

          <h2>
            Token 1
          </h2>

          <p>
            The first token writes its contribution into
            the recurrent state.
          </p>

        </div>

        <div className="token-card">

          <div className="token-header">

            <div className="token-title">
              Input
            </div>

            <div className="live-badge">
              LIVE
            </div>

          </div>


          <div className="flow">

            <Vector
              data={key1}
              label="K₁"
            />

            <div className="flow-arrow">
              →
            </div>

            <Vector
              data={value1}
              label="V₁"
            />

          </div>


          <div className="state-box">

            <div className="state-title">
              FEATURE MAP
            </div>

            <Vector
              data={featureMap(key1)}
              label="φ(K₁)"
            />

          </div>


          <div className="state-box">

            <div className="state-title">
              CONTRIBUTION
            </div>

            <Matrix
              data={result.contributions[0]}
              label="φ(K₁)V₁ᵀ"
            />

          </div>


          <StateUpdate
            previousState={[
              [0, 0],
              [0, 0]
            ]}
            contribution={result.contributions[0]}
            newState={result.states[0]}
            step={1}
          />


          <ChangeExplanation
            key1={key1}
            value1={value1}
            feature={featureMap(key1)}
            contribution={result.contributions[0]}
            state={result.states[0]}
          />


          <div className="state-box">

            <div className="state-title">
              NORMALISATION STATE
            </div>

            <Vector
              data={result.normalizations[0]}
              label="z₁"
            />

          </div>

        </div>

      </section>


      {/* ==================================================
          TOKEN 2
      ================================================== */}

      <section className="section">

        <div className="section-header">

          <h2>
            Token 2
          </h2>

          <p>
            The second token adds another contribution
            to the state created by Token 1.
          </p>

        </div>

        <div className="token-card">

          <div className="token-header">

            <div className="token-title">
              Token 2
            </div>

            <div className="live-badge">
              LIVE
            </div>

          </div>


          <div className="flow">

            <Vector
              data={key2}
              label="K₂"
            />

            <Vector
              data={value2}
              label="V₂"
            />

            <Vector
              data={featureMap(key2)}
              label="φ(K₂)"
            />

          </div>


          <div className="state-box">

            <div className="state-title">
              CONTRIBUTION
            </div>

            <Matrix
              data={result.contributions[1]}
              label="φ(K₂)V₂ᵀ"
            />

          </div>


          <StateUpdate
            previousState={result.states[0]}
            contribution={result.contributions[1]}
            newState={result.states[1]}
            step={2}
          />


          <div className="state-box">

            <div className="state-title">
              NORMALISATION STATE
            </div>

            <Vector
              data={result.normalizations[1]}
              label="z₂"
            />

          </div>

        </div>

      </section>


      {/* ==================================================
          TOKEN 3
      ================================================== */}

      <section className="section">

        <div className="section-header">

          <h2>
            Token 3
          </h2>

          <p>
            The same update continues as more tokens arrive.
          </p>

        </div>

        <div className="token-card">

          <div className="token-header">

            <div className="token-title">
              Token 3
            </div>

            <div className="live-badge">
              LIVE
            </div>

          </div>


          <div className="flow">

            <Vector
              data={key3}
              label="K₃"
            />

            <Vector
              data={value3}
              label="V₃"
            />

            <Vector
              data={featureMap(key3)}
              label="φ(K₃)"
            />

          </div>


          <div className="state-box">

            <div className="state-title">
              CONTRIBUTION
            </div>

            <Matrix
              data={result.contributions[2]}
              label="φ(K₃)V₃ᵀ"
            />

          </div>


          <StateUpdate
            previousState={result.states[1]}
            contribution={result.contributions[2]}
            newState={result.states[2]}
            step={3}
          />


          <div className="state-box">

            <div className="state-title">
              FINAL NORMALISATION STATE
            </div>

            <Vector
              data={result.normalizations[2]}
              label="z₃"
            />

          </div>

        </div>

      </section>


      {/* ==================================================
          PREDICTION CHALLENGE
      ================================================== */}

      <PredictionChallenge
        previousState={result.states[1]}
        contribution={result.contributions[2]}
        actualState={result.finalState}
      />


      {/* ==================================================
          ASK THE STATE
      ================================================== */}

      <section className="section">

        <div className="section-header">

          <h2>
            Ask the State
          </h2>

          <p>
            Now that you have predicted the state, use a query
            to read information from it.
          </p>

        </div>

        <div className="token-card">

          <div className="token-header">

            <div className="token-title">
              Query Read
            </div>

            <div className="live-badge">
              LIVE
            </div>

          </div>


          <div className="flow">

            <Vector
              data={query}
              label="Query Q"
            />

            <div className="flow-arrow">
              →
            </div>

            <Matrix
              data={result.finalState}
              label="Final State S₃"
            />

            <div className="flow-arrow">
              →
            </div>


            <div className="output-box">

              <div className="state-title">
                LINEAR ATTENTION OUTPUT
              </div>

              <Vector
                data={linearOutput}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          STANDARD ATTENTION
      ================================================== */}

      <section className="section">

        <div className="section-header">

          <h2>
            Standard Attention
          </h2>

          <p>
            For comparison, standard softmax attention
            assigns a weight to each previous token.
          </p>

        </div>

        <div className="token-card">

          <div className="state-box">

            <div className="state-title">
              ATTENTION WEIGHTS
            </div>

            <Vector
              data={standardResult.weights}
              label="[w₁, w₂, w₃]"
            />

          </div>


          <div className="output-box">

            <div className="state-title">
              STANDARD ATTENTION OUTPUT
            </div>

            <Vector
              data={standardResult.output}
            />

          </div>

        </div>

      </section>


      {/* ==================================================
          STATE VS HISTORY
      ================================================== */}

      <StateVsHistory
        keys={keys}
        values={values}
        query={query}
        state={result.finalState}
        linearOutput={linearOutput}
        standardWeights={standardResult.weights}
        standardOutput={standardResult.output}
      />


      {/* ==================================================
          STATE SCALING EXPERIMENT
      ================================================== */}

      <StateScalingExperiment />


      {/* ==================================================
          STATE CAPACITY / LIMITATION
      ================================================== */}

      <StateCapacityExperiment />


      {/* ==================================================
          BDH CONNECTION
      ================================================== */}

      <BDHConnection />


      {/* ==================================================
          FREE SANDBOX
      ================================================== */}

      <AttentionSandbox />


      {/* ==================================================
          EXPLAIN IT BACK
      ================================================== */}

      <ExplainItBack />


      {/* ==================================================
          RESEARCH & SOURCES
      ================================================== */}

      <ResearchSources />


      {/* ==================================================
          CORE IDEA
      ================================================== */}

      <section className="section">

        <div className="token-card">

          <div className="eyebrow">
            CORE IDEA
          </div>

          <h2>
            The past hasn't disappeared.
          </h2>

          <p>
            Each token contributes a small update to the
            recurrent state. The state accumulates information
            from the sequence, allowing a later query to read
            from that fixed-size state.
          </p>

          <p>
            In other words:
          </p>


          <div className="state-box">

            <div className="state-title">
              THE RECURRENT UPDATE
            </div>

            <div className="flow">

              <Matrix
                data={result.states[1]}
                label="Previous State S₂"
              />

              <div className="flow-arrow">
                +
              </div>

              <Matrix
                data={result.contributions[2]}
                label="New Contribution C₃"
              />

              <div className="flow-arrow">
                →
              </div>

              <Matrix
                data={result.finalState}
                label="Accumulated State S₃"
              />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default App;