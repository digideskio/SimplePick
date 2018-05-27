var supportedlanguages = [
    {
        name:"Automatic",
        code:"auto"
    },
    {
        name:"中文",
        code:"cn"
    },
    {
        name:"Deutsch",
        code:"de"
    },
    {
        name:"English",
        code:"en"
    },
    {
        name:"Español",
        code:"es"
    },
    {
        name:"Français",
        code:"fr"
    },
    {
        name:"Italiano",
        code:"it"
    },
    {
        name:"Nederlands",
        code:"nl"
    },
    {
        name:"Português",
        code:"pt"
    },
    {
        name:"русский",
        code:"ru"
    }
];

var selectedLanguage;
var selectedLanguageCode;

document.getElementsByTagName("body")[0].addEventListener('load', getLanguage());

function getLanguage() {
    selectedLanguagecode = localStorage.getItem("language");
    var languageSupported = false;
    for(var i=0;i<supportedlanguages.length;i++) {
        if (supportedlanguages[i].code == selectedLanguagecode) {
            languageSupported = true;
            selectedLanguage = supportedlanguages[i].name;
            break;
        }
    }
    if(!languageSupported || selectedLanguagecode == null || selectedLanguagecode == undefined) {
        selectedLanguageCode = "auto";
        console.warn(chrome.i18n.getMessage("errorNoLanguageDetected"));
    }
}

function translate(stringId) {
    if(selectedLanguageCode=="auto") {
        return chrome.i18n.getMessage(stringId);
    } else {
        init().then(jsonTranslation => {return jsonTranslation[stringId].message});
    }
}

async function loadJSON(callback) { 
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/_locales/'+selectedLanguageCode+'/messages.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null); 
}

async function init() {
    loadJSON(function(response) {
        return JSON.parse(response);
    });
}