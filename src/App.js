import TextEditor from "./components/TextEditor"
import {Suspense} from 'react'
import { MantineProvider,Loader } from '@mantine/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { v4 as uuidV4 } from "uuid"
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ArticlesScreen from './screens/ArticlesScreen'
import ArticleScreen from './screens/ArticleScreen'
import ProfileScreen from './screens/ProfileScreen'
import WriteArticle from './screens/WriteArticle'
import RessourcesScreen from "./screens/RessourcesScreen"
import TeamScreen from "./screens/LivesScreen"
import SearchScreen from './screens/SearchScreen'
import PublishScreen from './screens/PublishScreen'
import PublishingScreen from './screens/PublishingScreen'
import SinglePublishScreen from './screens/SinglePublishScreen'
import './css/tailwind.css'
function App() {
  return (
    <MantineProvider>
    <Router>
      <Switch>
        <Route path="/" exact>
           <HomeScreen />
         
        </Route>
        <Route path="/documents/:id">
          <TextEditor />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/profile">
          <Suspense fallback={<Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
          />}>

          <ProfileScreen />
          </Suspense>
        </Route>
        <Route path="/signup">
          <SignupScreen />
        </Route>
        <Route path="/articles">
        <Suspense fallback={<Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
          />}>
          <ArticlesScreen />
          </Suspense>
        </Route>
        <Route path="/article/:articleId">
        <Suspense fallback={<Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
          />}>
          <ArticleScreen />
          </Suspense>
        </Route>
        <Route path="/write">
          <WriteArticle />
        </Route>
        <Route path="/ressources">
          <RessourcesScreen />
        </Route>
        <Route path="/lives">
          <TeamScreen />
        </Route>
        <Route path="/search">
          <SearchScreen />
        </Route>
        <Route path="/publishs">
          <PublishScreen />
        </Route>
        <Route path="/publishing">
          <PublishingScreen />
        </Route>
        <Route path="/publish/:publishId">
          <SinglePublishScreen />
        </Route>
        {/* <Route path="/write/:articleId">
          <WriteArticle />
        </Route> */}
      </Switch>
    </Router>
    </MantineProvider>
  )
}

export default App
