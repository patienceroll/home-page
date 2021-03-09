declare module "*.less";
declare module "*.jpg";
declare module "*.svg" {
    function ReactComponent(props: React.SVGProps<SVGAElement>): React.ReactElement;
    export default ReactComponent;
}
