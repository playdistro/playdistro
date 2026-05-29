const SUPABASE_URL = 'https://kzkawksopcrcxemtfqpl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6a2F3a3NvcGNyY3hlbXRmcXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzk5ODksImV4cCI6MjA5NTYxNTk4OX0.IXtWB870M8NkpAAWBaB2_mGCBEhBepItUT2idD0xqiM';

const NOTIFY_EMAIL = 'playdistroph@gmail.com';

const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

function getPHTTime() {
  return new Date().toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: true
  });
}

function getPHTDate() {
  return new Date().toLocaleDateString('en-PH', {
    timeZone: 'Asia/Manila',
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

async function sendEmail(subject, body) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') return;
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: NOTIFY_EMAIL, subject, body }),
      mode: 'no-cors'
    });
  } catch(e) { console.log('Email error:', e); }
}

async function getIPAddress() {
  try {
    const r = await fetch('https://api.ipify.org?format=json');
    const d = await r.json();
    return d.ip;
  } catch(e) { return 'Unknown'; }
}

function getDevice() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}
