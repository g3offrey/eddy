import { remote } from 'electron';
import fs from 'fs';

export function contentChanged(newContent) {
  return {
    type: 'CONTENT_CHANGED',
    newContent
  };
}

export function contentLoaded(content) {
  return {
    type: 'CONTENT_LOADED',
    content
  }
}

export function saveContentAsync(newContent) {
  return (dispatch) => {
    const writePath = remote.app.getPath('home') + '/eddy.dat';
    fs.writeFile(writePath, newContent, (err)  => {
      if(err) return console.log(err);

      dispatch(contentChanged(newContent));
    });
  };
}

export function loadContentAsync() {
  return (dispatch) => {
    const writePath = remote.app.getPath('home') + '/eddy.dat';
    fs.readFile(writePath, {encoding: 'utf-8'}, (err, content)  => {
      if(err) return console.log(err);

      dispatch(contentLoaded(content));
    });
  };
}

