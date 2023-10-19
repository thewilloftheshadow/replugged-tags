import { init as initSettings, SettingsManager } from "replugged/settings"
import { CommandChoices } from "replugged/types"
import { logger } from "."

type Settings = {
	tags: Array<Tag>
}

type Tag = {
	name: string
	content: string
}

const defaultSettings = {
	tags: []
} satisfies Settings

export default class TagManager {
	settings: SettingsManager<Settings, keyof typeof defaultSettings> | null =
		null
	constructor() {
		this.init()
	}

	async init() {
		this.settings = await initSettings<
			Settings,
			keyof typeof defaultSettings
		>("dev.shadowing.tags", defaultSettings)
	}

	list() {
		if (!this.settings) {
			throw new Error("Settings not initialized")
		}
		return this.settings?.get("tags") ?? []
	}

	create(data: Settings["tags"][number]) {
		if (!this.settings) {
			throw new Error("Settings not initialized")
		}
		const tags = this.list()
		tags.push(data)
		this.settings?.set("tags", tags)
	}

	get(name: string) {
		if (!this.settings) {
			throw new Error("Settings not initialized")
		}
		const tags = this.list()
		return tags.find((tag) => tag.name === name)
	}

	delete(name: string) {
		if (!this.settings) {
			throw new Error("Settings not initialized")
		}
		const tags = this.list()
		const newTags = tags.filter((tag) => tag.name !== name)
		logger.log(newTags)
		this.settings.set("tags", newTags)
	}

	edit(name: string, content: string) {
		if (!this.settings) {
			throw new Error("Settings not initialized")
		}
		const tags = this.list()
		const newTags = tags.map((tag) => {
			if (tag.name === name) {
				return {
					...tag,
					content
				}
			}
			return tag
		})
		this.settings?.set("tags", newTags)
	}

	optionList(): CommandChoices[] {
		if (!this.settings) {
			throw new Error("Settings not initialized")
		}
		const tags = this.list()
		return tags.map((tag) => ({
			name: tag.name,
			displayName: tag.name,
			value: tag.name
		}))
	}

	format(tag: Tag) {
		return `**${tag.name}**\n\`\`\`${tag.content}\`\`\``
	}
}
