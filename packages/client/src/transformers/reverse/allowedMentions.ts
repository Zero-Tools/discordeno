import {
  AllowedMentions,
  Client,
  DiscordAllowedMentions
} from '../../index.js'

export function transformAllowedMentionsToDiscordAllowedMentions (
  client: Client,
  mentions: AllowedMentions
): DiscordAllowedMentions {
  return {
    parse: mentions.parse,
    replied_user: mentions.repliedUser,
    users: mentions.users?.map((id) => id.toString()),
    roles: mentions.roles?.map((id) => id.toString())
  }
}
