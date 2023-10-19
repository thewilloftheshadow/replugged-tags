import { CommandOptions, RepluggedCommand } from "replugged/types"
import { tags } from ".."

const command: RepluggedCommand<CommandOptions> = {
	name: "tag-debug",
	description: "Send debug",
	executor: async () => {
		return {
			send: false,
			result: JSON.stringify(tags.settings?.all(), null, 2)
		}
	}
}
export default command
