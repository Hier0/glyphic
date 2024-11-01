import { Bot, LayoutGrid, FileText, Target, Scale, Globe, Spider, Robot, Browser, Combine, Type, Search, Scissors, SplitSquareHorizontal, LucideIcon } from 'lucide-react';
import { NodeConfig } from './types';

// AI Nodes
export const askAIConfig: NodeConfig = {
  category: 'ai',
  title: 'Ask AI',
  description: 'Prompt an AI language model. Provide all relevant context and use detailed prompts to get the best results.',
  icon: Bot,
  fields: [
    {
      type: 'textarea',
      label: 'Prompt',
      placeholder: 'Summarize the article in the context'
    },
    {
      type: 'textarea',
      label: 'Context',
      placeholder: '(Optional) This is additional context for the AI model that can be referenced in the prompt'
    }
  ]
};

export const extractDataConfig: NodeConfig = {
  category: 'ai',
  title: 'Extract Data',
  description: 'Extract specific data points from text using AI.',
  icon: FileText,
  fields: [
    {
      type: 'input',
      label: 'Field to Extract',
      placeholder: 'Enter field name or path'
    },
    {
      type: 'input',
      label: 'Default Value',
      placeholder: 'Default value if field is not found'
    },
    {
      type: 'switch',
      label: 'Strict Mode'
    }
  ]
};

export const categorizerConfig: NodeConfig = {
  category: 'ai',
  title: 'Categorizer',
  description: 'Categorize text into predefined or AI-generated categories.',
  icon: LayoutGrid,
  fields: [
    {
      type: 'textarea',
      label: 'Text to Categorize',
      placeholder: 'Enter or connect text to categorize'
    },
    {
      type: 'input',
      label: 'Categories',
      placeholder: 'Enter categories separated by commas'
    }
  ]
};

export const summarizerConfig: NodeConfig = {
  category: 'ai',
  title: 'Summarizer',
  description: 'Generate concise summaries of longer texts.',
  icon: Target,
  fields: [
    {
      type: 'textarea',
      label: 'Text to Summarize',
      placeholder: 'Enter or connect text to summarize'
    },
    {
      type: 'input',
      label: 'Max Length',
      placeholder: 'Maximum length of summary'
    }
  ]
};

export const scorerConfig: NodeConfig = {
  category: 'ai',
  title: 'Scorer',
  description: 'Score or rate text based on specific criteria.',
  icon: Scale,
  fields: [
    {
      type: 'textarea',
      label: 'Text to Score',
      placeholder: 'Enter or connect text to score'
    },
    {
      type: 'input',
      label: 'Criteria',
      placeholder: 'Enter scoring criteria'
    }
  ]
};

// Web Scraping Nodes
export const websiteScraperConfig: NodeConfig = {
  category: 'web-scraping',
  title: 'Website Scraper',
  description: 'Extract data from a specific webpage URL.',
  icon: Globe,
  fields: [
    {
      type: 'input',
      label: 'URL',
      placeholder: 'Enter website URL'
    },
    {
      type: 'input',
      label: 'CSS Selector',
      placeholder: 'Enter CSS selector to target specific elements'
    }
  ]
};

export const websiteCrawlerConfig: NodeConfig = {
  category: 'web-scraping',
  title: 'Website Crawler',
  description: 'Crawl multiple pages of a website following specific patterns.',
  icon: Spider,
  fields: [
    {
      type: 'input',
      label: 'Start URL',
      placeholder: 'Enter starting URL'
    },
    {
      type: 'input',
      label: 'URL Pattern',
      placeholder: 'Enter URL pattern to follow'
    },
    {
      type: 'input',
      label: 'Max Pages',
      placeholder: 'Maximum number of pages to crawl'
    }
  ]
};

export const webAgentScraperConfig: NodeConfig = {
  category: 'web-scraping',
  title: 'Web Agent Scraper',
  description: 'Use AI to intelligently navigate and extract data from websites.',
  icon: Robot,
  fields: [
    {
      type: 'input',
      label: 'URL',
      placeholder: 'Enter website URL'
    },
    {
      type: 'textarea',
      label: 'Instructions',
      placeholder: 'Describe what data to find and extract'
    }
  ]
};

export const aiWebBrowserConfig: NodeConfig = {
  category: 'web-scraping',
  title: 'AI Web Browser',
  description: 'Browse websites autonomously using AI to find specific information.',
  icon: Browser,
  fields: [
    {
      type: 'input',
      label: 'Starting URL',
      placeholder: 'Enter starting URL'
    },
    {
      type: 'textarea',
      label: 'Search Goal',
      placeholder: 'Describe what information to find'
    }
  ]
};

// Text Manipulation Nodes
export const combineTextConfig: NodeConfig = {
  category: 'text',
  title: 'Combine Text',
  description: 'Combine multiple text inputs into a single output.',
  icon: Combine,
  fields: [
    {
      type: 'textarea',
      label: 'Text Inputs',
      placeholder: 'Enter or connect text inputs'
    },
    {
      type: 'input',
      label: 'Separator',
      placeholder: 'Text to insert between combined texts'
    }
  ]
};

export const textFormatterConfig: NodeConfig = {
  category: 'text',
  title: 'Text Formatter',
  description: 'Format text using various transformations and styles.',
  icon: Type,
  fields: [
    {
      type: 'textarea',
      label: 'Input Text',
      placeholder: 'Enter or connect text to format'
    },
    {
      type: 'input',
      label: 'Format Rules',
      placeholder: 'Enter formatting rules'
    }
  ]
};

export const findReplaceConfig: NodeConfig = {
  category: 'text',
  title: 'Find & Replace',
  description: 'Find and replace text patterns using regex or simple string matching.',
  icon: Search,
  fields: [
    {
      type: 'input',
      label: 'Find Pattern',
      placeholder: 'Text or regex pattern to find'
    },
    {
      type: 'input',
      label: 'Replace With',
      placeholder: 'Text to replace matches with'
    },
    {
      type: 'switch',
      label: 'Use Regex'
    }
  ]
};

export const splitTextConfig: NodeConfig = {
  category: 'text',
  title: 'Split Text',
  description: 'Split text into multiple outputs based on a delimiter.',
  icon: Scissors,
  fields: [
    {
      type: 'textarea',
      label: 'Input Text',
      placeholder: 'Enter or connect text to split'
    },
    {
      type: 'input',
      label: 'Delimiter',
      placeholder: 'Character or pattern to split on'
    }
  ]
};

export const chunkTextConfig: NodeConfig = {
  category: 'text',
  title: 'Chunk Text',
  description: 'Split text into chunks of specified size while preserving content integrity.',
  icon: SplitSquareHorizontal,
  fields: [
    {
      type: 'textarea',
      label: 'Input Text',
      placeholder: 'Enter or connect text to chunk'
    },
    {
      type: 'input',
      label: 'Chunk Size',
      placeholder: 'Maximum size of each chunk'
    },
    {
      type: 'switch',
      label: 'Preserve Words'
    }
  ]
};

// Export all configs
export const nodeConfigs = {
  askAI: askAIConfig,
  extractData: extractDataConfig,
  categorizer: categorizerConfig,
  summarizer: summarizerConfig,
  scorer: scorerConfig,
  websiteScraper: websiteScraperConfig,
  websiteCrawler: websiteCrawlerConfig,
  webAgentScraper: webAgentScraperConfig,
  aiWebBrowser: aiWebBrowserConfig,
  combineText: combineTextConfig,
  textFormatter: textFormatterConfig,
  findReplace: findReplaceConfig,
  splitText: splitTextConfig,
  chunkText: chunkTextConfig
}; 