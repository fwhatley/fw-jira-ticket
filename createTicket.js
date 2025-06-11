require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const config = require('./config.json');
const https = require('https');

const auth = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64');

// Create a custom HTTPS agent that doesn't reject unauthorized certificates
const agent = new https.Agent({
  rejectUnauthorized: false
});

async function createJiraTicket({ summary, description }) {
  const url = `${config.jiraDomain}/rest/api/2/issue`;

  const payload = {
    fields: {
      project: { id: config.projectId },
      issuetype: { id: config.issueTypeId },
      summary,
      parent: { id: config.parentId }
    }
  };

  try {
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload),
      agent
    });

    const responseData = await res.json();
    
    if (!res.ok) {
      console.error('Full error response:', JSON.stringify(responseData, null, 2));
      throw new Error(`❌ ${summary} failed: ${res.status} ${JSON.stringify(responseData)}`);
    }

    console.log(`✅ Created: ${summary} (ID: ${responseData.key})`);
  } catch (err) {
    console.error('Error details:', err.message);
  }
}


function processCSV() {
  const filePath = path.resolve(__dirname, 'tickets.csv');
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const { summary, description } = row;
      createJiraTicket({ summary, description });
    })
    .on('end', () => {
      console.log('📄 All stories processed.');
    });
}

processCSV();
