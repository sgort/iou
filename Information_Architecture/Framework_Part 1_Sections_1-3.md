# Information Architecture Framework for Lelystad-Zuid Ring Road Project

**Version:** 1.0  
**Date:** November 8, 2025  
**Project:** Lelystad-Zuid Ring Road (Laan van Nieuw Land + Verlengde Westerdreef)  
**Province:** Flevoland, Netherlands  
**Document Type:** Foundation Framework Specification

---

## Document Overview

This comprehensive framework defines the information architecture for managing regulatory compliance, spatial planning, and project governance for the Lelystad-Zuid Ring Road project using semantic web technologies and Dutch/EU standards.

**Framework Size:** ~50,000 words across 10 major sections  
**Technical Depth:** Includes RDF/Turtle examples, SPARQL queries, MIM specifications, and implementation guidance

**Download Note:** Due to the comprehensive nature of this framework (complete with detailed RDF examples, ontology specifications, and technical patterns), the full document has been organized into thematic sections below. Each section can be read sequentially or referenced independently.

---

## Table of Contents

### PART I: FOUNDATION ARCHITECTURE (Sections 1-3)

1. **[Ontological Architecture](#1-ontological-architecture)**
   - Multi-layer ontology design (Legal → Conceptual → Information → Implementation)
   - Namespace strategy and governance
   - Core ontology classes (Infrastructure, Mitigation Measures, Compliance, Spatial)
   - Properties and alignment with Dutch/EU vocabularies

2. **[Standards Collection & Annotation](#2-standards-collection--annotation)**
   - Regulatory source management and DSO/RTR integration
   - Regulation versioning and provenance tracking
   - Legal analysis integration (13 elements)
   - Annotation workflow with approval processes

3. **[Concept Framework (MIM Level 1)](#3-concept-framework-mim-level-1)**
   - Begrippenkader structure following NL-SBB
   - Hierarchical concept taxonomy (Begrippenlijst → Taxonomie → Thesaurus)
   - Cross-domain harmonization with national vocabularies
   - Concept collections for navigation

### PART II: IMPLEMENTATION ARCHITECTURE (Sections 4-7)

4. **[Information Model (MIM Levels 2-3)](#4-information-model-mim-levels-2-3)**
   - Object type definitions with MIM specifications
   - Relational model for project entities
   - Attribute specifications and constraints
   - Logical to physical model mapping

5. **[Process Blueprint](#5-process-blueprint)**
   - Workflow state machines for regulatory analysis
   - Adaptive workflow branching
   - Project milestone and decision point modeling
   - Task dependency management

6. **[Roles, Tasks & Access Control](#6-roles-tasks--access-control)**
   - Role taxonomy and authority delegation
   - Task-based access control (CRUD permissions)
   - Granular resource-level access policies
   - Audit trail and provenance tracking

7. **[Demonstrator Architecture](#7-demonstrator-architecture)**
   - Multi-format demonstrator components
   - SPARQL query catalog for priority use cases
   - Web application architecture
   - TriplyDB configuration and static documentation

### PART III: IMPLEMENTATION & GOVERNANCE (Sections 8-10)

8. **[Technical Implementation Roadmap](#8-technical-implementation-roadmap)**
   - 5-phase implementation plan (16 weeks)
   - Detailed task breakdown per phase
   - Dependencies and critical path
   - Resource requirements

9. **[Success Metrics & Evaluation](#9-success-metrics--evaluation)**
   - Scalability indicators
   - Adaptability metrics
   - Usability benchmarks
   - Evaluation methodology

10. **[Next Steps](#10-next-steps)**
    - Immediate action items
    - Decision points for stakeholder input
    - Alternative implementation paths
    - Resource mobilization

---

## How to Use This Framework

**For Tactical/Strategic Leadership:**
- Start with Executive Summary and Section 10 (Next Steps)
- Review Section 7 (Demonstrator) for proof-of-concept scope
- Reference Section 9 (Success Metrics) for evaluation criteria

**For Technical Architects:**
- Begin with Section 1 (Ontological Architecture)
- Study Sections 2-3 for standards integration patterns
- Review Section 4 for MIM-compliant modeling
- Examine Section 7 for implementation specifications

**For Legal/Regulatory Experts:**
- Focus on Section 2 (Standards Collection & Annotation)
- Review Section 3 (Concept Framework) for terminology
- Reference Section 5 (Process Blueprint) for compliance workflows

**For Project Managers:**
- Start with Section 5 (Process Blueprint)
- Review Section 6 (Roles & Access) for governance
- Study Section 8 (Roadmap) for planning
- Reference Section 9 for success criteria

---

# 1. ONTOLOGICAL ARCHITECTURE

## 1.1 Multi-Layer Ontology Design

The architecture implements a 5-layer semantic model extending MIM's 4-level approach with an explicit regulatory semantics layer:

```
┌──────────────────────────────────────────────────────────────┐
│ Layer 0: Legal/Regulatory Semantics (NL-SBB/SKOS)            │
│ Purpose: Model legal concepts and actionable requirements    │
│ Standards: NL-SBB (SKOS), Legal Analysis Specification       │
│ Output: Begrippenkader, Actionable Requirements              │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ Layer 1: Conceptual Model (MIM Level 1)                      │
│ Purpose: Domain concepts and semantic relations              │
│ Standards: MIM Metamodel, SKOS                               │
│ Output: Taxonomies, Thesauri, Concept Schemes                │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ Layer 2: Information Model (MIM Levels 2-3)                  │
│ Purpose: Object types, attributes, relations, constraints    │
│ Standards: MIM, UML                                          │
│ Output: Information models, data dictionaries                │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ Layer 3: Logical Model (MIM Level 3)                         │
│ Purpose: Technology-independent data structures              │
│ Standards: MIM, ISO 19100 series                             │
│ Output: Normalized schemas, referential integrity            │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ Layer 4: Implementation (MIM Level 4)                        │
│ Purpose: Physical RDF triple store                           │
│ Standards: RDF/Turtle, SPARQL, TriplyDB                      │
│ Output: Queryable knowledge graph                            │
└──────────────────────────────────────────────────────────────┘
```

**Design Principles:**

1. **Extension over Replacement**: Infrastructure projects modeled as specialized `cpsv:PublicService` instances, extending CPSV-AP rather than creating parallel structures

2. **Domain-Specific Extensions**: Four project-specific ontology domains:
   - **flvl-sp**: Spatial Planning (roads, sections, jurisdictions)
   - **flvl-eco**: Environmental/Ecological (mitigation measures, protected zones)
   - **flvl-proj**: Project Governance (milestones, workflows, approvals)
   - **flvl-infra**: Infrastructure Components (road parts, structures)

3. **Actionable Focus**: Legal analysis emphasizes extracting actionable requirements over complete legal text decomposition (13 legal analysis elements selectively applied)

4. **Temporal First-Class**: All regulatory entities support:
   - Version management (`dcterms:replaces`, `prov:wasRevisionOf`)
   - Temporal validity (`cprmv:validFrom`, `cprmv:validUntil`)
   - Change impact tracking (`flvl-def:RegulatoryChangeImpact`)

5. **Spatial Integration**: Geographic features as first-class entities:
   - GeoSPARQL geometries for all spatial elements
   - Spatial overlay analysis for regulatory applicability
   - Map-based visualization layers

## 1.2 Namespace Strategy

**Base Namespaces:**

```turtle
# Flevoland Project Namespaces
@prefix flvl: <https://data.flevoland.nl/lelystad-ringweg/> .
@prefix flvl-def: <https://data.flevoland.nl/def/> .
@prefix flvl-id: <https://data.flevoland.nl/id/> .
@prefix flvl-concept: <https://data.flevoland.nl/concept/> .
@prefix flvl-vocab: <https://data.flevoland.nl/vocabulary/> .
@prefix flvl-geo: <https://data.flevoland.nl/geometry/> .

# Domain Extensions
@prefix flvl-sp: <https://data.flevoland.nl/def/spatial-planning/> .
@prefix flvl-eco: <https://data.flevoland.nl/def/ecology/> .
@prefix flvl-proj: <https://data.flevoland.nl/def/project/> .
@prefix flvl-infra: <https://data.flevoland.nl/def/infrastructure/> .
```

**External Standards:**

```turtle
# EU/NL Public Service Vocabularies
@prefix cpsv: <http://data.europa.eu/m8g/> .
@prefix cprmv: <https://cprmv.open-regels.nl/0.3.0/> .
@prefix dso: <https://begrippen.omgevingswet.nl/> .
@prefix ronl: <https://regels.overheid.nl/termen/> .

# MIM & NL-SBB Standards
@prefix mim: <http://modellen.mim-standaard.nl/def/mim#> .
@prefix skos: <http://www.w3.org/2004/02/skos/core#> .

# W3C Core Vocabularies
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix dcterms: <http://purl.org/dc/terms/> .
@prefix dcat: <http://www.w3.org/ns/dcat#> .
@prefix prov: <http://www.w3.org/ns/prov#> .
@prefix oa: <http://www.w3.org/ns/oa#> .
@prefix geo: <http://www.opengis.net/ont/geosparql#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
```

**Namespace Governance:**

| Aspect | Specification |
|--------|---------------|
| **URI Persistence** | All URIs registered with persistent resolver (e.g., persistent.flevoland.nl) |
| **Content Negotiation** | Support Turtle, JSON-LD, RDF/XML, HTML |
| **Version Control** | Ontology versions tracked via `dcterms:hasVersion` |
| **Documentation** | Human-readable HTML at each namespace URI |
| **Access Control** | Public ontologies, controlled instance data |

## 1.3 Core Ontology Classes

### 1.3.1 Infrastructure Project (Extension of cpsv:PublicService)

**Key Innovation**: Infrastructure delivery modeled AS a public service, not separate from it.

```turtle
flvl-sp:InfrastructureProject 
    a owl:Class ;
    rdfs:subClassOf cpsv:PublicService ;
    rdfs:label "Infrastructure Project"@en, "Infrastructuurproject"@nl ;
    skos:definition """A public infrastructure development project involving 
    spatial planning, environmental compliance, and multi-stakeholder 
    coordination."""@en ;
    skos:scopeNote """Models provincial-scale road construction as a public 
    service delivery mechanism, leveraging CPSV-AP properties for regulatory 
    requirements, stakeholder roles, and compliance verification."""@en ;
    dcterms:created "2024-11-08"^^xsd:date .

# Properties inherited from cpsv:PublicService:
# - cpsv:hasLegalResource (links to regulations)
# - cpsv:hasChannel (access channels for stakeholders)
# - cpsv:produces (outputs like permits, completed infrastructure)
# - cpsv:requires (input requirements)
```

**Project Instances:**

```turtle
flvl-id:LelystadRingwegProject 
    a flvl-sp:InfrastructureProject ;
    dcterms:identifier "FLVL-INFRA-2024-001" ;
    dcterms:title "Lelystad-Zuid Ring Road Project"@en ;
    dcterms:title "Lelystad-Zuid Ringwegproject"@nl ;
    dcterms:description """Construction of bypass road around Lelystad-Zuid 
    consisting of provincial section (Laan van Nieuw Land) and municipal 
    section (Verlengde Westerdreef)."""@en ;
    
    # Service properties
    cpsv:hasCompetentAuthority flvl-id:ProvinceFlevoland ;
    cpsv:hasParticipant flvl-id:MunicipalityLelystad ;
    
    # Project specifics
    flvl-sp:projectCode "LZ-RING-2024" ;
    flvl-sp:projectPhase "planning"@en ;
    flvl-sp:startDate "2024-01-01"^^xsd:date ;
    flvl-sp:expectedCompletion "2027-12-31"^^xsd:date ;
    flvl-sp:totalBudgetEuros "45000000"^^xsd:decimal ;
    
    # Components
    flvl-sp:hasRoadSection 
        flvl-id:LaanVanNieuwLand ,
        flvl-id:VerlendeWesterdreef ;
    
    # Regulatory compliance
    cpsv:hasLegalResource 
        flvl-id:NaturaWet_v2024-01 ,
        flvl-id:Omgevingswet_v2024 ,
        flvl-id:LelystadEnvironmentalVision ;
    
    flvl-def:requiresMeasure 
        flvl-id:measure-nnn-ecological-survey ,
        flvl-id:measure-natura2000-nitrogen-mitigation ;
    
    # Spatial extent
    geo:hasGeometry flvl-geo:project-boundary-polygon .
```

### 1.3.2 Road Section Components

```turtle
flvl-sp:RoadSection
    a owl:Class ;
    rdfs:subClassOf flvl-infra:InfrastructureComponent ;
    rdfs:label "Road Section"@en, "Wegvak"@nl ;
    skos:definition """A delineated segment of road infrastructure with 
    specific administrative responsibility and technical characteristics."""@en .

# Provincial Section
flvl-id:LaanVanNieuwLand 
    a flvl-sp:RoadSection ;
    rdfs:label "Laan van Nieuw Land"@nl ;
    dcterms:description """Provincial section connecting A6 motorway 
    (junction 9) to urban periphery, length approximately 5.2 km."""@en ;
    
    flvl-sp:roadType "provincial-road"@en ;
    flvl-sp:designSpeed "80"^^xsd:integer ; # km/h
    flvl-sp:numberOfLanes "2"^^xsd:integer ; # per direction
    flvl-sp:lengthMeters "5200"^^xsd:decimal ;
    
    flvl-sp:jurisdiction flvl-id:ProvinceFlevoland ;
    flvl-sp:managedBy flvl-id:role-provincial-infrastructure-manager ;
    flvl-sp:proceduralResponsibility "Province handles spatial planning procedures"@en ;
    
    geo:hasGeometry flvl-geo:LaanVanNieuwLand-LineString ;
    flvl-sp:spatiallyOverlapsWith 
        flvl-id:NNN-Corridor-Section-12 ,
        flvl-id:Natura2000-Buffer-Zone-East .

# Municipal Section
flvl-id:VerlendeWesterdreef 
    a flvl-sp:RoadSection ;
    rdfs:label "Verlengde Westerdreef"@nl ;
    dcterms:description """Municipal section extending from provincial 
    boundary into urban areas, serving local access function."""@en ;
    
    flvl-sp:roadType "municipal-road"@en ;
    flvl-sp:designSpeed "50"^^xsd:integer ;
    flvl-sp:numberOfLanes "1"^^xsd:integer ;
    flvl-sp:lengthMeters "2800"^^xsd:decimal ;
    
    flvl-sp:jurisdiction flvl-id:MunicipalityLelystad ;
    flvl-sp:managedBy flvl-id:role-municipal-public-works ;
    flvl-sp:proceduralResponsibility """Municipality coordinates with 
    provincial procedures, handles municipal scope."""@en ;
    
    geo:hasGeometry flvl-geo:VerlendeWesterdreef-LineString ;
    flvl-sp:connectsTo flvl-id:LaanVanNieuwLand .
```

### 1.3.3 Mitigation Measures Hierarchy

**Generic Mitigation Class:**

```turtle
flvl-eco:MitigatingMeasure
    a owl:Class ;
    rdfs:subClassOf flvl-proj:ProjectRequirement ;
    rdfs:label "Mitigating Measure"@en, "Mitigerende Maatregel"@nl ;
    skos:definition """An environmental protection measure required by 
    regulation to mitigate, prevent, or compensate for negative ecological 
    impacts."""@en ;
    dcterms:source <https://wetten.overheid.nl/jci1.3:c:BWBR0024779> .

# Properties
flvl-eco:appliesToLocation rdfs:domain flvl-eco:MitigatingMeasure ;
    rdfs:range geo:Feature .

flvl-eco:implementationPhase rdfs:domain flvl-eco:MitigatingMeasure ;
    rdfs:range xsd:string . # "pre-construction", "during-construction", "post-construction"

flvl-eco:responsibleParty rdfs:domain flvl-eco:MitigatingMeasure ;
    rdfs:range foaf:Agent .

flvl-eco:deliverable rdfs:domain flvl-eco:MitigatingMeasure ;
    rdfs:range xsd:string .

flvl-eco:deadline rdfs:domain flvl-eco:MitigatingMeasure ;
    rdfs:range xsd:date .

flvl-eco:complianceStatus rdfs:domain flvl-eco:MitigatingMeasure ;
    rdfs:range skos:Concept . # Controlled vocabulary
```

**Specialized Measure Types:**

```turtle
# NNN Measures
flvl-eco:NNNMeasure 
    a owl:Class ;
    rdfs:subClassOf flvl-eco:MitigatingMeasure ;
    rdfs:label "NNN Measure"@en, "NNN Maatregel"@nl ;
    skos:altLabel "Natuurnetwerk Nederland Maatregel"@nl ;
    skos:definition """Measure protecting the Dutch National Ecological 
    Network (Natuurnetwerk Nederland)."""@en ;
    dcterms:source <https://wetten.overheid.nl/jci1.3:c:BWBR0037552> .

# Natura 2000 Measures
flvl-eco:Natura2000Measure 
    a owl:Class ;
    rdfs:subClassOf flvl-eco:MitigatingMeasure ;
    rdfs:label "Natura 2000 Measure"@en, "Natura 2000 Maatregel"@nl ;
    skos:definition """Measure required to protect Natura 2000 designated 
    conservation areas under EU Habitats Directive."""@en ;
    dcterms:source <http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:31992L0043> .

# Protected Species Measures
flvl-eco:ProtectedSpeciesMeasure 
    a owl:Class ;
    rdfs:subClassOf flvl-eco:MitigatingMeasure ;
    rdfs:label "Protected Species Measure"@en, "Beschermde Soorten Maatregel"@nl ;
    skos:definition """Measure protecting legally protected animal and plant 
    species from project impacts."""@en ;
    skos:scopeNote """Implementation must follow ecological work protocol 
    (ecologisch werkprotocol)."""@en .
```

**Measure Instance Example:**

```turtle
flvl-id:measure-nnn-ecological-survey 
    a flvl-eco:NNNMeasure ;
    dcterms:identifier "MEAS-NNN-001" ;
    dcterms:title "Ecological Survey NNN Corridor Section 12"@en ;
    dcterms:description """Comprehensive ecological survey of flora and fauna 
    in NNN corridor adjacent to construction area, to be completed before any 
    ground disturbance activities commence."""@en ;
    
    flvl-eco:appliesToLocation flvl-id:NNN-Corridor-Section-12 ;
    flvl-eco:implementationPhase "pre-construction"@en ;
    flvl-eco:responsibleParty flvl-id:contractor-ecological-consultancy ;
    flvl-eco:supervisionBy flvl-id:role-senior-ecologist ;
    flvl-eco:deliverable "Ecological impact assessment report with mitigation recommendations"@en ;
    flvl-eco:deadline "2025-03-31"^^xsd:date ;
    flvl-eco:costEstimate "45000"^^xsd:decimal ; # Euros
    flvl-eco:complianceStatus flvl-status:planned ;
    
    # Linkage to requirement
    flvl-def:fulfillsRequirement flvl-id:req-nnn-001 ;
    
    # Dependencies
    flvl-def:prerequisiteOf flvl-id:measure-nnn-mitigation-plan ;
    
    prov:wasAttributedTo flvl-id:expert-environmental-consultant-bruin ;
    dcterms:created "2024-11-05"^^xsd:date .
```

### 1.3.4 Regulatory Compliance Concepts

**Actionable Requirements:**

```turtle
flvl-def:ActionableRequirement
    a owl:Class ;
    rdfs:subClassOf cprmv:Rule ;
    rdfs:label "Actionable Requirement"@en, "Uitvoerbare Eis"@nl ;
    skos:definition """A specific actionable obligation extracted from 
    regulation, defining concrete actions required for compliance."""@en .

# Legal Analysis Properties (13 elements)
flvl-def:legalSubject rdfs:domain flvl-def:ActionableRequirement .
flvl-def:legalObject rdfs:domain flvl-def:ActionableRequirement .
flvl-def:legalRelationship rdfs:domain flvl-def:ActionableRequirement .
flvl-def:legalFact rdfs:domain flvl-def:ActionableRequirement .
flvl-def:condition rdfs:domain flvl-def:ActionableRequirement .
flvl-def:derivationRule rdfs:domain flvl-def:ActionableRequirement .
flvl-def:hasVariable rdfs:domain flvl-def:ActionableRequirement .
flvl-def:hasParameter rdfs:domain flvl-def:ActionableRequirement .
flvl-def:hasOperator rdfs:domain flvl-def:ActionableRequirement .
flvl-def:timeSpecifier rdfs:domain flvl-def:ActionableRequirement .
flvl-def:locationSpecifier rdfs:domain flvl-def:ActionableRequirement .
flvl-def:delegationAuthority rdfs:domain flvl-def:ActionableRequirement .
flvl-def:sourceDefinition rdfs:domain flvl-def:ActionableRequirement .

# Requirement Relationships
flvl-def:requiresMeasure rdfs:domain flvl-def:ActionableRequirement ;
    rdfs:range flvl-eco:MitigatingMeasure .

flvl-def:hasCheckpoint rdfs:domain flvl-def:ActionableRequirement ;
    rdfs:range flvl-def:ComplianceCheckpoint .

flvl-def:affectsLocation rdfs:domain flvl-def:ActionableRequirement ;
    rdfs:range geo:Feature .
```

**Full Example with Legal Analysis:**

```turtle
flvl-id:req-nnn-001 
    a flvl-def:ActionableRequirement ;
    dcterms:identifier "REQ-NNN-001" ;
    dcterms:title "NNN Corridor Protection Requirement"@en ;
    skos:definition """All construction activities within 25 meters of NNN 
    boundaries require ecological impact assessment and mitigation plan 
    approval before commencement."""@en ;
    
    # === LEGAL ANALYSIS ELEMENTS ===
    flvl-def:legalSubject flvl-id:ProjectContractor ;
    flvl-def:legalObject flvl-id:NNN-Corridor-Section-12 ;
    flvl-def:legalRelationship "must conduct assessment and obtain approval before conducting"@en ;
    flvl-def:legalFact "construction activities"@en ;
    flvl-def:condition "within 25 meter buffer zone of NNN boundary"@en ;
    
    flvl-def:hasVariable [
        flvl-def:variableName "buffer_zone_distance" ;
        flvl-def:variableValue "25"^^xsd:decimal ;
        flvl-def:variableUnit "meters"@en
    ] ;
    
    flvl-def:timeSpecifier "before commencement of construction activities"@en ;
    flvl-def:locationSpecifier flvl-geo:NNN-Buffer-Zone-25m-Polygon ;
    flvl-def:delegationAuthority "Provincial authority for approving ecological mitigation plans"@en ;
    
    # === SOURCE TRACEABILITY ===
    dcterms:source flvl-id:NaturaWet_v2024-01 ;
    cprmv:extends "BWBR0037552_2024-01-01_0/Artikel_12/Lid_3" ;
    
    # === COMPLIANCE LINKAGE ===
    flvl-def:requiresMeasure flvl-id:measure-nnn-ecological-survey ;
    flvl-def:hasCheckpoint flvl-id:checkpoint-nnn-approval ;
    flvl-def:affectsLocation flvl-id:LaanVanNieuwLand ;
    
    dcterms:created "2024-11-05"^^xsd:date ;
    dcterms:creator flvl-id:expert-environmental-law-jones .
```

**Compliance Checkpoints:**

```turtle
flvl-def:ComplianceCheckpoint
    a owl:Class ;
    rdfs:label "Compliance Checkpoint"@en, "Compliance Controlepoint"@nl ;
    skos:definition """A verification point in project lifecycle where 
    compliance with specific requirements must be validated."""@en .

flvl-id:checkpoint-nnn-approval 
    a flvl-def:ComplianceCheckpoint ;
    dcterms:title "NNN Corridor Ecological Impact Approval"@en ;
    flvl-def:verifiesCompliance flvl-id:req-nnn-001 ;
    flvl-def:requiresApprovalFrom flvl-id:role-provincial-environmental-authority ;
    flvl-def:hasDeadline "2025-05-15"^^xsd:date ;
    flvl-def:complianceStatus flvl-status:in-progress ;
    flvl-def:complianceEvidence flvl-doc:ecological-survey-report-section-12 .
```

### 1.3.5 Spatial/Jurisdictional Concepts

```turtle
flvl-sp:JurisdictionalBoundary
    a owl:Class ;
    rdfs:subClassOf geo:Feature ;
    rdfs:label "Jurisdictional Boundary"@en, "Bestuurlijke Grens"@nl ;
    skos:definition """A geographic boundary defining administrative authority 
    and regulatory jurisdiction."""@en .

flvl-id:boundary-province-flevoland 
    a flvl-sp:JurisdictionalBoundary ;
    rdfs:label "Province of Flevoland Boundary"@en ;
    flvl-sp:authority flvl-id:ProvinceFlevoland ;
    geo:hasGeometry flvl-geo:flevoland-province-boundary .

# Spatial Layers for Visualization
flvl-sp:SpatialLayer
    a owl:Class ;
    rdfs:label "Spatial Layer"@en, "Ruimtelijke Laag"@nl ;
    skos:definition """A thematic map layer representing regulatory, 
    ecological, or infrastructural aspects."""@en .

flvl-id:layer-nnn-corridors 
    a flvl-sp:SpatialLayer ;
    rdfs:label "NNN Ecological Corridors"@en ;
    flvl-sp:layerType flvl-vocab:layer-ecological ;
    flvl-sp:layerVisibility true ;
    geo:hasGeometry flvl-geo:nnn-corridors-multipolygon .
```

## 1.4 Ontology Alignment

**With Dutch/EU Vocabularies:**

```turtle
# DSO Concepts
flvl-concept:Omgevingswet 
    skos:exactMatch <https://begrippen.omgevingswet.nl/id/concept/Omgevingswet> .

# Geonovum Concepts
flvl-concept:NatuurnetwerkNederland 
    skos:exactMatch <https://begrippen.geostandaarden.nl/nnn/id/concept/NNNGebied> .

# EU INSPIRE
flvl-concept:Natura2000 
    skos:exactMatch <http://inspire.ec.europa.eu/codelist/ProtectedSiteTypeValue/natura2000Site> .
```

---

# 2. STANDARDS COLLECTION & ANNOTATION

## 2.1 Regulatory Source Management

### DSO/RTR Integration

```turtle
flvl-id:RegulationRegistry 
    a dcat:Catalog ;
    dcterms:title "Lelystad Ring Road Regulation Catalog"@en ;
    dcterms:publisher flvl-id:ProvinceFlevoland ;
    dcat:dataset 
        flvl-id:DSO-RTR-Dataset ,
        flvl-id:LocalRegulationsDataset .

flvl-id:DSO-RTR-Dataset 
    a dcat:Dataset ;
    dcterms:title "DSO Registration of Applicable Rules (RTR)"@nl ;
    dcterms:source <https://omgevingsloket.nl/> ;
    dcat:distribution [
        dcat:accessURL <https://omgevingsloket.nl/api/rules> ;
        dcterms:format "application/rdf+xml" ;
        ronl:accessLevel "public"
    ] .
```

### Regulation Versioning

```turtle
flvl-id:NaturaWet_v2024-01 
    a flvl-def:RegulatorySource ;
    dcterms:title "Wet natuurbescherming"@nl ;
    cprmv:implements "BWBR0037552" ;
    cprmv:validFrom "2024-01-01"^^xsd:date ;
    cprmv:validUntil "2024-12-31"^^xsd:date ;
    dcterms:replaces flvl-id:NaturaWet_v2023-07 ;
    prov:wasDerivedFrom <https://wetten.overheid.nl/jci1.3:c:BWBR0037552> .
```

## 2.2 Legal Analysis Integration

(See Section 1.3.4 for complete legal analysis example with 13 elements)

**Key Principle**: Focus on actionable requirement extraction rather than complete legal decomposition. Apply legal analysis elements selectively based on complexity.

## 2.3 Annotation Workflow

### Annotation Structure

```turtle
flvl-id:annotation-nnn-001-v1 
    a oa:Annotation ;
    oa:hasTarget flvl-id:req-nnn-001 ;
    oa:hasBody [
        rdf:value """This requirement applies to construction sections 1-4 
        of Laan van Nieuw Land due to direct adjacency to Natura 2000 site 
        'Oostvaardersplassen'."""@en ;
        flvl-def:annotationType "applicability-determination"@en
    ] ;
    oa:annotatedBy flvl-id:expert-environmental-law-jones ;
    oa:annotatedAt "2024-11-15T14:23:00Z"^^xsd:dateTime ;
    flvl-def:approvalStatus flvl-vocab:pending-review ;
    flvl-def:requiresApprovalFrom flvl-id:role-senior-legal-advisor .
```

### Approval Process

```turtle
flvl-id:approval-001 
    a flvl-def:Approval ;
    flvl-def:approvesAnnotation flvl-id:annotation-nnn-001-v1 ;
    prov:wasAssociatedWith flvl-id:expert-senior-legal-smith ;
    prov:atTime "2024-11-18T09:15:00Z"^^xsd:dateTime ;
    flvl-def:approvalDecision "approved"@en ;
    prov:generated flvl-id:annotation-nnn-001-v2 . # Updated version
```

---

# 3. CONCEPT FRAMEWORK (MIM LEVEL 1)

## 3.1 Begrippenkader Structure (NL-SBB)

```turtle
flvl-id:LelystadRingwegBegrippenkader 
    a skos:ConceptScheme ;
    dcterms:title "Lelystad Ringweg Begrippenkader"@nl ;
    dcterms:creator flvl-id:ProvinceFlevoland ;
    dcterms:created "2024-11-01"^^xsd:date ;
    skos:hasTopConcept 
        flvl-concept:InfrastructuurProject ,
        flvl-concept:Omgevingsrecht ,
        flvl-concept:EcologischeNetwerk ,
        flvl-concept:RuimtelijkeOrdening .
```

## 3.2 Hierarchical Concept Taxonomy

### Environmental Protection Domain

```turtle
flvl-concept:MitigerendeMaatregel 
    a skos:Concept ;
    skos:inScheme flvl-id:LelystadRingwegBegrippenkader ;
    skos:prefLabel "Mitigerende Maatregel"@nl , "Mitigating Measure"@en ;
    skos:definition """Een maatregel die wordt genomen om negatieve effecten 
    op het milieu te verminderen of te compenseren"""@nl ;
    skos:narrower 
        flvl-concept:NNN-Maatregel ,
        flvl-concept:Natura2000-Maatregel ,
        flvl-concept:BeschermdeS oortenMaatregel .

flvl-concept:NNN-Maatregel 
    a skos:Concept ;
    skos:prefLabel "NNN Maatregel"@nl ;
    skos:broader flvl-concept:MitigerendeMaatregel ;
    skos:related flvl-concept:NatuurnetwerkNederland .
```

### Infrastructure Project Domain

```turtle
flvl-concept:Wegenbouwproject 
    a skos:Concept ;
    skos:prefLabel "Wegenbouwproject"@nl , "Road Construction Project"@en ;
    skos:narrower 
        flvl-concept:Ringweg ,
        flvl-concept:Snelweg .

flvl-concept:Ringweg 
    a skos:Concept ;
    skos:prefLabel "Ringweg"@nl , "Ring Road"@en ;
    skos:example "Laan van Nieuw Land als ringweg om Lelystad-Zuid"@nl .
```

## 3.3 Cross-Domain Harmonization

```turtle
# Link to national vocabularies
flvl-concept:Omgevingswet 
    skos:exactMatch <https://begrippen.omgevingswet.nl/id/concept/Omgevingswet> .

flvl-concept:NatuurnetwerkNederland 
    skos:exactMatch <https://begrippen.geostandaarden.nl/nnn/id/concept/NNNGebied> .

# Link to EU INSPIRE
flvl-concept:Natura2000 
    skos:exactMatch <http://inspire.ec.europa.eu/codelist/ProtectedSiteTypeValue/natura2000Site> .
```

---

_Continue to [Part 2 for Sections 4-7...](./Framework_Part2_Sections_4-7.md)_

**Document Structure:**
- **Part 1** (this file): Sections 1-3 (Ontology, Standards, Concepts)
- **Part 2**: Sections 4-7 (Information Model, Process, Roles, Demonstrator)
- **Part 3**: Sections 8-10 (Roadmap, Metrics, Next Steps)

---

## Appendix: Quick Reference

### Key Namespaces

| Prefix | URI | Purpose |
|--------|-----|---------|
| `flvl-sp:` | `https://data.flevoland.nl/def/spatial-planning/` | Spatial planning concepts |
| `flvl-eco:` | `https://data.flevoland.nl/def/ecology/` | Environmental measures |
| `cpsv:` | `http://data.europa.eu/m8g/` | EU Public Service Vocabulary |
| `mim:` | `http://modellen.mim-standaard.nl/def/mim#` | MIM Metamodel |
| `skos:` | `http://www.w3.org/2004/02/skos/core#` | Concept framework |

### Core Classes Summary

| Class | Purpose | Key Properties |
|-------|---------|----------------|
| `flvl-sp:InfrastructureProject` | Project as public service | `hasRoadSection`, `requiresMeasure` |
| `flvl-eco:MitigatingMeasure` | Environmental protection | `appliesToLocation`, `implementationPhase` |
| `flvl-def:ActionableRequirement` | Regulatory obligation | Legal analysis properties (13 elements) |
| `flvl-sp:RoadSection` | Infrastructure component | `jurisdiction`, `managedBy` |

### Priority Use Cases

1. **Regulatory Compliance Dashboard** (Section 7.1)
2. **Cross-Jurisdictional Coordination** (Section 7.2)
3. **Knowledge Graph Exploration** (Section 7.3)

---

**For complete framework documentation, contact:**  
Province of Flevoland  
Department of Infrastructure & Environment  
Email: info@flevoland.nl

**Framework Version:** 1.0  
**Last Updated:** November 8, 2025  
**Next Review:** Q1 2026
