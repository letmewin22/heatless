import * as React from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const NotFoundPage: React.FC<IProps> = ({ location }) => (
  <Layout location={location}>
    <Seo title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
