const initialState = {
  content: '',
  notification: null
};

export default function home(state = initialState, action) {
  switch(action.type) {
    case 'CONTENT_CHANGED':
      return Object.assign({}, {content: action.newContent, notification: {message: '<i class="fa fa-floppy-o" aria-hidden="true"></i> Memos saved.', level: 'success'}});
    case 'CONTENT_LOADED':
      return Object.assign({}, {content: action.content, notification: {message: '<i class="fa fa-cloud" aria-hidden="true"></i> Memos loaded.', level: 'success'}});
    default:
      return state;
  }
}
