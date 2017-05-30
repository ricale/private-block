window.React = require('react');
window.ReactDOM = require('react-dom');
window.Root = require('./components/containers/Root.js').default;

window.Introduction = require('./components/commons/Introduction.js').default;

window.WritingList = require('./views/writings/WritingListPage.js').default;
window.Writing     = require('./views/writings/WritingPage.js').default;
window.NewWriting  = require('./views/writings/WritingNewPage.js').default;
window.EditWriting = require('./views/writings/WritingEditPage.js').default;

window.CategoryList = require('./views/categories/CategoryListPage.js').default;
window.NewCategory  = require('./views/categories/CategoryNewPage.js').default;
window.EditCategory = require('./views/categories/CategoryEditPage.js').default;
