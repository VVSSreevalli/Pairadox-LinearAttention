// Linear Attention Mathematical Engine

// φ(x) = ELU(x) + 1
export function featureMap(vector) {
  return vector.map((x) =>
    x > 0 ? x + 1 : Math.exp(x)
  );
}

// Outer product: a × bᵀ
export function outerProduct(a, b) {
  return a.map((aValue) =>
    b.map((bValue) => aValue * bValue)
  );
}

// Sₜ = Sₜ₋₁ + φ(kₜ)vₜᵀ
export function updateState(previousState, key, value) {
  const contribution = outerProduct(
    featureMap(key),
    value
  );

  return previousState.map((row, i) =>
    row.map((cell, j) =>
      cell + contribution[i][j]
    )
  );
}

// zₜ = zₜ₋₁ + φ(kₜ)
export function updateNormalization(previousZ, key) {
  const mappedKey = featureMap(key);

  return previousZ.map(
    (value, i) => value + mappedKey[i]
  );
}

// Read the accumulated state using the query
// oₜ = (φ(qₜ)ᵀ Sₜ) / (φ(qₜ)ᵀ zₜ)
export function readState(state, normalization, query) {
  const mappedQuery = featureMap(query);

  // Numerator: φ(q)ᵀ S
  const numerator = state[0].map((_, column) =>
    mappedQuery.reduce(
      (sum, queryValue, row) =>
        sum + queryValue * state[row][column],
      0
    )
  );

  // Denominator: φ(q)ᵀ z
  const denominator = mappedQuery.reduce(
    (sum, queryValue, i) =>
      sum + queryValue * normalization[i],
    0
  );

  // Normalised output
  return numerator.map(
    (value) => value / denominator
  );
}

// Standard causal softmax attention
export function standardAttention(query, keys, values) {
  const dimension = query.length;

  // 1. Compute q · k for every key
  const scores = keys.map((key) =>
    query.reduce(
      (sum, queryValue, i) =>
        sum + queryValue * key[i],
      0
    ) / Math.sqrt(dimension)
  );

  // 2. Softmax
  const maxScore = Math.max(...scores);

  const exponentials = scores.map(
    (score) => Math.exp(score - maxScore)
  );

  const sumExp = exponentials.reduce(
    (sum, value) => sum + value,
    0
  );

  const weights = exponentials.map(
    (value) => value / sumExp
  );

  // 3. Weighted sum of values
  const output = values[0].map((_, dimensionIndex) =>
    values.reduce(
      (sum, value, tokenIndex) =>
        sum +
        weights[tokenIndex] *
        value[dimensionIndex],
      0
    )
  );

  return {
    scores,
    weights,
    output
  };
}

// Process an entire causal sequence
export function processSequence(keys, values) {
  let state = Array.from(
    { length: keys[0].length },
    () => Array(values[0].length).fill(0)
  );

  let normalization = Array(
    keys[0].length
  ).fill(0);

  const states = [];
  const normalizations = [];
  const contributions = [];

  keys.forEach((key, index) => {
    const mappedKey = featureMap(key);

    const contribution = outerProduct(
      mappedKey,
      values[index]
    );

    state = updateState(
      state,
      key,
      values[index]
    );

    normalization = updateNormalization(
      normalization,
      key
    );

    contributions.push(contribution);
    states.push(state.map((row) => [...row]));
    normalizations.push([...normalization]);
  });

  return {
    finalState: state,
    finalNormalization: normalization,
    states,
    normalizations,
    contributions
  };
}