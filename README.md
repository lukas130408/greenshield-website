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
