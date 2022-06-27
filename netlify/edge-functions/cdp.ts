import { Context } from 'netlify:edge'

import deploy from '../../.netlify/deploy.json' assert { type: 'json' }

import { HTMLRewriter } from 'https://deno.land/x/html_rewriter@v0.1.0-pre.17/index.ts'

const { DEPLOY_ID, SITE_ID, DEPLOY_URL, VCS, CONTEXT, DEPLOY_PRIME_URL } =
  deploy

const DEPLOY_PREVIEW_HOSTNAME = new URL(DEPLOY_PRIME_URL).hostname

const snippet = `
<div data-netlify-deploy-id="${DEPLOY_ID}" data-netlify-site-id="${SITE_ID}" data-vcs="${VCS}" style="position:fixed">
<!-- This div is inserted by Netlify Edge Functions for all Deploy Preview URLs. -->
<!-- To view this deployment's commit permalink, visit ${DEPLOY_URL} -->
<script async src="https://netlify-cdp-loader.netlify.app/netlify.js"></script>
</div>`

const rewriter = new HTMLRewriter().on('body', {
  element(element) {
    element.onEndTag((endTag) => {
      endTag.before(snippet, { html: true })
    })
  },
})

export default async function handler(request: Request, { next }: Context) {
  if (
    CONTEXT !== 'deploy-preview' ||
    new URL(request.url).hostname !== DEPLOY_PREVIEW_HOSTNAME
  ) {
    return
  }
  return rewriter.transform(await next())
}
