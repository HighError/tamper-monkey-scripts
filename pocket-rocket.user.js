// ==UserScript==
// @name         Pocker Rocket AutoClicker
// @namespace    https://github.com/HighError/tamper-monkey-scripts
// @version      1.0.0
// @description  AutoClicker for PockerRocket
// @author       HighError
// @match        https://rocketf.whitechain.io/play
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whitechain.io
// @grant        none
// @downloadURL  https://github.com/HighError/tamper-monkey-scripts/raw/master/pocket-rocket.user.js
// @updateURL    https://github.com/HighError/tamper-monkey-scripts/raw/master/pocket-rocket.user.js
// ==/UserScript==

const minimumEnergy = 25;
let enableClicker = true;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getElements() {
	const btn = document.querySelector("canvas");
	const progress = document.querySelector("[data-sentry-element='Progress']")
		?.childNodes ?? [null, null, null];

	const now = Number(progress[0]?.textContent.replaceAll(",", ""));
	const maximum = Number(progress[2]?.textContent.replaceAll(",", ""));

	return [btn, now, maximum];
}

function click(btn, now, maximum) {
	if (!enableClicker && now >= maximum) {
		enableClicker = true;
		console.log("Energy at its maximum. The clicker is on.");
	} else if (enableClicker && now <= minimumEnergy) {
		enableClicker = false;
		console.log(
			`Not enough energy. Clicker stopped, to ${maximum} energy. Now: ${now}`,
		);
	}

	if (enableClicker) {
		const randomX = Math.floor(Math.random() * 422);
		const randomY = Math.floor(Math.random() * 321);
		btn.dispatchEvent(
			new PointerEvent("pointerup", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
		);
	} else {
		console.log(
			`Not enough energy. Clicker stopped, to ${maximum} energy. Now: ${now}`,
		);
	}
}

async function start() {
	const [btn, now, maximum] = getElements();
	if (!btn) {
		console.warn("Button not found. Search again in 5 seconds.");
		await sleep(5 * 1000);
	} else if (!now || !maximum) {
		console.warn("Energy not found. Search again in 5 seconds.");
		await sleep(5 * 1000);
	} else {
		click(btn, now, maximum);
		await sleep(enableClicker ? 100 : 5 * 1000);
	}
	start();
}

(() => start())();
