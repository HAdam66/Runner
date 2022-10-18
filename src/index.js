import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SaRunnerListing from './components/SaRunnerListing';
import SaRunnerReg from './components/SaRunnerReg';
import SaRunnerEdit from './components/SaRunnerEdit';
import SaRunnerDel from './components/SaRunnerDel';
import SaPackageListing from './components/SaPackageListing';
import SaPackageCreate from './components/SaPackageCreate';
import SaPackageDel from './components/SaPackageDel';
import SaPackageEdit from './components/SaPackageEdit';
import SaPackageToRunner from './components/SaPackageToRunner';
import Login from './components/Login';
import AuthGuard from './components/AuthGuard';
import UserReg from './user-components/UserReg';
import RunnerReg from './components/RunnerComponents/RunnerReg';
import RunnerDashboard from './components/RunnerComponents/RunnerDashboard';
import UserDashboard from './user-components/UserDashboard';
import RunnerPackageListing from './components/RunnerComponents/RunnerPackageListing';
import UserPackageListing from './user-components/UserPackageListing';
import RunnerWaitingPackages from './components/RunnerComponents/RunnerWaitingPackages';
import UserAsReceiverPackageList from './user-components/UserAsReceiverPackageList';
import UserPackageCreate from './user-components/UserPackageCreate';
import SaMap from './components/SaMap';
import RunnerQr from './components/RunnerComponents/RunnerQr';
import UserQr from './user-components/UserQr';
import RunnerProfile from './components/RunnerComponents/RunnerProfile';
import UserProfile from './user-components/UserProfile';
import PackageTracking from './components/PackageTracking';
import PackageInfo from './components/PackageInfo';
import RegistrationLandingPage from './components/RegistrationLandingPage';
import RunnerMap from './components/RunnerComponents/RunnerMap';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/" element={<Home />} />   
                    <Route path="/SaFutarListazas" element={<AuthGuard><SaRunnerListing /></AuthGuard>} />
                    <Route path="/SaFutarReg" element={<AuthGuard> <SaRunnerReg /></AuthGuard>} />
                    <Route path="/SaFutarSzerkesztes/:username" element={<AuthGuard><SaRunnerEdit /></AuthGuard>} />
                    <Route path="/SaFutarTorles/:runnerId" element={<AuthGuard><SaRunnerDel /></AuthGuard>} />
                    <Route path='/SaCsomagListazas' element={<AuthGuard><SaPackageListing/></AuthGuard>}></Route>
                    <Route path="/SaCsomagLetrehozas" element={<AuthGuard><SaPackageCreate /></AuthGuard>}></Route>
                    <Route path="/SaCsomagTorles/:packageId" element={<AuthGuard><SaPackageDel /></AuthGuard>}></Route>
                    <Route path='/SaCsomagSzerkesztes/:packageId' element={<AuthGuard><SaPackageEdit/></AuthGuard>}></Route>
                    <Route path='/SaCsomagFutarhozRendeles' element={<AuthGuard><SaPackageToRunner/></AuthGuard>}></Route>
                    <Route path='/SaTerkep' element={<AuthGuard><SaMap/></AuthGuard>}></Route>
                    <Route path="/FelhasznaloRegisztracio" element= {<UserReg></UserReg>}></Route>
                    <Route path='/FutarRegisztracio' element={<RunnerReg />}></Route>  
                    <Route path="/Bejelentkezes" element={<Login></Login>}></Route>
                    <Route path="/CsomagKovetes" element={<PackageTracking />} />
                    <Route path="/Regisztracio" element={<RegistrationLandingPage />} />
                    <Route path="/CsomagKovetes/:packageId" element={<PackageInfo />} />
                    <Route path="/FutarDashboard" element={<AuthGuard><RunnerDashboard /></AuthGuard>} />
                    <Route path="/FutarQr" element={<AuthGuard><RunnerQr /></AuthGuard>} />
                    <Route path="/FutarProfil/:username" element={<AuthGuard><RunnerProfile /> </AuthGuard>} />
                    <Route path="/FelhasznaloDashboard" element={<AuthGuard><UserDashboard /></AuthGuard>} />
                    <Route path="/FolyamatbanLevoCsomagok" element={<AuthGuard><RunnerPackageListing/></AuthGuard>}/>
                    <Route path='/FeladottCsomagok' element={<AuthGuard><UserPackageListing /></AuthGuard>}/>
                    <Route path="/FutarraVaroCsomagok" element={<AuthGuard><RunnerWaitingPackages /></AuthGuard>} />
                    <Route path="/FutarTerkep" element={<AuthGuard><RunnerMap /></AuthGuard>} />
                    <Route path="/NekemCimzettCsomagok" element={<AuthGuard> <UserAsReceiverPackageList/> </AuthGuard>} />
                    <Route path="/CsomagFeladas" element={<AuthGuard> <UserPackageCreate /> </AuthGuard>} />
                    <Route path="FelhasznaloProfil/:username" element={<AuthGuard> <UserProfile /> </AuthGuard>} />
                    <Route path="/Csomagatvetel" element={<UserQr />} />


            </Route>
        </Routes>
    </BrowserRouter>

);

