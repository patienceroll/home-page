declare module '*.less';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGAElement>,
  ): React.ReactElement<SVGAElement>;
}
