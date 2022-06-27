const { join } = require('path')
const { writeFile } = require('fs/promises')

exports.onBuild = () => {
  const {
    DEPLOY_ID,
    SITE_ID = 0,
    DEPLOY_URL,
    VCS = 'github',
    CONTEXT,
    DEPLOY_PRIME_URL,
  } = process.env
  return writeFile(
    join('.netlify', 'deploy.json'),
    JSON.stringify({
      DEPLOY_ID,
      SITE_ID,
      DEPLOY_URL,
      VCS,
      CONTEXT,
      DEPLOY_PRIME_URL,
    })
  )
}
