const fs= require('fs');
const { userInfo } = require('os');
const { post } = require('request');

const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method

    var users=[ 'elmo', 'maria'];

    if( url ==='/'){
        res.setHeader('content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Dummy greeting</title></head>');
        res.write('<body>')
        res.write('<h1>Hi This is a dummy greeting</h1>')
        res.write('<form action="/create-user" method="POST"><input name="user" type="text"></input><button type="submit">Send</button></form>')
        res.write('</body>')
        res.write('<html>');
        return res.end();
    } 
    
    if( url ==='/users'){
        res.write('<html>');
        res.write('<head><title>Dummy greeting</title></head>');
            res.write('<body>');
             res.write('<ul>');  
             for (const user of users) {
                res.write(`<li>${user}</li>`);
              }
             res.write('</ul>');
            res.write('</body>');
        res.write('<html>');
        return res.end();
    } 
 

    if(url ==='/create-user'){
        const body =[];
        req.on('data', chuck =>{
            body.push(chuck);
        });
        req.on('end', () =>{
            const parsedBody = Buffer.concat(body).toString();
            var newUser = parsedBody.split('=')[1];
            console.log(newUser);
            users.push(newUser);    
        });
        res.writeHead(302, { Location: 'users' });
        res.end();
    }

    console.log(users);

};

module.exports = requestHandler;
