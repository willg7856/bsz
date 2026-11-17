import { Link } from 'react-router-dom'
import { useTitle } from '../useTitle'

export default function NotFound() {
  useTitle('Not found')

  return (
    <header className="masthead">
      <div className="masthead-inner">
        <div>
          <p className="kicker">404</p>
          <h1>That page isn&apos;t on the range.</h1>
          <p className="lede">The link doesn&apos;t match a page on Beyond Stage Zero.</p>
          <div className="actions">
            <Link className="btn btn-ink" to="/">Back home</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
