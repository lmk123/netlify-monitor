export default import('node-fetch').then((imported) => {
  // @ts-ignore
  global.Request = imported.Request
  // @ts-ignore
  global.Response = imported.Response
  // @ts-ignore
  global.fetch = imported.default
  // @ts-ignore
  global.FormData = imported.FormData
  // @ts-ignore
  global.Headers = imported.Headers
})
