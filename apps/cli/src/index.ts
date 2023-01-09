import readyPromise from './fetch-shim'

import {
  getAccounts,
  getBandwidthUsed,
  getBuildUsed,
} from '@lmk123/netlify-usage-api'

const token = process.env.NETLIFY_TOKEN

if (!token) {
  console.log('Please set the `NETLIFY_TOKEN` environment variable.')
} else {
  readyPromise.then(async () => {
    function byte2gb(number: number) {
      const n = number / 1024 / 1024 / 1024
      return n.toFixed(2)
    }

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
        )} GB, updated at ${new Date(
          bandwidth.last_updated_at
        ).toLocaleString()}`
      )
    })

    getBuildUsed(token, firstAccount.slug).then((build) => {
      // console.log(build)
      console.log(
        `Build minutes usage: ${build.minutes.current} / ${
          build.minutes.included_minutes
        }, updated at ${new Date(
          build.minutes.last_updated_at
        ).toLocaleString()}`
      )
    })
  })
}
