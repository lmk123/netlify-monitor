require('dotenv').config()

const {
  getCurrentUser,
  getAccounts,
  getBandwidthUsed,
  getBuildUsed,
} = require('./dist/index.js')

function byte2gb(number) {
  const n = number / 1024 / 1024 / 1024
  return n.toFixed(2)
}

async function main(token) {
  const user = await getCurrentUser(token)
  // console.log(user)

  console.log(`Username: ${user.full_name}`)

  const accounts = await getAccounts(token)
  const firstAccount = accounts[0]

  console.log(`Team name: ${firstAccount.name}`)

  console.log(
    `Current usage period: ${new Date(
      firstAccount.current_billing_period_start
    ).toLocaleString()} to ${new Date(
      firstAccount.next_billing_period_start
    ).toLocaleString()}`
  )

  getBandwidthUsed(token, firstAccount.slug).then((bandwidth) => {
    // console.log(bandwidth)
    console.log(
      `Bandwidth usage: ${byte2gb(bandwidth.used)} GB / ${byte2gb(
        bandwidth.included
      )} GB, updated at ${new Date(bandwidth.last_updated_at).toLocaleString()}`
    )
  })

  getBuildUsed(token, firstAccount.slug).then((build) => {
    // console.log(build)
    console.log(
      `Build minutes usage: ${build.minutes.current} / ${
        build.minutes.included_minutes
      }, updated at ${new Date(build.minutes.last_updated_at).toLocaleString()}`
    )
  })
}

if (process.env.NETLIFY_TOKEN) {
  main(process.env.NETLIFY_TOKEN)
} else {
  console.log('Setup environment variable `NETLIFY_TOKEN` first.')
}
