import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';

// drive.file scope allows creating/uploading/modifying files the app creates
const SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
];
const TOKEN_PATH = 'token.json';
const CREDENTIALS_PATH = 'client_secret_523200363598-jidks82sq073vgv5o5e5q8cdno7rsu97.apps.googleusercontent.com.json';

fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listFiles);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Always re-authorize to get the new scopes
  if (process.argv.includes('--reauth')) {
    return getAccessToken(oAuth2Client, callback);
  }

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });
  console.log('Authorize this app by visiting this url:\n\n', authUrl, '\n');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log('After authorization, you will be redirected to http://localhost/?code=XYZ');
  console.log('Please copy the value of the "code" parameter from the URL and paste it below.');
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name, mimeType)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('\n✅ Connection successful! Files:');
      files.map((file) => {
        console.log(`  📄 ${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}
