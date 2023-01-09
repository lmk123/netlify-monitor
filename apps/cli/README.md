# netlify-usage-cli

A cli program to print out the usage of netlify.

1. Installing with npm: `npm i -g @lmk123/netlify-usage-cli`
2. Create a Netlify token: [https://app.netlify.com/user/applications#personal-access-tokens](https://app.netlify.com/user/applications#personal-access-tokens)

Then:

```zsh
$ export NETLIFY_TOKEN=<YOUR_TOKEN_HERE>
$ nuc
```

If all is well, the console will output the following:

```text
Team name: my team
Current usage period: 12/14/2022, 4:00:00 PM to 1/14/2023, 4:00:00 PM
Build minutes usage: 12 / 300, updated at 1/9/2023, 3:07:29 PM
Bandwidth usage: 21.63 GB / 100.00 GB, updated at 1/9/2023, 3:07:29 PM
```
