import {
	ApplicationCommandOptionType,
	CommandOptions,
	RepluggedCommand
} from "replugged/types"
import { tags } from ".."

const command: RepluggedCommand<CommandOptions> = {
	name: "tag-get",
	description: "Get the content of a saved tag privately",
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: "name",
			description: "The name of the tag to get",
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
			result: `**${tag.name}**\n\`\`\`${tag.content}\`\`\``
		}
	}
}
export default command
