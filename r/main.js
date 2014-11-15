//Convenience variables:
var $w = window
var $d = document


//Tests for features that must exist in a supported browser

if (!$w.localStorage||!$w.SVGSVGElement||!$w.indexedDB||!$w.console||!$w.JSON) {alert("You are using an unsupported browser. Any errors that may arise will not be corrected. ")}



//Initializes IndexedDB



//
//Creates setting entry in LocalStorage if non-existent 
if (localStorage.getItem('-hfos-settings') === null) {
    localStorage.setItem('-hfos-settings', '{}');
}
//initializes setting object
var settings = JSON.parse(localStorage.getItem('-hfos-settings'));


//Saves settings
settings.save = function() {
    localStorage.setItem('settings',JSON.stringify(settings))
}


var HFOS = {version:"Alpha 0.1.0"}


HFOS['main'] = function () {
    //Tests if user has used the app before using a key in localStorage
    if (localStorage.getItem('-hfos-usedBefore') === null) {
        //redirects user to welcome page
        open("/welcome.html","_self");
    }
    //Fade out preloader when loading complete
    $('#-hfos-preloader').fadeOut(1000)
    //Changes title to have version
    document.title += (" " + HFOS.version);

    //Sets variables in HFOS object
    //Sets Apps Menu

    HFOS.appsMenu = document.getElementById('apps-menu')
    HFOS.appsMenu.isOpen = false;
    HFOS.appsButton = document.getElementById('apps-button')
    HFOS.taskbar = document.getElementById('taskbar')
    HFOS.isDOMElement = function (a) { return (a instanceof HTMLElement) };
    //get the app element in which the node is in
    HFOS.getAppFromNode = function (node) {
        while (node.parentNode != null && node.parentNode != document) {
            if ($(node).hasClass("app")) { return node }
            node = node.parentNode;
        }
        return null;
    }

    //Initializes an Element HFOS API
    HFOS.APIInit = function (element) {
        var wrapper = [element]

        //Adding a generic context menu
        wrapper.addContextMenu = function (menuObj) {


            //context menu opener
            var contextMenuOpener = function () {
                var app = HFOS.getAppFromNode(element);
                var menu = $('<div>');
                for (var i = 0; i < menuObj.length; i++) {
                    menu.append($('<div>').text(menuObj[i].value));

                } 
                menu.addClass('')
                console.log(menu[0]);

            }
            element.removeEventListener('contextmenu', contextMenuOpener)
            element.addEventListener('contextmenu', contextMenuOpener)
        }

        return wrapper
    }


    //Start main body of code
    //apps button mouseover
    $('#apps-button').mouseover(function () { this.style.opacity = 1; }).mouseout(function () { this.style.opacity = 0.6; }).click(function () {
        //apps button click function
        HFOS.appsMenu.isOpen = !HFOS.appsMenu.isOpen;
        $(HFOS.appsMenu).toggle();
    });

    //Close apps menu when click outside
    $(document).click(function (e) {
        if (HFOS.appsMenu.isOpen) {
            if (!($.contains(HFOS.appsMenu, e.target) || e.target == HFOS.appsMenu || e.target == HFOS.appsButton)) {
                HFOS.appsMenu.isOpen = false;
                $(HFOS.appsMenu).hide();
            }
        }
    })
}

//HFOS API
//Return the API-ed version of the element
var API = function (element) {
    if (!(HFOS.isDOMElement(element)||element==document)) {
        throw new TypeError('Not a DOM element')
    }
    return HFOS.APIInit(element);
}

//Element is the element to add this context menu to, as well as its sub-elements


$(document).ready(HFOS['main']);