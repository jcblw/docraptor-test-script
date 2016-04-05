#! /usr/bin/env node

const request = require('request')
const fs = require('fs')
const url = require('url')
const _url = process.argv[2]
const output = process.argv[3] || 'doc_raptor_sample.pdf'

if (!_url) throw new Error(`url param not set`)

const urlsegs = url.parse(_url)
const baseurl = `${urlsegs.protocol}//${urlsegs.host}/`

console.log(`Base url: ${baseurl}`, _url)
const config = {
  url: 'https://docraptor.com/docs',
  encoding: null, //IMPORTANT! This produces a binary body response instead of text
  headers: {
    'Content-Type': 'application/json'
  },
  json: {
    user_credentials: 'YOUR_API_KEY_HERE',
    doc: {
      document_url: _url,
      name: 'test.pdf',
      document_type: 'pdf',
      test: true,
      prince_options: {
        javascript: true,
        baseurl: baseurl,
        media: 'print'
      }
    }
  }
}

request.post(config, (err, response, body) => {
  if (err) throw err
  // console.log(body.toString());
  fs.writeFile(output, body, "binary", (err) => {
    if (err) throw err
    console.log(`Generated ${output}`)
  })
})
