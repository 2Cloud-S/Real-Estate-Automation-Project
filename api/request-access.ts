import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Create OAuth2 client
const oauth2Client = new OAuth2Client({
  clientId: process.env.GMAIL_CLIENT_ID,
  clientSecret: process.env.GMAIL_CLIENT_SECRET,
  redirectUri: 'https://developers.google.com/oauthplayground'
});

// Set credentials
oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Max-Age', '86400');
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(200).end();
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: `Method ${req.method} not allowed` 
    });
  }

  try {
    const { name, email, company, useCase } = req.body;

    if (!name || !email || !company || !useCase) {
      return res.status(400).json({ 
        message: 'Missing required fields' 
      });
    }

    const emailContent = `
      <h2>New Early Access Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <h3>Use Case:</h3>
      <p>${useCase}</p>
    `;

    const encodedEmail = Buffer.from(
      `From: "OmniRealty AI" <${process.env.GMAIL_EMAIL}>
To: ${process.env.GMAIL_EMAIL}
Subject: New Early Access Request from ${name}
Content-Type: text/html; charset=utf-8

${emailContent}`
    ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail
      }
    });

    return res.status(200).json({ message: 'Request submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Failed to submit request' });
  }
} 