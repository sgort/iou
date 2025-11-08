// Main application logic for Lelystad Ringweg Demonstrator

class LelystadDemo {
    constructor() {
        this.currentView = 'compliance';
        this.filters = {
            roadSection: 'all',
            status: 'all',
            domain: 'all'
        };
        this.selectedNode = null;
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.renderComplianceDashboard();
        this.setupFilters();
        this.renderJurisdictionalView();
        this.renderKnowledgeGraph();
    }
    
    // Navigation
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const viewName = e.currentTarget.dataset.view;
                this.switchView(viewName);
            });
        });
    }
    
    switchView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
        document.querySelector(`[data-view="${viewName}"]`).setAttribute('aria-selected', 'true');
        
        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');
        
        this.currentView = viewName;
    }
    
    // USE CASE A: COMPLIANCE DASHBOARD
    setupFilters() {
        const roadSectionFilter = document.getElementById('road-section-filter');
        const statusFilter = document.getElementById('status-filter');
        const domainFilter = document.getElementById('domain-filter');
        
        roadSectionFilter.addEventListener('change', (e) => {
            this.filters.roadSection = e.target.value;
            this.updateComplianceTable();
        });
        
        statusFilter.addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.updateComplianceTable();
        });
        
        domainFilter.addEventListener('change', (e) => {
            this.filters.domain = e.target.value;
            this.updateComplianceTable();
        });
    }
    
    renderComplianceDashboard() {
        this.updateComplianceTable();
    }
    
    updateComplianceTable() {
        const filteredRequirements = this.filterRequirements(mockData.requirements);
        const tbody = document.getElementById('requirements-tbody');
        
        tbody.innerHTML = filteredRequirements.map(req => `
            <tr>
                <td>
                    <strong>${req.title}</strong>
                    <br>
                    <small style="color: var(--color-text-muted);">${req.description}</small>
                </td>
                <td>${req.roadSection}</td>
                <td>
                    <span class="badge badge-info" style="font-size: var(--font-size-xs);">
                        ${req.domain}
                    </span>
                </td>
                <td>${this.renderStatusBadge(req.status)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: var(--space-xs);">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style="color: var(--color-text-muted);">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                        </svg>
                        <span style="font-size: var(--font-size-sm);">${req.responsible}</span>
                    </div>
                </td>
                <td>
                    <div style="display: flex; align-items: center; gap: var(--space-xs);">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style="color: var(--color-text-muted);">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
                        </svg>
                        <span style="font-size: var(--font-size-sm);">${this.formatDate(req.deadline)}</span>
                    </div>
                </td>
                <td>
                    <button class="button action-button button-secondary" onclick="demo.viewRequirementDetails('${req.id}')">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        Details
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Update summary cards
        this.updateSummaryCards(filteredRequirements);
    }
    
    filterRequirements(requirements) {
        return requirements.filter(req => {
            if (this.filters.roadSection !== 'all' && req.roadSectionId !== this.filters.roadSection) {
                return false;
            }
            if (this.filters.status !== 'all' && req.status !== this.filters.status) {
                return false;
            }
            if (this.filters.domain !== 'all' && req.domainId !== this.filters.domain) {
                return false;
            }
            return true;
        });
    }
    
    updateSummaryCards(requirements) {
        const statusCounts = {
            compliant: requirements.filter(r => r.status === 'compliant').length,
            'in-progress': requirements.filter(r => r.status === 'in-progress').length,
            pending: requirements.filter(r => r.status === 'pending').length,
            overdue: requirements.filter(r => r.status === 'overdue').length
        };
        
        const cards = document.querySelectorAll('.summary-card .card-value');
        if (cards.length >= 4) {
            cards[0].textContent = statusCounts.compliant;
            cards[1].textContent = statusCounts['in-progress'];
            cards[2].textContent = statusCounts.overdue;
            cards[3].textContent = requirements.length;
        }
    }
    
    renderStatusBadge(status) {
        const statusMap = {
            'compliant': { label: 'Compliant', class: 'compliant' },
            'in-progress': { label: 'In behandeling', class: 'in-progress' },
            'pending': { label: 'Openstaand', class: 'pending' },
            'overdue': { label: 'Achterstallig', class: 'overdue' }
        };
        
        const statusInfo = statusMap[status] || { label: status, class: 'pending' };
        
        return `
            <span class="status-badge ${statusInfo.class}">
                <span class="status-dot"></span>
                ${statusInfo.label}
            </span>
        `;
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('nl-NL', options);
    }
    
    viewRequirementDetails(reqId) {
        const requirement = mockData.requirements.find(r => r.id === reqId);
        if (!requirement) return;
        
        alert(`Requirement Details\n\n${requirement.title}\n\n${requirement.description}\n\nRegulatie: ${requirement.regulation}\n\nIn een volledig systeem zou hier een gedetailleerde view openen met:\n- Volledige RDF triples\n- Gekoppelde bronnen\n- Historische wijzigingen\n- Annotaties en interpretaties`);
    }
    
    // USE CASE C: JURISDICTIONAL COORDINATION
    renderJurisdictionalView() {
        this.setupLayerControls();
        this.renderOverlapAnalysis();
        // Initial map render with default layers
        this.updateMapVisualization();
    }
    
    setupLayerControls() {
        const toggleLayersBtn = document.getElementById('toggle-layers');
        const layerPanel = document.getElementById('layer-panel');
        let panelVisible = true;
        
        if (toggleLayersBtn) {
            toggleLayersBtn.addEventListener('click', () => {
                panelVisible = !panelVisible;
                layerPanel.style.display = panelVisible ? 'block' : 'none';
            });
        }
        
        const layerCheckboxes = document.querySelectorAll('.layer-checkbox');
        layerCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const layer = e.target.dataset.layer;
                this.toggleMapLayer(layer, e.target.checked);
            });
        });
    }
    
    toggleMapLayer(layer, visible) {
        console.log(`Layer ${layer} ${visible ? 'enabled' : 'disabled'}`);
        
        // Update the map visualization based on layer toggles
        this.updateMapVisualization();
    }
    
    updateMapVisualization() {
        const layers = {
            provincial: document.querySelector('[data-layer="provincial"]').checked,
            municipal: document.querySelector('[data-layer="municipal"]').checked,
            nnn: document.querySelector('[data-layer="nnn"]').checked,
            natura2000: document.querySelector('[data-layer="natura2000"]').checked,
            protected: document.querySelector('[data-layer="protected"]').checked
        };
        
        const mapContainer = document.getElementById('jurisdictional-map');
        
        let svg = `
            <div class="map-placeholder">
                <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
        `;
        
        // Provincial section
        if (layers.provincial) {
            svg += `
                <rect x="50" y="50" width="200" height="300" fill="#E8F4F8" stroke="#01689B" stroke-width="3" rx="5"/>
                <text x="150" y="90" font-size="16" font-weight="600" text-anchor="middle" fill="#01689B">Provinciaal</text>
                <text x="150" y="115" font-size="14" text-anchor="middle" fill="#154273">Laan van Nieuw Land</text>
            `;
        }
        
        // Municipal section
        if (layers.municipal) {
            svg += `
                <rect x="350" y="50" width="200" height="300" fill="#FFF4E8" stroke="#F39200" stroke-width="3" rx="5"/>
                <text x="450" y="90" font-size="16" font-weight="600" text-anchor="middle" fill="#F39200">Gemeentelijk</text>
                <text x="450" y="115" font-size="14" text-anchor="middle" fill="#D97700">Verlengde Westerdreef</text>
            `;
        }
        
        // NNN Corridor overlay
        if (layers.nnn) {
            svg += `
                <rect x="180" y="120" width="240" height="80" fill="#E8F8E8" stroke="#39870C" stroke-width="3" opacity="0.85" rx="5"/>
                <text x="300" y="160" font-size="14" font-weight="600" text-anchor="middle" fill="#39870C">NNN Corridor</text>
                <text x="300" y="180" font-size="12" text-anchor="middle" fill="#2A6709">Overlap Zone</text>
            `;
        }
        
        // Natura 2000 area
        if (layers.natura2000) {
            svg += `
                <ellipse cx="450" cy="280" rx="100" ry="60" fill="#D5F4E6" stroke="#7FCDBB" stroke-width="3" opacity="0.7" rx="5"/>
                <text x="450" y="285" font-size="13" font-weight="600" text-anchor="middle" fill="#3BA886">Natura 2000</text>
            `;
        }
        
        // Protected species habitat
        if (layers.protected) {
            svg += `
                <polygon points="150,250 180,280 150,310 120,280" fill="#FFF9E6" stroke="#FFD700" stroke-width="3" opacity="0.8"/>
                <text x="150" y="285" font-size="11" font-weight="600" text-anchor="middle" fill="#CC9900">Habitat</text>
            `;
        }
        
        // Connection point (always visible if both boundaries shown)
        if (layers.provincial && layers.municipal) {
            svg += `
                <circle cx="250" cy="200" r="8" fill="#D52B1E" stroke="white" stroke-width="2"/>
                <text x="300" y="250" font-size="12" text-anchor="middle" fill="#767676">Knooppunt</text>
            `;
        }
        
        // Legend
        svg += `
            <g transform="translate(50, 370)">
        `;
        
        if (layers.provincial) {
            svg += `
                <rect x="0" y="0" width="20" height="15" fill="#01689B"/>
                <text x="25" y="12" font-size="11" fill="#2C2C2C">Provincie Flevoland</text>
            `;
        }
        
        if (layers.municipal) {
            svg += `
                <rect x="180" y="0" width="20" height="15" fill="#F39200"/>
                <text x="205" y="12" font-size="11" fill="#2C2C2C">Gemeente Lelystad</text>
            `;
        }
        
        if (layers.nnn || layers.natura2000 || layers.protected) {
            svg += `
                <rect x="360" y="0" width="20" height="15" fill="#39870C" opacity="0.7"/>
                <text x="385" y="12" font-size="11" fill="#2C2C2C">Ecologische Zones</text>
            `;
        }
        
        svg += `
            </g>
                </svg>
                <p class="map-caption">Conceptuele weergave van jurisdictionele grenzen en overlap zones</p>
            </div>
        `;
        
        mapContainer.innerHTML = svg;
    }
    
    renderOverlapAnalysis() {
        const container = document.getElementById('overlap-analysis');
        
        const html = mockData.overlaps.map(overlap => `
            <div class="overlap-item">
                <div class="overlap-header">
                    <div class="overlap-icon">
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
                        </svg>
                    </div>
                    <div>
                        <h4 class="overlap-title">${overlap.title}</h4>
                        <div style="display: flex; gap: var(--space-md); margin-top: var(--space-xs);">
                            <span class="badge badge-warning">Coördinatie Vereist</span>
                            <span class="badge badge-info">${overlap.authority}</span>
                        </div>
                    </div>
                </div>
                <p class="overlap-description">${overlap.description}</p>
                <div style="margin: var(--space-md) 0;">
                    <strong style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">Betrokken Wegvakken:</strong>
                    <ul style="margin: var(--space-sm) 0 0 var(--space-lg); color: var(--color-text-secondary); font-size: var(--font-size-sm);">
                        ${overlap.affectedSections.map(section => `<li>${section}</li>`).join('')}
                    </ul>
                </div>
                <div class="overlap-requirements">
                    <strong style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: var(--space-sm);">Gerelateerde Eisen:</strong>
                    ${overlap.requirements.map(reqId => {
                        const req = mockData.requirements.find(r => r.id === reqId);
                        return req ? `
                            <a href="#" class="requirement-link" onclick="event.preventDefault(); demo.viewRequirementDetails('${req.id}');">
                                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"/>
                                </svg>
                                ${req.title}
                            </a>
                        ` : '';
                    }).join('')}
                </div>
                ${overlap.notes ? `
                    <div style="margin-top: var(--space-md); padding: var(--space-md); background-color: var(--color-info-light); border-radius: var(--radius-md);">
                        <strong style="font-size: var(--font-size-sm); color: var(--color-info);">📋 Opmerking:</strong>
                        <p style="margin: var(--space-xs) 0 0 0; font-size: var(--font-size-sm); color: var(--color-text);">${overlap.notes}</p>
                    </div>
                ` : ''}
            </div>
        `).join('');
        
        container.innerHTML = html;
    }
    
    // USE CASE E: KNOWLEDGE GRAPH EXPLORER
    renderKnowledgeGraph() {
        this.setupEntryPoints();
        this.setupGraphControls();
        this.renderInitialGraph();
    }
    
    setupEntryPoints() {
        const entryCards = document.querySelectorAll('.entry-point-card');
        entryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const conceptId = e.currentTarget.dataset.concept;
                
                // Visual feedback - highlight selected card
                entryCards.forEach(c => c.style.borderColor = 'var(--color-border)');
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.borderWidth = '3px';
                
                this.selectStartNode(conceptId);
            });
        });
    }
    
    setupGraphControls() {
        const closeBtn = document.getElementById('close-details');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('node-details').style.display = 'none';
            });
        }
        
        const copyBtn = document.getElementById('copy-query');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const queryText = document.querySelector('#sparql-query-display code').textContent;
                navigator.clipboard.writeText(queryText).then(() => {
                    alert('SPARQL query gekopieerd naar klembord!');
                });
            });
        }
    }
    
    selectStartNode(conceptId) {
        // Find the node
        const node = mockData.knowledgeGraph.nodes.find(n => n.id === conceptId);
        if (!node) return;
        
        // Render graph from this node
        this.renderGraphFromNode(node);
        
        // Show node details
        this.showNodeDetails(node);
        
        // Update SPARQL query
        this.updateSparqlQuery(node);
    }
    
    renderInitialGraph() {
        const container = document.getElementById('knowledge-graph-container');
        
        // Create a welcoming initial state with visual elements
        container.innerHTML = `
            <svg class="graph-canvas" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                            refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#01689B" />
                    </marker>
                </defs>
                
                <!-- Sample nodes to show what the graph will look like -->
                <g opacity="0.3">
                    <!-- Center node -->
                    <circle cx="400" cy="300" r="50" fill="#01689B" stroke="#154273" stroke-width="2"/>
                    <text x="400" y="305" font-size="12" font-weight="600" text-anchor="middle" fill="white">Start Node</text>
                    
                    <!-- Related nodes around center -->
                    <circle cx="250" cy="200" r="35" fill="#39870C" stroke="#154273" stroke-width="2"/>
                    <text x="250" y="205" font-size="10" text-anchor="middle" fill="white">Maatregel</text>
                    
                    <circle cx="550" cy="200" r="35" fill="#F39200" stroke="#154273" stroke-width="2"/>
                    <text x="550" y="205" font-size="10" text-anchor="middle" fill="white">Regelgeving</text>
                    
                    <circle cx="250" cy="400" r="35" fill="#D52B1E" stroke="#154273" stroke-width="2"/>
                    <text x="250" y="405" font-size="10" text-anchor="middle" fill="white">Rol</text>
                    
                    <circle cx="550" cy="400" r="35" fill="#7FCDBB" stroke="#154273" stroke-width="2"/>
                    <text x="550" y="405" font-size="10" text-anchor="middle" fill="white">Wegvak</text>
                    
                    <!-- Connecting lines -->
                    <line x1="360" y1="270" x2="280" y2="220" stroke="#CACACA" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <line x1="440" y1="270" x2="520" y2="220" stroke="#CACACA" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <line x1="360" y1="330" x2="280" y2="380" stroke="#CACACA" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <line x1="440" y1="330" x2="520" y2="380" stroke="#CACACA" stroke-width="2" marker-end="url(#arrowhead)"/>
                </g>
                
                <!-- Instruction text -->
                <rect x="200" y="240" width="400" height="120" fill="white" opacity="0.95" rx="8" stroke="#01689B" stroke-width="2"/>
                <text x="400" y="280" text-anchor="middle" font-size="18" font-weight="600" fill="#01689B">
                    Selecteer een beginpunt hierboven
                </text>
                <text x="400" y="310" text-anchor="middle" font-size="14" fill="#5A5A5A">
                    De graph toont semantische relaties tussen
                </text>
                <text x="400" y="335" text-anchor="middle" font-size="14" fill="#5A5A5A">
                    concepten, regelgeving, maatregelen en rollen
                </text>
            </svg>
        `;
    }
    
    renderGraphFromNode(startNode) {
        const container = document.getElementById('knowledge-graph-container');
        
        // Add fade effect
        container.style.opacity = '0.3';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
        
        // Get related nodes
        const relatedNodeIds = startNode.relations.map(r => r.targetId);
        const relatedNodes = mockData.knowledgeGraph.nodes.filter(n => 
            relatedNodeIds.includes(n.id)
        );
        
        // Create simple radial layout
        const centerX = 400;
        const centerY = 300;
        const radius = 200;
        
        let svg = `
            <svg class="graph-canvas" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                            refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#01689B" />
                    </marker>
                </defs>
        `;
        
        // Draw edges
        startNode.relations.forEach((relation, i) => {
            const angle = (2 * Math.PI * i) / startNode.relations.length;
            const targetX = centerX + radius * Math.cos(angle);
            const targetY = centerY + radius * Math.sin(angle);
            
            svg += `
                <line x1="${centerX}" y1="${centerY}" 
                      x2="${targetX}" y2="${targetY}" 
                      stroke="#CACACA" stroke-width="2" 
                      marker-end="url(#arrowhead)" />
                <text x="${(centerX + targetX) / 2}" 
                      y="${(centerY + targetY) / 2 - 10}" 
                      text-anchor="middle" 
                      font-size="11" 
                      fill="#767676">
                    ${relation.label}
                </text>
            `;
        });
        
        // Draw related nodes
        relatedNodes.forEach((node, i) => {
            const angle = (2 * Math.PI * i) / relatedNodes.length;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const color = this.getNodeColor(node.type);
            
            svg += `
                <g class="graph-node" style="cursor: pointer;" 
                   onclick="demo.selectGraphNode('${node.id}')">
                    <circle cx="${x}" cy="${y}" r="30" 
                            fill="${color}" 
                            stroke="#154273" stroke-width="2" 
                            opacity="0.9">
                        <title>${node.label}</title>
                    </circle>
                    <text x="${x}" y="${y + 50}" 
                          text-anchor="middle" 
                          font-size="12" 
                          fill="#2C2C2C">
                        ${this.truncateLabel(node.label, 15)}
                    </text>
                </g>
            `;
        });
        
        // Draw center node (start node) - larger and prominent
        const centerColor = this.getNodeColor(startNode.type);
        svg += `
            <g class="graph-node">
                <circle cx="${centerX}" cy="${centerY}" r="45" 
                        fill="${centerColor}" 
                        stroke="#154273" stroke-width="3" 
                        opacity="1">
                    <title>${startNode.label} (Start)</title>
                </circle>
                <text x="${centerX}" y="${centerY + 5}" 
                      text-anchor="middle" 
                      dominant-baseline="middle"
                      font-size="13" 
                      font-weight="700"
                      fill="white">
                    ${this.truncateLabel(startNode.label, 12)}
                </text>
                <text x="${centerX}" y="${centerY - 65}" 
                      text-anchor="middle" 
                      font-size="12" 
                      font-weight="600"
                      fill="#01689B">
                    ${startNode.category}
                </text>
                <text x="${centerX}" y="${centerY + 70}" 
                      text-anchor="middle" 
                      font-size="11" 
                      fill="#5A5A5A">
                    (${startNode.relations.length} relaties)
                </text>
            </g>
        `;
        
        svg += `</svg>`;
        container.innerHTML = svg;
    }
    
    getNodeColor(type) {
        const colors = {
            'WorkProtocol': '#39870C',
            'MitigatingMeasure': '#7FCDBB',
            'Regulation': '#01689B',
            'Requirement': '#F39200',
            'RoadSection': '#154273',
            'Role': '#D52B1E',
            'ComplianceCheckpoint': '#FFD700'
        };
        return colors[type] || '#CACACA';
    }
    
    truncateLabel(label, maxLength) {
        if (label.length <= maxLength) return label;
        return label.substring(0, maxLength - 3) + '...';
    }
    
    selectGraphNode(nodeId) {
        const node = mockData.knowledgeGraph.nodes.find(n => n.id === nodeId);
        if (!node) return;
        
        this.showNodeDetails(node);
        this.renderGraphFromNode(node);
        this.updateSparqlQuery(node);
    }
    
    showNodeDetails(node) {
        const detailsPanel = document.getElementById('node-details');
        const content = document.getElementById('node-details-content');
        
        let html = `
            <div class="detail-section">
                <div class="detail-label">Type</div>
                <div class="detail-value">
                    <span class="badge" style="background-color: ${this.getNodeColor(node.type)}; color: white;">
                        ${node.type}
                    </span>
                </div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Label</div>
                <div class="detail-value">${node.label}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Categorie</div>
                <div class="detail-value">${node.category}</div>
            </div>
            
            <div class="detail-section">
                <div class="detail-label">Beschrijving</div>
                <div class="detail-value">${node.description}</div>
            </div>
        `;
        
        if (node.source) {
            html += `
                <div class="detail-section">
                    <div class="detail-label">Bron</div>
                    <div class="detail-value">
                        ${node.source.startsWith('http') ? 
                            `<a href="${node.source}" target="_blank" style="color: var(--color-primary);">${node.source}</a>` :
                            node.source
                        }
                    </div>
                </div>
            `;
        }
        
        if (node.jurisdiction) {
            html += `
                <div class="detail-section">
                    <div class="detail-label">Jurisdictie</div>
                    <div class="detail-value">${node.jurisdiction}</div>
                </div>
            `;
        }
        
        if (node.organization) {
            html += `
                <div class="detail-section">
                    <div class="detail-label">Organisatie</div>
                    <div class="detail-value">${node.organization}</div>
                </div>
            `;
        }
        
        if (node.relations && node.relations.length > 0) {
            html += `
                <div class="detail-section">
                    <div class="detail-label">Relaties (${node.relations.length})</div>
                    <div class="relation-list">
                        ${node.relations.map(rel => {
                            const targetNode = mockData.knowledgeGraph.nodes.find(n => n.id === rel.targetId);
                            return targetNode ? `
                                <div class="relation-item">
                                    <span class="relation-type">${rel.label}</span>
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style="color: var(--color-text-muted);">
                                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"/>
                                    </svg>
                                    <button class="button button-ghost action-button" 
                                            onclick="demo.selectGraphNode('${targetNode.id}')"
                                            style="padding: var(--space-xs);">
                                        ${targetNode.label}
                                    </button>
                                </div>
                            ` : '';
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        content.innerHTML = html;
        detailsPanel.style.display = 'block';
        
        // Scroll to details
        detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    updateSparqlQuery(node) {
        const queryDisplay = document.querySelector('#sparql-query-display code');
        
        const query = `# SPARQL query voor navigatie vanaf: ${node.label}
PREFIX flvl: <https://data.flevoland.nl/lelystad-ringweg/>
PREFIX flvl-def: <https://data.flevoland.nl/def/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?related ?relationType ?relationLabel ?label ?description ?category
WHERE {
    # Startpunt: ${node.id}
    flvl:${node.id} ?relationType ?related .
    
    # Haal labels en beschrijvingen op
    OPTIONAL { ?related skos:prefLabel ?label . }
    OPTIONAL { ?related rdfs:label ?label . }
    OPTIONAL { ?related skos:definition ?description . }
    OPTIONAL { ?related dcterms:description ?description . }
    OPTIONAL { ?related flvl-def:category ?category . }
    
    # Haal relationele label op
    OPTIONAL { ?relationType rdfs:label ?relationLabel . }
    
    # Filter op Nederlandse teksten
    FILTER(!BOUND(?label) || lang(?label) = "nl" || lang(?label) = "")
    FILTER(!BOUND(?description) || lang(?description) = "nl" || lang(?description) = "")
}
ORDER BY ?relationLabel ?label
LIMIT 20`;
        
        queryDisplay.textContent = query;
    }
}

// Initialize the demo when DOM is loaded
let demo;
document.addEventListener('DOMContentLoaded', () => {
    demo = new LelystadDemo();
    console.log('Lelystad Ringweg Demonstrator geladen');
});
