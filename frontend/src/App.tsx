import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    Dashboard,
    ProjectInitiation,
    ArchitectureDesigner,
    TopologyMap,
    ComplianceCenter,
    CostAnalysis,
    BlueprintApproval,
    AuditLogs,
} from './pages'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/initiate" element={<ProjectInitiation />} />
                <Route path="/designer" element={<ArchitectureDesigner />} />
                <Route path="/topology" element={<TopologyMap />} />
                <Route path="/compliance" element={<ComplianceCenter />} />
                <Route path="/cost" element={<CostAnalysis />} />
                <Route path="/blueprint" element={<BlueprintApproval />} />
                <Route path="/audit" element={<AuditLogs />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
