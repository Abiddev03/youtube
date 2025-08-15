
class SearchScreen {
    // Locators
    get searchButton() {
        return $('~id.ui.navigation.search.button');
    }
    get searchInput() {
        return $('//XCUIElementTypeSearchField');
    }
    get moreButton() {
        return $('~id.settings.overflow.button');
    }
    get searchFiltersButton() {
        return $('-ios predicate string:label == "Search filters"');
    }
    get videoFilterButton() {
        return $('-ios predicate string:label CONTAINS "Video"');
    }

    get under4Minutes() {
        return $('-ios predicate string:label CONTAINS "Under 4 minutes"');
    }

    get backButton() {
        return $('~id.ui.browse.back.button');
    }
    get videoCells() {
        return $$('~eml.vwc');
    }

    // Actions
    async clickSearchButton() {
        await this.searchButton.waitForDisplayed({ timeout: 15000 });
        await this.searchButton.waitForEnabled({ timeout: 15000 });
        await this.searchButton.click();
    }

    async enterSearchKeyword(keyword: string) {
        await this.searchInput.waitForDisplayed({ timeout: 15000 });
        await this.searchInput.setValue(keyword + '\n');
    }

    async openFilters() {
        await this.moreButton.waitForDisplayed({ timeout: 15000 });
        await this.moreButton.waitForEnabled({ timeout: 15000 });
        await this.moreButton.click();

        await this.searchFiltersButton.waitForDisplayed({ timeout: 15000 });
        await this.searchFiltersButton.waitForEnabled({ timeout: 15000 });
        await this.searchFiltersButton.click();

        await this.videoFilterButton.waitForDisplayed({ timeout: 15000 });
        await this.videoFilterButton.waitForEnabled({ timeout: 15000 });
        await this.videoFilterButton.click();
        await this.scrollDown();

        await this.under4Minutes.waitForDisplayed({ timeout: 15000 });
        await this.under4Minutes.waitForEnabled({ timeout: 15000 });
        await this.under4Minutes.click();
    }

    async goBack() {
        await this.backButton.waitForDisplayed({ timeout: 15000 });
        await this.backButton.waitForEnabled({ timeout: 15000 });
        await this.backButton.click();
    }

    async getVideoCells() {
        await browser.waitUntil(async () => {
            const elements = await this.videoCells;
            return elements.length > 0;
        }, {
            timeout: 15000,
            timeoutMsg: 'No video results loaded'
        });
        return this.videoCells;
    }

    async scrollDown() {
        const { width, height } = await browser.getWindowRect();
        const startX = Math.floor(width / 2);
        const startY = Math.floor(height * 0.8);
        const endY = Math.floor(height * 0.2);

        await browser.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 800, x: startX, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);
        await browser.releaseActions();
    }
}

export default new SearchScreen();
