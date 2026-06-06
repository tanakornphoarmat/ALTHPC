import http from 'http';

http.get('http://localhost:3001/api/slides', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("API Result:", data);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
