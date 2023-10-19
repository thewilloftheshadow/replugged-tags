import {
	ApplicationCommandOptionType,
	CommandOptions,
	RepluggedCommand
} from "replugged/types"
import { tags } from ".."

const command: RepluggedCommand<CommandOptions> = {
	name: "tag-create",
	description: "Create a new tag",
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "name",
			description: "The name of the new tag",
			required: true
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "content",
			description: "The content of the new tag",
			required: true
		}
	],
	executor: async (interaction) => {
		const name = interaction.getValue("name")
		const content = interaction.getValue("content")

		const tag = tags.get(name)
		if (tag) {
			return {
				send: false,
				result: "That tag already exists!"
			}
		}

		tags.create({
			name,
			content
		})

		return {
			send: false,
			result: `Tag successfully created:\n\n${tags.format({
				name,
				content
			})}`
		}
	}
}
export default command
