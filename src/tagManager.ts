import { init as initSettings, SettingsManager } from "replugged/settings"
import { logger } from "."
import { CommandChoices } from "replugged/types"

type Settings = {
	tags: Array<Tag>
}

type Tag = {
	name: string
	content: string
}

export default class TagManager {
	settings: SettingsManager<Settings, never> | null = null
	constructor() {
		this.init()
	}

	async init() {
		this.settings = await initSettings<Settings, never>(
			"dev.shadowing.tags"
		)
	}

	list() {
		if (!this.settings) {
			logger.error("Settings not initialized")
		}
		return this.settings?.get("tags") ?? []
	}

	create(data: Settings["tags"][number]) {
		if (!this.settings) {
			logger.error("Settings not initialized")
		}
		const tags = this.list()
		tags.push(data)
		this.settings?.set("tags", tags)
	}

	get(name: string) {
		if (!this.settings) {
			logger.error("Settings not initialized")
		}
		const tags = this.list()
		return tags.find((tag) => tag.name === name)
	}

	delete(name: string) {
		if (!this.settings) {
			logger.error("Settings not initialized")
		}
		const tags = this.list()
		const newTags = tags.filter((tag) => tag.name !== name)
		this.settings?.set("tags", newTags)
	}

	edit(name: string, data: Tag) {
		if (!this.settings) {
			logger.error("Settings not initialized")
		}
		const tags = this.list()
		const newTags = tags.map((tag) => {
			if (tag.name === name) {
				return data
			}
			return tag
		})
		this.settings?.set("tags", newTags)
	}

	optionList(): CommandChoices[] {
		if (!this.settings) {
			logger.error("Settings not initialized")
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
