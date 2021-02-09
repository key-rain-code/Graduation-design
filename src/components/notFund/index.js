import * as React from 'react'

import { FrownOutlined } from '@ant-design/icons'

export default class Index extends React.Component {
    render () {
        return (
            <div className="txt-center" style={{ lineHeight: '200px' }}>
                <h1><FrownOutlined /> 亲，是不是走错地方了？</h1>
            </div>
        )
    }
}
