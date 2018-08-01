const path = require('path')
const setUpDevServer = require('./../setup.dev.server')
const { createBundleRenderer } = require('vue-server-renderer')

function resolve(dir) {
  return path.resolve(process.cwd(), dir)
}

function createRenderer(bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    basedir: resolve('./public'),
    runInNewContext: false
  }))
}

let renderer
let readyPromise
const templatePath = resolve('index.template.html')
readyPromise = setUpDevServer(
  app,
  templatePath,
  (bundle, options) => {
    renderer = createRenderer(bundle, options)
  }
)

function render(req, res) {
  const s = Date.now()
  res.setHeader("Content-Type", "text/html")

  const handleError = err => {
    console.log(err.url)
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = { title: 'Vue HN 2.0', url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    console.log(`whole request: ${Date.now() - s}ms`)
  })
}

module.exports = async function (ctx, next) {
  readyPromise.then(() => {
    render(ctx.request, ctx.)
  })
}