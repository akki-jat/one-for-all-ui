/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DarkShadow {
        "animation": { open: any; close: any; };
        "close": () => Promise<void>;
        "closeOnOutsideClick": boolean;
        "isDarkOutside": boolean;
        "open": () => Promise<void>;
        "shadowTitle": string;
        "showCloseIcon": boolean;
        "visible": boolean;
        "width": string;
    }
    interface QuirkBoomerang {
        "displayCount": | { small: string, medium: string, large: string }
    | string | number;
        "moveButtonInaccessibleBehaviour": "disable" | "hide";
        "moveCount": number;
        "moveQuirk": (isMoveForward: boolean | undefined, moveElementIndex?: number | undefined) => Promise<void>;
        "totalElements": number;
    }
    interface SpecialCard {
        "borderRadius": string;
        "cardSubtitle": string;
        "cardTitle": string;
        "elevation": number;
        "height": string;
        "hoverElevation": number;
        "showHeader": boolean;
        "width": string;
    }
    interface ZeroGravityButton {
        "color": "primary" | "secondary";
        "elevation": number;
        "hoverElevation": number;
        "overlap": boolean;
        "position": | "custom"
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
        "radius": string;
        "ripple": boolean;
        "size": "small" | "medium" | "large";
        "variant": "round" | "extended";
    }
}
declare global {
    interface HTMLDarkShadowElement extends Components.DarkShadow, HTMLStencilElement {
    }
    var HTMLDarkShadowElement: {
        prototype: HTMLDarkShadowElement;
        new (): HTMLDarkShadowElement;
    };
    interface HTMLQuirkBoomerangElement extends Components.QuirkBoomerang, HTMLStencilElement {
    }
    var HTMLQuirkBoomerangElement: {
        prototype: HTMLQuirkBoomerangElement;
        new (): HTMLQuirkBoomerangElement;
    };
    interface HTMLSpecialCardElement extends Components.SpecialCard, HTMLStencilElement {
    }
    var HTMLSpecialCardElement: {
        prototype: HTMLSpecialCardElement;
        new (): HTMLSpecialCardElement;
    };
    interface HTMLZeroGravityButtonElement extends Components.ZeroGravityButton, HTMLStencilElement {
    }
    var HTMLZeroGravityButtonElement: {
        prototype: HTMLZeroGravityButtonElement;
        new (): HTMLZeroGravityButtonElement;
    };
    interface HTMLElementTagNameMap {
        "dark-shadow": HTMLDarkShadowElement;
        "quirk-boomerang": HTMLQuirkBoomerangElement;
        "special-card": HTMLSpecialCardElement;
        "zero-gravity-button": HTMLZeroGravityButtonElement;
    }
}
declare namespace LocalJSX {
    interface DarkShadow {
        "animation"?: { open: any; close: any; };
        "closeOnOutsideClick"?: boolean;
        "isDarkOutside"?: boolean;
        "onAfterHideCallback"?: (event: CustomEvent<any>) => void;
        "onAfterShowCallback"?: (event: CustomEvent<any>) => void;
        "onBeforeHideCallback"?: (event: CustomEvent<any>) => void;
        "onBeforeShowCallback"?: (event: CustomEvent<any>) => void;
        "shadowTitle"?: string;
        "showCloseIcon"?: boolean;
        "visible"?: boolean;
        "width"?: string;
    }
    interface QuirkBoomerang {
        "displayCount"?: | { small: string, medium: string, large: string }
    | string | number;
        "moveButtonInaccessibleBehaviour"?: "disable" | "hide";
        "moveCount"?: number;
        "totalElements"?: number;
    }
    interface SpecialCard {
        "borderRadius"?: string;
        "cardSubtitle"?: string;
        "cardTitle"?: string;
        "elevation"?: number;
        "height"?: string;
        "hoverElevation"?: number;
        "showHeader"?: boolean;
        "width"?: string;
    }
    interface ZeroGravityButton {
        "color"?: "primary" | "secondary";
        "elevation"?: number;
        "hoverElevation"?: number;
        "overlap"?: boolean;
        "position"?: | "custom"
    | "top-left"
    | "top-center"
    | "top-right"
    | "center-left"
    | "center-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
        "radius"?: string;
        "ripple"?: boolean;
        "size"?: "small" | "medium" | "large";
        "variant"?: "round" | "extended";
    }
    interface IntrinsicElements {
        "dark-shadow": DarkShadow;
        "quirk-boomerang": QuirkBoomerang;
        "special-card": SpecialCard;
        "zero-gravity-button": ZeroGravityButton;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dark-shadow": LocalJSX.DarkShadow & JSXBase.HTMLAttributes<HTMLDarkShadowElement>;
            "quirk-boomerang": LocalJSX.QuirkBoomerang & JSXBase.HTMLAttributes<HTMLQuirkBoomerangElement>;
            "special-card": LocalJSX.SpecialCard & JSXBase.HTMLAttributes<HTMLSpecialCardElement>;
            "zero-gravity-button": LocalJSX.ZeroGravityButton & JSXBase.HTMLAttributes<HTMLZeroGravityButtonElement>;
        }
    }
}
