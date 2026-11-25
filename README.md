# Greenshield Website

Die Homepage von Greenshield & Company: **https://greenshield.company**

Eine einfache statische Webseite aus HTML, CSS und etwas JavaScript, ohne WordPress und ohne Frameworks.

## Wo läuft was?

| Was | Wo |
|---|---|
| Webseite (Hosting) | GitHub Pages – jede Änderung auf `main` ist nach ca. 1 Minute online |
| Domain und DNS | Zone.eu (Domain jährlich verlängern!) |
| E-Mails (office@greenshield.company usw.) | Zone.eu, Webhosting-Paket „I“ – **Paket nicht kündigen** |
| Kontaktformular | Web3Forms (leitet an office@greenshield.company weiter) |
| Google Search Console | Konto office@greenshield.company, Domain-Property greenshield.company, Sitemap eingereicht |

**DNS-Einträge bei Zone.eu, die bleiben müssen** (nicht löschen):
- 4× A (`185.199.108–111.153`), 4× AAAA (`2606:50c0:8000–8003::153`), CNAME `www` → `lukas130408.github.io` – Webseite
- MX, SPF (`v=spf1 mx include:_spf.zone.eu -all`), DKIM `zone._domainkey`, DMARC `_dmarc`, autoconfig – E-Mail
- TXT `_github-pages-challenge-lukas130408` – Bestätigung bei GitHub
- TXT `google-site-verification=…` – Bestätigung bei Google

Details zum Domain-Umzug: `DOMAIN-UMZUG.md`.

## Webseite lokal ansehen

Im Projektordner in PowerShell ausführen:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Danach im Browser **http://localhost:8080/** öffnen. Beenden mit `Strg + C` im Terminal.

## Ordnerstruktur

```
index.html            Startseite
<seite>/index.html    Unterseiten (about, products, contact, …)
assets/css/style.css  Design (Farben stehen ganz oben unter :root)
assets/js/            Menü, Reiter, Kontaktformular
assets/images/        Bilder und Logos (Fotos von Unsplash, Fotografen im Quelltext vermerkt)
assets/videos/        Erklärvideos CPS und PPS
assets/fonts/         Schrift „Figtree“ (lokal gespeichert, keine Verbindung zu Google)
CNAME                 Domain für GitHub Pages – nicht löschen
_config.yml           Legt fest, welche internen Dateien nicht veröffentlicht werden
serve.ps1             Kleiner Webserver zum lokalen Ansehen
```

Interne Dateien (diese README, CLAUDE.md, DOMAIN-UMZUG.md, serve.ps1) werden über `_config.yml`
von der Veröffentlichung ausgenommen.
