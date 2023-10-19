import { CommandOptions, RepluggedCommand } from "replugged/types"
import { tags } from ".."

const command: RepluggedCommand<CommandOptions> = {
	name: "tag-list",
	description: "List all of your tags",
	executor: async () => {
		const list = tags.list()
		return {
			send: false,
			result:
				list.length > 0
					? `${list.map((tag) => tags.format(tag)).join("\n")}`
					: "You have not created any tags!"
		}
	}
}
export default command
