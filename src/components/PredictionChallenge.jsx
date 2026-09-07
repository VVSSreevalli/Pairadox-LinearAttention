import { useState } from "react";

import Matrix from "./Matrix";

function PredictionChallenge({
  previousState,
  contribution,
  actualState
}) {
  const [prediction, setPrediction] = useState([
    "",
    "",
    "",
    ""
  ]);

  const [checked, setChecked] = useState(false);

  function handleChange(index, value) {
    const updatedPrediction = [...prediction];

    updatedPrediction[index] = value;

    setPrediction(updatedPrediction);
    setChecked(false);
  }

  function handleCheck() {
    setChecked(true);
  }

  const predictedMatrix = [
    [
      Number(prediction[0]) || 0,
      Number(prediction[1]) || 0
    ],
    [
      Number(prediction[2]) || 0,
      Number(prediction[3]) || 0
    ]
  ];

  const differences = predictedMatrix.map((row, rowIndex) =>
    row.map((value, columnIndex) =>
      Math.abs(
        value - actualState[rowIndex][columnIndex]
      )
    )
  );

  const isCorrect =
    prediction.every((value) => value !== "") &&
    differences.every((row) =>
      row.every((value) => value < 0.01)
    );

  return (
    <section className="section">

      {/* ==================================================
          SECTION HEADER
      ================================================== */}

      <div className="section-header">

        <div className="eyebrow">
          PREDICT BEFORE YOU REVEAL
        </div>

        <h2>
          Can You Predict the Next State?
        </h2>

        <p>
          You have seen how the recurrent state is updated.
          Now use that rule to predict what happens next.
        </p>

      </div>


      {/* ==================================================
          CHALLENGE CARD
      ================================================== */}

      <div className="prediction-card">

        <div className="prediction-header">

          <div>
            <div className="prediction-title">
              Prediction Challenge
            </div>

            <div className="prediction-subtitle">
              Compute S₃ = S₂ + Contribution₃
            </div>
          </div>

          <div className="live-badge">
            LIVE
          </div>

        </div>


        {/* ==================================================
            EQUATION
        ================================================== */}

        <div className="prediction-equation">

          <Matrix
            data={previousState}
            label="S₂"
          />

          <div className="operator">
            +
          </div>

          <Matrix
            data={contribution}
            label="Contribution₃"
          />

          <div className="operator">
            =
          </div>

          <div className="prediction-question">
            ?
          </div>

        </div>


        {/* ==================================================
            INSTRUCTION
        ================================================== */}

        <div className="prediction-instruction">

          <strong>
            Your task
          </strong>

          <p>
            Add the corresponding cells of S₂ and
            Contribution₃. Enter all four values below.
          </p>

        </div>


        {/* ==================================================
            INPUT
        ================================================== */}

        <div className="prediction-input-section">

          <div className="prediction-input-title">
            Your prediction for S₃
          </div>

          <div className="prediction-input-grid">

            {prediction.map((value, index) => (

              <input
                key={index}
                type="number"
                step="0.01"
                value={value}
                placeholder="?"
                onChange={(event) =>
                  handleChange(
                    index,
                    event.target.value
                  )
                }
              />

            ))}

          </div>

        </div>


        {/* ==================================================
            CHECK BUTTON
        ================================================== */}

        <button
          type="button"
          className="check-button"
          onClick={handleCheck}
        >
          Check Prediction
        </button>


        {/* ==================================================
            RESULT — ONLY AFTER CHECK
        ================================================== */}

        {checked && (

          <div className="prediction-result">

            <div className="result-header">

              {isCorrect
                ? "✓ Correct prediction!"
                : "Not quite — let's compare the matrices."
              }

            </div>


            <div className="result-grid">

              <Matrix
                data={predictedMatrix}
                label="Your Prediction"
              />

              <div className="result-arrow">
                →
              </div>

              <Matrix
                data={actualState}
                label="Actual S₃"
              />

              <div className="result-arrow">
                →
              </div>

              <Matrix
                data={differences}
                label="Absolute Difference"
              />

            </div>


            {/* ==================================================
                EXPLANATION
            ================================================== */}

            <div className="result-explanation">

              {isCorrect ? (

                <p>
                  You correctly applied the recurrent update:
                  <strong>
                    {" "}S₂ + Contribution₃ = S₃.
                  </strong>
                </p>

              ) : (

                <p>
                  The update happens element-by-element.
                  For each cell, add the corresponding value
                  from S₂ and Contribution₃.
                </p>

              )}

            </div>


            {/* ==================================================
                REVEALED RULE
            ================================================== */}

            <div className="prediction-reveal">

              <div className="state-title">
                THE RULE YOU JUST USED
              </div>

              <div className="reveal-equation">
                S₃ = S₂ + φ(K₃)V₃ᵀ
              </div>

              <p>
                The new token does not replace the previous
                state. It adds another contribution to it.
              </p>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}

export default PredictionChallenge;
