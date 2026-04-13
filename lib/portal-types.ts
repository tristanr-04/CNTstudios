export type PortalUserRow = {
  username: string
  /** bcrypt hash, bv. $2a$10$... */
  passwordHash: string
  /** URL-pad: /portal/[slug] */
  slug: string
}
