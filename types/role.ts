export interface Role_Data {
  /** role id */
  id: string
  /** role name */
  name: string
  /** integer representation of hexadecimal color code */
  color: number
  /** if this role is pinned in the user listing */
  hoist: boolean
  /** position of this role */
  position: number
  /** permission bit set */
  permissions: number
  /** whether this role is managed by an integration */
  managed: boolean
  /** whether this role is mentionable */
  mentionable: boolean
}

export interface Role {
   /** role id */
   id: string
   /** role name */
   name: string
   /** integer representation of hexadecimal color code */
   color: number
   /** if this role is pinned in the user listing */
   hoist: boolean
   /** position of this role */
   position: number
   /** permission bit set */
   permissions: number
   /** whether this role is managed by an integration */
   managed: boolean
   /** whether this role is mentionable */
   mentionable: boolean
   /** The @ mention of the role in a string. */
   mention(): string
}
