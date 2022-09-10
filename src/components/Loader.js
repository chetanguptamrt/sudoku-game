import React, { Suspense } from 'react'
import { Loading } from 'react-loading-dot/lib'

const Loader = ({ Component, children }) => {
    return (
        <Suspense fallback={<Loading duration='0.6s' size="1.2rem" margin='0.8rem' background='rgb(8,32,50)' />}>
            {children || <Component />}
        </Suspense>
    )
}

export default Loader