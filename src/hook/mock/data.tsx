
const data = () => {
    const existingCompanies = [
    // Tech Giants
    'Google', 'Apple', 'Microsoft', 'Amazon', 'Meta', 'Tesla', 'Netflix', 'Adobe',
    'Salesforce', 'Oracle', 'IBM', 'Intel', 'NVIDIA', 'AMD', 'Qualcomm', 'Cisco',
    'Samsung', 'Sony', 'LG', 'Huawei', 'Xiaomi', 'ByteDance', 'Tencent', 'Alibaba',
    'Baidu', 'JD.com', 'Meituan', 'Didi', 'Grab', 'Sea Limited', 'Shopee',
    
    // Major Tech Companies
    'Uber', 'Lyft', 'Airbnb', 'Spotify', 'Zoom', 'Slack', 'Discord', 'Twitch',
    'Reddit', 'Twitter', 'LinkedIn', 'Pinterest', 'Snapchat', 'TikTok', 'YouTube',
    'WhatsApp', 'Telegram', 'Signal', 'Dropbox', 'Box', 'Atlassian', 'Jira',
    'Confluence', 'Trello', 'Asana', 'Monday.com', 'Notion', 'Figma', 'Canva',
    
    // Cloud & Infrastructure
    'AWS', 'Google Cloud', 'Microsoft Azure', 'DigitalOcean', 'Linode', 'Vultr',
    'Cloudflare', 'Fastly', 'Akamai', 'MongoDB', 'Redis', 'Elasticsearch',
    'Docker', 'Kubernetes', 'HashiCorp', 'Terraform', 'Ansible', 'Jenkins',
    
    // Fintech
    'PayPal', 'Stripe', 'Square', 'Coinbase', 'Binance', 'Kraken', 'Robinhood',
    'Plaid', 'Klarna', 'Affirm', 'Chime', 'Revolut', 'N26', 'Monzo', 'Wise',
    
    // E-commerce & Retail
    'Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Etsy', 'eBay',
    'Walmart', 'Target', 'Best Buy', 'Home Depot', 'Costco', 'Wayfair',
    
    // Gaming
    'Epic Games', 'Valve', 'Steam', 'Unity', 'Unreal Engine', 'Roblox',
    'Electronic Arts', 'Activision Blizzard', 'Ubisoft', 'Take-Two Interactive',
    'Riot Games', 'Blizzard Entertainment', 'Nintendo', 'PlayStation', 'Xbox',
    
    // Enterprise Software
    'SAP', 'ServiceNow', 'Workday', 'HubSpot', 'Zendesk', 'Freshworks',
    'Zoho', 'Mailchimp', 'Constant Contact', 'SendGrid', 'Twilio', 'PagerDuty',
    
    // Development Tools
    'GitHub', 'GitLab', 'Bitbucket', 'JetBrains', 'Visual Studio Code', 'Sublime Text',
    'Postman', 'Insomnia', 'Swagger', 'New Relic', 'Datadog', 'Splunk',
    
    // Cybersecurity
    'CrowdStrike', 'Palo Alto Networks', 'Fortinet', 'Check Point', 'Symantec',
    'McAfee', 'Trend Micro', 'Kaspersky', 'Bitdefender', 'Norton', 'Avast',
    
    // AI & Machine Learning
    'OpenAI', 'Anthropic', 'DeepMind', 'Hugging Face', 'Stability AI', 'Midjourney',
    'DataRobot', 'H2O.ai', 'Scale AI', 'Weights & Biases', 'Cohere', 'Replicate',
    
    // Startups & Unicorns
    'Stripe', 'SpaceX', 'Palantir', 'Databricks', 'Snowflake', 'Canva', 'Figma',
    'Discord', 'Notion', 'Airtable', 'Zapier', 'Vercel', 'Netlify', 'Supabase',
    'PlanetScale', 'Railway', 'Render', 'Fly.io', 'Heroku', 'Firebase',
    
    // Consulting & Services
    'Accenture', 'Deloitte', 'PwC', 'EY', 'KPMG', 'McKinsey', 'BCG', 'Bain',
    'Capgemini', 'TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL Technologies',
    
    // Telecommunications
    'Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Comcast', 'Charter', 'Dish',
    'Vodafone', 'Orange', 'Deutsche Telekom', 'BT Group', 'NTT', 'SoftBank',
    
    // Media & Entertainment
    'Disney', 'Warner Bros', 'Universal', 'Paramount', 'Fox', 'CBS', 'NBC',
    'HBO', 'Hulu', 'Prime Video', 'Disney+', 'Peacock', 'Paramount+',
    
    // Automotive Tech
    'Ford', 'GM', 'Toyota', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Audi',
    'Volvo', 'Rivian', 'Lucid Motors', 'NIO', 'Xpeng', 'BYD', 'Waymo',
    
    // Healthcare Tech
    'Teladoc', 'Veracyte', 'Moderna', 'Pfizer', 'Johnson & Johnson', 'Roche',
    'Novartis', 'AbbVie', 'Merck', 'Bristol Myers Squibb', 'Gilead Sciences',
    
    // Food Tech
    'DoorDash', 'Uber Eats', 'Grubhub', 'Postmates', 'Instacart', 'Gopuff',
    'HelloFresh', 'Blue Apron', 'Meal Kit', 'Zomato', 'Swiggy', 'Deliveroo',
    
    // Travel Tech
    'Booking.com', 'Expedia', 'Priceline', 'Kayak', 'Skyscanner', 'TripAdvisor',
    'Marriott', 'Hilton', 'Hyatt', 'IHG', 'Accor', 'Wyndham',
    
    // EdTech
    'Coursera', 'Udemy', 'Khan Academy', 'Duolingo', 'Skillshare', 'MasterClass',
    'Pluralsight', 'LinkedIn Learning', 'Codecademy', 'FreeCodeCamp', 'edX',
    
    // Real Estate Tech
    'Zillow', 'Redfin', 'Compass', 'Opendoor', 'Rocket Mortgage', 'LendingTree',
    'Realtor.com', 'Trulia', 'LoopNet', 'CoStar', 'RentSpree', 'Apartments.com',
    
    // Mock/Example Companies (for demo)
    'TechFlow', 'DataSync', 'GrowthLab', 'InnovateCorp', 'StartupHub',
    'CodeCraft', 'DevSolutions', 'TechPioneer', 'DigitalForge', 'CloudVenture'
  ];

  return { existingCompanies };
}

export default data