import {
	ApplicationCommandOptionType,
	CommandOptions,
	RepluggedCommand
} from "replugged/types"
import { tags } from ".."

const command: RepluggedCommand<CommandOptions> = {
	name: "tag-edit",
	description: "Edit a saved tag",
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "name",
			description: "The name of the tag to edit",
			required: true,
			get choices() {
				return tags.optionList()
			}
		},
		{
			type: ApplicationCommandOptionType.String,
			name: "content",
			description: "The new content of the tag",
			required: true
		}
	],
	executor: async (interaction) => {
		const tag = tags.get(interaction.getValue("name"))
		if (!tag) {
			return {
				send: false,
				result: "That tag does not exist!"
			}
		}
		const content = interaction.getValue("content")
		tags.edit(tag.name, content)

		return {
			send: false,
			result: `Tag successfully edited! Here is the old content if this was unintentional:\n\`\`\`${tag.content}\`\`\``
		}
	}
}
export default command
