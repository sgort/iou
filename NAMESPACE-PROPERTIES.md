# Namespace Properties Table - Public Service TTL Template

## Complete Property Reference

This table documents all properties used in the public service TTL template, their naming conventions, and validation patterns.

---

## Core CPSV-AP (`cpsv-ap:`)

**Namespace URI:** `http://data.europa.eu/m8g/`  
**Usage:** Core Public Service Vocabulary Application Profile - EU standard for describing public services

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `PublicService` | Main service entity | 1 | `{service_id}_service` | `aow_leeftijd_service` |
| `Rule` | Business rules | 1..n | `{service_id}_regels` (parent)<br>`{service_id}_regel_{year}` (temporal) | `aow_leeftijd_regels`<br>`aow_regel_2024` |
| `RuleSpecification` | Rule details | 1 | Blank node within `cpsv-ap:specifies` | n/a |
| `LegalResource` | Legal references | 1..n | Blank node within `cpsv-ap:hasLegalResource` | n/a |
| `Channel` | Access channels | 1..n | Blank node within `cpsv-ap:hasChannel` | n/a |
| `Output` | Service outputs | 1..n | Blank node within `cpsv-ap:hasOutput` | n/a |
| `Cost` | Service costs | 1 | Blank node within `cpsv-ap:hasCost` | n/a |
| `CriterionRequirement` | Requirements | 1..n | `{criterion}_vereiste` | `systeem_datum_vereiste` |
| **Properties** | | | | |
| `hasChannel` | PublicService â†’ Channel | 1..n | Links service to access channels | See Channel |
| `hasContactPoint` | PublicService â†’ vcard:Organization | 1 | Links to contact information | See vCard |
| `goal` | PublicService | 1..n | Free text with @nl/@en | "Landelijk herbruikbare service..." |
| `hasLegalResource` | PublicService â†’ LegalResource | 1..n | Links to legal basis | See LegalResource |
| `hasOutput` | PublicService â†’ Output | 1..n | Describes service results | See Output |
| `hasCost` | PublicService â†’ Cost | 1 | Describes costs/fees | See Cost |
| `hasLegalResource` | PublicService â†’ LegalResource | 1..n | Links to legislation | See LegalResource |
| `specifies` | Rule â†’ RuleSpecification | 1 | Details the rule implementation | See RuleSpecification |
| `hasCriterionRequirement` | RuleSpecification | 1..n | Required criteria | Links to CriterionRequirement |
| `requiresInput` | RuleSpecification | 1..n | Required input data | Links to dcat:Dataset |
| `isPartOf` | Rule (temporal) â†’ Rule (parent) | 1 | Links child rules to parent | `<aow_leeftijd_regels>` |
| `channelType` | Channel | 1 | Type classification | skos:Concept |
| `accessURL` | Channel, Distribution | 1 | URL for viewing/browsing | `https://...` |

---

## CPRMV (`cprmv:`)

**Namespace URI:** `https://cprmv.open-regels.nl/0.3.0/`  
**Usage:** Core Public Rule Management Vocabulary - Rule management extensions for legal traceability

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| `implements` | PublicService, Rule, LegalResource | 1 | Law identifier | `BWBR0002221` |
| `implementsVersion` | PublicService, Rule, LegalResource | 1 | Date + version | `2025-01-01_0` |
| `title` | PublicService, Rule | 1..n | Service/rule title with @nl/@en | "AOW - Leeftijdsberekening" |
| `description` | PublicService, Rule, Dataset | 1..n | Detailed description with @nl/@en | "Bepaling van de AOW-leeftijd..." |
| `rulesetType` | Rule (parent) | 1 | Classification | `temporal-mapping` \| `conditional-calculation` \| `lookup-table` |
| `ruleMethod` | Rule (parent) | 1 | Implementation method | `decision-table` \| `algorithm` \| `calculation` |
| `dmnModelId` | RuleSpecification | 1 | DMN model identifier | `{org}_{service}_model` â†’ `ronl_svb_berekenleeftijden` |
| `dmnDecisionId` | RuleSpecification | 1 | DMN decision identifier | `{ORG}_{Service}` â†’ `RONL_AOWleeftijd` |
| `extends` | Rule (temporal) | 1 | Legal article path | `{LAW}_{VERSION}/Artikel_{X}/Lid_{Y}` â†’ `BWBR0002221_2024-01-01_0/Artikel_7a/Lid_1` |
| `validFrom` | Rule (temporal) | 1 | Start date (xsd:date) | `2024-01-01` |
| `validUntil` | Rule (temporal) | 1 | End date (xsd:date) | `2024-12-31` |
| `ruleType` | Rule (temporal) | 1 | Rule classification | `temporal-period` \| `condition` \| `calculation` |
| `confidence` | Rule (temporal) | 1 | Reliability level | `high` \| `medium` \| `low` |
| `note` | Rule (temporal) | 0..n | Optional explanatory note with @nl/@en | "Geprojecteerde waarde..." |

---

## RONL (`ronl:`)

**Namespace URI:** `https://regels.overheid.nl/termen/`  
**Usage:** Custom RONL vocabulary for Dutch government rule specifications

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| `analysis` | PublicService | 1 | Analysis method reference | `ronl:WetsanalyseJAS` \| `ronl:WetsanalyseREACH` |
| `method` | PublicService | 1 | Rule management method | `ronl:ConcordiaLegal` \| `ronl:Calculemus` |
| `implements` | PublicService | 1 | Links to rule set | `<{service_id}_regels>` |
| `source` | RuleSpecification | 1..n | Authoritative source URL | `https://www.{org}.nl/{topic}/` |
| `implementedBy` | RuleSpecification | 1 | Implementation endpoint | `https://regels.overheid.nl/lab/{service}/resultaat` |

---

## Dublin Core Terms (`dct:`)

**Namespace URI:** `http://purl.org/dc/terms/`  
**Usage:** Standard metadata terms for resources

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| `title` | All entities | 1..n | Title with @nl/@en language tags | "Bepaling leeftijd AOW"@nl |
| `description` | All entities | 1..n | Description with @nl/@en | Free text description |
| `identifier` | PublicService | 1 | Unique service identifier (URI) | `https://standaarden.overheid.nl/owms/terms/{service}` |
| `creator` | PublicService | 1 | Organization URI | `<https://organisaties.overheid.nl/{id}/{name}>` |
| `publisher` | PublicService, Dataset | 1 | Organization URI | Same as creator |
| `subject` | PublicService | 1..n | Topic/domain with @nl/@en | "Sociale zekerheid"@nl |
| `issued` | PublicService, Distribution, Dataset | 1 | Publication date (xsd:date) | `2024-12-09` |
| `modified` | PublicService, Distribution | 0..1 | Last modification date (xsd:date) | `2024-12-09` |
| `language` | PublicService | 1..n | ISO 639-2 language code | `nld` \| `eng` |
| `version` | Rule | 1 | Semantic version | `1.0` \| `2.1.3` |
| `format` | Distribution, RuleSpecification | 1 | File format (EU authority) | `<http://publications.europa.eu/resource/authority/file-type/DMN>` |
| `conformsTo` | RuleSpecification | 0..1 | Standard/schema reference | `<https://schema.example.org/{Model}>` |
| `source` | RuleSpecification, Distribution | 1 | Source file/repository URL | GitLab/GitHub URL |
| `license` | Distribution | 1 | License URI | `<http://creativecommons.org/licenses/by/4.0/>` |
| `temporal` | Dataset | 0..1 | Time period (dct:PeriodOfTime) | See PeriodOfTime |

---

## DCAT (`dcat:`)

**Namespace URI:** `http://www.w3.org/ns/dcat#`  
**Usage:** Dataset and distribution catalog vocabulary

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `Dataset` | Evidence/input data | 1..n | `{data_type}_dataset` | `systeem_datum_dataset` |
| `Distribution` | File distributions | 1..n | Blank node within `dcat:distribution` | n/a |
| **Properties** | | | | |
| `distribution` | Rule â†’ Distribution | 1..n | Links to file distributions | See Distribution |
| `accessURL` | Distribution, LegalResource | 1 | URL for viewing | `https://...` (may include UI) |
| `downloadURL` | Distribution | 1 | Direct download URL | `https://...` (raw file) |
| `mediaType` | Distribution, RuleSpecification | 1 | MIME type | `application/xml` \| `text/turtle` |
| `byteSize` | Distribution | 0..1 | File size (xsd:nonNegativeInteger) | `15234` |
| `theme` | Dataset | 0..n | Subject category (EuroVoc) | `<http://eurovoc.europa.eu/100141>` |
| `keyword` | Dataset | 0..n | Search keywords | `"System Date"@en` |

---

## SKOS (`skos:`)

**Namespace URI:** `http://www.w3.org/2004/02/skos/core#`  
**Usage:** Concept schemes and controlled vocabularies

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `Concept` | Classifications | 0..n | Controlled vocabulary term | n/a |
| **Properties** | | | | |
| `prefLabel` | Concept | 1..n | Preferred label with @nl/@en | "Web Portal"@en |
| `exactMatch` | Concept | 0..n | Equivalent concept URI | `<http://example.org/channel-type/web-portal>` |
| `inScheme` | Concept, CriterionRequirement | 1 | Parent vocabulary | `ronl:Vocabulary` |

---

## vCard (`vcard:`)

**Namespace URI:** `http://www.w3.org/2006/vcard/ns#`  
**Usage:** Contact information representation

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `Organization` | Contact point | 1 | Blank node within `cpsv-ap:hasContactPoint` | n/a |
| `Work` | Phone type | 1 | Classification for work phones | n/a |
| `Voice` | Phone type | 1 | Classification for voice calls | n/a |
| **Properties** | | | | |
| `fn` | Organization | 1 | Formatted name | "SVB Customer Service"@en |
| `hasEmail` | Organization | 1..n | Email URI | `<mailto:service@example.nl>` |
| `hasTelephone` | Organization | 0..n | Phone blank node | See hasTelephone |
| `hasValue` | Telephone | 1 | Phone URI | `<tel:+31201234567>` |
| `hasURL` | Organization | 0..n | Contact page URL | `https://www.example.nl/contact` |

---

## FOAF (`foaf:`)

**Namespace URI:** `http://xmlns.com/foaf/0.1/`  
**Usage:** Friend of a Friend - organization and agent information

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `Organization` | Legal entities | 1..n | `<https://organisaties.overheid.nl/{id}/{name}>` | n/a |
| **Properties** | | | | |
| `name` | Organization | 1..n | Organization name with @nl/@en | "Sociale Verzekeringsbank (SVB)"@nl |
| `homepage` | Organization | 1 | Organization website | `<https://www.svb.nl/nl/>` |
| `uri` | Organization | 1 | Canonical identifier | `<https://identifier.overheid.nl/tooi/id/zbo/{code}>` |

---

## PROV-O (`prov:`)

**Namespace URI:** `http://www.w3.org/ns/prov#`  
**Usage:** Provenance ontology - tracking origins and changes

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `Activity` | Generation activities | 0..n | Blank node within `prov:wasGeneratedBy` | n/a |
| **Properties** | | | | |
| `wasGeneratedBy` | Distribution | 0..1 | Links to generation activity | See Activity |
| `used` | Activity | 1 | Resource used in activity | `<https://git.open-regels.nl/{org}/{repo}>` |

---

## RDFS (`rdfs:`)

**Namespace URI:** `http://www.w3.org/2000/01/rdf-schema#`  
**Usage:** RDF Schema vocabulary

| Property | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------|-----------|-------------|----------------------------|---------------|
| `label` | Activity, Resource | 1..n | Human-readable label with @nl/@en | "Git commit"@en |
| `seeAlso` | RuleSpecification | 0..n | Related documentation URL | `<https://regels.overheid.nl/docs/...>` |

---

## XSD (`xsd:`)

**Namespace URI:** `http://www.w3.org/2001/XMLSchema#`  
**Usage:** XML Schema datatypes

| Datatype | Used For | Pattern/Format | Example |
|----------|----------|----------------|---------|
| `xsd:date` | Dates | `YYYY-MM-DD` | `2024-12-09` |
| `xsd:nonNegativeInteger` | Byte sizes, counts | Positive integer â‰¥ 0 | `15234` |
| `xsd:string` | Text values | Any text | `"Example text"` |

---

## Time (`time:`)

**Namespace URI:** `http://www.w3.org/2006/time#`  
**Usage:** Time ontology for temporal concepts

| Property/Class | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `TemporalEntity` | Time periods | 0..n | Abstract temporal concept | n/a |
| **Note** | Added for completeness | | Currently unused in template | |

---

## OWL (`owl:`)

**Namespace URI:** `http://www.w3.org/2002/07/owl#`  
**Usage:** Web Ontology Language

| Property/Class | Applied To | Cardinality | Naming Convention / Pattern | Example Value |
|----------------|-----------|-------------|----------------------------|---------------|
| **Classes** | | | | |
| `ObjectProperty` | Property definitions | n/a | Used in vocabulary definitions | n/a |
| **Note** | Added for completeness | | Currently unused in template | |

---

## Naming Convention Summary

### Service Identifiers

| Pattern | Usage | Example |
|---------|-------|---------|
| `{service_id}_service` | Main PublicService entity | `aow_leeftijd_service` |
| `{service_id}_regels` | Parent Rule entity | `aow_leeftijd_regels` |
| `{service_id}_regel_{year}` | Temporal rule instances | `aow_regel_2024` |
| `{criterion}_vereiste` | Criterion requirements | `leeftijd_vereiste` |
| `{data_type}_dataset` | Input datasets | `geboortedatum_dataset` |

### URI Patterns

| Type | Pattern | Example |
|------|---------|---------|
| Service ID | `https://standaarden.overheid.nl/owms/terms/{service}` | `.../aow-leeftijd` |
| Organization | `https://organisaties.overheid.nl/{id}/{name}` | `.../28212263/Sociale_Verzekeringsbank` |
| TOOI ID | `https://identifier.overheid.nl/tooi/id/{type}/{code}` | `.../tooi/id/zbo/zb000143` |
| Law Reference | `https://wetten.overheid.nl/jci1.3:c:{BWB_ID}` | `.../c:BWBR0002221` |
| GitLab Source | `https://git.open-regels.nl/{org}/{repo}/-/blob/main/{path}` | `.../showcases/aow/-/blob/main/baseline/...` |
| TriplyDB Asset | `https://open-regels.triply.cc/{account}/{dataset}/assets/{id}` | `.../stevenport/aow-leeftijd-service/assets/68e4d...` |

### Legal Article Path Pattern

Format: `{BWB_ID}_{VERSION_DATE}/Artikel_{NUMBER}/Lid_{NUMBER}`

Examples:
- `BWBR0002221_2024-01-01_0/Artikel_7a/Lid_1`
- `BWBR0005537_2023-07-01_0/Artikel_12/Lid_2`

### DMN Identifier Patterns

| Type | Pattern | Example |
|------|---------|---------|
| DMN Model ID | `{org}_{service}_model` or `{org}_{domain}` | `ronl_svb_berekenleeftijden` |
| DMN Decision ID | `{ORG}_{ServiceCamelCase}` | `RONL_AOWleeftijd` |

---

## Cardinality Legend

- `1` = Exactly one (required)
- `0..1` = Zero or one (optional)
- `1..n` = One or more (required, repeatable)
- `0..n` = Zero or more (optional, repeatable)
- `n/a` = Not applicable

---

## Validation Patterns

### Date Format
- Pattern: `YYYY-MM-DD`
- Type: `xsd:date`
- Example: `"2024-12-09"^^xsd:date`

### Law Identifier
- Pattern: `BWB[RN]\d{7}`
- Example: `BWBR0002221`

### Language Tags
- Required: `@nl` and `@en` for all multilingual properties
- Optional: Additional languages as needed

### Email URI
- Pattern: `<mailto:{email}>`
- Example: `<mailto:info@example.nl>`

### Phone URI
- Pattern: `<tel:+{country_code}{number}>`
- Example: `<tel:+31201234567>`

### Version Number
- Pattern: Semantic versioning `{major}.{minor}.{patch}`
- Example: `1.0` or `2.1.3`

---

**End of Table**