// ------------------------------
// Chrome Omnibox Multi-Search
// FINAL VERSION (word-based matching)
// ------------------------------

const engines = [
  { keywords: ["google", "g"], url: "https://www.google.com/search?q=" },
  { keywords: ["bing", "b"], url: "https://www.bing.com/search?q=" },
  { keywords: ["duckduckgo", "duck", "d"], url: "https://duckduckgo.com/?q=" },
  { keywords: ["yahoo", "y"], url: "https://search.yahoo.com/search?p=" },
  { keywords: ["ecosia", "e"], url: "https://www.ecosia.org/search?q=" },
  { keywords: ["qwant", "q"], url: "https://www.qwant.com/?q=" },

  { keywords: ["googleimages", "gi"], url: "https://www.google.com/search?tbm=isch&q=" },
  { keywords: ["bingimages", "bi"], url: "https://www.bing.com/images/search?q=" },
  { keywords: ["tineye", "te"], url: "https://tineye.com/search?q=" },
  { keywords: ["unsplash", "us"], url: "https://unsplash.com/s/photos/" },
  { keywords: ["pexels", "pex"], url: "https://www.pexels.com/search/" },
  { keywords: ["pixabay", "pix"], url: "https://pixabay.com/images/search/" },

  { keywords: ["youtube", "yt"], url: "https://www.youtube.com/results?search_query=" },
  { keywords: ["vimeo", "vm"], url: "https://vimeo.com/search?q=" },
  { keywords: ["dailymotion", "dm"], url: "https://www.dailymotion.com/search/" },
  { keywords: ["bingvideo", "bv"], url: "https://www.bing.com/videos/search?q=" },

  { keywords: ["pdfdrive", "pdfd"], url: "https://www.pdfdrive.com/search?q=" },
  { keywords: ["scribd", "srd"], url: "https://www.scribd.com/search?query=" },
  { keywords: ["slideshare", "ss"], url: "https://www.slideshare.net/search/slideshow?searchfrom=header&q=" },

  { keywords: ["scholar", "gs"], url: "https://scholar.google.com/scholar?q=" },
  { keywords: ["semanticscholar", "sems"], url: "https://www.semanticscholar.org/search?q=" },
  { keywords: ["arxiv", "ax"], url: "https://arxiv.org/search/?query=" },
  { keywords: ["pubmed", "pm"], url: "https://pubmed.ncbi.nlm.nih.gov/?term=" },
  { keywords: ["researchgate", "rg"], url: "https://www.researchgate.net/search?q=" },

  { keywords: ["perplexity", "p"], url: "https://www.perplexity.ai/search?q=" },
  { keywords: ["chatgpt", "cg"], url: "https://chat.openai.com/chat" },
  { keywords: ["bingchat", "bc"], url: "https://www.bing.com/search?q=" },
  { keywords: ["claude", "cl"], url: "https://www.anthropic.com/claude" }
];

// ------------------------------
// Omnibox Handler
// ------------------------------
chrome.omnibox.onInputEntered.addListener((text) => {
  let query = text.trim();
  let words = query.toLowerCase().split(/\s+/);

  let engineUrl = "https://www.google.com/search?q=";
  let matched = false;

  for (let eng of engines) {
    // Sort longest keyword first
    const sorted = eng.keywords.slice().sort((a, b) => b.length - a.length);

    for (let key of sorted) {
      // Check FIRST word
      if (words[0] === key) {
        words.shift(); // remove keyword
        query = words.join(" ");
        engineUrl = eng.url;
        matched = true;
        break;
      }

      // Check LAST word
      if (words[words.length - 1] === key) {
        words.pop(); // remove keyword
        query = words.join(" ");
        engineUrl = eng.url;
        matched = true;
        break;
      }
    }

    if (matched) break;
  }

  // Open
  if (engineUrl.includes("chat.openai.com") || engineUrl.includes("anthropic.com/claude")) {
    chrome.tabs.create({ url: engineUrl });
  } else {
    chrome.tabs.update({ url: engineUrl + encodeURIComponent(query) });
  }
});

// ------------------------------
// Suggestions
// ------------------------------
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const suggestions = [];

  for (let eng of engines) {
    for (let key of eng.keywords) {
      suggestions.push({
        content: key + " " + text,
        description: "Search with " + key
      });
    }
  }

  suggest(suggestions);
});