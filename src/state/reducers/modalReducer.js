export function modalReducer(state = { modalIsOpen: false, modalType: 'Timer' }, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { modalIsOpen: true, modalType: action.payload.modalType }
    case 'CLOSE_MODAL':
      return { modalIsOpen: false }
    default:
      return state
  }
}
