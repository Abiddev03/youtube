// Custom type definitions for WebdriverIO
import { Element, ElementArray } from 'webdriverio';

declare global {
    namespace WebdriverIO {
        interface Element {
            $(selector: string): Promise<Element>;
            $$(selector: string): Promise<ElementArray>;
            waitForDisplayed(options?: { timeout?: number }): Promise<boolean>;
            waitForEnabled(options?: { timeout?: number }): Promise<boolean>;
            click(): Promise<void>;
            setValue(value: string): Promise<void>;
            getText(): Promise<string>;
        }
        
        interface ElementArray extends Array<Element> {}
    }
}
