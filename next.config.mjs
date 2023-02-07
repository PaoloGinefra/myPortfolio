// next.config.js
import mdx from '@next/mdx'
import remarkGFM from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter';
import rehypeHighlight from 'rehype-highlight';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkFrontmatter, remarkGFM],
    rehypePlugins: [rehypeHighlight],
    providerImportSource: '@mdx-js/react',
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  images:{
    domains: [
      'upload.wikimedia.org'
    ],
  },
})

export default nextConfig;