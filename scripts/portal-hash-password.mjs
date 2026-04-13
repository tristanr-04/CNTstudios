#!/usr/bin/env node
/**
 * Genereer een bcrypt-hash voor PORTAL_USERS_JSON.
 * Gebruik: node scripts/portal-hash-password.mjs "jouw-wachtwoord"
 */
import bcrypt from "bcryptjs"

const p = process.argv[2]
if (!p) {
  console.error('Gebruik: node scripts/portal-hash-password.mjs "wachtwoord"')
  process.exit(1)
}
console.log(bcrypt.hashSync(p, 10))
