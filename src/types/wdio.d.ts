declare namespace WebdriverIO {
    interface Browser {
        $: (selector: string) => Promise<Element>;
        $$: (selector: string) => Promise<Element[]>;
        takeScreenshot: () => Promise<string>;
        waitUntil: (condition: () => Promise<boolean>, options?: { timeout?: number; timeoutMsg?: string }) => Promise<void>;
        setTimeout: (timeouts: { implicit?: number }) => Promise<void>;
    }

    interface Element {
        $(selector: string): Promise<Element>;
        $$(selector: string): Promise<Element[]>;
        waitForDisplayed(options?: { timeout?: number }): Promise<boolean>;
        waitForEnabled(options?: { timeout?: number }): Promise<boolean>;
        click(): Promise<void>;
        setValue(value: string): Promise<void>;
        getText(): Promise<string>;
        isDisplayed(): Promise<boolean>;
        isEnabled(): Promise<boolean>;
        isExisting(): Promise<boolean>;
    }

    interface ElementArray extends Array<Element> {}
}

declare const browser: WebdriverIO.Browser;
declare const $: (selector: string) => Promise<WebdriverIO.Element>;
declare const $$: (selector: string) => Promise<WebdriverIO.Element[]>;

declare module '@wdio/globals' {
    export const browser: WebdriverIO.Browser;
    export const $: (selector: string) => Promise<WebdriverIO.Element>;
    export const $$: (selector: string) => Promise<WebdriverIO.Element[]>;
}
