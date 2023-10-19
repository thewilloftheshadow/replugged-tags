import { Injector } from "replugged/injector"
const injector = new Injector()

import tagCreate from "./commands/tag-create"
import tagDelete from "./commands/tag-delete"
import tagEdit from "./commands/tag-edit"
import tagGet from "./commands/tag-get"
import tagList from "./commands/tag-list"
import tag from "./commands/tag"

const commands = [tagCreate, tagDelete, tagEdit, tagGet, tagList, tag]

export const start = () => {
	commands.map((cmd) => {
		injector.utils.registerSlashCommand(cmd)
	})
}

export const stop = () => {
	injector.uninjectAll()
}

import TagManager from "./tagManager"
export const tags = new TagManager()

import { Logger } from "replugged/logger"
export const logger = new Logger("Plugin", "Tags")
