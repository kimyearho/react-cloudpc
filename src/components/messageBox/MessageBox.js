import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

/**
 * @description
 * 공통 확인창 (Confirm box)
 *
 * @param {*} props - 콘텐츠 데이터들 {..title, ..okLabel 등}
 * @param {*} callback - 확인시 callback
 */
export const confirmBox = (props, callback) => {
  Modal.confirm({
    title: props.title ? props.title : '알림',
    centered: true,
    autoFocusButton: null,
    content: props.content,
    okText: props.okLabel ? props.okLabel : '확인',
    okType: props.okType,
    okButtonProps: props.okButtonProps,
    cancelText: props.cancelLabel ? props.cancelLabel : '닫기',
    cancelButtonProps: props.cancelButtonProps,
    icon: props.icon ? props.icon : <ExclamationCircleFilled />,
    onOk: () => {
      callback()
    },
    onCancel: () => {}
  })
}

/**
 * @description
 * 공통 알림창 (Info box)
 *
 * @param {*} props - 콘텐츠 데이터들 {..title, ..okLabel 등}
 * @param {*} callback - 확인시 callback
 */
export const infoBox = (props, callback) => {
  Modal.info({
    title: props.title,
    centered: true,
    autoFocusButton: null,
    content: props.content,
    okText: props.okLabel ? props.okLabel : '확인',
    okType: props.okType,
    okButtonProps: props.okButtonProps,
    icon: props.icon ? props.icon : <ExclamationCircleFilled />,
    onOk: () => {
      callback()
    }
  })
}
