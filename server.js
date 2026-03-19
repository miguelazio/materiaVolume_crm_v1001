import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import { google } from 'googleapis';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Multer for file uploads (temporary storage)
const upload = multer({ dest: 'uploads/' });

const CREDENTIALS_PATH = 'client_secret_523200363598-jidks82sq073vgv5o5e5q8cdno7rsu97.apps.googleusercontent.com.json';
const TOKEN_PATH = 'token.json';
const DRIVE_FOLDER_NAME = 'materiavolumecrm';

// ── Auth helpers ──────────────────────────────────────────────────────────────

function getAuthClient() {
  const content = fs.readFileSync(CREDENTIALS_PATH);
  const { client_secret, client_id, redirect_uris } = JSON.parse(content).installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
  oAuth2Client.setCredentials(token);

  // Auto-refresh: save new tokens when refreshed
  oAuth2Client.on('tokens', (tokens) => {
    const existing = JSON.parse(fs.readFileSync(TOKEN_PATH));
    const updated = { ...existing, ...tokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(updated));
    console.log('🔄 Token refreshed and saved');
  });

  return oAuth2Client;
}

// ── Find or create the "materiavolumecrm" folder ──────────────────────────────

async function getOrCreateFolder(drive) {
  // Search for existing folder
  const res = await drive.files.list({
    q: `name='${DRIVE_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  // Create the folder
  const folder = await drive.files.create({
    requestBody: {
      name: DRIVE_FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
    },
    fields: 'id',
  });
  console.log(`📁 Created folder "${DRIVE_FOLDER_NAME}" (${folder.data.id})`);
  return folder.data.id;
}

// ── Find or create a subfolder for the category ──────────────────────────────

async function getOrCreateSubfolder(drive, parentId, subfolderName) {
  const res = await drive.files.list({
    q: `name='${subfolderName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)',
    spaces: 'drive',
  });

  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  const folder = await drive.files.create({
    requestBody: {
      name: subfolderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
  });
  console.log(`📁 Created subfolder "${subfolderName}" (${folder.data.id})`);
  return folder.data.id;
}

// ── Routes ────────────────────────────────────────────────────────────────────

// Upload file to Google Drive
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: 'No category provided' });
    }

    const auth = getAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    // Get or create main folder
    const mainFolderId = await getOrCreateFolder(drive);

    // Get or create category subfolder
    const categoryFolderId = await getOrCreateSubfolder(drive, mainFolderId, category);

    // Upload file
    const fileMetadata = {
      name: req.file.originalname,
      parents: [categoryFolderId],
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const driveFile = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, mimeType, webViewLink, webContentLink, size, createdTime',
    });

    // Clean up temp file
    fs.unlinkSync(req.file.path);

    console.log(`✅ Uploaded "${req.file.originalname}" to ${category}/`);

    res.json({
      success: true,
      file: {
        id: driveFile.data.id,
        name: driveFile.data.name,
        mimeType: driveFile.data.mimeType,
        webViewLink: driveFile.data.webViewLink,
        webContentLink: driveFile.data.webContentLink,
        size: driveFile.data.size,
        createdTime: driveFile.data.createdTime,
        category: category,
      },
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    // Clean up temp file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: error.message });
  }
});

// List files from Google Drive materiavolumecrm folder
app.get('/api/files', async (req, res) => {
  try {
    const auth = getAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    const mainFolderId = await getOrCreateFolder(drive);

    // Get all subfolders (categories)
    const foldersRes = await drive.files.list({
      q: `'${mainFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    const allFiles = [];

    for (const folder of foldersRes.data.files) {
      const filesRes = await drive.files.list({
        q: `'${folder.id}' in parents and trashed=false`,
        fields: 'files(id, name, mimeType, webViewLink, webContentLink, size, createdTime)',
        spaces: 'drive',
        orderBy: 'createdTime desc',
      });

      for (const file of filesRes.data.files) {
        allFiles.push({
          ...file,
          category: folder.name,
        });
      }
    }

    res.json({ files: allFiles });
  } catch (error) {
    console.error('List error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete file from Google Drive
app.delete('/api/files/:fileId', async (req, res) => {
  try {
    const auth = getAuthClient();
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.delete({ fileId: req.params.fileId });
    console.log(`🗑️ Deleted file ${req.params.fileId}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 MateriaVault Server running on http://localhost:${PORT}`);
  console.log(`   POST /api/upload  — Upload a file`);
  console.log(`   GET  /api/files   — List all files`);
  console.log(`   DEL  /api/files/:id — Delete a file\n`);
});
