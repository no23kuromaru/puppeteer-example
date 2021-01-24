const puppeteer = require('puppeteer');
const csv = require("csv-writer");

(async () => {
  const selectors = require('./data/selectors.js')
  const targetPage = require('./data/sites')

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    slowMo: 1000,
    timeout: 0,
    waitUntil: "load"
  });

  let datas = [];

  for (let i = 0; i < targetPage.length; i++) {
    try {
      console.log(targetPage[i].url)

      const page = await browser.newPage();
      await page.goto(targetPage[i].url, {
        timeout: 1000 * 60
      })

      // モバイルキャプチャ
      await page.setViewport({
        width: 375,
        height: 667,
        isMobile: true,
      })
      await page.screenshot({
        type: 'png',
        path: './img/' + targetPage[i].site + '-sp.png',
        fullPage: true
      })

      // PCキャプチャ
      await page.setViewport({
        width: 1600,
        height: 768,
        isMobile: false,
      })
      await page.screenshot({
        type: 'png',
        path: './img/' + targetPage[i].site + '.png',
        fullPage: true
      })

      const temp = await page.evaluate((searches, site, url) => {
        const data = []
        searches.forEach((selector) => {
          const type = selector.type
          if (type === 'single') {
            const element = document.querySelector(selector.selector)
            if (element) {
              data.push({
                site: site,
                name: selector.name,
                result: element[selector.target],
                index: 1,
                url: url
              })
            } else {
              data.push({
                site: site,
                name: selector.name,
                result: null,
                index: 1,
                url: url
              })
            }
          } else {
            const elements = document.querySelectorAll(selector.selector)
            if (elements.length) {
              for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (element && element[selector.target]) {
                  data.push({
                    site: site,
                    name: selector.name,
                    result: element[selector.target],
                    index: i + 1,
                    url: url
                  })
                } else {
                  data.push({
                    site: site,
                    name: selector.name,
                    result: null,
                    index: i + 1,
                    url: url
                  })
                }
              }
            } else {
              data.push({
                site: site,
                name: selector.name,
                result: null,
                index: 1,
                url: url
              })
            }
          }
        })

        return data
      }, selectors, targetPage[i].site, targetPage[i].url);

      await page.close()

      datas = [...datas, ...temp]
    } catch (e) {
      console.error(e)
    }
  }

  await browser.close();

  const csvWriter = csv.createObjectCsvWriter({
    path: __dirname + "/dist/result.csv",
    header: [
      {id: 'site', title: 'サイト'},
      {id: 'name', title: 'セレクタ名'},
      {id: 'result', title: '結果'},
      {id: 'index', title: 'カウント'},
      {id: 'url', title: 'URL'}
    ],
    encoding: 'utf8',
    append: false,
  });
  csvWriter.writeRecords(datas)
    .then(() => {
      console.log('Done');
    })
})()
