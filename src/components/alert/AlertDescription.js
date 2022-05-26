import React from 'react'
import { Alert } from 'antd'

const AlertDescription = ({ alertTitle, alertMessage }) => {
  return (
    <>
      <Alert
        className="mb-20p"
        message={alertTitle}
        description={<b>{alertMessage}</b>}
        type="info"
        showIcon
      />
    </>
  )
}

export default AlertDescription
