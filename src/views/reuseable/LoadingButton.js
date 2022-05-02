import React from 'react'
import { Button, Spinner } from 'reactstrap'
//  custome button with spinner
const LoadingButton = ({ loading, color, onClick, title, type }) => {
    return (
        <Button
            color={ color || "primary" }
            onClick={ onClick }
            type={ type }
        >
            { title || "Allow" }
            { loading ? <Spinner className='m-1' color='light' size="sm" /> : null }
        </Button>
    )
}
export default LoadingButton