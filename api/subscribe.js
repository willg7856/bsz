import { subscribe } from '../src/newsletter/subscribe.js'

// POST /api/subscribe { email } — adds the address to the Resend contact list
// for update emails. Needs a Resend key with full access (contacts can't be
// created with a sending-only key): RESEND_CONTACTS_KEY, or RESEND_API_KEY if
// that key already has full access. Optional: RESEND_AUDIENCE_ID to add people
// to one particular audience.
export function POST(request) {
  return subscribe(request, {
    fetch,
    resendKey: process.env.RESEND_CONTACTS_KEY || process.env.RESEND_API_KEY,
    audienceId: process.env.RESEND_AUDIENCE_ID,
  })
}
