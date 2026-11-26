declare module "*.scss" {
    interface IClassNames {
        [className: string]: string
    }

    const classNames: IClassNames;
    export = classNames;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module '*.svg' {
    import React from 'react';
    const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default SVGComponent;
}

declare module '*.svg?url' {
    const url: string;
    export default url;
}

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;