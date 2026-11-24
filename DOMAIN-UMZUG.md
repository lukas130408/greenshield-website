# Domain-Umzug: greenshield.company → neue Webseite (GitHub Pages)

Stand: 24.11.2026. Diese Anleitung erst ausführen, wenn Datenschutzerklärung,
Impressum und AGB rechtlich geprüft sind.

**Wer macht was:** 🧑 = du (Projektinhaber), 🤖 = Claude

---

## Ausgangslage (geprüft am 24.11.2026)

Die Domain und die E-Mails liegen bei **Zone.eu**. Aktuelle DNS-Einträge:

| Name | Typ | Wert | Was passiert damit? |
|---|---|---|---|
| `greenshield.company` | A | `217.146.69.55` | **wird ersetzt** (zeigt auf die alte WordPress-Seite) |
| `www` | CNAME | `greenshield.company` | **wird geändert** |
| `greenshield.company` | MX | `zonemx.eu` | ❌ **nicht anfassen** (E-Mail-Empfang) |
| `greenshield.company` | TXT | `v=spf1 a mx include:_spf.zone.eu -all` | ❌ **nicht anfassen** (E-Mail-Versand) |
| `zone._domainkey` | TXT | (DKIM-Schlüssel) | ❌ **nicht anfassen** (E-Mail-Signatur) |
| `autoconfig` | CNAME | `mailconfig.zone.eu` | ❌ **nicht anfassen** (E-Mail-Programme) |
| Nameserver | NS | `ns.zone.eu`, `ns2.zone.ee`, `ns3.zonedata.net` | ❌ **nicht anfassen** |

Die alten Seitenadressen (`/about/`, `/products/cps/` usw.) sind auf der neuen Seite
gleich geblieben. Die zwei alten Standings-Seiten (`/uefa-qualifications/`,
`/uefa-eu-domestic-league/`) leiten vorerst zur CPS-Seite weiter.

---

## Schritt 0 – Domain bei GitHub bestätigen (kann schon jetzt passieren) 🧑

Schützt davor, dass jemand anderer eure Domain auf GitHub für sich nutzt. Ändert nichts an der Webseite.

1. Auf GitHub rechts oben aufs Profilbild → **Settings** → links **Pages**.
2. **Add a domain** → `greenshield.company` eingeben → **Add domain**.
3. GitHub zeigt einen TXT-Eintrag an (Name beginnt mit `_github-pages-challenge-lukas130408`, dazu ein langer Wert).
4. Bei Zone.eu im DNS-Bereich diesen **TXT-Eintrag hinzufügen** (Name und Wert genau so übernehmen).
5. Zurück bei GitHub auf **Verify** klicken (kann ein paar Minuten dauern).

---

## Schritt 1 – Webseite auf die Domain einstellen 🤖

Claude legt die Datei `CNAME` mit dem Inhalt `greenshield.company` an und lädt sie hoch.
(Ab dann leitet die Testadresse auf greenshield.company weiter.)

Außerdem entfernt Claude auf allen Seiten die Sperre für Suchmaschinen
(die Zeilen mit dem Kommentar `VOR-LIVEGANG` und `<meta name="robots" content="noindex, nofollow">`).
**Wichtig – sonst findet Google die neue Seite nicht.**

## Schritt 2 – DNS bei Zone.eu umstellen 🧑

Im Zone.eu-Kundenbereich → Domain `greenshield.company` → **DNS**:

1. Den **A-Eintrag** für `greenshield.company` (`217.146.69.55`) **löschen** und
   **vier neue A-Einträge** anlegen:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
2. **Vier AAAA-Einträge** (IPv6) für `greenshield.company` anlegen:
   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`
3. Den **CNAME-Eintrag `www`** ändern auf: `lukas130408.github.io`
4. **Alles andere unverändert lassen** (siehe Tabelle oben).

## Schritt 3 – Warten 🧑🤖

DNS-Änderungen brauchen ein paar Minuten bis einige Stunden, bis sie überall angekommen sind.
Claude prüft, wann die neuen Einträge sichtbar sind.

## Schritt 4 – HTTPS einschalten 🧑

GitHub → Repository `greenshield-website` → **Settings** → **Pages**:
- Bei „Custom domain“ sollte `greenshield.company` stehen und ein grünes Häkchen erscheinen.
- Sobald möglich **„Enforce HTTPS“** anhaken (das Zertifikat kann bis zu 24 Stunden dauern).

## Schritt 5 – Alles testen 🤖🧑

- 🤖 Alle Seiten, Bilder, Links, die 404-Seite und die Weiterleitungen unter greenshield.company prüfen.
- 🧑 Eine Test-Nachricht über das Kontaktformular schicken.
- 🧑 **Eine E-Mail an office@greenshield.company schicken und eine von dort verschicken** –
  beides muss weiter funktionieren.

## Schritt 6 – Alte WordPress-Seite abschalten 🧑

Erst wenn alles läuft:
1. Bei Zone.eu ggf. eine **Sicherung** der alten Webseite herunterladen.
2. WordPress-Dateien und -Datenbank **löschen** bzw. das Webhosting für die Seite deaktivieren.
   Die E-Mail-Postfächer sind davon getrennt und bleiben erhalten – im Zweifel beim Zone-Support nachfragen.

## Schritt 7 – Google Bescheid geben (optional) 🧑

In der [Google Search Console](https://search.google.com/search-console) die Domain hinzufügen
und die Sitemap `https://greenshield.company/sitemap.xml` einreichen.

---

## Notfall: zurück zur alten Seite

Bei Zone.eu die vier A- und vier AAAA-Einträge löschen, wieder einen A-Eintrag
`217.146.69.55` anlegen und `www` zurück auf `greenshield.company` stellen.
(Funktioniert nur, solange die alte WordPress-Seite noch nicht gelöscht ist.)
