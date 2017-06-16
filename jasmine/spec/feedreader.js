/* All tests placed within the $() function,
 * to ensure they don"t run until the DOM is ready.
 */
$(function() {
   // First Test Suite
    describe("RSS Feeds", function() {

        var i=0,
            len;
        
        // Test to check allFeeds variable has been defined and that it is not empty        
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that loops through each feed in allFeeds to ensures it has a URL defined and not empty
        function testForUrl(allFeeds) {
            it("all feeds should have urls", function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds).not.toBe("");
            });
        }

        for (i = 0, len = allFeeds.length; i < len; i++) {
            testForUrl(allFeeds[i].url);
        }

        // Test that loops through each feed in allFeeds and ensures name is defined and not empty.
        function testForName(allFeeds) {
            it("all feeds should have names", function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds).not.toBe("");
            });
        }

        for (i = 0; i < allFeeds.length; i++) {
            testForName(allFeeds[i].name);
        }

    });

    // Second test suite
    describe("The menu", function() {

        var body = document.body;

        // Test that menu element is hidden by default
        it("hidden menu", function() {
            expect($(body).hasClass("menu-hidden")).toBe(true);
        });

        // Test that the menu changes visibility when the menu icon is clicked
        it("toggle menu visibility on click", function() {
            
            // Shows when clicked
            $("a.menu-icon-link").click();
            expect($(body).hasClass("menu-hidden")).toBe(false);
            
            // Hides when clicked again
            $("a.menu-icon-link").click();
            expect($(body).hasClass("menu-hidden")).toBe(true);

        });

    });




    /* Third test suite" */
    describe("Initial Entries", function() {

        /* Write a test that ensures 
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine"s beforeEach and asynchronous done() function.
         */
        // Test when loadFeed() is called and completes, there is at least one .entry element in .feed div.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("async loadFeed provides at least one entry", function() {
            expect($("div.feed a.entry-link article.entry").length).not.toBe(0);
        });

    });


    // Forth test suite
    describe("New Feed Selection", function() {
        
        // Test when a new feed is loaded by loadFeed(), the content updates
        /* Programmatically, what I need
         * beforeEach load the first feed and note the content of its children in a var
         * load the second feed and note the content of its children in a var
         * compare the oldFeed to the newFeed to check they are different.
         */
        var oldFeed,
            newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $(".feed").children().text();
                done();
            });
        });

        it("content updated on new loadFeed", function(done) {
            loadFeed(1, function() {
                newFeed = $(".feed").children().text();
                expect(oldFeed).not.toEqual(newFeed);
                done();
            });
            
        });

    });

}());