import { Given, When, Then } from '@cucumber/cucumber';
const expect = require('chai').expect;
import SearchScreen from '../screens/search.screen';


function parseDuration(durationText: string): number {
    const [minutes = 0, seconds = 0] = durationText.split(':').map(Number);
    return minutes + seconds / 60;
}

Given('the YouTube app is launched', async () => {
    await SearchScreen.clickSearchButton().catch(async () => {
        await $('-ios predicate string:type == "XCUIElementTypeButton" AND name CONTAINS "Search"').click();
    });
});

When(/^I search for "([^"]*)"$/, async (keyword: string) => {
    await SearchScreen.enterSearchKeyword(keyword);
    await SearchScreen.getVideoCells();
    await SearchScreen.openFilters();
    await SearchScreen.goBack();
});

Then(
    /^I should see videos with keyword "([^"]*)" or "([^"]*)" or "([^"]*)" under 5 minutes$/,
    { timeout: 180000 },
    async (kw1: string, kw2: string, kw3: string) => {
        for (let i = 0; i < 3; i++) {
            await browser.pause(1000);
        }

        const videoCells = await SearchScreen.getVideoCells();
        let matchingVideos = 0;

        for (const cell of videoCells) {
            try {
                const labelText = await (await cell.$('~eml.vwc')).getText();
                const hasKeyword = [kw1, kw2, kw3].some(k =>
                    labelText.toLowerCase().includes(k.toLowerCase())
                );

                let durationInMinutes = 0;
                const match = labelText.match(/(\d+)\s*minute/);
                if (match) durationInMinutes = parseInt(match[1], 10);

                if (hasKeyword && durationInMinutes < 5) {
                    console.log(`Found matching video: ${labelText} (${durationInMinutes} minutes)`);
                    matchingVideos++;
                    await SearchScreen.scrollDown();
                }
            } catch (err) {
                console.error('Error processing video:', err);
            }
        }

        if (matchingVideos === 0) {
            throw new Error(`No videos found with keywords ${kw1}, ${kw2}, or ${kw3} under 5 minutes`);
        }

        expect(matchingVideos).to.be.greaterThan(0);
        console.log(`Found ${matchingVideos} matching videos`);
    }
);
