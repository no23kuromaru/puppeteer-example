module.exports = [
  {
    name: "title",
    selector: "title",
    target: "innerText",
    type: "single"
  },
  {
    name: "description",
    selector: "meta[name='description']",
    target: "content",
    type: "single"
  },
  {
    name: "author",
    selector: "meta[name='author']",
    target: "content",
    type: "single"
  },
  {
    name: "keywords",
    selector: "meta[name='keywords']",
    target: "content",
    type: "single"
  },
  {
    name: "og:title",
    selector: "meta[property='og:title']",
    target: "content",
    type: "single"
  },
  {
    name: "og:type",
    selector: "meta[property='og:type']",
    target: "content",
    type: "single"
  },
  {
    name: "og:url",
    selector: "meta[property='og:url']",
    target: "content",
    type: "single"
  },
  {
    name: "og:image",
    selector: "meta[property='og:image']",
    target: "content",
    type: "single"
  },
  {
    name: "og:site_name",
    selector: "meta[property='og:site_name']",
    target: "content",
    type: "single"
  },
  {
    name: "og:description",
    selector: "meta[property='og:description']",
    target: "content",
    type: "single"
  },
  {
    name: "twitter:card",
    selector: "meta[name='twitter:card']",
    target: "content",
    type: "single"
  },
  {
    name: "twitter:site",
    selector: "meta[name='twitter:site']",
    target: "content",
    type: "single"
  }
]
