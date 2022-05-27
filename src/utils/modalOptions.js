import React from 'react'

export const recoveryModalOptions = {
  width: 550,
  className: 'recovery-modal',
  templateType: 'default',
  title: '오류 복구 실행',
  alertTitle: '중요',
  description: (
    <>
      오류 복구를 실행한 Cloud PC의 모든 데이터는 초기화 됩니다.
      <br />
      오류 복구중인 가상 PC는 오류 복구 실행을 할 수 없습니다.
    </>
  ),
  buttonLabel: {
    apply: '실행',
    cancel: '취소'
  },
  buttonProps: {
    disabled: true
  }
}

export const aliasChangeMdoalOptions = {
  width: 630,
  templateType: 'form',
  title: '가상 PC 별칭 설정',
  description:
    '가상 PC 별로 별칭을 설정하면 목록에서 가상 PC를 쉽고 빠르게 구분할 수 있습니다.',
  buttonLabel: {
    apply: '변경',
    cancel: '취소'
  },
  buttonProps: {
    disabled: false
  }
}

export const userPcPeriodModalOptions = {
  width: 560,
  templateType: 'form',
  title: '가상 PC 기간 연장 신청',
  description:
    '가상 PC 기간 연장 신청 접수 후 담당 관리자의 검토 후 처리 예정 입니다.',
  buttonLabel: {
    apply: '신청',
    cancel: '취소'
  },
  buttonProps: {
    disabled: false
  }
}
