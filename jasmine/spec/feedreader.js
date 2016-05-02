/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("have URL", function() {
            allFeeds.forEach(function(val) {
                expect(val.url).toBeDefined();
                expect(val.url).not.toBe("");
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have name", function() {
            allFeeds.forEach(function(val) {
                expect(val.name).toBeDefined();
                expect(val.name).not.toBe("");
            });
        });
    });


    /* Test suite named "The menu" */
    describe("The menu", function() {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("is hidden by default", function() {
            expect(document.getElementsByTagName("body")[0].classList).toContain("menu-hidden");
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("toggles on click", function() {
            document.getElementsByClassName("menu-icon-link")[0].click();
            expect(document.getElementsByTagName("body")[0].classList).not.toContain("menu-hidden");

            document.getElementsByClassName("menu-icon-link")[0].click();
            expect(document.getElementsByTagName("body")[0].classList).toContain("menu-hidden");
        });
    });


    /* Test suite named "Initial Entries" */
    describe("Initial entries", function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("have at least one entry", function(done) {
            expect(document.querySelectorAll(".feed .entry").length).not.toBe(0);
            done();
        });
    });


    /* Test suite named "New Feed Selection" */
    describe("New feed selection", function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var oldFeed = "";
         var newFeed = "";
         
         beforeEach(function (done) {
            loadFeed(0, function () {
                // compare HTML strings
               oldFeed = document.getElementsByClassName("feed")[0].innerHTML;
               loadFeed(1, done);
            });
         });
         
         it("has different feed entries", function (done) {
             newFeed = document.getElementsByClassName("feed")[0].innerHTML;
             expect(newFeed).not.toBe(oldFeed);
             done();
         });
    });
}());
