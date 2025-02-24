import "umi/typings";

declare global {
  interface Window {
    setWebAppUserConfig?: any;
  }
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}
