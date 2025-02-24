
import { type IApi } from 'umi'

export default (api: IApi) => {
  api.modifyConfig(async (memo) => {
    const remarkGfm = (await import('remark-gfm')).default

    memo.mdx = {
      loader: '@mdx-js/loader',
      loaderOptions: {
        remarkPlugins: [remarkGfm],
      },
    }
    return memo
  })
}