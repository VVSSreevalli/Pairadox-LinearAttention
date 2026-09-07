function ResearchSources() {
  const linearAttentionSources = [
    {
      year: "2020",
      type: "FOUNDATION",
      title:
        "Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention",
      authors:
        "Angelos Katharopoulos, Apoorv Vyas, Nikolaos Pappas, François Fleuret",
      venue: "ICML 2020 · PMLR",
      url: "https://proceedings.mlr.press/v119/katharopoulos20a.html",
      contribution:
        "Introduced the kernel-feature formulation that allows causal attention to be rewritten as an iterative recurrent computation. This is the mathematical foundation for the state update demonstrated in this lab.",
      relevance:
        "This is the closest primary source to the mechanism you just built."
    },

    {
      year: "2022",
      type: "RECENT PRIMARY",
      title: "Transformer Quality in Linear Time",
      authors:
        "Weizhe Hua, Zihang Dai, Hanxiao Liu, Quoc V. Le",
      venue: "ICML 2022 · PMLR",
      url: "https://proceedings.mlr.press/v162/hua22a.html",
      contribution:
        "Explored practical linear-time Transformer design through FLASH, including a linear approximation aimed at handling long sequences efficiently.",
      relevance:
        "Shows how the core efficiency idea can be developed into a practical Transformer architecture."
    },

    {
      year: "2022",
      type: "LIMITATIONS",
      title: "The Devil in Linear Transformer",
      authors:
        "Zhen Qin, Xiaodong Han, Weixuan Sun, Dongxu Li, Lingpeng Kong, Nick Barnes, Yiran Zhong",
      venue: "EMNLP 2022 · ACL Anthology",
      url: "https://aclanthology.org/2022.emnlp-main.473/",
      contribution:
        "Analysed why kernel-based linear Transformers can lose quality compared with standard attention, identifying issues including unbounded gradients and attention dilution.",
      relevance:
        "Supports an important lesson of this lab: cheaper attention is not automatically equivalent to better attention."
    },

    {
      year: "2024",
      type: "RECENT PRIMARY",
      title:
        "Gated Linear Attention Transformers with Hardware-Efficient Training",
      authors:
        "Songlin Yang, Bailin Wang, Yikang Shen, Rameswar Panda, Yoon Kim",
      venue: "ICML 2024 · PMLR",
      url: "https://proceedings.mlr.press/v235/yang24ab.html",
      contribution:
        "Shows that linear attention can be formulated as an RNN with matrix-valued hidden states and develops gated and hardware-efficient variants.",
      relevance:
        "Connects directly to our idea of an evolving matrix-valued recurrent state."
    },

    {
      year: "2024",
      type: "STATE CAPACITY",
      title:
        "Simple Linear Attention Language Models Balance the Recall-Throughput Tradeoff",
      authors:
        "Simran Arora, Sabri Eyuboglu, Michael Zhang, Aman Timalsina, Silas Alberti, James Zou, Atri Rudra, Christopher Re",
      venue: "ICML 2024 · PMLR",
      url: "https://proceedings.mlr.press/v235/arora24a.html",
      contribution:
        "Studies the relationship between recurrent state size, inference efficiency and the ability to recall information from context.",
      relevance:
        "This motivates the limitation experiment in our lab: a compact state can be efficient, but state capacity affects what information can be recovered."
    },

    {
      year: "2025",
      type: "RECENT PRIMARY",
      title: "Breaking the Low-Rank Dilemma of Linear Attention",
      authors:
        "Qihang Fan, Huaibo Huang, Ran He",
      venue: "CVPR 2025",
      url: "https://openaccess.thecvf.com/content/CVPR2025/html/Fan_Breaking_the_Low-Rank_Dilemma_of_Linear_Attention_CVPR_2025_paper.html",
      contribution:
        "Analyses the low-rank behaviour of linear attention and proposes a rank-augmented approach to reduce the performance gap with softmax attention.",
      relevance:
        "Provides a modern example of researchers trying to improve what a compressed linear-attention representation can express."
    }
  ];

  const bdhSources = [
    {
      year: "2025",
      type: "BDH SOURCE",
      title:
        "The Dragon Hatchling: The Missing Link between the Transformer and Models of the Brain",
      authors:
        "Adrian Kosowski, Przemysław Uznański, Jan Chorowski, Zuzanna Stamirowska, Michał Bartoszkiewicz",
      venue: "arXiv · 2025",
      url: "https://arxiv.org/abs/2509.26507",
      contribution:
        "Introduces BDH, a biologically inspired sequence-model architecture built around locally interacting neuron particles and recurrent state dynamics.",
      relevance:
        "This is the research connection used in our BDH section. It is not the same mechanism as our linear-attention toy model."
    },

    {
      year: "2026",
      type: "BDH-CQ",
      title:
        "BDH-CQ: In-Context Learning with Recurrent Latent Reasoning",
      authors:
        "Björn Engdahl et al.",
      venue: "arXiv · 2026",
      url: "https://arxiv.org/abs/2608.09888",
      contribution:
        "Explores a reasoning model in which inputs continuously update recurrent memory and queries are answered through iterative computation in a high-dimensional latent space.",
      relevance:
        "This extends the broader state-based idea from memory accumulation toward recurrent latent computation and reasoning."
    }
  ];

  function SourceCard({ source }) {
    return (
      <div className="state-vs-history-card">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "14px",
            flexWrap: "wrap"
          }}
        >
          <div
            className="eyebrow"
            style={{
              color: "#98a2b3",
              marginBottom: 0
            }}
          >
            {source.type}
          </div>

          <div
            style={{
              padding: "5px 9px",
              border: "1px solid #292929",
              borderRadius: "999px",
              background: "#151515",
              color: "#aaa",
              fontFamily:
                '"SFMono-Regular", Consolas, monospace',
              fontSize: "10px",
              fontWeight: "700"
            }}
          >
            {source.year}
          </div>
        </div>

        <h3
          style={{
            margin: "0 0 10px",
            color: "#f2f4f7"
          }}
        >
          {source.title}
        </h3>

        <p
          style={{
            marginBottom: "8px",
            color: "#aaa",
            fontSize: "12px"
          }}
        >
          {source.authors}
        </p>

        <p
          style={{
            marginBottom: "14px",
            color: "#777",
            fontSize: "11px",
            fontFamily:
              '"SFMono-Regular", Consolas, monospace'
          }}
        >
          {source.venue}
        </p>

        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            marginBottom: "18px",
            padding: "8px 12px",
            border: "1px solid #344054",
            borderRadius: "7px",
            background: "#181818",
            color: "#d0d5dd",
            fontSize: "11px",
            fontWeight: "700",
            textDecoration: "none",
            transition: "0.2s ease"
          }}
        >
          View Primary Paper →
        </a>

        <div
          style={{
            padding: "14px",
            marginBottom: "10px",
            border: "1px solid #242424",
            borderRadius: "8px",
            background: "#111",
            color: "#aaa",
            fontSize: "12px",
            lineHeight: "1.65"
          }}
        >
          <strong
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#ddd",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            What it contributed
          </strong>

          {source.contribution}
        </div>

        <div
          style={{
            padding: "14px",
            border: "1px dashed #333",
            borderRadius: "8px",
            color: "#999",
            fontSize: "11px",
            lineHeight: "1.6"
          }}
        >
          <strong
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#aaa",
              fontSize: "10px",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}
          >
            Why it matters here
          </strong>

          {source.relevance}
        </div>

      </div>
    );
  }

  return (
    <section className="section">

      <div className="section-header">

        <div className="eyebrow">
          RESEARCH & SOURCES
        </div>

        <h2>
          Where Did This Idea Come From?
        </h2>

        <p>
          The mechanism you explored is part of a larger research
          thread on efficient attention, recurrent state
          representations, memory and long-context computation.
          These are the primary papers that informed this lab.
        </p>

      </div>

      <div className="token-card">

        <div className="token-header">

          <div className="token-title">
            Linear Attention Research Trail
          </div>

          <div className="live-badge">
            PRIMARY SOURCES
          </div>

        </div>

        <div className="state-vs-history-observation">

          <div className="question-mark">
            →
          </div>

          <div>

            <div className="question-title">
              From a mathematical trick to a research direction
            </div>

            <p>
              The papers below are not all claiming the same
              thing. Together they show how the field moved from
              kernelised linear attention and recurrent
              formulations toward practical systems, improved
              state capacity, and attempts to close the quality
              gap with standard softmax attention.
            </p>

          </div>

        </div>

        <div className="state-vs-history-grid">

          {linearAttentionSources.map((source) => (
            <SourceCard
              key={`${source.year}-${source.title}`}
              source={source}
            />
          ))}

        </div>

        <div
          style={{
            marginTop: "28px",
            padding: "22px",
            border: "1px solid #303030",
            borderRadius: "10px",
            background: "#151515"
          }}
        >

          <div
            className="eyebrow"
            style={{
              color: "#98a2b3"
            }}
          >
            WHAT OUR LAB SIMPLIFIES
          </div>

          <p
            style={{
              margin: "0",
              color: "#999",
              fontSize: "13px",
              lineHeight: "1.7"
            }}
          >
            Our interactive system uses a deliberately tiny
            2-dimensional feature and value space. It isolates
            the recurrent accumulation mechanism so that every
            intermediate matrix can be inspected. Real research
            systems use much larger dimensions and may add
            positional information, gating, specialised
            normalisation, hardware-aware algorithms and other
            mechanisms.
          </p>

        </div>

        <div
          className="token-header"
          style={{
            marginTop: "36px"
          }}
        >

          <div className="token-title">
            The BDH Connection
          </div>

          <div className="live-badge">
            RESEARCH CONNECTION
          </div>

        </div>

        <div className="state-vs-history-grid">

          {bdhSources.map((source) => (
            <SourceCard
              key={`${source.year}-${source.title}`}
              source={source}
            />
          ))}

        </div>

        <div className="recall-caveat">

          <strong>
            Important:
          </strong>

          <span>
            BDH is not linear attention, and this lab does not
            claim that the two architectures are equivalent. The
            connection is conceptual: both research directions
            explore how an evolving internal state can support
            sequence processing without repeatedly exposing the
            complete history to every computation.
          </span>

        </div>

        <div className="state-vs-history-observation">

          <div className="question-mark">
            ✓
          </div>

          <div>

            <div className="question-title">
              You have reached the end of the research trail.
            </div>

            <p>
              You started with individual key–value pairs,
              compressed them into a recurrent state, tested what
              that state preserves, explored its limitations, and
              then connected the idea to current research on
              efficient attention and recurrent computation.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ResearchSources;