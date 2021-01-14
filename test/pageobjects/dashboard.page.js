const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DashboardPage extends Page {
    /**
     * define selectors using getter methods
     */
    get headerAlert () { return $('.heading-local') }
}

module.exports = new DashboardPage();
