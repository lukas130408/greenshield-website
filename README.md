# Greenshield Website

Die Homepage von Greenshield & Company. Sie ist eine einfache statische Webseite aus HTML, CSS und etwas JavaScript, ohne WordPress und ohne Frameworks.

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
assets/js/main.js     Menü und kleine Interaktionen
assets/images/        Bilder und Logos
assets/fonts/         Schrift „Figtree“ (lokal gespeichert, keine Verbindung zu Google)
serve.ps1             Kleiner Webserver zum lokalen Ansehen
```
