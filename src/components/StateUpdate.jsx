import Matrix from "./Matrix";

function StateUpdate({
  previousState,
  contribution,
  newState,
  step
}) {
  return (
    <div className="state-update">

      <div className="state-update-header">
        <span>STATE UPDATE</span>
        <span className="step-badge">
          STEP {step}
        </span>
      </div>

      <div className="state-equation">

        <Matrix
          data={previousState}
          label={step === 1 ? "S₀" : `S${step - 1}`}
        />

        <div className="operator">
          +
        </div>

        <Matrix
          data={contribution}
          label={`Contribution ${step}`}
        />

        <div className="operator">
          =
        </div>

        <Matrix
          data={newState}
          label={`S${step}`}
        />

      </div>

      <div className="state-explanation">
        Previous state + this token's contribution = new state
      </div>

    </div>
  );
}

export default StateUpdate;