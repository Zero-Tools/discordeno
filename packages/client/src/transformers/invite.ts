import { DiscordInviteCreate, Optionalize } from '@discordeno/types'
import { Client } from '../client.js'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function transformInvite (client: Client, invite: DiscordInviteCreate) {
  const transformedInvite = {
    /** The channel the invite is for */
    channelId: client.transformers.snowflake(invite.channel_id),
    /** The unique invite code */
    code: invite.code,
    /** The time at which the invite was created */
    createdAt: Date.parse(invite.created_at),
    /** The guild of the invite */
    guildId: invite.guild_id
      ? client.transformers.snowflake(invite.guild_id)
      : undefined,
    /** The user that created the invite */
    inviter: invite.inviter
      ? client.transformers.user(client, invite.inviter)
      : undefined,
    /** How long the invite is valid for (in seconds) */
    maxAge: invite.max_age,
    /** The maximum number of times the invite can be used */
    maxUses: invite.max_uses,
    /** The type of target for this voice channel invite */
    targetType: invite.target_type,
    /** The target user for this invite */
    targetUser: invite.target_user
      ? client.transformers.user(client, invite.target_user)
      : undefined,
    /** The embedded application to open for this voice channel embedded application invite */
    targetApplication: invite.target_application
      ? client.transformers.application(
        client,
        // @ts-expect-error should not break anything even though its partial. if it does blame wolf :)
        invite.target_application
      )
      : undefined,
    /** Whether or not the invite is temporary (invited users will be kicked on disconnect unless they're assigned a role) */
    temporary: invite.temporary,
    /** How many times the invite has been used (always will be 0) */
    uses: invite.uses
  }

  return transformedInvite as Optionalize<typeof transformedInvite>
}

export interface Invite extends ReturnType<typeof transformInvite> {}
