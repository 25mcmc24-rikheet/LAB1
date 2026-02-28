(function ($) {

    $.fn.advancedTabs = function (userOptions) {

        const config = $.extend({
            activeClass: "active",
            animationSpeed: 200,
            defaultTab: null
        }, userOptions);

        return this.each(function () {

            const wrapper = $(this);
            const navItems = wrapper.find(".nav-tabs li");
            const panels = wrapper.find(".content-panel");

            function activateTab(targetId) {

                if (!$(targetId).length) return;

                navItems.removeClass(config.activeClass);
                navItems.filter(`[data-target="${targetId}"]`)
                        .addClass(config.activeClass);

                panels.stop(true, true).fadeOut(0);
                $(targetId).fadeIn(config.animationSpeed);

                if (window.location.hash !== targetId) {
                    history.replaceState(null, null, targetId);
                }
            }

            navItems.on("click", function () {
                const target = $(this).attr("data-target");
                activateTab(target);
            });

            navItems.on("keydown", function (event) {

                const currentIndex = navItems.index(this);

                if (event.key === "ArrowRight") {
                    const nextIndex = (currentIndex + 1) % navItems.length;
                    navItems.eq(nextIndex).focus().trigger("click");
                }

                if (event.key === "ArrowLeft") {
                    const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
                    navItems.eq(prevIndex).focus().trigger("click");
                }
            });

            $(window).on("hashchange", function () {
                if (window.location.hash) {
                    activateTab(window.location.hash);
                }
            });

            let initialTab = config.defaultTab;

            if (window.location.hash) {
                initialTab = window.location.hash;
            }

            if (!initialTab) {
                initialTab = navItems.first().attr("data-target");
            }

            activateTab(initialTab);

        });
    };

})(jQuery);