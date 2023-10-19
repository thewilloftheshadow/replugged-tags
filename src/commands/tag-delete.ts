import {
	ApplicationCommandOptionType,
	CommandOptions,
	RepluggedCommand
} from "replugged/types"
import { tags } from ".."

const command: RepluggedCommand<CommandOptions> = {
	name: "tag-delete",
	description: "Delete a saved tag",
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "name",
			description: "The name of the tag to delete",
			required: true,
			get choices() {
				return tags.optionList()
			}
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
		return {
			send: false,
			result: `Tag successfully deleted! Here is the content if this was unintentional:\n\`\`\`${tag.content}\`\`\``
		}
	}
}
export default command
