(function() {
    var fixture = '<div data-role="view"> \
            <a href="#foo" data-rel="popover" data-role="button" id="fooAnchor">Open foo</a> \
            <div data-role="popover" id="foo"> \
                <div data-role="view"> \
                    Foo \
                </div> \
            </div> \
        </div>';

    var fixture2 = ' <div data-role="view"></div> \
        <div data-role="modalview" id="modalview"> \
            <a href="#foo" data-rel="popover" data-role="button" id="fooAnchor2">Open foo</a> \
            <div data-role="popover" id="foo"> \
                <div data-role="view"> \
                    Foo \
                </div> \
            </div> \
        </div>';

    var root,
        popOver,
        app;

    function setup(html) {
        root = $("<div />").html(html).appendTo(QUnit.fixture);
        location.hash = '';
        app = new kendo.mobile.Application(root);
    }

    function hidden(selector) {
        ok(!root.find(selector).is(":visible"));
    }

    function visible(selector) {
        ok(root.find(selector).is(":visible"));
    }

    function getPopOver() {
        return root.find("#foo").data("kendoMobilePopOver");
    }

    module("popover", {
        teardown: function() {
            app.destroy();
            popOver = null;
        }
    });

    asyncTest("detaches itself to the app container", 1, function(){
        setup(fixture);
        $(function() {
            start();
            equal(root.find("#foo").length, 1);
            app.destroy();
        });
    });

    asyncTest("is hidden initially", 1, function(){
        setup(fixture);
        $(function(){
            start();
            hidden("#foo");
        });
    });

    asyncTest("is visible when open", 1, function(){
        setup(fixture);
        $(function(){
            start();
            popOver = getPopOver();
            popOver.openFor(root.find("#fooAnchor"));
            visible("#foo");
        });
    });

    asyncTest("destroy removes the overlay", 1, function(){
        setup(fixture);
        $(function(){
            start();
            popOver = getPopOver();
            popOver.destroy();
            ok(!popOver.popup.overlay.parent().length);
        });

    });

    asyncTest("when in ModalView, its popup is used as parent", 1, function(){
        setup(fixture2);
        $(function(){
            start();
            popOver = getPopOver();
            popOver.openFor(root.find("#fooAnchor2"));

            ok(popOver.popup.overlay.parent()[0] == $("#modalview").data("kendoMobileModalView").wrapper[0]);
            app.destroy();
        });
    });

    asyncTest("provides target in event handler", 1, function(){
        setup(fixture);
        $(function(){
            popOver = getPopOver();
            popOver.bind("open", function(e) {
                start();
                equal(e.target[0], $("#fooAnchor")[0]);
            });
            tap(root.find("#fooAnchor"));
        });
    });

    asyncTest("is closed when close is called", 1, function(){
        setup(fixture);
        $(function(){
            start();

            popOver = getPopOver();
            popOver.openFor(root.find("#fooAnchor"));

            popOver.bind("close", function() {
                ok(false);
            });

            popOver.close();
            hidden("#foo");

        });
    });

    asyncTest("triggers close and closes when blurred", 2, function(){
        setup(fixture);
        $(function(){
            start();

            popOver = getPopOver();
            popOver.openFor(root.find("#fooAnchor"));

            popOver.bind("close", function() {
                ok(true);
                hidden("#foo");
            });

            popOver.popup.popup._resize({});


        });
    });
})();
