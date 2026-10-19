// Market figures and payback scenarios for the commercial slides.
// Counts are desk-research estimates (no public CT statistic exists); see notes for sources.
module.exports = {
  title: "Marktvolumen und Payback in Zentraleuropa",
  marketLabel: "Relevante CT-Projekte · Schätzung",
  cacPerProject: 2500,
  rows: [
    ["Deutschland", "18–28", "6–11"],
    ["Österreich", "8–14", "3–5"],
    ["Schweiz", "8–14", "3–6"],
    ["Frankreich", "8–14", "3–6"],
    ["Vereinigtes Königreich", "5–10", "2–4"],
    ["Zentraleuropa gesamt", "ca. 47–80", "ca. 17–32"],
  ],
  marketNote: "Desk-Research: STUVA-Statistik 2024/25 (DE: 40 Verkehrstunnelprojekte im Bau, CT-Anteil ca. 40–50 %), Projektlisten von ASFINAG, ASTRA/SBB, CETU und HS2. Vergaben p. a. = Projekte im Bau ÷ Ø 2,5–4 Jahre Bauzeit. VMT-Einschätzung allein für DACH: 20–30 p. a., inkl. Losen und kleinerer Sanierungen.",
  invest: [20000, 30000, 40000],
  projectsPerYear: [6, 10, 15, 20],
  breakEven: "Break-even: 8 Projekte bei 20 T€, 12 bei 30 T€ und 16 bei 40 T€ Kosten.",
  conclusion: "Bei ca. 17–32 neuen CT-Vergaben pro Jahr amortisiert sich ein Radar mit 20–30 T€ Kosten innerhalb von 12 Monaten, wenn 8–12 Projekte zusätzlich identifiziert werden.",
  notes: [
    "Marktzahlen: eigene Schätzung auf Basis öffentlicher Quellen, vor externer Verwendung an den Originalen prüfen.",
    "DE: STUVA, Tunnelbau in Deutschland – Statistik 2024/2025 (40 Projekte / ca. 83 km im Bau, 156 Projekte / 659 km in Planung): https://www.tunnel-online.info/en/artikel/tunnelling-in-germany-statistics-20242025-analysis-and-outlook-4356136.html ; Statistik 2022/23: https://www.stuva.de/fileadmin/user_upload/downloads/stat/2024-02-07_Tunnelbau_in_Deutschland_2022-2023.pdf",
    "AT: u. a. Brennerbasistunnel-Lose, ASFINAG-Sanierungen S6 Semmering (2025–29), Landeck (2025–30), Karawanken, Tauern/Katschberg: https://www.tunnel-online.info/en/artikel/overhaul-of-the-semmering-tunnel-chain-for-270-million-euros-4288827.html",
    "CH: u. a. 2. Gotthardröhre (ca. 500 m Sprengvortrieb), Gubrist, Belchen, SBB Hauenstein: https://www.astra.admin.ch/fr/percement-du-2d-tube-au-gothard-depuis-le-sud-la-methode-conventionnelle-preferee-au-tunnelier-sur-un-troncon-de-500-metres",
    "FR: Lyon–Turin (Sprengvortriebslose), CETU-Observatorium: https://www.cetu.developpement-durable.gouv.fr/IMG/pdf/observatoire_lettre_info_v6.pdf",
    "UK: HS2 SCL-Arbeiten (Northolt, Chilterns, Euston): https://tunnellingjournal.com/hs2s-northolt-tunnel-cross-passages-complete/",
    "Payback: Kosten ÷ (zusätzlich identifizierte Projekte p. a. × 2.500 €) × 12. Kostenszenarien illustrativ; 20–30 T€ als Größenordnung aus dem Workshop vom 06.10.2026.",
  ].join("\n"),
};
