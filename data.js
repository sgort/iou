// Mock data for Lelystad Ringweg Demonstrator

const mockData = {
    // Requirements for Compliance Dashboard
    requirements: [
        {
            id: "req-nnn-001",
            title: "NNN Corridor Buffer Zone Compliance",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "NNN Maatregelen",
            domainId: "nnn",
            status: "in-progress",
            responsible: "M. van den Berg (Ecoloog)",
            deadline: "2025-03-15",
            description: "Alle werkzaamheden binnen 25m van NNN-grenzen vereisen ecologische impact mitigatie",
            regulation: "Natuurnetwerk Nederland Wet 2024",
            checkpoints: ["Ecologische survey", "Mitigatie plan goedkeuring"]
        },
        {
            id: "req-nnn-002",
            title: "Fauna-passages bij Km 2.3",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "NNN Maatregelen",
            domainId: "nnn",
            status: "pending",
            responsible: "J. Bakker (Projectmanager)",
            deadline: "2025-06-01",
            description: "Aanleg van minimaal 2 fauna-passages voor kleine zoogdieren",
            regulation: "NNN Implementatieverordening Art. 4.2",
            checkpoints: ["Ontwerp goedkeuring", "Uitvoering verificatie"]
        },
        {
            id: "req-n2k-001",
            title: "Natura 2000 Passende Beoordeling",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Natura 2000",
            domainId: "natura2000",
            status: "compliant",
            responsible: "Dr. P. Jansen (Senior Ecoloog)",
            deadline: "2024-12-20",
            description: "Verplichte passende beoordeling voor activiteiten binnen 500m van N2000-gebied",
            regulation: "Natuurbeschermingswet 1998, Art. 19j",
            checkpoints: ["Beoordeling ingediend", "Goedgekeurd door provincie"]
        },
        {
            id: "req-species-001",
            title: "Beschermde Vleermuizen Monitoring",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Beschermde Soorten",
            domainId: "protected-species",
            status: "in-progress",
            responsible: "L. Peters (Veldonderzoeker)",
            deadline: "2025-04-30",
            description: "Jaarlijkse monitoring van vleermuispopulaties gedurende bouwfase",
            regulation: "Flora- en faunawet Art. 11",
            checkpoints: ["Q1 monitoring rapport", "Q2 monitoring rapport"]
        },
        {
            id: "req-municipal-001",
            title: "Bestemmingsplan Aanpassing Lelystad",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Ruimtelijke Ordening",
            domainId: "spatial-planning",
            status: "compliant",
            responsible: "A. de Vries (Gemeente Lelystad)",
            deadline: "2024-11-30",
            description: "Aanpassing bestemmingsplan conform omgevingsvisie",
            regulation: "Omgevingswet, Hoofdstuk 3",
            checkpoints: ["Raadsbesluit", "Publicatie DSO"]
        },
        {
            id: "req-provincial-001",
            title: "Provinciale Inpassingsplan",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Ruimtelijke Ordening",
            domainId: "spatial-planning",
            status: "in-progress",
            responsible: "R. Smit (Provincie Flevoland)",
            deadline: "2025-02-28",
            description: "Inpassingsplan voor provinciale weg conform Omgevingswet",
            regulation: "Omgevingswet Art. 16.17",
            checkpoints: ["Ontwerpbesluit ter inzage", "Zienswijzen verwerkt"]
        },
        {
            id: "req-water-001",
            title: "Watertoets Afvoercapaciteit",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Waterbeheer",
            domainId: "water",
            status: "pending",
            responsible: "Waterschap Zuiderzeeland",
            deadline: "2025-05-15",
            description: "Beoordeling impact op waterhuishouding en afvoercapaciteit",
            regulation: "Waterwet Art. 3.6",
            checkpoints: ["Watertoets uitgevoerd", "Advies waterschap"]
        },
        {
            id: "req-noise-001",
            title: "Geluidschermen Sectie 3-4",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Milieu",
            domainId: "environment",
            status: "overdue",
            responsible: "H. Visser (Akoestisch adviseur)",
            deadline: "2024-12-01",
            description: "Plaatsing geluidschermen conform geluidsnormen Omgevingswet",
            regulation: "Omgevingswet, Geluidsnormen Bijlage IV",
            checkpoints: ["Akoestisch onderzoek", "Ontwerp schermen"]
        },
        {
            id: "req-air-001",
            title: "Luchtkwaliteit Monitoring Start Bouw",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Milieu",
            domainId: "environment",
            status: "compliant",
            responsible: "M. Koning (MilieucoÃ¶rdinator)",
            deadline: "2024-10-15",
            description: "Nulmeting luchtkwaliteit voor aanvang bouwwerkzaamheden",
            regulation: "Wet milieubeheer, Hoofdstuk 5",
            checkpoints: ["Nulmeting uitgevoerd", "Rapport goedgekeurd"]
        },
        {
            id: "req-traffic-001",
            title: "Verkeersmaatregelen Hinderbeperking",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Verkeer",
            domainId: "traffic",
            status: "in-progress",
            responsible: "S. de Jong (Verkeerskundige)",
            deadline: "2025-01-31",
            description: "Plan voor verkeersmaatregelen tijdens bouwfase",
            regulation: "BABW, Art. 24",
            checkpoints: ["Verkeerscirculatieplan", "Omleidingsroutes"]
        },
        {
            id: "req-heritage-001",
            title: "Archeologisch Vooronderzoek TracÃ©",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Erfgoed",
            domainId: "heritage",
            status: "compliant",
            responsible: "Dr. E. Mulder (Archeoloog)",
            deadline: "2024-09-30",
            description: "Verplicht archeologisch vooronderzoek conform KNA protocol",
            regulation: "Erfgoedwet Art. 4.2",
            checkpoints: ["Bureauonderzoek", "Veldonderzoek", "Rapport"]
        },
        {
            id: "req-overlap-001",
            title: "CoÃ¶rdinatie Provinciale-Gemeentelijke Aansluiting",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Bestuurlijke CoÃ¶rdinatie",
            domainId: "coordination",
            status: "in-progress",
            responsible: "Project Overleg P&G",
            deadline: "2025-03-01",
            description: "Afstemming tussen provinciale en gemeentelijke wegdelen bij knooppunt",
            regulation: "Samenwerkingsovereenkomst 2024-001",
            checkpoints: ["Technisch ontwerp afgestemd", "Fasering afgesproken"]
        },
        {
            id: "req-species-002",
            title: "Broedvogel Bescherming Maart-Juli",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Beschermde Soorten",
            domainId: "protected-species",
            status: "pending",
            responsible: "L. Peters (Veldonderzoeker)",
            deadline: "2025-02-15",
            description: "Werkverbod in broedseizoen in ecologische zones",
            regulation: "Flora- en faunawet Art. 8",
            checkpoints: ["Broedvogelinventarisatie", "Werkplanning aangepast"]
        },
        {
            id: "req-soil-001",
            title: "Bodemkwaliteit Onderzoek",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Milieu",
            domainId: "environment",
            status: "overdue",
            responsible: "T. van Dam (Bodemkundig adviseur)",
            deadline: "2024-11-15",
            description: "Historisch bodemonderzoek en eventuele sanering",
            regulation: "Wet bodembescherming Art. 28",
            checkpoints: ["Vooronderzoek", "Nader onderzoek indien nodig"]
        },
        {
            id: "req-n2k-002",
            title: "Stikstofemissie Reductie",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Natura 2000",
            domainId: "natura2000",
            status: "pending",
            responsible: "Ing. W. Bakker (Milieuadviseur)",
            deadline: "2025-04-01",
            description: "Intern salderen of externe compensatie voor stikstofuitstoot",
            regulation: "PAS-instrumentarium 2024",
            checkpoints: ["Stikstofdepositieberekening", "Compensatieplan"]
        },
        {
            id: "req-safety-001",
            title: "Veiligheid Openbare Weg Plan",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Verkeer",
            domainId: "traffic",
            status: "compliant",
            responsible: "Veiligheidsregio Flevoland",
            deadline: "2024-10-30",
            description: "Plan voor veilige toegankelijkheid hulpdiensten",
            regulation: "Besluit externe veiligheid inrichtingen",
            checkpoints: ["Calamiteitenplan", "Goedkeuring veiligheidsregio"]
        },
        {
            id: "req-landscape-001",
            title: "Landschappelijke Inpassing Ontwerp",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Ruimtelijke Ordening",
            domainId: "spatial-planning",
            status: "in-progress",
            responsible: "Bureau Landschapsarchitectuur",
            deadline: "2025-02-28",
            description: "Ontwerp groene buffers en landschappelijke inpassing",
            regulation: "Provinciale Omgevingsvisie, Par. 3.2",
            checkpoints: ["Ontwerpschets", "Inspraakronde bewoners"]
        },
        {
            id: "req-energy-001",
            title: "Energieneutraal Ontwerp Verlichting",
            roadSection: "Laan van Nieuw Land",
            roadSectionId: "laan-nieuw-land",
            domain: "Duurzaamheid",
            domainId: "sustainability",
            status: "in-progress",
            responsible: "S. Hendriks (Duurzaamheidsadviseur)",
            deadline: "2025-03-31",
            description: "LED-verlichting met zonne-energie waar mogelijk",
            regulation: "Klimaatakkoord Flevoland 2023",
            checkpoints: ["Technische haalbaarheidsstudie", "Kostenraming"]
        },
        {
            id: "req-public-001",
            title: "Participatie Omwonenden Plan",
            roadSection: "Verlengde Westerdreef",
            roadSectionId: "verlengde-westerdreef",
            domain: "Bestuurlijke CoÃ¶rdinatie",
            domainId: "coordination",
            status: "compliant",
            responsible: "Communicatieadviseur Gemeente",
            deadline: "2024-12-15",
            description: "Informatiebijeenkomsten en inspraakmogelijkheden bewoners",
            regulation: "Omgevingswet, Hoofdstuk 16",
            checkpoints: ["Informatiebijeenkomst 1", "Informatiebijeenkomst 2"]
        }
    ],

    // Jurisdictional overlaps
    overlaps: [
        {
            id: "overlap-001",
            title: "NNN Corridor Kruist Gemeentegrens",
            description: "Het Natuurnetwerk Nederland corridor loopt door zowel het provinciale als gemeentelijke wegdeel. Beide jurisdicties moeten voldoen aan NNN-wetgeving.",
            affectedSections: ["Laan van Nieuw Land (km 3.2-3.8)", "Verlengde Westerdreef (km 0.0-0.4)"],
            requirements: ["req-nnn-001", "req-nnn-002"],
            coordinationNeeded: true,
            authority: "Provincie Flevoland (primair)",
            notes: "Gemeente Lelystad moet worden geconsulteerd voor werkzaamheden binnen 25m buffer"
        },
        {
            id: "overlap-002",
            title: "Geluidsnormen bij Knooppunt",
            description: "Bij het knooppunt waar provinciale en gemeentelijke wegen samenkomen gelden verschillende geluidsnormen. Provincie hanteert strengere normen.",
            affectedSections: ["Laan van Nieuw Land (km 4.0-4.2)", "Verlengde Westerdreef (km 0.8-1.0)"],
            requirements: ["req-noise-001", "req-overlap-001"],
            coordinationNeeded: true,
            authority: "Beide - afstemming vereist",
            notes: "Ontwerp moet voldoen aan strengste norm (provinciale norm)"
        },
        {
            id: "overlap-003",
            title: "Waterafvoer Grensoverschrijdend",
            description: "Waterafvoersysteem bij kilometer 3.5 beÃ¯nvloedt zowel provinciaal als gemeentelijk gebied. Waterschap heeft overkoepelende bevoegdheid.",
            affectedSections: ["Laan van Nieuw Land (km 3.4-3.6)", "Verlengde Westerdreef (km 0.2-0.5)"],
            requirements: ["req-water-001"],
            coordinationNeeded: true,
            authority: "Waterschap Zuiderzeeland",
            notes: "Provincie en gemeente moeten beiden goedkeuring waterschap hebben"
        }
    ],

    // Knowledge graph nodes
    knowledgeGraph: {
        nodes: [
            {
                id: "concept-ecological-protocol",
                type: "WorkProtocol",
                label: "Ecologisch Werkprotocol",
                category: "Protocol",
                description: "Richtlijnen voor het beschermen van flora en fauna tijdens werkzaamheden",
                source: "Provinciale Gedragscode Infrastructuur 2024",
                relations: [
                    { targetId: "concept-nnn-measure", type: "vereist", label: "vereist" },
                    { targetId: "concept-natura2000-measure", type: "vereist", label: "vereist" },
                    { targetId: "concept-species-measure", type: "vereist", label: "vereist" },
                    { targetId: "reg-nnn-wet", type: "implementeert", label: "implementeert" }
                ]
            },
            {
                id: "concept-nnn-measure",
                type: "MitigatingMeasure",
                label: "NNN Maatregel",
                category: "Ecologie",
                description: "Specifieke beschermingsmaatregel voor het Natuurnetwerk Nederland",
                source: "NNN Implementatieverordening Flevoland",
                relations: [
                    { targetId: "reg-nnn-wet", type: "gebaseerdOp", label: "gebaseerd op" },
                    { targetId: "req-nnn-001", type: "vereist", label: "vereist" },
                    { targetId: "req-nnn-002", type: "vereist", label: "vereist" },
                    { targetId: "role-ecologist", type: "verantwoordelijke", label: "verantwoordelijke" }
                ]
            },
            {
                id: "concept-natura2000-measure",
                type: "MitigatingMeasure",
                label: "Natura 2000 Maatregel",
                category: "Ecologie",
                description: "Beschermingsmaatregel voor Natura 2000 gebieden conform EU-richtlijn",
                source: "Natuurbeschermingswet 1998",
                relations: [
                    { targetId: "reg-natura2000", type: "gebaseerdOp", label: "gebaseerd op" },
                    { targetId: "req-n2k-001", type: "vereist", label: "vereist" },
                    { targetId: "req-n2k-002", type: "vereist", label: "vereist" },
                    { targetId: "role-senior-ecologist", type: "verantwoordelijke", label: "verantwoordelijke" }
                ]
            },
            {
                id: "concept-species-measure",
                type: "MitigatingMeasure",
                label: "Beschermde Soorten Maatregel",
                category: "Ecologie",
                description: "Maatregelen ter bescherming van beschermde diersoorten",
                source: "Flora- en faunawet",
                relations: [
                    { targetId: "reg-flora-fauna", type: "gebaseerdOp", label: "gebaseerd op" },
                    { targetId: "req-species-001", type: "vereist", label: "vereist" },
                    { targetId: "req-species-002", type: "vereist", label: "vereist" },
                    { targetId: "role-field-researcher", type: "verantwoordelijke", label: "verantwoordelijke" }
                ]
            },
            {
                id: "reg-nnn-wet",
                type: "Regulation",
                label: "Natuurnetwerk Nederland Wet 2024",
                category: "Regelgeving",
                description: "Nationale wetgeving voor bescherming en ontwikkeling van het ecologische netwerk",
                source: "https://wetten.overheid.nl/BWBR0045123",
                relations: [
                    { targetId: "concept-nnn-measure", type: "vereistImplementatie", label: "vereist implementatie" },
                    { targetId: "req-nnn-001", type: "specificeert", label: "specificeert" }
                ]
            },
            {
                id: "reg-natura2000",
                type: "Regulation",
                label: "Natuurbeschermingswet 1998",
                category: "Regelgeving",
                description: "Implementatie van EU Habitatrichtlijn en Vogelrichtlijn in Nederland",
                source: "https://wetten.overheid.nl/BWBR0009641",
                relations: [
                    { targetId: "concept-natura2000-measure", type: "vereistImplementatie", label: "vereist implementatie" },
                    { targetId: "req-n2k-001", type: "specificeert", label: "specificeert" }
                ]
            },
            {
                id: "reg-flora-fauna",
                type: "Regulation",
                label: "Flora- en faunawet",
                category: "Regelgeving",
                description: "Bescherming van in het wild levende planten en dieren",
                source: "https://wetten.overheid.nl/BWBR0009580",
                relations: [
                    { targetId: "concept-species-measure", type: "vereistImplementatie", label: "vereist implementatie" },
                    { targetId: "req-species-001", type: "specificeert", label: "specificeert" }
                ]
            },
            {
                id: "req-nnn-001",
                type: "Requirement",
                label: "NNN Corridor Buffer Zone Compliance",
                category: "Eis",
                description: "Uitvoerbare eis: werkzaamheden binnen 25m buffer vereisen mitigatie",
                source: "NNN Implementatieverordening Art. 4.1",
                relations: [
                    { targetId: "road-laan-nieuw-land", type: "betreftWegvak", label: "betreft wegvak" },
                    { targetId: "checkpoint-nnn-001", type: "heeftCheckpoint", label: "heeft checkpoint" }
                ]
            },
            {
                id: "req-n2k-001",
                type: "Requirement",
                label: "Natura 2000 Passende Beoordeling",
                category: "Eis",
                description: "Verplichte passende beoordeling voor activiteiten binnen 500m",
                source: "Natuurbeschermingswet Art. 19j",
                relations: [
                    { targetId: "road-laan-nieuw-land", type: "betreftWegvak", label: "betreft wegvak" },
                    { targetId: "checkpoint-n2k-001", type: "heeftCheckpoint", label: "heeft checkpoint" }
                ]
            },
            {
                id: "req-species-001",
                type: "Requirement",
                label: "Beschermde Vleermuizen Monitoring",
                category: "Eis",
                description: "Jaarlijkse monitoring tijdens bouwfase",
                source: "Flora- en faunawet Art. 11",
                relations: [
                    { targetId: "road-verlengde-westerdreef", type: "betreftWegvak", label: "betreft wegvak" },
                    { targetId: "role-field-researcher", type: "verantwoordelijke", label: "verantwoordelijke" }
                ]
            },
            {
                id: "road-laan-nieuw-land",
                type: "RoadSection",
                label: "Laan van Nieuw Land",
                category: "Infrastructuur",
                description: "Provinciaal wegdeel, lengte 4.2 km",
                jurisdiction: "Provincie Flevoland",
                relations: [
                    { targetId: "req-nnn-001", type: "onderhevig aan", label: "onderhevig aan" },
                    { targetId: "req-n2k-001", type: "onderhevig aan", label: "onderhevig aan" },
                    { targetId: "role-project-manager", type: "projectmanager", label: "projectmanager" }
                ]
            },
            {
                id: "road-verlengde-westerdreef",
                type: "RoadSection",
                label: "Verlengde Westerdreef",
                category: "Infrastructuur",
                description: "Gemeentelijk wegdeel, lengte 2.1 km",
                jurisdiction: "Gemeente Lelystad",
                relations: [
                    { targetId: "req-species-001", type: "onderhevig aan", label: "onderhevig aan" },
                    { targetId: "role-municipal-manager", type: "projectmanager", label: "projectmanager" }
                ]
            },
            {
                id: "role-ecologist",
                type: "Role",
                label: "Ecoloog",
                category: "Rol",
                description: "Verantwoordelijk voor ecologische aspecten",
                organization: "Provincie Flevoland",
                relations: [
                    { targetId: "concept-nnn-measure", type: "voertUit", label: "voert uit" },
                    { targetId: "req-nnn-001", type: "verantwoordelijkVoor", label: "verantwoordelijk voor" }
                ]
            },
            {
                id: "role-senior-ecologist",
                type: "Role",
                label: "Senior Ecoloog",
                category: "Rol",
                description: "Goedkeuring en toezicht ecologische maatregelen",
                organization: "Provincie Flevoland",
                relations: [
                    { targetId: "concept-natura2000-measure", type: "keurtGoed", label: "keurt goed" },
                    { targetId: "req-n2k-001", type: "verantwoordelijkVoor", label: "verantwoordelijk voor" }
                ]
            },
            {
                id: "role-field-researcher",
                type: "Role",
                label: "Veldonderzoeker",
                category: "Rol",
                description: "Uitvoering veldonderzoek flora en fauna",
                organization: "Externe partij",
                relations: [
                    { targetId: "req-species-001", type: "voertUit", label: "voert uit" },
                    { targetId: "concept-species-measure", type: "monitort", label: "monitort" }
                ]
            },
            {
                id: "role-project-manager",
                type: "Role",
                label: "Projectmanager Provincie",
                category: "Rol",
                description: "Eindverantwoordelijk voor provinciaal wegdeel",
                organization: "Provincie Flevoland",
                relations: [
                    { targetId: "road-laan-nieuw-land", type: "beheert", label: "beheert" }
                ]
            },
            {
                id: "role-municipal-manager",
                type: "Role",
                label: "Projectmanager Gemeente",
                category: "Rol",
                description: "Eindverantwoordelijk voor gemeentelijk wegdeel",
                organization: "Gemeente Lelystad",
                relations: [
                    { targetId: "road-verlengde-westerdreef", type: "beheert", label: "beheert" }
                ]
            },
            {
                id: "checkpoint-nnn-001",
                type: "ComplianceCheckpoint",
                label: "NNN Ecologische Survey Goedkeuring",
                category: "Checkpoint",
                description: "Verificatiepunt voor ecologische survey resultaten",
                deadline: "2025-03-15",
                relations: [
                    { targetId: "req-nnn-001", type: "valideert", label: "valideert" },
                    { targetId: "role-ecologist", type: "uitgevoerdDoor", label: "uitgevoerd door" }
                ]
            },
            {
                id: "checkpoint-n2k-001",
                type: "ComplianceCheckpoint",
                label: "Natura 2000 Beoordeling Goedgekeurd",
                category: "Checkpoint",
                description: "Passende beoordeling goedgekeurd door provincie",
                deadline: "2024-12-20",
                relations: [
                    { targetId: "req-n2k-001", type: "valideert", label: "valideert" },
                    { targetId: "role-senior-ecologist", type: "goedgekeurdDoor", label: "goedgekeurd door" }
                ]
            }
        ]
    }
};
