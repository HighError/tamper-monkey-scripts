// ==UserScript==
// @name         DjDog AutoClicker
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  AutoClicker for DjDog Telegram bot
// @author       HighError
// @match        https://djdog.io/dog
// @icon         https://www.google.com/s2/favicons?sz=64&domain=djdog.io
// @grant        none
// @downloadURL  https://github.com/HighError/tamper-monkey-scripts/raw/master/djdog.user.js
// @updateURL    https://github.com/HighError/tamper-monkey-scripts/raw/master/djdog.user.js
// ==/UserScript==

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let clicks = 0;
const maxClicks = 100;

function getClickButton() {
	let btn;
	const elements = document.querySelectorAll("img");
	elements.forEach((e) => {
		if (e.src === "https://djdog.io/dog/hitOne.png") {
			btn = e;
		}
	});
	return btn;
}

async function start() {
	getClickButton()?.click();
	if (clicks >= maxClicks) {
		clicks = 0;
		console.log(`Clciks >= ${maxClicks}. Clicker stopped on 15 minutes`);
		await sleep(60 * 60 * 1000);
	} else {
		clicks++;
		console.log(`Click: ${clicks} / ${maxClicks}`);
		await sleep(500);
	}
	start();
}

(function () {
	"use strict";
	start();
})();
