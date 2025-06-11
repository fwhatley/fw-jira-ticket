# Jira Ticket Creator

This project automates the creation of Jira tickets from a CSV file using the Jira REST API.

## Features
- Reads stories from a CSV file (`tickets.csv`)
- Creates Jira tickets using your credentials and project configuration
- Uses environment variables for sensitive data

## Prerequisites
- Node.js 22.9 (see `.nvmrc` for version management)
- npm (Node Package Manager)
- Jira account with API access

## Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd fw-jira-ticket
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```env
     JIRA_EMAIL=your-email@example.com
     JIRA_API_TOKEN=your-jira-api-token
     ```
4. **Configure Jira settings:**
   - Edit `config.json` with your Jira domain, project ID, issue type ID, and parent ID.

5. **Prepare your tickets CSV:**
   - Create a `tickets.csv` file in the root directory with columns:
     ```csv
     summary,description
     "Story summary 1","Story description 1"
     "Story summary 2","Story description 2"
     ```
   - Alternatively, you can use the provided example file `tickets-example.csv` as a template.

## Usage
To process the CSV and (optionally) create Jira tickets:

```bash
node createTicket.js
```

> **Note:** By default, ticket creation is commented out for safety. Uncomment the relevant line in `createTicket.js` to enable ticket creation.

## Development Notes
- The project uses `.nvmrc` to specify the Node.js version. Run `nvm use` to switch to the correct version.
- `.env` and `tickets.csv` are ignored by Git for security and privacy.

## License
MIT
