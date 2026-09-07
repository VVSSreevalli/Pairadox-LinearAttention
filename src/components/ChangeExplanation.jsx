import { featureMap } from "../engine/linearAttention";

function ChangeExplanation({
  key1,
  value1,
  feature,
  contribution,
  state
}) {
  const defaultKey = [1, 0];
  const defaultValue = [5, 2];

  const defaultFeature = featureMap(defaultKey);

  const keyChanged =
    key1.some((value, index) => value !== defaultKey[index]);

  const valueChanged =
    value1.some((value, index) => value !== defaultValue[index]);

  const contributionChanged =
    contribution.some((row, rowIndex) =>
      row.some(
        (value, columnIndex) =>
          value !==
          defaultFeature[rowIndex] *
            defaultValue[columnIndex]
      )
    );

  let message;

  if (!keyChanged && !valueChanged) {
    message =
      "Try changing K₁ or V₁. The effect will propagate through the entire computation.";
  } else if (keyChanged && valueChanged) {
    message =
      "Both the key and value changed. The feature map depends on K₁, while the contribution combines the mapped key with V₁.";
  } else if (keyChanged) {
    message =
      "You changed K₁. That changes φ(K₁), which changes the contribution written into the recurrent state.";
  } else if (valueChanged) {
    message =
      "You changed V₁. The feature map stays the same, but the contribution matrix changes, so S₁ changes.";
  }

  return (
    <div className="change-explanation">

      <div className="change-explanation-header">
        <div className="eyebrow">
          TRACE THE CHANGE
        </div>

        <div className="live-badge">
          LIVE
        </div>
      </div>

      <h3>
        What happened?
      </h3>

      <p>
        {message}
      </p>

      <div className="change-chain">

        <div className="change-step">
          <span className="change-step-label">
            INPUT
          </span>

          <strong>
            K₁, V₁
          </strong>

          <small>
            {keyChanged || valueChanged
              ? "Changed"
              : "Original"}
          </small>
        </div>

        <div className="change-arrow">
          →
        </div>

        <div className="change-step">
          <span className="change-step-label">
            FEATURE
          </span>

          <strong>
            φ(K₁)
          </strong>

          <small>
            {keyChanged ? "Updated" : "Unchanged"}
          </small>
        </div>

        <div className="change-arrow">
          →
        </div>

        <div className="change-step">
          <span className="change-step-label">
            CONTRIBUTION
          </span>

          <strong>
            C₁
          </strong>

          <small>
            {contributionChanged ? "Updated" : "Unchanged"}
          </small>
        </div>

        <div className="change-arrow">
          →
        </div>

        <div className="change-step">
          <span className="change-step-label">
            STATE
          </span>

          <strong>
            S₁
          </strong>

          <small>
            {keyChanged || valueChanged
              ? "Updated"
              : "Original"}
          </small>
        </div>

      </div>

      <div className="change-equation">
        <span>
          S₁
        </span>

        <span>
          =
        </span>

        <span>
          φ(K₁)V₁ᵀ
        </span>
      </div>

      <div className="change-note">
        The important idea: changing one token changes the
        information written into the recurrent state.
      </div>

    </div>
  );
}

export default ChangeExplanation;
