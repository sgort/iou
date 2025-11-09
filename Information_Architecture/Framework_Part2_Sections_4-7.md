# Information Architecture Framework - PART 2
## Sections 4-7: Implementation Architecture

**Document:** Lelystad-Zuid Ring Road Information Architecture Framework  
**Part:** 2 of 3  
**Sections:** 4-7 (Information Model, Process, Roles, Demonstrator)  
**Version:** 1.0  
**Date:** November 8, 2025

---

## Document Navigation

- **[Part 1](./Framework_Part%201_Sections_1-3.md)**: Sections 1-3 (Ontology, Standards, Concepts)
- **Part 2** (this document): Sections 4-7 (Information Model, Process, Roles, Demonstrator)
- **[Part 3](./Framework_Part3_Sections_8-10.md)**: Sections 8-10 (Roadmap, Metrics, Next Steps)

---

**TABLE OF CONTENTS - PART 2**

4. [Information Model (MIM Levels 2-3)](#4-information-model-mim-levels-2-3)
5. [Process Blueprint](#5-process-blueprint)
6. [Roles, Tasks & Access Control](#6-roles-tasks--access-control)
7. [Demonstrator Architecture](#7-demonstrator-architecture)

---

# 4. INFORMATION MODEL (MIM LEVELS 2-3)

## 4.1 Overview: From Concepts to Data Structures

The Information Model translates conceptual understanding into structured data specifications:

- **MIM Level 2**: Conceptual Information Model (platform-independent)
- **MIM Level 3**: Logical Information Model (technology-constrained but implementation-independent)

This section defines object types, attributes, relations, constraints, and datatypes following MIM standards.

## 4.2 Core Object Types

### 4.2.1 Infrastructure Project

**Complete MIM Specification:**

```turtle
flvl-mim:InfrastructureProject 
    a mim:Objecttype ;
    mim:naam "InfrastructureProject"@en ;
    mim:definitie "Complex infrastructure development project"@en ;
    rdfs:subClassOf cpsv:PublicService ;
    
    # Key Attributes
    mim:attribuut 
        flvl-mim:attr-projectCode ,      # Unique identifier
        flvl-mim:attr-projectName ,      # Multilingual name
        flvl-mim:attr-projectStatus ,    # Enumeration
        flvl-mim:attr-startDate ,        # xsd:date
        flvl-mim:attr-totalBudgetEuros ; # xsd:decimal
    
    # Relations
    mim:relatiesoort 
        flvl-mim:rel-hasRoadSection ,    # 1 to many
        flvl-mim:rel-requiresMeasure ,   # 1 to many
        flvl-mim:rel-managedBy ;         # 1 to 1
```

**Enumerations:**

```turtle
flvl-mim:enumeration-ProjectStatus values:
- proposed
- approved  
- active
- suspended
- completed
- cancelled
```

### 4.2.2 Road Section

```turtle
flvl-mim:RoadSection 
    a mim:Objecttype ;
    mim:naam "RoadSection"@en , "Wegvak"@nl ;
    
    # Attributes include:
    - sectionCode (identifier)
    - designSpeed (integer, km/h)
    - numberOfLanes (1-4)
    - lengthMeters (decimal)
    - geometry (GeoSPARQL)
```

### 4.2.3 Mitigation Measure

```turtle
flvl-mim:MitigatingMeasure hierarchy:
├─ NNNMeasure
├─ Natura2000Measure
└─ ProtectedSpeciesMeasure

Key attributes:
- implementationPhase (enumeration)
- complianceStatus (enumeration)
- deadline (date)
- costEstimate (decimal, EUR)
```

### 4.2.4 Actionable Requirement

```turtle
Includes 13 Legal Analysis Elements:
1. legalSubject
2. legalObject
3. legalRelationship
4. legalFact
5. condition
6. derivationRule
7. hasVariable
8. hasParameter
9. hasOperator
10. timeSpecifier
11. locationSpecifier
12. delegationAuthority
13. sourceDefinition
```

## 4.3 Temporal Validity (MIM Level 3)

**Formal History** (when known in system):
- registratieStartDatum
- registratieEindDatum

**Material History** (when true in reality):
- beginGeldigheid
- eindGeldigheid

Example: Budget revisions tracked with both formal and material history for complete audit trail.

## 4.4 Spatial Data Integration

**GeoSPARQL Implementation:**
- All spatial entities have `geo:hasGeometry` property
- WKT (Well-Known Text) format for geometries
- Supports spatial queries: `geo:sfWithin`, `geo:sfIntersects`, `geo:sfOverlaps`

---

# 5. PROCESS BLUEPRINT

## 5.1 Overview: Adaptive Workflow Modeling

The Process Blueprint defines formal workflows with:
- **State machines** for regulatory analysis and compliance verification
- **Adaptive branching** for dynamic workflow modification
- **Milestone gates** for project phase transitions
- **Complete provenance** using PROV-O

## 5.2 Regulatory Analysis Workflow

**7-Stage Standard Workflow:**

```
Stage 1: Collection (2 days)
  ↓ Legal Analyst
Stage 2: Extraction (5 days)
  ↓ Environmental Law Specialist
Stage 3: Analysis (3 days)
  ↓ Apply 13 legal elements
Stage 4: Annotation (2 days)
  ↓ Add project context
Stage 5: Review (3 days)
  ↓ Peer review → [approved/revision needed]
Stage 6: Approval (2 days)
  ↓ Senior Legal Advisor → [approved/rejected]
Stage 7: Publication (1 day)
  ↓ Information Manager
[PUBLISHED]
```

**Key Features:**
- **Conditional branching**: Review/approval can loop back to earlier stages
- **Role-based gates**: Each stage requires specific role authorization
- **Estimated durations**: For project planning and deadline management
- **Activity specifications**: Detailed sub-tasks for each stage

## 5.3 Workflow Instance Example

```turtle
flvl-id:workflow-instance-nnn-2024-11 
    a flvl-def:WorkflowInstance ;
    dcterms:title "NNN Regulation Analysis - November 2024" ;
    flvl-def:basedOn flvl-proc:RegulatoryAnalysisWorkflow ;
    flvl-def:currentStage flvl-proc:Stage4-Annotation ;
    flvl-def:workflowStatus "in-progress" ;
    prov:startedAtTime "2024-11-05T09:00:00Z" ;
    
    # Stage history with provenance
    flvl-def:stageHistory [
        flvl-def:completedStage flvl-proc:Stage1-Collection ;
        flvl-def:completedBy flvl-id:expert-legal-analyst-de-vries ;
        flvl-def:completedAt "2024-11-06T15:30:00Z"
    ] .
```

## 5.4 Adaptive Workflow Extension

**Dynamic Modification Example:**

When a regulation requires specialized expertise not in the standard workflow, the system allows authorized users to insert additional stages mid-execution:

```turtle
flvl-def:workflowAdaptation [
    flvl-def:modificationType "insert-stage" ;
    flvl-def:insertedStage flvl-proc:Stage5b-EcologicalExpertReview ;
    flvl-def:insertAfter flvl-proc:Stage5-Review ;
    flvl-def:modificationReason "Nitrogen deposition calculations require certified ecological expert" ;
    flvl-def:authorizedBy flvl-id:role-senior-legal-advisor
] .
```

## 5.5 Compliance Verification Workflow

**6-Stage Process:**

```
Stage 1: Implementation (Contractor)
Stage 2: Documentation (Contractor)
Stage 3: Internal Review (Project Manager)
Stage 4: Submission (to Authority)
Stage 5: Authority Review
Stage 6: Approval/Rejection
```

**Service Level Agreement:**
- Maximum authority review duration: 30 days
- Escalation threshold: 40 days

## 5.6 Project Milestone Modeling

**Structure (To Be Developed Collaboratively):**

```turtle
flvl-def:ProjectMilestone 
    - Significant decision or completion checkpoint
    - Requires compliance verification
    - Gates project phase transitions
    - Tracks scheduled vs. actual dates

Example:
flvl-id:milestone-preliminary-design-approval 
    - Scheduled: 2025-06-30
    - Requires: NNN approval, Natura2000 assessment, traffic safety review
    - Approval authority: Provincial Project Director
    - Blocks: Tender publication milestone
```

**Note:** Full milestone definitions require stakeholder input on critical success factors.

---

# 6. ROLES, TASKS & ACCESS CONTROL

## 6.1 Role Taxonomy

### 6.1.1 Provincial Roles

**Provincial Project Manager:**
- **Authority**: Approve milestones, assign tasks, budget up to €100k
- **Jurisdiction**: Province Flevoland
- **Can Perform**: 
  - Approve project milestones
  - Review compliance status
  - Coordinate stakeholder meetings
  - Authorize budget allocation
- **Access**: Project management level (all project data)

**Provincial Environmental Authority:**
- **Authority**: Approve environmental measures, grant permits, enforce compliance
- **Legal Basis**: Omgevingswet
- **Can Perform**:
  - Review environmental assessments
  - Approve mitigation measures
  - Issue environmental permits
  - Conduct compliance inspections

**Senior Legal Advisor:**
- **Authority**: Approve legal interpretations, resolve regulatory conflicts
- **Can Perform**:
  - Approve annotations
  - Resolve requirement conflicts
  - Authorize legal opinions

### 6.1.2 Legal/Regulatory Analysis Roles

**Environmental Law Specialist:**
- **Can Perform**:
  - Extract actionable requirements
  - Apply legal analysis framework (13 elements)
  - Annotate requirements
  - Review peer analyses

**Legal Analyst:**
- **Reports To**: Environmental Law Specialist
- **Can Perform**:
  - Collect regulatory sources
  - Catalog regulations
  - Extract simple requirements

### 6.1.3 Municipal Roles

**Municipal Project Coordinator:**
- **Jurisdiction**: Municipality Lelystad
- **Can Perform**:
  - Coordinate municipal scope (Verlengde Westerdreef)
  - Review municipal requirements
  - Liaise with provincial project manager

### 6.1.4 Technical/Operational Roles

**Contractor:**
- **Can Perform**:
  - Implement mitigation measures
  - Submit implementation reports

**Environmental Consultant:**
- **Can Perform**:
  - Conduct ecological surveys
  - Prepare impact assessments
  - Advise on mitigation measures

**Information Manager:**
- **Can Perform**:
  - Publish approved requirements
  - Manage access control
  - Maintain version history
  - Generate compliance reports

## 6.2 Task-Based Access Control (TBAC)

### 6.2.1 CRUD Permissions by Task

**Extract Actionable Requirements:**
- **Role**: Environmental Law Specialist
- **Operates On**: ActionableRequirement
- **Permissions**: CREATE, READ
- **Cannot**: DELETE (only archive)

**Annotate Requirements:**
- **Role**: Environmental Law Specialist
- **Operates On**: ActionableRequirement, oa:Annotation
- **Permissions**: CREATE, READ, UPDATE
- **Cannot**: DELETE
- **Output Access**: Private (until approved)

**Approve Annotations:**
- **Role**: Senior Legal Advisor
- **Operates On**: oa:Annotation
- **Permissions**: READ, UPDATE
- **Can Modify**: approvalStatus, accessLevel
- **Output Access**: Public (after approval)

**Implement Mitigation Measure:**
- **Role**: Contractor
- **Operates On**: MitigatingMeasure
- **Permissions**: READ, UPDATE
- **Can Modify**: complianceStatus only
- **Cannot Modify**: deadline, costEstimate
- **Must**: Attach evidence

**Approve Mitigation Measure:**
- **Role**: Provincial Environmental Authority
- **Operates On**: MitigatingMeasure, ComplianceCheckpoint
- **Permissions**: READ, UPDATE
- **Creates**: Legally binding approval

## 6.3 Granular Resource-Level Access Control

### 6.3.1 Two-Tier Access Model (Baseline)

```turtle
# Public resources
flvl-id:req-nnn-001 
    ronl:accessLevel "public" .  # Regulation text

# Private resources
flvl-id:annotation-nnn-001-v1 
    ronl:accessLevel "private" ;  # Internal interpretation
    flvl-def:accessibleBy flvl-id:role-legal-team .
```

**Benefits:**
- Minimal data exposure for anonymous users
- Clear consent boundaries
- GDPR compliance built-in
- Full audit log

### 6.3.2 Extended Policies

**Sensitive Ecological Data Policy:**
```
Resource Type: ProtectedSpeciesObservation
Required Role: Senior Ecologist
Requires Justification: Yes (logged)
Audit Access: Yes (full trail)
Cannot Export: Yes
Cannot Share: Yes
Legal Basis: Flora- en faunawet
```

**Commercial Cost Data Policy:**
```
Resource Type: CostEstimate, TenderData
Accessible By: Project Manager, Financial Controller, Director
Embargo Until: 2025-12-31 (during tender)
Rationale: Commercial sensitivity
```

### 6.3.3 Attribute-Level Access

Some users can view projects but not budget details:
- **Environmental Consultant**: Can see project, CANNOT see budget
- **Contractor**: Can see project, CANNOT see budget
- **Project Manager**: Can see ALL including budget
- **Financial Controller**: Can see ALL including budget

## 6.4 Audit Trail

All access to sensitive resources is logged:

```turtle
flvl-id:access-log-12345 
    # Who
    prov:wasAssociatedWith flvl-id:user-jones-marie ;
    flvl-def:actingInRole flvl-id:role-environmental-law-specialist ;
    
    # What
    flvl-def:accessedResource flvl-id:annotation-nnn-001-v1 ;
    flvl-def:operationPerformed "read" ;
    
    # When
    prov:atTime "2024-11-18T10:23:45Z" ;
    
    # Why
    flvl-def:accessJustification "Reviewing for compliance verification report" ;
    
    # Result
    flvl-def:accessGranted true .
```

Denied access attempts also logged with denial reason and policy violated.

---

# 7. DEMONSTRATOR ARCHITECTURE

## 7.1 Overview: Multi-Component Strategy

**Four Complementary Formats:**

1. **SPARQL Query Catalog**: Documented queries demonstrating key use cases
2. **Web Application**: Interactive React-based interface with NL Design System
3. **TriplyDB Browser**: Curated entry points and saved queries
4. **Static Documentation Site**: Technical reference with embedded examples

**Target Audience:** Tactical/strategic leadership (business and IT)

**Priority Use Cases:**
- **A) Regulatory Compliance Dashboard**
- **C) Cross-Jurisdictional Coordination**
- **E) Knowledge Graph Exploration**

## 7.2 Component 1: SPARQL Query Catalog

### 7.2.1 Query Organization

```
queries/
├── use-case-A-compliance-dashboard/
│   ├── Q01-requirements-by-road-section.rq
│   ├── Q02-compliance-status-overview.rq
│   ├── Q03-overdue-checkpoints.rq
│   ├── Q04-measures-by-status.rq
│   └── Q05-upcoming-deadlines.rq
├── use-case-C-cross-jurisdictional/
│   ├── Q10-provincial-municipal-overlap.rq
│   ├── Q11-shared-ecological-zones.rq
│   ├── Q12-coordination-requirements.rq
│   └── Q13-interface-points.rq
├── use-case-E-knowledge-graph/
│   ├── Q20-navigate-protocol-to-regulations.rq
│   ├── Q21-requirement-to-measures-path.rq
│   ├── Q22-regulation-impact-analysis.rq
│   ├── Q23-stakeholder-network.rq
│   └── Q24-temporal-evolution.rq
└── utilities/
    ├── U01-list-all-regulations.rq
    ├── U02-version-comparison.rq
    └── U03-spatial-intersection.rq
```

### 7.2.2 Example Query: Requirements by Road Section

```sparql
PREFIX flvl: <https://data.flevoland.nl/lelystad-ringweg/>
PREFIX flvl-def: <https://data.flevoland.nl/def/>
PREFIX flvl-sp: <https://data.flevoland.nl/def/spatial-planning/>

SELECT DISTINCT 
    ?requirement 
    ?reqTitle 
    ?measure 
    ?checkpoint 
    ?checkpointStatus 
    ?deadline 
    ?urgency
WHERE {
    # Road section (parameter)
    VALUES ?roadSection { flvl:LaanVanNieuwLand }
    
    # Find requirements affecting this location
    ?requirement a flvl-def:ActionableRequirement ;
                 dcterms:title ?reqTitle ;
                 flvl-def:affectsLocation ?roadSection .
    
    # Linked measures
    OPTIONAL {
        ?requirement flvl-def:requiresMeasure ?measure .
    }
    
    # Compliance checkpoints
    OPTIONAL {
        ?requirement flvl-def:hasCheckpoint ?checkpoint .
        ?checkpoint flvl-def:complianceStatus ?checkpointStatus ;
                    flvl-def:hasDeadline ?deadline .
    }
    
    # Calculate urgency
    BIND(IF(?deadline < NOW(), "OVERDUE", 
         IF(?deadline < (NOW() + "P30D"^^xsd:duration), "DUE SOON", 
         "ON TRACK")) AS ?urgency)
}
ORDER BY ?urgency DESC ?deadline
```

### 7.2.3 Example Query: Provincial-Municipal Overlap

```sparql
PREFIX flvl: <https://data.flevoland.nl/lelystad-ringweg/>
PREFIX flvl-sp: <https://data.flevoland.nl/def/spatial-planning/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>

SELECT 
    ?provincialSection 
    ?municipalSection 
    ?overlapType 
    ?sharedRequirement
WHERE {
    # Provincial section
    ?provincialSection flvl-sp:jurisdiction flvl:ProvinceFlevoland ;
                       geo:hasGeometry ?provGeom .
    
    # Municipal section
    ?municipalSection flvl-sp:jurisdiction flvl:MunicipalityLelystad ;
                      geo:hasGeometry ?munGeom .
    
    # Spatial overlap
    FILTER(geof:sfIntersects(?provGeom, ?munGeom) || 
           geof:sfTouches(?provGeom, ?munGeom))
    
    # Find shared requirements
    OPTIONAL {
        ?sharedRequirement flvl-def:affectsLocation ?provincialSection ,
                                                    ?municipalSection .
    }
}
```

### 7.2.4 Example Query: Knowledge Graph Navigation

```sparql
PREFIX flvl: <https://data.flevoland.nl/lelystad-ringweg/>
PREFIX flvl-def: <https://data.flevoland.nl/def/>
PREFIX flvl-eco: <https://data.flevoland.nl/def/ecology/>

# Navigate from ecological work protocol to regulations to stakeholders
SELECT ?protocol ?regulation ?requirement ?measure ?responsible
WHERE {
    # Start with ecological work protocol
    ?protocol a flvl-eco:EcologicalWorkProtocol .
    
    # Link to measures that must follow protocol
    ?measure flvl-eco:mustFollowProtocol ?protocol .
    
    # Measures fulfill requirements
    ?measure flvl-def:fulfillsRequirement ?requirement .
    
    # Requirements derive from regulations
    ?requirement dcterms:source ?regulation .
    
    # Measures have responsible parties
    ?measure flvl-eco:responsibleParty ?responsible .
}
```

## 7.3 Component 2: Web Application

### 7.3.1 Technology Stack

- **Frontend**: React 18+ with TypeScript
- **UI Framework**: NL Design System components
- **State Management**: React Query + Context API
- **Data Layer**: GraphQL API over SPARQL endpoint
- **Visualization**: 
  - D3.js for knowledge graph
  - Leaflet for spatial layers
  - Recharts for compliance dashboards
- **Backend**: GraphQL resolver layer
- **Triple Store**: TriplyDB with SPARQL endpoint

### 7.3.2 Application Views

**View 1: Regulatory Compliance Dashboard (Use Case A)**

Layout:
```
┌─────────────────────────────────────────────┐
│  Compliance Status Overview                 │
│  [Pie Chart: Status Distribution]           │
├─────────────────────────────────────────────┤
│  Requirements by Road Section               │
│  [Filter: LaanVanNieuwLand ▼]               │
│  ┌────────────────────────────────────────┐ │
│  │ REQ-NNN-001: NNN Corridor Protection   │ │
│  │ Status: ● In Progress | Due: 2025-05-15│ │
│  │ Measures: 2 | Checkpoints: 1           │ │
│  │ [View Details]                         │ │
│  └────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  Alerts & Overdue Items                     │
│  ⚠️  3 checkpoints overdue                  │
│  ⚠️  5 deadlines within 30 days             │
└─────────────────────────────────────────────┘
```

**View 2: Cross-Jurisdictional Coordination Map (Use Case C)**

Layout:
```
┌─────────────────────────────────────────────┐
│  [Interactive Map]                          │
│  Layers:                                    │
│  ☑ Provincial Boundary                      │
│  ☑ Municipal Boundary                       │
│  ☑ Road Sections                            │
│  ☑ NNN Corridors                            │
│  ☑ Natura 2000 Zones                        │
├─────────────────────────────────────────────┤
│  Overlap Analysis                           │
│  Provincial-Municipal Interface Points: 2   │
│  Shared Requirements: 7                     │
│  Coordination Meetings Required: 3          │
│  [Generate Coordination Report]             │
└─────────────────────────────────────────────┘
```

**View 3: Knowledge Graph Explorer (Use Case E)**

Layout:
```
┌─────────────────────────────────────────────┐
│  [Interactive Graph Visualization]          │
│  ● Regulations ● Requirements ● Measures    │
│  ● Checkpoints ● Stakeholders               │
│                                             │
│  Selected: REQ-NNN-001                      │
│  ┌───────────────────────────────────────┐  │
│  │ Connections:                          │  │
│  │ ↑ Source: NaturaWet v2024-01          │  │
│  │ → Requires: 2 Measures                │  │
│  │ → Checkpoints: 1 Approval Needed      │  │
│  │ ↓ Affects: LaanVanNieuwLand Sec 1-4   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 7.3.3 GraphQL Schema (Key Types)

```graphql
type Query {
  # Compliance Dashboard
  requirementsByRoadSection(sectionId: ID!): [Requirement!]!
  complianceStatusSummary: ComplianceStatus!
  overdueCheckpoints: [Checkpoint!]!
  
  # Cross-Jurisdictional
  jurisdictionalOverlaps: [JurisdictionalOverlap!]!
  sharedRequirements(section1: ID!, section2: ID!): [Requirement!]!
  
  # Knowledge Graph
  requirementConnections(reqId: ID!): RequirementGraph!
  regulationImpactAnalysis(regulationId: ID!): ImpactAnalysis!
}

type Requirement {
  id: ID!
  code: String!
  title: String!
  definition: String!
  sourceRegulation: Regulation!
  measures: [Measure!]!
  checkpoints: [Checkpoint!]!
  affectedLocations: [RoadSection!]!
}

type Checkpoint {
  id: ID!
  title: String!
  status: CheckpointStatus!
  deadline: Date!
  daysOverdue: Int
  responsibleRole: Role!
}

enum CheckpointStatus {
  PENDING
  SUBMITTED
  UNDER_REVIEW
  APPROVED
  REJECTED
  EXPIRED
}
```

## 7.4 Component 3: TriplyDB Interactive Browser

### 7.4.1 Curated Entry Points

```turtle
# Saved Query: Compliance Overview
flvl-triply:EntryPoint-ComplianceOverview 
    a triply:SavedQuery ;
    triply:title "Regulatory Compliance Overview" ;
    triply:description "Summary of all requirements and compliance status" ;
    triply:sparqlQuery "[embedded SPARQL]" ;
    triply:defaultVisualization "table" .

# Saved Query: Spatial Viewer
flvl-triply:EntryPoint-SpatialViewer 
    a triply:Perspective ;
    triply:title "Spatial Regulatory Layers" ;
    triply:description "Map-based view of regulatory zones" ;
    triply:baseQuery "[spatial query]" ;
    triply:mapLayers (
        "Provincial Boundary"
        "Municipal Boundary"
        "NNN Corridor"
        "Natura 2000 Zones"
        "Road Sections"
    ) .
```

### 7.4.2 TriplyDB Configuration

- **Instance**: Hosted TriplyDB (cloud or on-premise)
- **Datasets**: 
  - `lelystad-ringweg-ontology` (schema)
  - `lelystad-ringweg-data` (instances)
  - `lelystad-ringweg-vocabularies` (SKOS concepts)
- **SPARQL Endpoint**: Public read access, authenticated write
- **Saved Queries**: 15-20 documented queries
- **Perspectives**: 3-5 curated views

## 7.5 Component 4: Static Documentation Site

### 7.5.1 Site Structure

```
docs/
├── index.html
├── architecture/
│   ├── ontology-overview.html
│   ├── namespace-reference.html
│   ├── class-hierarchy.html
│   └── diagrams/
│       ├── ontology-diagram.svg
│       └── workflow-diagram.svg
├── use-cases/
│   ├── compliance-dashboard.html
│   ├── cross-jurisdictional.html
│   └── knowledge-exploration.html
├── queries/
│   ├── query-catalog.html
│   └── query-examples/
│       ├── requirements-by-section.html
│       └── provincial-municipal-overlap.html
├── tutorials/
│   ├── querying-basics.html
│   ├── extending-ontology.html
│   └── adding-new-regulations.html
├── api/
│   ├── graphql-schema.html
│   ├── sparql-endpoint.html
│   └── authentication.html
└── reference/
    ├── mim-specification.html
    ├── nl-sbb-implementation.html
    └── standards-compliance.html
```

### 7.5.2 Content Features

- **Embedded SPARQL Results**: Live query results or cached examples
- **Interactive Diagrams**: Clickable ontology visualizations
- **Code Examples**: Copy-paste RDF/Turtle snippets
- **Video Walkthroughs**: Screen recordings of demonstrator features
- **Search Functionality**: Full-text search across documentation

## 7.6 Demonstrator Data Scope

**Representative Dataset:**

| Category | Count | Description |
|----------|-------|-------------|
| Road Sections | 2-3 | Laan van Nieuw Land + Verlengde Westerdreef subsections |
| Regulations | 5-7 | NNN, Natura 2000, 2-3 municipal plans, provincial vision |
| Actionable Requirements | 10-15 | Fully decomposed with legal analysis |
| Concepts (Begrippenkader) | 20-30 | Covering all three use cases |
| Mitigation Measures | 3-5 | At least one per ecological category |
| Stakeholder Roles | 4-6 | Sample users across organizations |
| Workflow Instances | 2 | One standard, one adapted |
| Historical Snapshots | 3 | Versions across 6 months |

**Data Quality Standards:**
- All resources have multilingual labels (nl/en)
- Complete provenance using PROV-O
- Spatial data in WGS84 (EPSG:4326)
- Temporal data with explicit validity periods
- Consistent naming conventions per namespace strategy

## 7.7 Deployment Architecture

### 7.7.1 Infrastructure Components

```
┌─────────────────────────────────────────────┐
│  User Interface Layer                       │
│  ┌─────────────┐  ┌─────────────────────┐   │
│  │ React Web   │  │ TriplyDB Browser    │   │
│  │ Application │  │ Interface           │   │
│  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  API Layer                                  │
│  ┌─────────────┐  ┌─────────────────────┐   │
│  │ GraphQL API │  │ SPARQL Endpoint     │   │
│  └─────────────┘  └─────────────────────┘   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  Data Layer                                 │
│  ┌──────────────────────────────────────┐   │
│  │ TriplyDB Triple Store                │   │
│  │ - Ontology graphs                    │   │
│  │ - Instance data graphs               │   │
│  │ - Vocabulary graphs                  │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### 7.7.2 Hosting Options

**Option A: Cloud Hosting**
- TriplyDB Cloud (SaaS)
- React app on Azure Static Web Apps / Netlify
- GraphQL API on Azure Functions / AWS Lambda
- DNS via Azure DNS

**Option B: On-Premise**
- TriplyDB Enterprise (self-hosted)
- React app on IIS / nginx
- GraphQL API on Node.js server
- Internal network only

**Recommendation:** Start with cloud for demonstrator, migrate to on-premise for production.

---

## Summary: Part 2 Key Takeaways

**Section 4: Information Model**
- Complete MIM-compliant specifications for core object types
- Temporal validity tracking (formal + material history)
- Spatial data integration via GeoSPARQL
- Enumeration types for controlled vocabularies

**Section 5: Process Blueprint**
- 7-stage regulatory analysis workflow
- Adaptive workflow modification capability
- Compliance verification with SLA tracking
- Project milestone framework (collaborative development needed)

**Section 6: Roles & Access Control**
- Comprehensive role taxonomy (provincial, municipal, technical)
- Task-based access control with CRUD permissions
- Granular resource-level policies
- Complete audit trail with provenance

**Section 7: Demonstrator Architecture**
- Multi-component strategy (SPARQL + Web + TriplyDB + Docs)
- Priority use cases with example queries
- React application with NL Design System
- Representative dataset specifications

---

**Continue to Part 3 for:**
- Section 8: Technical Implementation Roadmap (16-week plan)
- Section 9: Success Metrics & Evaluation
- Section 10: Next Steps & Decision Points

---

**For questions or clarifications, contact:**  
Province of Flevoland - Infrastructure & Environment  
Email: info@flevoland.nl

**Framework Version:** 1.0  
**Last Updated:** November 8, 2025
