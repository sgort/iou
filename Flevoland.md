# Scope and Context

## 1\. Stakeholder Ecosystem

Who are the primary users of this system? (e.g., project managers, environmental consultants, legal advisors, municipal officials, provincial administrators)

* all of the above, primarily provincial officials who bear ultimate responsibility for the planning, execution, realisation, implementation and discharge of the contract.

Are there external stakeholders who need read-only access versus those who need to contribute or annotate?

* assume we have to distribute typical CRUD (create, read, update, delete) rights among all users down to the lowest granular level.

Will this system need to interface with existing provincial or national systems?

* assume adoption of open standards for interoperability with external systems, where incompatibility with these standards is the problem of the external systems.

## 2\. Regulatory Landscape Complexity

Beyond the NEN, Natura 2000, and protected species regulations you mentioned \- what other regulatory domains are involved? (e.g., water management, soil quality, spatial planning laws, construction codes)

* Lelystad Municipal Environmental Vision, Lelystad Municipal Environmental Plan, Lelystad Parking Umbrella Plan, Lelystad Zoning Plan, Lelystad Municipality, Umbrella Plan General Rules for Lelystad Petrol Stations, Umbrella Plan General Rules for House Division and Room Occupancy in Lelystad, Lelystad Airport Contours

How frequently do these regulations change, and how critical is version management?  
Are there conflicts or tensions between different regulatory frameworks that the system needs to help navigate?

* Changes occur approximately once or twice a year. Version control is crucial. Conflicts and/or other issues are expected. There should be a way to identify, determine, and decide on these with authority. Naturally, this includes logging, etc.

# Information Architecture Depth

## 3\. Standards Collection

What formats do these regulations currently exist in? (PDFs, databases, web portals, physical documents)

* All of the above. In the Netherlands, there's a digital facility called Omgevingsloket. In the Omgevingsloket (DSO), you'll find information about the physical environment of municipalities, provinces, water boards, and the national government. Including the Registration of Applicable Rules (RTR). This is the central facility for applicable rules. This is where we, as the government, store our applicable rules. The RTR is one of the components of the Digital System for the Environment Act (DSO).

Do you need to capture the full legal text, or primarily the actionable requirements?  
Are there hierarchical relationships between regulations (e.g., EU directives â†’ national laws â†’ provincial ordinances â†’ municipal bylaws)?

* primarily the actionable requirements. Hierarchy and priorities of those actions to be managed by an official with that role and associated mandate

## 4\. Annotation and Analysis

Who performs the annotation \- legal experts, domain specialists, AI-assisted processes?  
What kinds of annotations are most valuable? (interpretations, applicability conditions, compliance checkpoints, conflicts, dependencies)

* We use a Legal Analysis Specification. This describes the legal analysis scheme used in Legal Analysis, in which various legal elements found in legislation are arranged in a coherent manner. These elements form the classes assigned to formulations in legislation in Legal Analysis. Classifying formulations into legal classes helps clarify their meaning. The elements are:  
  * Legal Subject  
  * Legal Object  
  * Legal Relationship  
  * Legal Fact  
  * Condition  
  * Derivation Rule  
  * Variable (Value)  
  * Parameter (Value)  
  * Operator  
  * Time Specifier  
  * Location Specifier  
  * Delegation Authority/Content  
  * Source Definition

Should annotations themselves be versioned and attributable to specific experts?

* Yes.

# Technical Architecture

## 5\. RDF/SKOS Implementation

Do you already have preferred ontologies or vocabularies in mind, or should we identify suitable ones? (e.g., OSLO for Flanders, EU vocabularies, domain-specific ontologies)  
How important is alignment with existing Dutch/EU semantic standards versus creating a custom ontology?

* Yes, see attached naming conventions markdown file

What's your team's current technical capability with RDF/SKOS \- should this be relatively accessible or can it be technically sophisticated?

* Can be technically sophisticated. We have a TriplyDB instance for the necessary SPARQL queries.

# 6\. Demonstrator Goals

What specific use cases should the demonstrator showcase? (e.g., "show me all requirements affecting the NNN corridor in section X", "trace compliance pathway for protected species Y")

* We need a sufficiently representative demonstrator to demonstrate how a single information architecture built around standards, regulations, and data can fully support provincial (i.e., government) responsibility for the planning, preparation, execution, realization, implementation, and discharge of such a project. In this case, the construction of a (new) bypass around part of the city of Lelystad.

Who is the audience for the demonstrator \- technical team, management, or external parties like the provincial government?

* people at tactical strategic level of both business and IT organizations

Static web app suggests limited backend \- but do you need query capabilities, or primarily visualization of relationships?

* Ignore static web app. That was just a first thought.

# Process and Governance

## 7\. Project Management Integration

Should the system integrate with existing project management tools, or is it a standalone reference system?

* No. No, it's self-contained and intended to be extensible. So we need a modular architecture. It's intended to eventually replace existing tools and systems. Consider legacy point solutions that currently interface heavily with the environment through outdated data connections or copying, and often by manually retyping the same information. What we're looking for is a demonstration of an open, federated system of shared information based on Linked Data. Think of the semantic web for this topic.

How do you envision the workflow: regulatory research â†’ annotation â†’ concept extraction â†’ compliance tasks â†’ monitoring?

* This is a fine start. We should be able to iterate a default workflow like this per (sub)topic or dynamically adjust it along the way based on what becomes necessary.

Are there critical project milestones where regulatory compliance needs to be verified?

* Just as every project has critical success factors, so too do we have milestones or decision-making points. We need to be able to specify these and adjust them along the way.

## 8\. Roles and Access

What's the sensitivity level of different information types? (public regulations vs. internal interpretations vs. commercially sensitive project data)

* We adopt a granular two-tiered approach like this solution:  
  * \<resource\> ronl:accessLevel "public" . \# No authentication  
  * \<resource\> ronl:accessLevel "private" . \# Authentication required

  Benefits:

  * Minimal data exposure for anonymous users  
  * Clear consent boundaries  
  * GDPR compliance built-in  
  * Full audit log

  A more granular access layer may be needed, but that can easily be added in an open (linked data) information architecture.

Do different roles need to see different "views" of the same information?

* Yes.

Should there be an approval workflow for annotations or interpretations before they're considered authoritative?

* Yes.

# Current State

## 9\. Existing Assets

Do you have any existing documentation, spreadsheets, or databases cataloging these requirements?

* Net yet, but can be asked for later in the process.

Is there a preferred information modeling approach already in use at the province?

* Not in the province per se, but there are two important standards we use in the Netherlands.  
  * MIM  
    MIM, the Metamodel for Information Modeling, describes a metamodel used to create information models. It describes the metaclasses, metastructure, and metadata that form the basis for an information model. The goal is to standardize the information modeling method, enabling coordination between information models, comparability in publications, and the use of common tools. MIM thus facilitates the development of a system of coherent information models.  
  * NL-SBB  
    The standard for describing concepts specifies how concepts in a glossary, taxonomy, or thesaurus are described unambiguously.

What tools and platforms are currently used for project governance?

* Word, Excel, SharePoint

## 10\. Success Criteria

How will you measure whether this architecture is successful?

* Scalability as the project subject and/or stakeholders and interests become more complex. But above all, the adaptability to handle changes in the information landscape while preserving history.

What would "simple use" look like in practice for your primary users?

* A recognizable UX experience regardless of role, task, or authority. We embrace the NL Design System, developed in the Netherlands. The NL Design System provides guidelines for developing digital services. We have based our approach on accessibility, user-friendliness, and consistency, supported by user research.

What does scalability mean here \- more projects, more regulations, more users, or all three?

* See answer first bullet question 1 of 10\. Success Criteria.