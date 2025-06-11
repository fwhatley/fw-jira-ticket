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
   - Copy the environment template:
     ```bash
     cp .env-template .env
     ```
   - Edit `.env` with your Jira credentials:
     ```env
     JIRA_EMAIL=your-email@example.com
     JIRA_API_TOKEN=your-jira-api-token
     ```

4. **Configure Jira settings:**
   - Copy the configuration template:
     ```bash
     cp config.template.json config.json
     ```
   - Edit `config.json` with your Jira settings:
     - `jiraDomain`: Your Jira instance URL (e.g., https://your-domain.atlassian.net)
     - `projectId`: Your Jira project ID (found in project settings)
     - `issueTypeId`: The ID for the type of issue you want to create (e.g., 10001 for Story)
     - `parentId`: The ID of the parent issue (if creating subtasks)

5. **Prepare your tickets CSV:**
   - The repository includes a `tickets-template.csv` file with example data
   - Copy it to create your own tickets file:
     ```bash
     cp tickets-template.csv tickets.csv
     ```
   - Edit `tickets.csv` with your ticket data:
     ```csv
     summary,description
     "Story summary 1","Story description 1"
     "Story summary 2","Story description 2"
     ```

## Usage
To process the CSV and (optionally) create Jira tickets:

```bash
node createTicket.js
```

## Development Notes
- The project uses `.nvmrc` to specify the Node.js version. Run `nvm use` to switch to the correct version.
- The following files are ignored by Git for security and privacy:
  - `.env` (contains sensitive credentials)
  - `config.json` (contains project-specific settings)
  - `tickets.csv` (contains your actual ticket data)
- Template files (`.env-template`, `config.template.json`, `tickets-template.csv`) are tracked in Git and serve as examples.

## License
MIT
