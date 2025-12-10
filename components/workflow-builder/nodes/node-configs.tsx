import { Bot, FileText, LayoutGrid, Target, Scale, Globe, Bug, Bot as RobotIcon, Globe2, Combine, Type, Search, Scissors, SplitSquareHorizontal, Github, Database, MessageSquare, Cloud, Mail, MessageCircle, Phone } from 'lucide-react';
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
      placeholder: 'https://example.com/page'
    },
    {
      type: 'input',
      label: 'CSS Selector',
      placeholder: 'Enter CSS selector to target specific elements (e.g., .article-content)'
    },
    {
      type: 'switch',
      label: 'Wait for JavaScript',
      advanced: true
    },
    {
      type: 'input',
      label: 'Wait Timeout (ms)',
      placeholder: '30000',
      advanced: true
    },
    {
      type: 'textarea',
      label: 'Custom Headers',
      placeholder: '{"User-Agent": "Mozilla/5.0..."}',
      advanced: true
    },
    {
      type: 'input',
      label: 'Authentication Token',
      placeholder: 'Bearer token or API key',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Follow Redirects',
      advanced: true
    },
    {
      type: 'input',
      label: 'Request Timeout (ms)',
      placeholder: '60000',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Include Images',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Include Links',
      advanced: true
    }
  ]
};

export const websiteCrawlerConfig: NodeConfig = {
  category: 'web-scraping',
  title: 'Website Crawler',
  description: 'Crawl multiple pages of a website following specific patterns.',
  icon: Bug,
  fields: [
    {
      type: 'input',
      label: 'Start URL',
      placeholder: 'https://example.com'
    },
    {
      type: 'input',
      label: 'URL Pattern',
      placeholder: 'https://example.com/**/* (supports wildcards)'
    },
    {
      type: 'input',
      label: 'Max Pages',
      placeholder: '100'
    },
    {
      type: 'input',
      label: 'Max Depth',
      placeholder: '5',
      advanced: true
    },
    {
      type: 'textarea',
      label: 'Include Patterns',
      placeholder: 'One pattern per line (regex supported)',
      advanced: true
    },
    {
      type: 'textarea',
      label: 'Exclude Patterns',
      placeholder: 'One pattern per line (regex supported)',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Respect Robots.txt',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Wait for JavaScript',
      advanced: true
    },
    {
      type: 'input',
      label: 'Wait Timeout (ms)',
      placeholder: '30000',
      advanced: true
    },
    {
      type: 'input',
      label: 'Delay Between Requests (ms)',
      placeholder: '1000',
      advanced: true
    },
    {
      type: 'textarea',
      label: 'Custom Headers',
      placeholder: '{"User-Agent": "Mozilla/5.0..."}',
      advanced: true
    },
    {
      type: 'input',
      label: 'Authentication Token',
      placeholder: 'Bearer token or API key',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Follow External Links',
      advanced: true
    },
    {
      type: 'input',
      label: 'Request Timeout (ms)',
      placeholder: '60000',
      advanced: true
    }
  ]
};

export const webAgentScraperConfig: NodeConfig = {
  category: 'web-scraping',
  title: 'Web Agent Scraper',
  description: 'Use AI to intelligently navigate and extract data from websites.',
  icon: RobotIcon,
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
  icon: Globe2,
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

// Integration Nodes
export const githubConfig: NodeConfig = {
  category: 'integration',
  title: 'GitHub',
  description: 'Connect and interact with GitHub repositories, issues, and pull requests',
  icon: Github,
  fields: [
    {
      type: 'input',
      label: 'Repository',
      placeholder: 'owner/repository'
    },
    {
      type: 'switch',
      label: 'Connected'
    }
  ]
};

export const postgresConfig: NodeConfig = {
  category: 'integration',
  title: 'PostgreSQL',
  description: 'Connect to PostgreSQL databases',
  icon: Database,
  fields: [
    {
      type: 'textarea',
      label: 'Query',
      placeholder: 'Enter SQL query'
    }
  ]
};

// Slack Nodes
export const slackMessageSenderConfig: NodeConfig = {
  category: 'integration',
  title: 'Slack Message Sender',
  description: 'Send message to Slack',
  icon: MessageSquare,
  fields: [
    {
      type: 'switch',
      label: 'Connected to Slack'
    },
    {
      type: 'input',
      label: 'Channel',
      placeholder: '#channel-name or @username'
    },
    {
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter message content'
    }
  ]
};

export const slackMessageReaderConfig: NodeConfig = {
  category: 'integration',
  title: 'Slack Message Reader',
  description: 'Get recent Slack messages',
  icon: MessageSquare,
  fields: [
    {
      type: 'switch',
      label: 'Connected to Slack'
    },
    {
      type: 'input',
      label: 'Channel',
      placeholder: '#channel-name or @username'
    },
    {
      type: 'input',
      label: 'Message Count',
      placeholder: 'Number of messages to fetch'
    }
  ]
};

export const slackCanvasWriterConfig: NodeConfig = {
  category: 'integration',
  title: 'Slack Canvas Writer',
  description: 'Create Slack Canvas',
  icon: MessageSquare,
  fields: [
    {
      type: 'switch',
      label: 'Connected to Slack'
    },
    {
      type: 'input',
      label: 'Channel',
      placeholder: '#channel-name'
    },
    {
      type: 'input',
      label: 'Canvas Title',
      placeholder: 'Enter canvas title'
    },
    {
      type: 'textarea',
      label: 'Canvas Content',
      placeholder: 'Enter canvas content'
    }
  ]
};

export const s3Config: NodeConfig = {
  category: 'integration',
  title: 'AWS S3',
  description: 'Store and retrieve files from S3',
  icon: Cloud,
  fields: [
    {
      type: 'input',
      label: 'Bucket',
      placeholder: 'Enter S3 bucket name'
    }
  ]
};

export const gmailConfig: NodeConfig = {
  category: 'integration',
  title: 'Gmail',
  description: 'Send emails to your Gmail account or read emails from your Gmail inbox. Sends PDF or email based on connected data.',
  icon: Mail,
  fields: [
    {
      type: 'switch',
      label: 'Connected to Gmail'
    },
    {
      type: 'switch',
      label: 'Send Email Mode',
      placeholder: 'ON = Send email, OFF = Read emails'
    },
    // Send Email Fields (Basic)
    {
      type: 'input',
      label: 'To',
      placeholder: 'recipient@example.com (your own email or others)'
    },
    {
      type: 'input',
      label: 'Subject',
      placeholder: 'Email subject line'
    },
    {
      type: 'textarea',
      label: 'Message Body',
      placeholder: 'Enter your email message content (or connect data to send)'
    },
    // Send Email Fields (Advanced)
    {
      type: 'input',
      label: 'CC',
      placeholder: 'cc@example.com (optional)',
      advanced: true
    },
    {
      type: 'input',
      label: 'BCC',
      placeholder: 'bcc@example.com (optional)',
      advanced: true
    },
    {
      type: 'input',
      label: 'Reply To',
      placeholder: 'reply-to@example.com (optional)',
      advanced: true
    },
    {
      type: 'input',
      label: 'Attachments',
      placeholder: 'File paths or URLs (comma-separated). PDFs will be attached if connected.',
      advanced: true
    },
    {
      type: 'switch',
      label: 'HTML Format',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Mark as Important',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Request Read Receipt',
      advanced: true
    },
    // Read Email Fields (Advanced)
    {
      type: 'input',
      label: 'Search Query',
      placeholder: 'from:sender@example.com OR subject:meeting',
      advanced: true
    },
    {
      type: 'input',
      label: 'Max Results',
      placeholder: '10',
      advanced: true
    },
    {
      type: 'input',
      label: 'Label/Folder',
      placeholder: 'INBOX, SENT, DRAFTS, or custom label',
      advanced: true
    },
    {
      type: 'input',
      label: 'From Sender',
      placeholder: 'sender@example.com',
      advanced: true
    },
    {
      type: 'input',
      label: 'Date Range (Days)',
      placeholder: '7 (last 7 days)',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Unread Only',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Include Attachments',
      advanced: true
    },
    {
      type: 'switch',
      label: 'Mark as Read',
      advanced: true
    }
  ]
};

export const discordConfig: NodeConfig = {
  category: 'integration',
  title: 'Discord',
  description: 'Send messages and interact with Discord servers',
  icon: MessageCircle,
  fields: [
    {
      type: 'switch',
      label: 'Connected to Discord'
    },
    {
      type: 'input',
      label: 'Server',
      placeholder: 'Select Discord server'
    },
    {
      type: 'input',
      label: 'Channel',
      placeholder: '#channel-name'
    },
    {
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter message content'
    },
    {
      type: 'switch',
      label: 'Send as Bot'
    }
  ]
};

export const twilioConfig: NodeConfig = {
  category: 'integration',
  title: 'Twilio',
  description: 'Send SMS and WhatsApp messages via Twilio',
  icon: Phone,
  fields: [
    {
      type: 'switch',
      label: 'Connected to Twilio'
    },
    {
      type: 'input',
      label: 'To Phone',
      placeholder: '+1234567890'
    },
    {
      type: 'textarea',
      label: 'Message',
      placeholder: 'Message content'
    },
    {
      type: 'switch',
      label: 'Use WhatsApp'
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
  chunkText: chunkTextConfig,
  github: githubConfig,
  postgres: postgresConfig,
  slackMessageSender: slackMessageSenderConfig,
  slackMessageReader: slackMessageReaderConfig,
  slackCanvasWriter: slackCanvasWriterConfig,
  s3: s3Config,
  gmail: gmailConfig,
  discord: discordConfig,
  twilio: twilioConfig
}; 