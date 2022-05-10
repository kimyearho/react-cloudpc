/**
 * @description Props로 전달받은 Meta정보를 담는다.
 *
 * @param {Object} props - Pros
 */
export const metaFactory = (props) => {
  return {
    ctrTitle: props.title,
    ctrTopSubmenu: props.showPcSubmenu,
    ctrShowAlert: props.showAlert,
    alertTitle: props.alertTitle,
    alertMessage: props.alertMessage
  }
}
