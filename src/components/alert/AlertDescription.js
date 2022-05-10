import React from 'react'
import { Alert } from 'antd'

const AlertDescription = ({ alertTitle, alertMessage }) => {
  return (
    <>
      <Alert
        className="mb-20p"
        message={<b>{alertTitle}</b>}
        description={alertMessage}
        type="info"
        showIcon
      />
    </>
  )
}

export default AlertDescription
