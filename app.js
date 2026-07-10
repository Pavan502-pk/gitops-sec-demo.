const express = require('express');
const { exec } = require('child_process');
const app = express();

// VULNERABILITY 1: Hardcoded sensitive token
const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE"; 

app.get('/ping', (req, res) => {
    const input = req.query.url;
    
    // VULNERABILITY 2: Command Injection (Unsanitized user input passed directly to shell)
    exec(`ping -c 1 ${input}`, (err, stdout, stderr) => {
        res.send(stdout || stderr);
    });
});

app.listen(3000, () => console.log('App listening on port 3000'));
