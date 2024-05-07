import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Theme, ThemePanel } from '@radix-ui/themes';
import Home from './pages/Home';
import AboutSection from './components/AboutSection/AboutSection';
import Translation from './provider/Translation/Translation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RightSection from './components/RightSection/RightSection';
import WorldSettings from './pages/WorldSettings';
import ServerManagement from './pages/ServerManagement';
import useSelectedServerInstance from './redux/selectedServerInstance/useSelectedServerInstance';
import ModManagement from './pages/ModManagement';
import { useEffect } from 'react';
import useRunServerInstall from './hooks/server/useRunServerInstall';
import EngineInstallingHint from './components/Home/EngineInstallingHint/EngineInstallingHint';

export default function App() {
  const [hasInstalled] = useRunServerInstall();

  const { selectedServerInstance } = useSelectedServerInstance();

  return (
    <Router>
      <Theme>
        {/* <ThemePanel /> */}
        <div className="App">
          <div className="w-screen h-screen flex">
            <div className="w-full h-full p-4 bg-bg-1 flex flex-col gap-4">
              <AboutSection />
              <Switch>
                {/* <Route path="/monitor" component={Monitor} /> */}
                <Route
                  exact
                  path="/"
                  render={() =>
                    hasInstalled ? <Home /> : <EngineInstallingHint />
                  }
                />
                <Route path="/world-settings" component={WorldSettings} />
                <Route path="/server-management" component={ServerManagement} />
                <Route path="/mod-management" component={ModManagement} />

                {/*
                <Route path="/save-settings" component={SaveSettings} />
                <Route path="/mod-settings" component={ModSettings} />
                <Route path="/faq" component={FAQ} /> */}
                <Redirect exact from="/" to="/" />
              </Switch>
            </div>
            {selectedServerInstance && <RightSection />}
          </div>
        </div>
      </Theme>
    </Router>
  );
}
