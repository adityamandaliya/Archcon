const fs = require('fs');
const http = require('http');

const data = JSON.stringify({
  name: "Test User",
  email: "test@example.com",
  phone: "9999999999",
  projectType: "redevelopment",
  message: "This is a test message to verify the contact form connection.",
  website: "" // honeypot
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    fs.writeFileSync('test-response.json', body);
    console.log('Response saved to test-response.json');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
