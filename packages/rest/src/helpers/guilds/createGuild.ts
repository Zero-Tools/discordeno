import type {
  DefaultMessageNotificationLevels,
  DiscordGuild,
  ExplicitContentFilterLevels,
  SystemChannelFlags,
  VerificationLevels,
  DiscordCreateGuild
} from '@discordeno/types'
import type { RestManager } from '../../restManager.js'
import type { Channel } from '../../transformers/channel.js'
import type { Guild } from '../../transformers/guild.js'
import type { Role } from '../../transformers/role.js'

/**
 * Creates a guild.
 *
 * @param bot - The bot instance to use to make the request.
 * @param options - The parameters for the creation of the guild.
 * @returns An instance of the created {@link Guild}.
 *
 * @remarks
 * ⚠️ This route can only be used by bots in __fewer than 10 guilds__.
 *
 * Fires a _Guild Create_ gateway event.
 *
 * @see {@link https://discord.com/developers/docs/resources/guild#create-guild}
 */
export async function createGuild (
  rest: RestManager,
  options: CreateGuild
): Promise<Guild> {
  const result = await rest.runMethod<DiscordGuild>(
    rest,
    'POST',
    rest.constants.routes.GUILDS(),
    {
      name: options.name,
      afk_channel_id: options.afkChannelId,
      afk_timeout: options.afkTimeout,
      channels: options.channels,
      default_message_notifications: options.defaultMessageNotifications,
      explicit_content_filter: options.explicitContentFilter,
      icon: options.icon,
      roles: options.roles,
      system_channel_flags: options.systemChannelFlags,
      system_channel_id: options.systemChannelId,
      verification_level: options.verificationLevel
    } as DiscordCreateGuild
  )

  return rest.transformers.guild(rest, { guild: result, shardId: 0 })
}

/** https://discord.com/developers/docs/resources/guild#create-guild */
export interface CreateGuild {
  /** Name of the guild (1-100 characters) */
  name: string
  /** Base64 128x128 image for the guild icon */
  icon?: string
  /** Verification level */
  verificationLevel?: VerificationLevels
  /** Default message notification level */
  defaultMessageNotifications?: DefaultMessageNotificationLevels
  /** Explicit content filter level */
  explicitContentFilter?: ExplicitContentFilterLevels
  /** New guild roles (first role is the everyone role) */
  roles?: Role[]
  /** New guild's channels */
  channels?: Array<Partial<Channel>>
  /** Id for afk channel */
  afkChannelId?: string
  /** Afk timeout in seconds */
  afkTimeout?: number
  /** The id of the channel where guild notices such as welcome messages and boost events are posted */
  systemChannelId?: string
  /** System channel flags */
  systemChannelFlags?: SystemChannelFlags
}
