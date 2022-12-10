import type { BigString, DiscordWelcomeScreen, DiscordModifyGuildWelcomeScreen } from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { WelcomeScreen } from '../../transformers/welcomeScreen.js'

/**
 * Edits a guild's welcome screen.
 *
 * @param bot - The bot instance to use to make the request.
 * @param guildId - The ID of the guild to edit the welcome screen of.
 * @param options - The parameters for the edit of the welcome screen.
 * @returns An instance of the edited {@link WelcomeScreen}.
 *
 * @remarks
 * Requires the `MANAGE_GUILD` permission.
 *
 * Fires a _Guild Update_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen}
 */
export async function editWelcomeScreen (
  rest: RestManager,
  guildId: BigString,
  options: ModifyGuildWelcomeScreen
): Promise<WelcomeScreen> {
  const result = await rest.runMethod<DiscordWelcomeScreen>(
    rest,
    'PATCH',
    rest.constants.routes.GUILD_WELCOME_SCREEN(guildId),
    {
      enabled: options.enabled,
      welcome_screen: options.welcomeScreen?.map((welcomeScreen) => ({
        channel_id: welcomeScreen.channelId,
        description: welcomeScreen.description,
        emoji_id: welcomeScreen.emojiId,
        emoji_name: welcomeScreen.emojiName
      })),
      description: options.description
    } as DiscordModifyGuildWelcomeScreen
  )

  return rest.transformers.welcomeScreen(rest, result)
}

/** https://discord.com/developers/docs/resources/guild#modify-guild-welcome-screen */
export interface ModifyGuildWelcomeScreen {
  /** Whether the welcome screen is enabled */
  enabled?: boolean | null
  /** Channels linked in the welcome screen and their display options */
  welcomeScreen?: WelcomeScreenChannel[] | null
  /** The server description to show in the welcome screen */
  description?: string | null
}

export interface WelcomeScreenChannel {
  /** The channel's id */
  channelId: BigString
  /** The emoji id, if the emoji is custom */
  emojiId?: BigString
  /** The emoji name if custom, the unicode character if standard, or `null` if no emoji is set */
  emojiName?: string
  /** The description shown for the channel */
  description: string
}
