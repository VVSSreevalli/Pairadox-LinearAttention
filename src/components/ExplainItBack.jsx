import { useState } from "react";

function ExplainItBack() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const referenceAnswer =
    "In causal kernelized linear attention, each new key–value pair is transformed into a contribution and added to a fixed-dimensional recurrent state. A later query reads the accumulated state instead of explicitly carrying the entire key–value history through the recurrence.";

  const wordCount = answer
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  function handleSubmit() {
    if (answer.trim().length === 0) {
      return;
    }

    setSubmitted(true);
  }

  function resetAnswer() {
    setAnswer("");
    setSubmitted(false);
  }

  const textareaStyle = {
    width: "100%",
    minHeight: "190px",
    padding: "18px",
    border: "1px solid #d0d5dd",
    borderRadius: "12px",
    background: "#ffffff",
    color: "#101828",
    fontFamily: "inherit",
    fontSize: "15px",
    lineHeight: "1.7",
    resize: "vertical",
    outline: "none",
    display: "block"
  };

  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          FINAL LEARNING CHECK
        </div>

        <h2>
          Explain It Back
        </h2>

        <p>
          You have built the state, watched it change, tested
          what it preserves, and queried it. Now prove that you
          understand the idea without looking at the equations.
        </p>

      </div>


      <div
        className="token-card"
        style={{
          padding: "0",
          overflow: "hidden"
        }}
      >

        {/* =================================================
            CHALLENGE HEADER
            ================================================= */}

        <div
          style={{
            padding: "30px 32px",
            background: "#101828",
            color: "#ffffff"
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "22px",
              flexWrap: "wrap"
            }}
          >

            <div
              style={{
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#98a2b3"
              }}
            >
              YOUR FINAL CHALLENGE
            </div>

            <div
              style={{
                padding: "6px 10px",
                border: "1px solid #344054",
                borderRadius: "999px",
                fontSize: "10px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                color: "#ffffff"
              }}
            >
              LEARNING CHECK
            </div>

          </div>


          <h3
            style={{
              margin: "0",
              maxWidth: "720px",
              fontSize: "28px",
              lineHeight: "1.25",
              letterSpacing: "-0.025em",
              color: "#ffffff"
            }}
          >
            Where did the past go?
          </h3>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "720px",
              fontSize: "14px",
              lineHeight: "1.7",
              color: "#c7ccd3"
            }}
          >
            Imagine another student asks you how linear attention
            can process a growing history without carrying every
            previous key–value pair into the next computation.
          </p>

        </div>


        {/* =================================================
            QUESTION
            ================================================= */}

        <div
          style={{
            padding: "30px 32px 0"
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "18px"
            }}
          >

            <div
              style={{
                flexShrink: "0",
                width: "42px",
                height: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "#f2f4f7",
                border: "1px solid #d0d5dd",
                fontSize: "18px",
                fontWeight: "800",
                color: "#101828"
              }}
            >
              ?
            </div>


            <div>

              <div
                style={{
                  marginBottom: "8px",
                  fontSize: "17px",
                  fontWeight: "750",
                  color: "#101828"
                }}
              >
                Explain the mechanism in your own words.
              </div>

              <p
                style={{
                  margin: "0",
                  maxWidth: "700px",
                  fontSize: "13px",
                  lineHeight: "1.65",
                  color: "#667085"
                }}
              >
                Focus on what happens to each new key–value pair,
                what the recurrent state represents, and how a
                later query obtains an output from it.
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            ANSWER AREA
            ================================================= */}

        <div
          style={{
            margin: "26px 32px 0",
            padding: "22px",
            border: "1px solid #eaecf0",
            borderRadius: "14px",
            background: "#f8fafc"
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "12px"
            }}
          >

            <div
              style={{
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#475467"
              }}
            >
              YOUR EXPLANATION
            </div>

            <div
              style={{
                fontSize: "11px",
                fontFamily:
                  '"SFMono-Regular", Consolas, monospace',
                color: "#667085"
              }}
            >
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>

          </div>


          <textarea
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setSubmitted(false);
            }}
            placeholder="Start explaining... What happens to the key–value pairs?"
            rows={7}
            style={textareaStyle}
            onFocus={(event) => {
              event.currentTarget.style.borderColor = "#98a2b3";
              event.currentTarget.style.boxShadow =
                "0 0 0 3px rgba(152, 162, 179, 0.15)";
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor = "#d0d5dd";
              event.currentTarget.style.boxShadow = "none";
            }}
          />


          <div
            style={{
              marginTop: "10px",
              fontSize: "11px",
              color: "#98a2b3"
            }}
          >
            Tip: You do not need to reproduce the equations.
            Explain the idea as if you were teaching it.
          </div>

        </div>


        {/* =================================================
            ACTION
            ================================================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "24px 32px 30px"
          }}
        >

          <button
            type="button"
            className="check-button"
            onClick={handleSubmit}
            disabled={answer.trim().length === 0}
            style={{
              margin: "0",
              opacity: answer.trim().length === 0 ? 0.55 : 1
            }}
          >
            Check My Explanation
          </button>

        </div>


        {/* =================================================
            REFERENCE ANSWER
            ================================================= */}

        {submitted && (

          <div
            style={{
              margin: "0 32px 32px",
              padding: "24px",
              border: "1px solid #a6f4c5",
              borderRadius: "14px",
              background: "#ecfdf3"
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px"
              }}
            >

              <div
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  background: "#ffffff",
                  border: "1px solid #a6f4c5",
                  color: "#027a48",
                  fontWeight: "800"
                }}
              >
                ✓
              </div>

              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#027a48"
                }}
              >
                REFERENCE EXPLANATION
              </div>

            </div>


            <p
              style={{
                margin: "0",
                color: "#344054",
                fontSize: "14px",
                lineHeight: "1.75"
              }}
            >
              {referenceAnswer}
            </p>


            <div
              style={{
                marginTop: "18px",
                paddingTop: "18px",
                borderTop: "1px solid #b7ebc9",
                fontSize: "12px",
                lineHeight: "1.65",
                color: "#475467"
              }}
            >

              <strong
                style={{
                  color: "#344054"
                }}
              >
                Compare, don't memorise.
              </strong>

              {" "}
              Your answer does not need to use the same words.
              Look for the essential ideas: each token creates a
              contribution, contributions accumulate into a
              fixed-dimensional state, and a later query reads
              that accumulated representation.

            </div>

          </div>

        )}


        {/* =================================================
            WHAT A STRONG ANSWER CONTAINS
            ================================================= */}

        <div
          style={{
            margin: submitted ? "0 32px 26px" : "0 32px 32px",
            padding: "22px",
            border: "1px solid #eaecf0",
            borderRadius: "14px",
            background: "#f8fafc"
          }}
        >

          <div
            style={{
              marginBottom: "14px",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#475467"
            }}
          >
            A STRONG EXPLANATION SHOULD CONTAIN
          </div>


          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "10px"
            }}
          >

            {[
              "New key–value pairs create contributions.",
              "Contributions are accumulated into the state.",
              "The state shape stays fixed for fixed dimensions.",
              "A later query reads the accumulated state.",
              "Linear attention is not standard softmax attention."
            ].map((item, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "12px",
                  border: "1px solid #eaecf0",
                  borderRadius: "9px",
                  background: "#ffffff"
                }}
              >

                <span
                  style={{
                    flexShrink: "0",
                    width: "22px",
                    height: "22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: "#f2f4f7",
                    color: "#475467",
                    fontSize: "10px",
                    fontWeight: "800"
                  }}
                >
                  {index + 1}
                </span>

                <span
                  style={{
                    fontSize: "12px",
                    lineHeight: "1.5",
                    color: "#475467"
                  }}
                >
                  {item}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* =================================================
            TRY AGAIN
            ================================================= */}

        {submitted && (

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "30px"
            }}
          >

            <button
              type="button"
              className="check-button"
              onClick={resetAnswer}
              style={{
                margin: "0"
              }}
            >
              Try Again
            </button>

          </div>

        )}

      </div>

    </section>
  );
}

export default ExplainItBack;