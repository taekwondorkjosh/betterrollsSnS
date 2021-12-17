import { i18n, Utils } from "./utils/index.js";

const getBRSetting = (setting) => game.settings.get("betterrollsSnS", setting);

/**
 * Class type used to initialize and retrieve settings.
 */
class Settings {
	/**
	 * Register better rolls settings.
	 * This should only be called once, at initialization.
	 */
	init() {
		// Special non-config flag to handle migrations
		game.settings.register("betterrollsSnS", "migration", {
			config: false,
			default: { status: false, version: Utils.getVersion() },
			scope: 'world',
			type: Object
		});

		game.settings.register("betterrollsSnS", "d20Mode", {
			name: i18n("brSnS.d20Mode.name"),
			hint: i18n("brSnS.d20Mode.hint"),
			scope: "world",
			config: true,
			default: 1,
			type: Number,
			choices: {
				1: i18n("brSnS.d20Mode.choices.1"),
				2: i18n("brSnS.d20Mode.choices.2"),
				3: i18n("brSnS.d20Mode.choices.3"),
				4: i18n("brSnS.d20Mode.choices.4")
			}
		});

		// Enables damage buttons
		game.settings.register("betterrollsSnS", "damagePromptEnabled", {
			name: i18n("brSnS.damagePromptEnabled.name"),
			hint: i18n("brSnS.damagePromptEnabled.hint"),
			scope: "world",
			config: true,
			default: false,
			type: Boolean
		});

		// Register added roll buttons
		game.settings.register("betterrollsSnS", "rollButtonsEnabled", {
			name: i18n("brSnS.rollButtonsEnabled.name"),
			hint: i18n("brSnS.rollButtonsEnabled.hint"),
			scope: "world",
			config: true,
			default: true,
			type: Boolean
		});

		// Register better roll for items
		game.settings.register("betterrollsSnS", "imageButtonEnabled", {
			name: i18n("brSnS.imageButtonEnabled.name"),
			hint: i18n("brSnS.imageButtonEnabled.hint"),
			scope: "world",
			config: true,
			default: true,
			type: Boolean
		});

		// Does Alt Click perform an Alt Roll?
		game.settings.register("betterrollsSnS", "altSecondaryEnabled", {
			name: i18n("brSnS.altSecondaryEnabled.name"),
			hint: i18n("brSnS.altSecondaryEnabled.hint"),
			scope: "world",
			config: true,
			default: true,
			type: Boolean
		});

		// Show Apply Active Effects Button
		game.settings.register("betterrollsSnS", "applyActiveEffects", {
			name: i18n("brSnS.applyActiveEffects.name"),
			hint: i18n("brSnS.applyActiveEffects.hint"),
			scope: "world",
			config: true,
			default: true,
			type: Boolean
		})

		// Register quick roll defaults for description
		game.settings.register("betterrollsSnS", "quickDefaultDescriptionEnabled", {
			name: i18n("brSnS.quickDefaultDescriptionEnabled.name"),
			hint: i18n("brSnS.quickDefaultDescriptionEnabled.hint"),
			scope: "world",
			config: true,
			default: false,
			type: Boolean
		});

		// Used to enable visually showing the natural die roll for a d20 roll.
		game.settings.register("betterrollsSnS", "d20RollIconsEnabled", {
			name: i18n("brSnS.d20RollIconsEnabled.name"),
			hint: i18n("brSnS.d20RollIconsEnabled.hint"),
			scope: "world",
			config: true,
			default: true,
			type: Boolean
		});

		// Actor Roll Image Choices
		game.settings.register("betterrollsSnS", "defaultRollArt", {
			name: i18n("brSnS.defaultRollArt.name"),
			hint: i18n("brSnS.defaultRollArt.hint"),
			scope: "world",
			config: true,
			default: "actor",
			type: String,
			choices: {
				"actor": i18n("Actor"),
				"token": i18n("Token")
			}
		});

		// Register roll label options
		game.settings.register("betterrollsSnS", "rollTitlePlacement", {
			name: i18n("brSnS.rollTitlePlacement.name"),
			hint: i18n("brSnS.rollTitlePlacement.hint"),
			scope: "world",
			config: true,
			default: "1",
			type: String,
			choices: {
				"0": i18n("brSnS.damageRollPlacement.choices.0"),
				"1": i18n("brSnS.damageRollPlacement.choices.1")
			}
		});

		const damagePlacementOptions = ["damageTitlePlacement", "damageContextPlacement", "damageRollPlacement"];

		damagePlacementOptions.forEach(placementOption => {
			game.settings.register("betterrollsSnS", placementOption, {
				name: i18n(`brSnS.${placementOption}.name`),
				hint: i18n(`brSnS.${placementOption}.hint`),
				scope: "world",
				config: true,
				default: "1",
				type: String,
				choices: {
					"0": i18n("brSnS.damageRollPlacement.choices.0"),
					"1": i18n("brSnS.damageRollPlacement.choices.1"),
					"2": i18n("brSnS.damageRollPlacement.choices.2"),
					"3": i18n("brSnS.damageRollPlacement.choices.3")
				}
			});
		});

		const contextReplacementOptions = ["contextReplacesTitle", "contextReplacesDamage"];

		contextReplacementOptions.forEach(contextOption => {
			game.settings.register("betterrollsSnS", contextOption, {
				name: i18n(`brSnS.${contextOption}.name`),
				hint: i18n(`brSnS.${contextOption}.hint`),
				scope: "world",
				config: true,
				default: false,
				type: Boolean
			});
		});

		game.settings.register("betterrollsSnS", "critBehavior", {
			name: i18n("brSnS.critBehavior.name"),
			hint: i18n("brSnS.critBehavior.hint"),
			scope: "world",
			config: true,
			default: "1",
			type: String,
			choices: {
				"0": i18n("brSnS.critBehavior.choices.0"), // No Extra Damage
				"1": i18n("brSnS.critBehavior.choices.1"), // Roll Critical Damage Dice
				"2": i18n("brSnS.critBehavior.choices.2"), // Roll Base Damage, Max Critical
				"3": i18n("brSnS.critBehavior.choices.3"), // Max Base & Critical Damage
				"4": i18n("brSnS.critBehavior.choices.4"), // Max Base Damage, Roll Critical Damage
			}
		});

		game.settings.register("betterrollsSnS", "critString", {
			name: i18n("brSnS.critString.name"),
			hint: i18n("brSnS.critString.hint"),
			scope: "world",
			config: true,
			default: "Crit",
			type: String
		});

		game.settings.register("betterrollsSnS", "chatDamageButtonsEnabled", {
			name: i18n("brSnS.chatDamageButtonsEnabled.name"),
			hint: i18n("brSnS.chatDamageButtonsEnabled.hint"),
			scope: "world",
			config: true,
			default: "1",
			type: String,
			choices: {
				"0": i18n("brSnS.chatDamageButtonsEnabled.choices.0"),
				"1": i18n("brSnS.chatDamageButtonsEnabled.choices.1"),
				"2": i18n("brSnS.chatDamageButtonsEnabled.choices.2"),
			}
		});

		game.settings.register("betterrollsSnS", "playRollSounds", {
			name: i18n("brSnS.playRollSounds.name"),
			hint: i18n("brSnS.playRollSounds.hint"),
			scope: "world",
			config: true,
			default: true,
			type: Boolean
		});

		game.settings.register("betterrollsSnS", "hideDC", {
			name: i18n("brSnS.hideDC.name"),
			hint: i18n("brSnS.hideDC.hint"),
			scope: "world",
			config: true,
			default: "0",
			type: String,
			choices: {
				"0": i18n("brSnS.hideDC.choices.0"),
				"1": i18n("brSnS.hideDC.choices.1"),
				"2": i18n("brSnS.hideDC.choices.2"),
			}
		});
	}

	get playRollSounds() {
		return getBRSetting("playRollSounds");
	}

	get damageRollPlacement() {
		return getBRSetting("damageRollPlacement");
	}

	get rollTitlePlacement() {
		return getBRSetting("rollTitlePlacement");
	}

	get damageTitlePlacement() {
		return getBRSetting("damageTitlePlacement");
	}

	get damageContextPlacement() {
		return getBRSetting("damageContextPlacement") || "0";
	}

	get contextReplacesTitle() {
		return getBRSetting("contextReplacesTitle");
	}

	get contextReplacesDamage() {
		return getBRSetting("contextReplacesDamage");
	}

	get critString() {
		return getBRSetting("critString");
	}

	get critBehavior() {
		return getBRSetting("critBehavior");
	}

	get quickDefaultDescriptionEnabled() {
		return getBRSetting("quickDefaultDescriptionEnabled");
	}

	get imageButtonEnabled() {
		return getBRSetting("imageButtonEnabled");
	}

	get altSecondaryEnabled() {
		return getBRSetting("altSecondaryEnabled");
	}

	get applyActiveEffects() {
		return getBRSetting("applyActiveEffects");
	}

	get d20Mode() {
		return getBRSetting("d20Mode");
	}

	get hideDC() {
		return getBRSetting("hideDC");
	}

	get chatDamageButtonsEnabled() {
		const setting = getBRSetting("chatDamageButtonsEnabled");
		return setting === "1" || (setting === "2" && game.user.isGM);
	}

	/**
	 * True if damage buttons should be disabled, false is auto rolling.
	 */
	get damagePromptEnabled() {
		return getBRSetting("damagePromptEnabled");
	}

	/**
	 * Whether the die icon should be shown for d20 multi rolls
	 */
	get d20RollIconsEnabled() {
		return getBRSetting("d20RollIconsEnabled");
	}

	get queryAdvantageEnabled() {
		return this.d20Mode === 4;
	}
}

/**
 * Class instance that can be used to both initialize and retrieve config
 */
export const BRSettings = new Settings();

/**
 * Returns a proxy that returns the given config and falls
 * back to global better roll config.
 * @param {Settings} config
 * @returns {Settings}
 */
export const getSettings = config => {
	if (!config || typeof config !== "object") {
		return BRSettings;
	}

	if (config.__isProxy) {
		return config;
	}

	const proxy = new Proxy(config, {
		get: (target, name) => {
			if (name === "__isProxy") {
				return true;
			}

			if (Reflect.has(target, name)) {
				return Reflect.get(target, name);
			}

			return Reflect.get(BRSettings, name);
		}
	});

	proxy.isWrapped = true;
	return proxy;
};
