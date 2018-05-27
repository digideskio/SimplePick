/*
	TODO
	- update all theme with CSS variables
	- add button style to all css themes
	- Spotify color theme
	- add the manage tab
	- solve the user defined langauge (translate())

	- send a demo to Ktrvs

	- add new langauges

	- more themes ? (stored online) special "more themes option" (array.sort())

*/

var activeTab;

document.getElementById("hamburgerMenu").addEventListener("click", function() {
	sideMenu();
});

function sideMenu() {
	var element = document.getElementsByTagName("aside")[0];
	if (element.className == "open") {
		element.className = "closed";
	} else {
		element.className = "open";
	}
}

document.getElementsByTagName("body")[0].addEventListener("load", displayBookmarks());

document.getElementById("bookmarks").addEventListener("click", function() {
	if (activeTab != "bookmarks") {
		cleanSpace();
		activeTab = "bookmarks";
		sideMenu();
		displayBookmarks();
	}
});
document.getElementById("manage").addEventListener("click", function() {
	if (activeTab != "manage") {
		cleanSpace();
		activeTab = "manage";
		sideMenu();
		displayManage();
	}
});
document.getElementById("settings").addEventListener("click", function() {
	if (activeTab != "settings") {
		cleanSpace();
		activeTab = "settings";
		sideMenu();
		displaySettings();
	}
});
document.getElementById("github").addEventListener("click", function() {
	if (activeTab != "github") {
		cleanSpace();
		activeTab = "github";
		sideMenu();
		displayGitHub();
	}
	window.open("https://github.com", "_blank");
});
document.getElementById("credits").addEventListener("click", function() {
	if (activeTab != "credits") {
		cleanSpace();
		activeTab = "credits";
		sideMenu();
		displayCredits();
	}
});

function cleanSpace() {
	document.getElementsByClassName("center")[0].innerHTML = "";
}

function displayBookmarks() {
	disselectAll();

	document.getElementById("bookmarks").innerText = chrome.i18n.getMessage("tabBookmarks");
	document.getElementById("manage").innerText = chrome.i18n.getMessage("tabManage");
	document.getElementById("settings").innerText = chrome.i18n.getMessage("tabSettings");
	document.getElementById("github").innerText = chrome.i18n.getMessage("tabGitHub");
	document.getElementById("credits").innerText = chrome.i18n.getMessage("tabCredits");

	document.getElementById("bookmarks").className = "selected";

	document.getElementById("navbar").innerText = chrome.i18n.getMessage("tabBookmarksTitle");
	//document.getElementById("navbar").innerText = translate("tabBookmarksTitle");
	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"main logo\"><img src=\"./img/logo/icon48.png\"/></div></section>";

	var links = JSON.parse(localStorage.getItem("links"));
	if (links == null || links == undefined || links == "") {
		console.warn(chrome.i18n.getMessage("errorNoLinksDetected"));
		links = {
			links: [{
				name: "GitHub",
				url: "https://github.com",
				icon: "github"
			}, {
				name: "Facebook",
				url: "https://facebook.com",
				icon: "facebook"
			}, {
				name: "Twitter",
				url: "https://twitter.com",
				icon: "twitter"
			}, {
				name: "Instagram",
				url: "https://www.instagram.com",
				icon: "instagram"
			}, {
				name: "LinkedIn",
				url: "https://www.linkedin.com",
				icon: "linkedin"
			}, {
				name: "Google",
				url: "https://www.google.com",
				icon: "google"
			}, {
				name: "Apple",
				url: "https://www.apple.com",
				icon: "apple"
			}, {
				name: "Android",
				url: "https://www.android.com",
				icon: "android"
			}]
		};
		localStorage.setItem("links", JSON.stringify(links));
	}
	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"top\">" + chrome.i18n.getMessage("tabBookmarksSectionTitleMyBookmarks") + "</div><div class=\"main links\"><div class=\"innerLinks\"></div></div></section>";
	for (var j = 0; j < links.links.length; j++) {
		var a = document.createElement("a");
		a.href = links.links[j].url;
		a.target = "_blank";
		var i = document.createElement("i");
		i.className = "fa fa-" + links.links[j].icon + " fa-4x fa-fw";
		a.appendChild(i);
		document.getElementsByClassName("innerLinks")[0].appendChild(a);
	}

}

function displayManage() {
	disselectAll();
	document.getElementById("manage").className = "selected";

	document.getElementById("navbar").innerText = chrome.i18n.getMessage("tabManageTitle");

	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"top\">"+chrome.i18n.getMessage("tabManageSectionTitleLinks")+"</div><div class=\"main links\"></div></div></section>";
}

function displaySettings() {
	disselectAll();
	document.getElementById("settings").className = "selected";

	document.getElementById("navbar").innerText = chrome.i18n.getMessage("tabSettingsTitle");

	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"top\">" + chrome.i18n.getMessage("tabSettingsSectionTitleTheme") + "</div><div class=\"main links\"></div></div></section>";
	document.getElementsByClassName("main links")[0].innerHTML = "<select class=\"main\"></select>";
	for (var i = 0; i < supportedThemes.length; i++) {
		var option = document.createElement("option");
		option.innerText = supportedThemes[i];
		document.getElementsByTagName("select")[0].appendChild(option);
	}

	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"top\">" + chrome.i18n.getMessage("tabSettingsSectionTitleLanguage") + "</div><div class=\"main links languages\"></div></div></section>";
	document.getElementsByClassName("main links languages")[0].innerHTML = "<select class=\"main\"></select>";
	for (var i = 0; i < supportedlanguages.length; i++) {
		var option = document.createElement("option");
		option.innerText = supportedlanguages[i].name;
		option.value = supportedlanguages[i].code;
		document.getElementsByTagName("select")[1].appendChild(option);
	}

	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"top\">" + chrome.i18n.getMessage("tabSettingsSectionTitleOpenNewTab") + "</div><div class=\"main links\"><button id=\"openNewTab\">" + chrome.i18n.getMessage("tabSettingsSectionTitleOpenNewTab") + "</button></div></div></section>";

	document.getElementsByTagName("select")[0].value = selectedtheme;
	document.getElementsByTagName("select")[0].addEventListener("change", function() {
		localStorage.setItem("theme", document.getElementsByTagName("select")[0].value);
		document.getElementById("css").href = "/css/theme/" + document.getElementsByTagName("select")[0].value + ".css";
	});
	document.getElementsByTagName("select")[1].addEventListener("change", function() {
		localStorage.setItem("language", document.getElementsByTagName("select")[1].value);
		// please resart simple pick so the changes can take effect.
	});
	document.getElementById("openNewTab").addEventListener("click", function() {
		chrome.tabs.query({}, function(tabs) {
			var doFlag = true;
			for (var i = tabs.length - 1; i >= 0; i--) {
				if (tabs[i].url === window.location.href) {
					doFlag = false;
					chrome.tabs.update(tabs[i].id, {
						active: true
					});
					break;
				}
			}
			if (doFlag) {
				window.open(window.location.href);
			}
		});
	});
}

function displayGitHub() {
	disselectAll();
	document.getElementById("github").className = "selected";
}

function displayCredits() {
	disselectAll();
	document.getElementById("credits").className = "selected";

	document.getElementById("navbar").innerText = chrome.i18n.getMessage("tabCreditsTitle");

	document.getElementsByClassName("center")[0].innerHTML += "<section><div class=\"top\">" + chrome.i18n.getMessage("tabCreditsSectionTitleCredits") + "</div><div class=\"main links\"><div>" +
		chrome.i18n.getMessage("tabCreditsOriginalIdea") + " : <a href=\"https://github.com/ktrvs\" target=\"_blank\">Ktrvs</a><br>" +
		chrome.i18n.getMessage("tabCreditsDesign") + " : <a href=\"https://github.com/ktrvs\" target=\"_blank\">Ktrvs</a><br>" +
		chrome.i18n.getMessage("tabCreditsProgramming") + " : <a href=\"https://github.com/smrman\" target=\"_blank\">Smrman</a></div></div></div></section>";
}

function disselectAll() {
	for (var i = 0; i < document.getElementById("menu").children.length; i++) {
		document.getElementById("menu").children[i].className = "";
	}
}