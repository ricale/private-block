import React from 'react'
import { Route } from 'react-router'
import App from './components/container/App'
import WritingList from './components/writings/WritingList'
import WritingForm from './components/writings/WritingForm'
import WritingItem from './components/writings/WritingItem'
// import CategoryList from './components/categories/CategoryList'
// import CategoryForm from './components/categories/CategoryForm'

export default (
  <Route path="/" component={App}>
    <Route path="/writings"          component={WritingList} />
    <Route path="/writings/new"      component={WritingForm} />
    <Route path="/writings/:id"      component={WritingItem} />
    <Route path="/writings/:id/edit" component={WritingForm} />
    {/*<Route path="/categories"         component={CategoryList} />*/}
    {/*<Route path="/categories/new"     component={CategoryForm} />*/}
    {/*<Route path="/categories/:id/new" component={CategoryForm} />*/}
  </Route>
)