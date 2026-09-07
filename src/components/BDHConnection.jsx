function BDHConnection() {
  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          FROM LINEAR ATTENTION TO BDH
        </div>

        <h2>
          What Else Can a Recurrent State Do?
        </h2>

        <p>
          We started with a simple question: can a model process
          a growing sequence without repeatedly carrying the
          entire history into every new computation?
        </p>

      </div>


      <div className="token-card">

        <div className="token-header">

          <div className="token-title">
            The Same Design Pressure
          </div>

          <div className="live-badge">
            RESEARCH CONNECTION
          </div>

        </div>


        {/* ==================================================
            LINEAR ATTENTION
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            WHAT WE JUST BUILT
          </div>

          <div className="flow">

            <div className="idea-step">

              <span>
                1
              </span>

              <strong>
                Receive Kₜ, Vₜ
              </strong>

              <small>
                New token
              </small>

            </div>

            <div className="idea-arrow">
              →
            </div>

            <div className="idea-step">

              <span>
                2
              </span>

              <strong>
                Update Sₜ
              </strong>

              <small>
                Accumulate
              </small>

            </div>

            <div className="idea-arrow">
              →
            </div>

            <div className="idea-step">

              <span>
                3
              </span>

              <strong>
                Query Sₜ
              </strong>

              <small>
                Read state
              </small>

            </div>

          </div>

        </div>


        {/* ==================================================
            QUESTION
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ?
          </div>

          <div>

            <div className="question-title">
              Now change the question.
            </div>

            <p>
              What if the internal state was not only used to
              store accumulated key–value information, but also
              became a workspace for ongoing computation?
            </p>

          </div>

        </div>


        {/* ==================================================
            BDH
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            BDH · DRAGON HATCHLING
          </div>

          <div className="flow">

            <div className="idea-step">

              <span>
                1
              </span>

              <strong>
                Input arrives
              </strong>

              <small>
                Sequence stream
              </small>

            </div>

            <div className="idea-arrow">
              →
            </div>

            <div className="idea-step">

              <span>
                2
              </span>

              <strong>
                Internal state updates
              </strong>

              <small>
                Recurrent dynamics
              </small>

            </div>

            <div className="idea-arrow">
              →
            </div>

            <div className="idea-step">

              <span>
                3
              </span>

              <strong>
                State supports computation
              </strong>

              <small>
                Latent processing
              </small>

            </div>

          </div>

        </div>


        {/* ==================================================
            CONNECTION
        ================================================== */}

        <div className="state-vs-history-grid">

          <div className="state-vs-history-card">

            <div className="eyebrow">
              LINEAR ATTENTION
            </div>

            <h3>
              Compress the access pattern
            </h3>

            <p>
              Key–value contributions are accumulated into a
              fixed-dimensional state. A later query reads from
              that state rather than explicitly revisiting every
              previous pair in the recurrence we built.
            </p>

          </div>


          <div className="state-vs-history-card">

            <div className="eyebrow">
              BDH
            </div>

            <h3>
              Make state part of the computation
            </h3>

            <p>
              BDH explores recurrent state dynamics in a
              biologically inspired architecture, using local
              interactions and state changes as part of the
              model's computation.
            </p>

          </div>

        </div>


        {/* ==================================================
            BDH-CQ
        ================================================== */}

        <div className="state-box">

          <div className="state-title">
            BDH-CQ · 2026
          </div>

          <p>
            A more recent direction, BDH-CQ, combines
            in-context learning with recurrent latent reasoning.
            Inputs continuously update recurrent memory, and the
            model then performs iterative computation in a
            high-dimensional latent space to answer a query.
          </p>

          <div className="mini-equation">
            INPUTS → RECURRENT MEMORY → LATENT COMPUTATION → QUERY
          </div>

        </div>


        {/* ==================================================
            CENTRAL CONNECTION
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ✓
          </div>

          <div>

            <div className="question-title">
              The deeper connection
            </div>

            <p>
              The important idea is not that BDH and linear
              attention use the same mechanism. They do not.
              The connection is the use of an evolving internal
              state as an alternative to repeatedly exposing the
              complete sequence history to every computation.
            </p>

          </div>

        </div>


        {/* ==================================================
            IMPORTANT DISTINCTION
        ================================================== */}

        <div className="recall-caveat">

          <strong>
            Do not confuse them:
          </strong>

          <span>
            Our toy system demonstrates kernelized linear
            attention. BDH is a separate, biologically inspired
            architecture with its own state dynamics, learning
            mechanisms and goals. We are connecting the ideas,
            not claiming architectural equivalence.
          </span>

        </div>


        {/* ==================================================
            REFLECTION
        ================================================== */}

        <div className="state-vs-history-observation">

          <div className="question-mark">
            →
          </div>

          <div>

            <div className="question-title">
              You have now seen the progression.
            </div>

            <p>
              First, we asked how to accumulate a growing history.
              Then we tested what the fixed state preserves and
              what it cannot preserve. Finally, we connected that
              state-based viewpoint to newer architectures that
              use recurrent memory as part of computation and
              reasoning.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default BDHConnection;
