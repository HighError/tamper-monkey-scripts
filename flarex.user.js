// ==UserScript==
// @name         FlareX (Finu Miner) Auto claimer
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Auto claim FX
// @author       HighError
// @match        https://app.flareinu.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=flareinu.com
// @grant        none
// @downloadURL  https://github.com/HighError/tamper-monkey-scripts/raw/master/flarex.user.js
// @updateURL    https://github.com/HighError/tamper-monkey-scripts/raw/master/flarex.user.js
// ==/UserScript==

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getButton() {
	let btn;
	const elements = document.querySelectorAll("button");
	elements.forEach((e) => {
		if (e.textContent.startsWith("Claim")) {
			btn = e;
		}
	});
	return btn;
}

async function start() {
	const btn = getButton();
	btn?.click();
	console.log(
		btn
			? "Button found. Clicking attempt. Retry in 5 minutes."
			: "Button not found. Retry in 5 minutes.",
	);
	await sleep(5 * 60 * 1000);
	start();
}

(() => start())();
