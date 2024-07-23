// ==UserScript==
// @name         HamsterKombat Auto Clicker
// @namespace    https://github.com/HighError/tamper-monkey-scripts
// @version      1.1.0
// @description  Auto clicker for Hamster Kombat
// @author       HighError
// @match        https://hamsterkombatgame.io/clicker/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hamsterkombatgame.io
// @grant        none
// @downloadURL  https://github.com/HighError/tamper-monkey-scripts/raw/master/hamster-kombat.user.js
// @updateURL    https://github.com/HighError/tamper-monkey-scripts/raw/master/hamster-kombat.user.js
// ==/UserScript==

const minimumEnergy = 25;
let enableClicker = true;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getElements(){
    const button = document.querySelector(".user-tap-button");
    const energy = document.querySelector(".user-tap-energy > p")?.textContent?.split("/")?.map(e => Number(e.trim())) ?? [null,null];

    return [button, energy[0], energy[1]];
}

function returnToClicker(){
    const btn = document.querySelectorAll(".app-bar-item")[0]
    if (!btn) return;
    btn.click();
}

async function claimBonus(){
    const boostBtn = document.querySelector(".user-tap-boost");
    if (!boostBtn) return;
    boostBtn.click();
    await sleep(1500);


    const openModalBoost = document.querySelectorAll(".boost-item")[0];
    if (!openModalBoost) return;
    openModalBoost.click();
    await sleep(1500);

    const buyBtn = document.querySelector(".bottom-sheet-button");
    if (!buyBtn) return;
    buyBtn.click();
}

async function click(button, now, maximum){
    if (!enableClicker && now >= maximum){
        enableClicker = true;
        console.log("Energy at its maximum. The clicker is on.");
    }
    else if (enableClicker && now <= minimumEnergy){
        enableClicker = false;
        console.log(`Not enough energy. Clicker stopped, to ${maximum} energy. Now: ${now}`);
        await claimBonus();
        returnToClicker();
    }

    if (enableClicker){
        button.dispatchEvent(new PointerEvent("pointerup"));
    } else{
        console.log(`Not enough energy. Clicker stopped, to ${maximum} energy. Now: ${now}`);
    }
}

async function start(){
    const [btn, now, maximum] = getElements();
    if (!btn){
        console.warn("Button not found. Search again in 5 seconds.");
        returnToClicker();
        await sleep(5*1000);
    } else if (!now || !maximum){
        console.warn("Energy not found. Search again in 5 seconds.");
        returnToClicker();
        await sleep(5*1000);
    } else{
        await click(btn, now, maximum)
        await sleep(enableClicker ? 100 : 5*1000);
    }
    start();
}

(function() {
    'use strict';

    start();
})();
