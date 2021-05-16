const http = require("http");

const PORT = 3000;
const HOST = "localhost";


/*
 * Create some service items to DB
 */
const populate = () => {

  const items = [
    {
        name: "foobar",
        description: "Test 1",
        imgUrl: "https://commons.wikimedia.org/wiki/Special:Random/Image",
        rating: 4
    },
    {
        name: "barfoo",
        description: "Test 2",
        imgUrl: "https://commons.wikimedia.org/wiki/Special:Random/Image",
        rating: 3
    },
  ];

  // NOTE: If you want (at some point) to process the responses further, do it functionally
  // in the pipeline with suitable callbacks
  items.map(item => {
    const payload = JSON.stringify(item);
    http.request({
      hostname: HOST,
      path: "/api/items",
      port: PORT,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": payload.length
      }
    }, res => {
      console.log(`statusCode: ${res.statusCode}`);
      res.on("data", d => {
        process.stdout.write(d)
      });
    }).on(
      "error", err => console.log(err)
    ).write(payload)
  })

}

populate();
