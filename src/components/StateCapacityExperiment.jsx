import { useMemo, useState } from "react";

import Matrix from "./Matrix";

import {
  processSequence
} from "../engine/linearAttention";

function StateCapacityExperiment() {
  const [selectedScenario, setSelectedScenario] =
    useState("reordered");

  const scenarios = useMemo(() => {
    const token1 = {
      key: [1, 0],
      value: [5, 2]
    };

    const token2 = {
      key: [0, 1],
      value: [3, 1]
    };

    const token3 = {
      key: [1, 1],
      value: [2, 4]
    };

    const historyA = [
      token1,
      token2,
      token3
    ];

    const historyB = [
      token3,
      token1,
      token2
    ];

    const resultA = processSequence(
      historyA.map((token) => token.key),
      historyA.map((token) => token.value)
    );

    const resultB = processSequence(
      historyB.map((token) => token.key),
      historyB.map((token) => token.value)
    );

    return {
      A: {
        tokens: historyA,
        result: resultA
      },
      B: {
        tokens: historyB,
        result: resultB
      }
    };
  }, []);

  const historyA = scenarios.A;
  const historyB = scenarios.B;

  const stateA = historyA.result.finalState;
  const stateB = historyB.result.finalState;

  const normalizationA =
    historyA.result.finalNormalization;

  const normalizationB =
    historyB.result.finalNormalization;

  const difference = stateA.map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      Math.abs(
        value -
        stateB[rowIndex][columnIndex]
      )
    )
  );

  const normalizationDifference =
    normalizationA.map((value, index) =>
      Math.abs(
        value -
        normalizationB[index]
      )
    );

  const totalStateDifference =
    difference.reduce(
      (sum, row) =>
        sum +
        row.reduce(
          (rowSum, value) => rowSum + value,
          0
        ),
      0
    );

  const totalNormalizationDifference =
    normalizationDifference.reduce(
      (sum, value) => sum + value,
      0
    );

  const statesMatch =
    totalStateDifference < 0.000001 &&
    totalNormalizationDifference < 0.000001;

  const reordered =
    selectedScenario === "reordered";

  const displayedHistoryB = reordered
    ? historyB
    : historyA;

  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          LIMITATION
        </div>

        <h2>
          Can a Fixed-Size State Remember Everything?
        </h2>

        <p>
          A fixed-dimensional state can represent a growing
          history, but the representation may discard information
          that the update rule does not explicitly preserve.
        </p>

      </div>


      <div className="token-card">

        <div className="token-header">

          <div className="token-title">
            State Capacity Experiment
          </div>

          <div className="live-badge">
            SYNTHETIC · LIVE
          </div>

        </div>


        <div className="state-vs-history-observation">

          <div className="question-mark">
            ?
          </div>

          <div>

            <div className="question-title">
              Can two different histories produce the same state?
            </div>

            <p>
              Our update rule adds each token's contribution to
              the state. What happens if we keep the same tokens
              but change their order?
            </p>

          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            CHOOSE A COMPARISON
          </div>

          <div className="length-controls">

            <button
              type="button"
              className={
                selectedScenario === "reordered"
                  ? "length-button active"
                  : "length-button"
              }
              onClick={() =>
                setSelectedScenario("reordered")
              }
            >
              Reordered history
            </button>

            <button
              type="button"
              className={
                selectedScenario === "same"
                  ? "length-button active"
                  : "length-button"
              }
              onClick={() =>
                setSelectedScenario("same")
              }
            >
              Identical history
            </button>

          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            HISTORY A
          </div>

          <div className="experiment-history">

            {historyA.tokens.map((token, index) => (

              <div
                className="experiment-token"
                key={index}
              >

                <span>
                  Token {index + 1}
                </span>

                <span>
                  K = [
                  {token.key[0].toFixed(1)},{" "}
                  {token.key[1].toFixed(1)}
                  ]
                </span>

                <span>
                  V = [
                  {token.value[0].toFixed(1)},{" "}
                  {token.value[1].toFixed(1)}
                  ]
                </span>

              </div>

            ))}

          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            HISTORY B
          </div>

          <div className="experiment-history">

            {displayedHistoryB.tokens.map(
              (token, index) => (

                <div
                  className="experiment-token"
                  key={index}
                >

                  <span>
                    Token {index + 1}
                  </span>

                  <span>
                    K = [
                    {token.key[0].toFixed(1)},{" "}
                    {token.key[1].toFixed(1)}
                    ]
                  </span>

                  <span>
                    V = [
                    {token.value[0].toFixed(1)},{" "}
                    {token.value[1].toFixed(1)}
                    ]
                  </span>

                </div>

              )
            )}

          </div>

        </div>


        <div className="state-vs-history-observation">

          <div className="question-mark">
            →
          </div>

          <div>

            <div className="question-title">
              Same ingredients. Different order.
            </div>

            <p>
              History B contains exactly the same key–value pairs
              as History A, but Token 3 appears first. Now compare
              the states produced by the recurrence.
            </p>

          </div>

        </div>


        <div className="state-vs-history-grid">

          <div className="state-vs-history-card">

            <div className="eyebrow">
              HISTORY A
            </div>

            <h3>
              Final state S₃
            </h3>

            <Matrix
              data={stateA}
            />

          </div>


          <div className="state-vs-history-card">

            <div className="eyebrow">
              HISTORY B
            </div>

            <h3>
              Final state S₃
            </h3>

            <Matrix
              data={stateB}
            />

          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            ABSOLUTE STATE DIFFERENCE
          </div>

          <div className="experiment-state">

            <Matrix
              data={difference}
            />

          </div>

          <div className="history-caption">
            Total state difference:
            {" "}
            {totalStateDifference.toFixed(2)}
          </div>

        </div>


        <div className="state-box">

          <div className="state-title">
            NORMALIZATION DIFFERENCE
          </div>

          <div className="experiment-state">

            <div className="vector">
              [
              {normalizationDifference.map(
                (value, index) => (
                  <span
                    className="vector-value"
                    key={index}
                  >
                    {value.toFixed(2)}
                    {index <
                      normalizationDifference.length - 1 &&
                      ", "}
                  </span>
                )
              )}
              ]
            </div>

          </div>

          <div className="history-caption">
            Total normalization difference:
            {" "}
            {totalNormalizationDifference.toFixed(2)}
          </div>

        </div>


        <div className="state-vs-history-observation">

          <div className="question-mark">
            {statesMatch ? "!" : "✓"}
          </div>

          <div>

            <div className="question-title">
              {statesMatch
                ? "The two histories collapsed to the same state."
                : "The states are different."}
            </div>

            <p>
              {statesMatch
                ? "The additive update does not depend on the order in which the contributions are added. The same set of contributions therefore produces the same final state and normalization."
                : "The selected histories produce different states."}
            </p>

          </div>

        </div>


        <div className="recall-caveat">

          <strong>
            This is a real limitation of our toy formulation:
          </strong>

          <span>
            Sₜ is formed by adding token contributions. Addition
            is commutative, so this state update by itself does not
            preserve the order of the accumulated key–value pairs.
            Two differently ordered histories can therefore map
            to the same final state.
          </span>

        </div>


        <div className="recall-caveat">

          <strong>
            Important qualification:
          </strong>

          <span>
            This does not mean every modern linear-attention
            architecture completely ignores order. Real systems
            can incorporate positional information, decay, gating,
            recurrence, or other mechanisms that change what the
            state preserves. The experiment isolates the behaviour
            of the simple additive update rule we are teaching.
          </span>

        </div>


        <div className="recall-caveat">

          <strong>
            The broader lesson:
          </strong>

          <span>
            A fixed-size recurrent state is a representation, not
            a magical lossless copy of the entire history. It can
            make sequential computation efficient, but what can be
            recovered later depends on the state dimensions and
            update mechanism.
          </span>

        </div>

      </div>

    </section>
  );
}

export default StateCapacityExperiment;
