
$(document).ready(function () {

    $("#dock_title_arrow").find("img").attr("src", "/Images/Icons/arrow-left.png");

    var rdock = new Dock();
    //var ldock = new Dock();

    rdock.isDragEnabled = true;
    //ldock.isDragEnabled = true;

    rdock.init("dock-right", "right", "content", "tab1", document.getElementById('my-right-dock'), true, "/Images/Icons/arrow-left.png", "/Images/Icons/arrow-right.png", "_right_arrow_image");
    //ldock.init("dock-left", "left", "content", "tab1", document.getElementById('my-left-dock'), true, "/Images/Icons/arrow-right.png", "/Images/Icons/arrow-left.png", "_left_arrow_image");

    var rightTabWindowNamesArray = [];
    //var leftTabWindowNamesArray = [];
    var rightTabNamesArray = [];
    //var leftTabNamesArray = [];

    $("[id$=_dock_right_tab_window]").each(function () {
        rightTabWindowNamesArray.push({ id: $(this)[0].id });
    });

    //$("[id$=_dock_left_tab_window]").each(function () {
    //    leftTabWindowNamesArray.push({ id: $(this)[0].id });
    //});

    $("[id$=_dock_right_title]").each(function () {
        rightTabNamesArray.push({ id: $(this)[0].id });
    });

    //$("[id$=_dock_left_title]").each(function () {
    //    leftTabNamesArray.push({ id: $(this)[0].id });
    //});

    rdock.setTabWindowNames(rightTabWindowNamesArray);
    //ldock.setTabWindowNames(leftTabWindowNamesArray);
    rdock.setTabNames(rightTabNamesArray);
    //ldock.setTabNames(leftTabNamesArray);

    $("[id$=_right_dragger]").mousedown(function (e) {
        rdock.dragBegin(e);
    });

    //$("[id$=_left_dragger]").mousedown(function (e) {
    //    ldock.dragBegin(e);
    //});

    $("[id$=_title_right_arrow]").click(function () {

        if (!rdock.isDockOpen) {
            rdock.openDock();
        }
        else {
            rdock.closeDock();
        }

    });

    /*$("[id$=_title_left_arrow]").click(function () {

        if (!ldock.isDockOpen) {
            ldock.openDock();
        }
        else {
            ldock.closeDock();
        }

    });*/

    $("[id$=_dock_right_title]").click(function () {

        if (!rdock.isDockOpen) {
            rdock.openDock();
        }

        rdock.openTab($(this).attr("data-tab-index"));
    });

    /*$("[id$=_dock_left_title]").click(function () {

        if (!ldock.isDockOpen) {
            ldock.openDock();
        }

        ldock.openTab($(this).attr("data-tab-index"));
    });*/

    $(window).resize(function () {
        rdock.recalculateUI();
        //ldock.recalculateUI();
    });

});

function Browser() {

    var _userAgent, _i;

    this.isWebKitBased = false;
    this.isGeckoBased = false;
    this.isIE = false;

    _userAgent = navigator.userAgent;

    if ((i = _userAgent.indexOf("MSIE")) >= 0) {
        this.isIE = true;
        return;
    }

    if ((i = _userAgent.indexOf("Chrome")) >= 0 || (i = _userAgent.indexOf("Safari")) >= 0) {
        this.isWebKitBased = true;
        return;
    }

    if ((i = _userAgent.indexOf("Firefox")) >= 0) {
        this.isGeckoBased = true;
        this.isWebKitBased = true;
        return;
    }

}

//
//  When using this function, new to create a variable and must call new on it.
//  Other wise, bad stuff will happen. :)
//
//  Ex: var myVariable = new Dock();    // this is basically allocating the object
//
function Dock() {

    var _dockArrowOpenerCloserName = '';
    var _dockName = '';
    var _dockObj = null;
    var _dockPosition = '';                     //  needs to be either left, right, top, bottom
    var _dockWidth = 0;
    var _dockDefaultWidth = 45;
    var _dockDefaultTabContainerWidth = 40;
    var _dockDefaultWidthForOpen = 350;
    var _dockWindowContainerWidth = 0;
    var _contentName = '';
    var _contentWidth = 0;
    var _defaultTabName = '';
    var _currentTabName = '';
    var _tabNames = [];
    var _tabWindowNames = [];
    var _openArrowIndicatorImagePath = '';
    var _closeArrowIndicatorImagePath = '';

    //  Indicates that a drag is currently being performed.
    //  Gets switched on on 'this.dragBegin' and is switched off on 'var dragEnd = function () {'
    var _dragCurrentlyEnabled = false;
    var _dragWasPerformed = false;
    var _browser = new Browser();
    var _dragObj = new Object();
    var _currentDragDistance = 0;
    var _uiCurrentlyBeingRecalculated = false;
    var _contentResizable = false;

    //
    //  this.variable acts as a public variable, the myVariable ex up top, just above 'function Dock() {' will have access to it.
    //  
    //  If you set any of these after the variable allocation, make sure to set these before calling init function.
    //
    this.isDockOpen = false;
    this.isDragEnabled = false;

    //
    //  This is basically our constructor
    //
    this.init = function (dockName, dockPosition, contentName, defaultTabName, dock, contentResizable, openArrowIndicatorImagePath, closeArrowIndicatorImagePath, dockArrowOpenerCloserName) {
        _dockName = "." + dockName;
        _dockPosition = dockPosition;
        _contentName = "." + contentName;
        _defaultTabName = defaultTabName;
        _dockObj = dock;
        _contentResizable = contentResizable;
        _openArrowIndicatorImagePath = openArrowIndicatorImagePath;
        _closeArrowIndicatorImagePath = closeArrowIndicatorImagePath;
        _dockArrowOpenerCloserName = dockArrowOpenerCloserName;

        _dragObj.zIndex = 0;

        _contentWidth = $(_contentName).width();
        setDockWidth($(_dockName).width());

        if (!this.isDragEnabled) {
            $(".dock-dragger").attr("style", "cursor:none;");
        }

        resizeContent();
    }

    //
    //  When mousedown is registered, this function will be called and which then setups of the neccessary x,y calcs and handling
    //  of hooking up the mousemove and mouseup events.
    //
    this.dragBegin = function (e) {

        if (this.isDragEnabled) {

            _dragCurrentlyEnabled = true;

            if (!_dragWasPerformed) {
                _dragWasPerformed = true;
            }

            if (!this.isDockOpen) {
                this.openTab("1");
            }

            this.isDockOpen = true;

            $("[id$=" + _dockArrowOpenerCloserName + "]").attr("src", _closeArrowIndicatorImagePath);

            _dragObj.elNode = _dockObj;

            var isIE = _browser.isIE;
            var isWebKitBased = _browser.isWebKitBased;

            var x, y;

            if (isIE) {
                x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
                y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
            }

            if (isWebKitBased) {
                x = e.clientX + window.scrollX;
                y = e.clientY + window.scrollY;
            }

            _dragObj.cursorStartX = x;
            _dragObj.cursorStartY = y;

            if (_dockPosition === "left") {
                _dragObj.elStartLeft = 0;
            }

            if (_dockPosition === "right") {
                _dragObj.elStartLeft = $(window).width() - _dockDefaultWidth;
            }

            _dragObj.elNode.style.zIndex = ++_dragObj.zIndex;

            if (isIE) {
                document.attachEvent("onmousemove", dragContinue);
                document.attachEvent("onmouseup", dragEnd);
                window.event.cancelBubble = true;
                window.event.returnValue = false;
            }

            if (isWebKitBased) {
                document.addEventListener("mousemove", dragContinue, true);
                document.addEventListener("mouseup", dragEnd, true);
                e.preventDefault();
            }
        }

    }

    //
    //  Open the dock
    //
    this.openDock = function () {

        $("[id$=" + _dockArrowOpenerCloserName + "]").attr("src", _closeArrowIndicatorImagePath);

        setDockWidth(_dockDefaultWidthForOpen);

        resizeContent();

        this.openTab("1");

        if (_dockPosition == "right") {
            _dockObj.style.left = "";
        }

        this.isDockOpen = true;

    }

    //  
    //  Open a particular tab
    //
    this.openTab = function (tabIndex) {

        hideAllTabs();

        deselectAllTabs();

        for (var i = 0; i < _tabNames.length; i++) {
            if ($("#" + _tabNames[i].id).attr("data-tab-index") == tabIndex) {
                _currentTabName = "#" + _tabWindowNames[i].id;
                $(_currentTabName).show();
                $("#" + _tabNames[i].id).attr("style", "background-color:#b0b0b0;");
            }
        }

        setDockWindowWidth();

    }

    //
    //  Close the dock, perform any neccessary clean up and what not
    //
    this.closeDock = function () {

        setDockWidth(_dockDefaultWidth);

        deselectAllTabs();

        resetDockPosition();

        resizeContent();

        $("[id$=" + _dockArrowOpenerCloserName + "]").attr("src", _openArrowIndicatorImagePath);

        this.isDockOpen = false;

    }

    //
    //  Maintain a list of all tab windows (used when wishing to hide all tab windows)
    //
    this.setTabWindowNames = function (tabWindowNames) {
        _tabWindowNames = tabWindowNames;
    }

    //  
    //  Maintain a list of all tabs (tab titles)
    //
    this.setTabNames = function (tabNames) {
        _tabNames = tabNames;
    }


    //
    //  Used because when the browser is resized, the nav gets messed up, this fixes it.
    //
    this.recalculateUI = function () {

        _uiCurrentlyBeingRecalculated = true;

        if (!this.isDockOpen) {
            resetDockPosition();
        }

        if (_dragWasPerformed) {
            moveDockToNewPosition(_dockWidth);
        }

        setDockWidth(_dockWidth);

        _dockObj.style.right = 0;

        resizeContent();
    }

    //  --------------------------------------
    //  Private functions below here
    //  --------------------------------------

    var setDockWidth = function (width) {

        _dockWidth = width;
        $(_dockName).width(_dockWidth);

        //  When setting width, recalculate height
        $(_dockName).height($(window).height() - 3);
    }

    var setDockWindowWidth = function () {

        $(_currentTabName).width((_dockWidth - _dockDefaultTabContainerWidth) - 5);

        //  When setting width, recalculate height
        $(_currentTabName).height($(window).height() - 3);
    }

    var setContentWidth = function (width) {
        _contentWidth = width;
        $(_contentName).width(_contentWidth);
    }

    var resizeContent = function () {

        if (_contentResizable) {
            if (_uiCurrentlyBeingRecalculated) {
                setContentWidth($(window).width() - 16);
                _uiCurrentlyBeingRecalculated = false;
            }

            $(_contentName).width(_contentWidth - _dockWidth - 5);
        }

    }

    var hideAllTabs = function () {
        for (var i = 0; i < _tabWindowNames.length; i++) {
            $("#" + _tabWindowNames[i].id).hide();
        }
    }

    var dragContinue = function (e) {

        var x, y;

        var isIE = _browser.isIE;
        var isWebKitBased = _browser.isWebKitBased;

        if (isIE) {
            x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
            y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
        }

        if (isWebKitBased) {
            x = e.clientX + window.scrollX;
            y = e.clientY + window.scrollY;
        }

        var distance = x - _dragObj.cursorStartX;

        distance = Math.abs(distance);

        _dragObj.elNode.style.left = (_dragObj.elStartLeft + x - _dragObj.cursorStartX) + "px";

        _currentDragDistance = distance + (_dockDefaultWidth - 1);

        setDockWidth(_currentDragDistance);

        setDockWindowWidth();

        resizeContent();

        if (isIE) {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }

        if (isWebKitBased) {
            e.preventDefault();
        }

    }

    var dragEnd = function () {

        _dragCurrentlyEnabled = false;

        var isIE = _browser.isIE;
        var isWebKitBased = _browser.isWebKitBased;

        if (isIE) {
            document.detachEvent("onmousemove", dragContinue);
            document.detachEvent("onmouseup", dragEnd);
        }
        if (isWebKitBased) {
            document.removeEventListener("mousemove", dragContinue, true);
            document.removeEventListener("mouseup", dragEnd, true);
        }

    }

    var resetDockPosition = function () {
        _dockObj.style.left = ($(window).width() - _dockDefaultWidth) + "px";
    }

    var moveDockToNewPosition = function (newWidth) {
        _dockObj.style.left = ($(window).width() - newWidth) + "px";
    }

    var deselectAllTabs = function () {
        for (var i = 0; i < _tabNames.length; i++) {
            $("#" + _tabNames[i].id).attr("style", "");
        }
    }

}