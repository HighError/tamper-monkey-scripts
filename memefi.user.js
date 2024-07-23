// ==UserScript==
// @name         Memefi AutoClicker
// @namespace    https://github.com/HighError/tamper-monkey-scripts
// @version      1.0.0
// @description  AutoClicker for Memefi
// @author       HighError
// @match        https://tg-app.memefi.club/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=memefi.club
// @grant        none
// @downloadURL  https://github.com/HighError/tamper-monkey-scripts/raw/master/memefi.user.js
// @updateURL    https://github.com/HighError/tamper-monkey-scripts/raw/master/memefi.user.js
// ==/UserScript==

const minimumEnergy = 25;
let enableClicker = true;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getElements() {
	const btn = document.querySelector(".css-79elbk");
	const now = Number(
		document.querySelector(".css-1uhkmm6")?.textContent?.replaceAll(",", ""),
	);
	const maximum = Number(
		document
			.querySelector(".css-4tsebw")
			?.textContent?.replaceAll(",", "")
			?.replaceAll("/", ""),
	);

	return [btn, now, maximum];
}

function click(element, now, maximum) {
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

		const events = [
			new MouseEvent("pointerover", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
			new MouseEvent("pointerenter", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
			new MouseEvent("mouseover", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
			new MouseEvent("mousedown", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
			new MouseEvent("pointerdown", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
			new MouseEvent("mouseup", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
			new MouseEvent("pointerup", {
				view: window,
				bubbles: true,
				cancelable: true,
				clientX: randomX,
				clientY: randomY,
			}),
		];

		events.forEach((e) => element.dispatchEvent(e));
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
		await click(btn, now, maximum);
		await sleep(enableClicker ? 100 : 5 * 1000);
	}
	start();
}

(() => start())();
