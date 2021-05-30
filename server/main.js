import express from 'express';
import path from 'path';
const app = express();
const port = 5000;
import cors from 'cors';
import request from 'request';
import parse from 'node-html-parser';

app.use(cors())

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get("/", function (req, res) {
  request.get('https://www.bjurfors.se/sv/tillsalu/vastra-gotaland/majorna/?type=Apartment&pmin=200000&pmax=5500000&rcmin=3&rcmax=3&liamin=50&liamax=110&qdata=d%243erru6iq0ub04c67&FormId=6362f9d8-928e-4fe3-8abc-a8f157a65244', { json: true }, (err, res1, body) => {
    // if (res) console.log(res);
    // if (err) console.log(err);
    // console.log(body);
    // console.log(parseHtml(body));
    res.json(parseHtml(body));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function parseHtml(html) {
  const parsed = parse.parse(html);
  const objects = parsed.querySelectorAll(".c-object-card__link");
  var result = [];
  objects.forEach(object => {
    const link = object.getAttribute("href");
    result.push(link);
  });
  return result;
}