import { BRSettings } from "./settings.js";
import { BetterRollsChatCard } from "./chat-message.js";
import { addItemSheetButtons, BetterRolls, changeRollsToDual } from "./betterrollsSnS.js";
import { ItemUtils } from "./utils/index.js";
import { addBetterRollsContent } from "./item-tab.js";

// Attaches BetterRolls to actor sheet
Hooks.on("renderActorSheet5e", (app, html, data) => {
	const triggeringElement = ".item .item-name h4";
	const buttonContainer = ".item-properties";

	// this timeout allows other modules to modify the sheet before we do
	setTimeout(() => {
		game.settings.get("betterrollsSnS", "rollButtonsEnabled") ? addItemSheetButtons(app.object, html, data, triggeringElement, buttonContainer) : null;
		changeRollsToDual(app.object, html, data);
	}, 0);
});

// Attaches BetterRolls to item sheet
Hooks.on("renderItemSheet5e", (app, html, data) => {
	addBetterRollsContent(app, html, data);
});

Hooks.once("init", () => {
	BRSettings.init();

	// Setup template partials
	const prefix = "modules/betterrollsSnS/templates"
	loadTemplates([
		`${prefix}/red-damage-crit.html`
	]);
});

Hooks.on("ready", () => {
	// Make a combined damage type array that includes healing
	const sns = CONFIG.SNS;
	CONFIG.betterRolls5e.combinedDamageTypes = mergeObject(duplicate(sns.damageTypes), sns.healingTypes);

	// Updates crit text from the dropdown.
	let critText = BRSettings.critString;
	if (critText.includes("br5e.critString")) {
		critText = i18n(critText);
		game.settings.set("betterrollsSnS", "critString", critText);
	}

	// Initialize Better Rolls
	window.BetterRolls = BetterRolls();
	Hooks.call("readyBetterRolls");
});

// Create flags for item when it's first created
Hooks.on("preCreateOwnedItem", (actor, itemData) => {
	ItemUtils.ensureDataFlags(itemData);
});

// Modify context menu for damage rolls (they break)
Hooks.on("getChatLogEntryContext", (html, options) => {
	let contextDamageLabels = [
		game.i18n.localize("SNS.ChatContextDamage"),
		game.i18n.localize("SNS.ChatContextHealing"),
		game.i18n.localize("SNS.ChatContextDoubleDamage"),
		game.i18n.localize("SNS.ChatContextHalfDamage")
	];

	for (let i=options.length-1; i>=0; i--) {
		let option = options[i];
		if (contextDamageLabels.includes(option.name)) {
			option.condition = li => canvas.tokens.controlled.length && li.find(".dice-roll").length && !li.find(".red-full").length;
		}
	}
});

// Bind to any newly rendered chat cards at runtime
// For whatever reason, this callback is sometimes called with unattached html elements
Hooks.on("renderChatMessage", BetterRollsChatCard.bind);
Hooks.on("getChatLogEntryContext", BetterRollsChatCard.addOptions);
