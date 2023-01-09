interface Account {
  // Team name
  name: string
  // Account slug, used for other API.
  slug: string
  // Account plan: Starter / Pro / Business / Enterprise
  type_name: string
  // A time string like this: 2022-12-14T00:00:00.000-08:00
  current_billing_period_start: string
  next_billing_period_start: string
}

/**
 * Get all accounts.
 * @see https://open-api.netlify.com/#tag/accountMembership/operation/listAccountsForUser
 * @param token
 */
export async function getAccounts(token: string): Promise<Account[]> {
  const res = await fetch(`https://api.netlify.com/api/v1/accounts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.ok) {
    return res.json()
  }

  throw new Error('Fetch fails.', { cause: res })
}

interface BandwidthInfo {
  used: number
  included: number
  additional: number
  last_updated_at: string
  period_start_date: string
  period_end_date: string
}

/**
 * Get bandwidth usage.
 * @see https://answers.netlify.com/t/14155
 * @param token
 * @param slug
 */
export async function getBandwidthUsed(
  token: string,
  slug: string
): Promise<BandwidthInfo> {
  const res = await fetch(
    `https://api.netlify.com/api/v1/accounts/${slug}/bandwidth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (res.ok) {
    return res.json()
  }

  throw new Error('Fetch fails.', { cause: res })
}

interface BuildInfo {
  minutes: {
    current: number
    included_minutes: number
    last_updated_at: string
    period_start_date: string
    period_end_date: string
  }
  build_count: number
}

/**
 * Get build usage.
 * @see https://answers.netlify.com/t/13075
 * @param token
 * @param slug
 */
export async function getBuildUsed(
  token: string,
  slug: string
): Promise<BuildInfo> {
  const res = await fetch(
    `https://api.netlify.com/api/v1/${slug}/builds/status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (res.ok) {
    return res.json()
  }

  throw new Error('Fetch fails.', { cause: res })
}
