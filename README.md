# CDP on the edge

This is an example of using an edge function to inject the collaborative deploy preview snippet in dynamic pages. This uses HTMLRewriter, which is a high-performance streaming HTML parser from Cloudflare.

It currently needs a build plugin because the site ID, deploy ID etc aren't available to the edge function. The plugin writes those values to a JSON file that is imported into the edge function.
