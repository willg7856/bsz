import { handleUpload } from '@vercel/blob/client'
import { NOZZLE_ORDER } from '../src/nozzle/order.js'

// Issues short-lived tokens so the browser can upload a design file straight
// to Vercel Blob (avoids the 4.5 MB request limit on functions).
// Needs BLOB_READ_WRITE_TOKEN (added when a Blob store is connected).
export async function POST(request) {
  try {
    const body = await request.json()
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!/^nozzle-uploads\/[\w.-]{1,120}\.stl$/i.test(pathname)) {
          throw new Error('Only .stl files can be uploaded.')
        }
        return {
          allowedContentTypes: ['model/stl', 'application/sla', 'application/vnd.ms-pki.stl', 'application/octet-stream'],
          maximumSizeInBytes: NOZZLE_ORDER.maxFileBytes,
          addRandomSuffix: true,
        }
      },
    })
    return Response.json(result)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
