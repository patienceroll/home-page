declare module "*.less";
declare module "*.jpg";
declare module "*.svg" {
    // export function ReactComponent(props: React.SVGProps<SVGAElement>): React.ReactElement;
    const importAsUrl: string;
    export default importAsUrl;
}
