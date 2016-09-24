import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/containers/App'
import Introduction from './components/commons/Introduction'

import SessionPage from './components/containers/SessionPage'
import SignInForm from './components/users/SignInForm'

import WritingPage from './components/containers/WritingPage'
import WritingList from './components/writings/WritingList'
import WritingForm from './components/writings/WritingForm'
import WritingItem from './components/writings/WritingItem'

import CategoryPage from './components/containers/CategoryPage'
import CategoryList from './components/categories/CategoryList'
import CategoryForm from './components/categories/CategoryForm'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Introduction} />

    <Route path="/users/sign_in" component={SessionPage}>
      <IndexRoute component={SignInForm} />
    </Route>

    <Route path="/categories" component={CategoryPage}>
      <IndexRoute component={CategoryList} />
      <Route path="/categories/new"      component={CategoryForm} />
      <Route path="/categories/:id/edit" component={CategoryForm} />
    </Route>

    <Route path="/writings" component={WritingPage}>
      <IndexRoute component={WritingList} />
      <Route path="/writings/new"      component={WritingForm} />
      <Route path="/writings/:id"      component={WritingItem} />
      <Route path="/writings/:id/edit" component={WritingForm} />

      <Route path="/categories/:categoryId/writings" component={WritingList} />

      <Route path="/:id" component={WritingItem} />
    </Route>
  </Route>
)
