import express from 'express';
import path from 'path';
const app = express();
const port = 5000;
import cors from 'cors';
import request from 'request';
import parse from 'node-html-parser';

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/apartments", function (req, res) {
  request.get('https://www.bjurfors.se/sv/tillsalu/vastra-gotaland/majorna/?type=Apartment&pmin=200000&pmax=5500000&rcmin=3&rcmax=3&liamin=50&liamax=110&qdata=d%243erru6iq0ub04c67&FormId=6362f9d8-928e-4fe3-8abc-a8f157a65244', { json: true }, (err, res1, body) => {
    res.json(parseHtml(body));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

function parseHtml(html) {
  const parsed = parse.parse(html);
  const objects = parsed.querySelectorAll('.o-grid-list__item');
  
  var result = [];
  objects.forEach(object => {
    // console.log(object.querySelector(".c-object-card__link"));
    const link = object.querySelector(".c-object-card__link").getAttribute("href");
    const metaData = object.querySelectorAll('.c-object-card__meta');
    const sqMeter = metaData[0].innerHTML;
    const rooms = metaData[1].innerHTML;
    // TODO: Figure out how to decode &#160; which is a Numeric Character Reference (NCR)
    // of NBSP. This solution works but is kind of ugly.
    const price = metaData[2].innerHTML.replaceAll("&#160;", " ");
    console.log(price + " " + metaData[2].innerHTML)
  
    result.push({
      link,
      sqMeter,
      rooms,
      price
    });
  });
  return result;
}