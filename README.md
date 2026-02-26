Smart Omnibox Multi-Search

Smart Omnibox Multi-Search is a Chrome extension built using Manifest V3 that enhances the browser’s address bar with intelligent multi-engine search routing.

The extension allows users to prepend or append keywords to a search query (e.g., "mountains bing", "pex pakistan", "flowers pexels") and automatically routes the request to the corresponding search engine. This eliminates the need to manually switch between search platforms.

Overview

This project improves productivity by enabling flexible, keyword-driven search behavior directly from Chrome’s omnibox. It implements a word-based parsing system to accurately detect engine keywords while preventing substring conflicts and short-key collisions. The system is built with scalability in mind, allowing additional search engines to be integrated easily.

Features

- Multi-engine search routing from the Chrome address bar
- Support for both short and long keywords (e.g., `g` and `google`, `pex` and `pexels`)
- Keyword detection at both the beginning and end of a query
- Word-based matching to prevent partial string conflicts
- Longest-keyword-first matching priority
- Scalable search engine configuration structure
- Built using Chrome Extension Manifest V3 and the Omnibox API

Example Usage

| Input | Behavior |
|--------|----------|
| `mountains bing` | Searches "mountains" on Bing |
| `pex pakistan` | Searches "pakistan" on Pexels |
| `flowers pexels` | Searches "flowers" on Pexels |
| `mountains g` | Searches "mountains" on Google |

Technical Design

The extension operates using the following logic:

1. The omnibox input is tokenized into individual words.
2. The first and last words are checked against registered engine keywords.
3. Keywords are sorted by length in descending order to ensure longer matches are prioritized.
4. Once a match is found, the keyword is removed from the query.
5. The cleaned query is routed to the appropriate search engine URL.

The architecture uses:

- Chrome Extension Manifest V3
- Service Worker background script
- Event-driven Omnibox API
- Configurable engine abstraction model

Supported Engines

Search Engines
- Google
- Bing
- DuckDuckGo
- Yahoo
- Ecosia
- Qwant

Image Platforms
- Google Images
- Bing Images
- TinEye
- Unsplash
- Pexels
- Pixabay

Video Platforms
- YouTube
- Vimeo
- Dailymotion
- Bing Video

Document & Slide Platforms
- PDFDrive
- Scribd
- SlideShare

Academic Platforms
- Google Scholar
- Semantic Scholar
- arXiv
- PubMed
- ResearchGate

AI Tools
- Perplexity
- ChatGPT
- Bing Chat
- Claude

Keyword Aliases

The extension supports both full-name and shorthand keyword aliases. Keywords can be placed at either the beginning or end of a query.

Search Engines
| Engine | Keywords |
|--------|----------|
| Google | `google`, `g` |
| Bing | `bing`, `b` |
| DuckDuckGo | `duckduckgo`, `duck`, `d` |
| Yahoo | `yahoo`, `y` |
| Ecosia | `ecosia`, `e` |
| Qwant | `qwant`, `q` |

Image Platforms
| Engine | Keywords |
|--------|----------|
| Google Images | `googleimages`, `gi` |
| Bing Images | `bingimages`, `bi` |
| TinEye | `tineye`, `te` |
| Unsplash | `unsplash`, `us` |
| Pexels | `pexels`, `pex` |
| Pixabay | `pixabay`, `pix` |

Video Platforms
| Engine | Keywords |
|--------|----------|
| YouTube | `youtube`, `yt` |
| Vimeo | `vimeo`, `vm` |
| Dailymotion | `dailymotion`, `dm` |
| Bing Video | `bingvideo`, `bv` |

Document & Slide Platforms
| Engine | Keywords |
|--------|----------|
| PDFDrive | `pdfdrive`, `pdfd` |
| Scribd | `scribd`, `srd` |
| SlideShare | `slideshare`, `ss` |

Academic Platforms
| Engine | Keywords |
|--------|----------|
| Google Scholar | `scholar`, `gs` |
| Semantic Scholar | `semanticscholar`, `sems` |
| arXiv | `arxiv`, `ax` |
| PubMed | `pubmed`, `pm` |
| ResearchGate | `researchgate`, `rg` |

AI Tools
| Engine | Keywords |
|--------|----------|
| Perplexity | `perplexity`, `p` |
| ChatGPT | `chatgpt`, `cg` |
| Bing Chat | `bingchat`, `bc` |
| Claude | `claude`, `cl` |

Installation (Developer Mode)

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable Developer Mode.
4. Click "Load unpacked".
5. Select the project directory.

Project Structure

```
Smart-Omnibox-MultiSearch/
├── manifest.json
├── background.js
├── icon.png
└── README.md
```

Future Improvements

- User-configurable engines using chrome.storage
- Settings interface
- Multi-engine simultaneous search
- Search history tracking
- Default engine customization
- Chrome Web Store publication

Author

Developed as a productivity-focused browser extension project to explore Chrome APIs, str
