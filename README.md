# Tischlerei Bruns Norden: Website

Statische Website (HTML/CSS/JS, ohne Framework und ohne Build-Schritt) für die Tischlerei Bruns Norden. Enthält Startseite, Leistungen, Über uns, Referenzen, Kontakt sowie Impressum und Datenschutz.

## Projektstruktur

```
index.html
leistungen.html
ueber-uns.html
referenzen.html
kontakt.html
impressum.html
datenschutz.html
404.html
assets/css/style.css
assets/js/main.js
assets/img/favicon.svg
assets/img/finger-joint-tile.svg
```

Einfach den gesamten Ordner auf ein beliebiges Webhosting hochladen (kein Server-Backend, keine Datenbank, kein Build-Prozess nötig).

## Datengrundlage

Die Inhalte stammen aus Screenshots der bisherigen Website (tischlerei-bruns-norden.de), die im Chat bereitgestellt wurden (Zugriff auf die Domain selbst war in dieser Arbeitsumgebung netzwerkseitig gesperrt). Übernommen wurden: Firmenname, Logo-Farben, Ansprechpartner Kai Bruns, Adresse, Telefon, E-Mail, Teamtexte, Leistungstexte zu Möbelbau, Fenster & Türen sowie Möbelplaner, und das Zertifikat „Meisterbetrieb der Tischler-Innung" samt Ehrenurkunde zum 25-jährigen Meisterjubiläum.

**Bewusst nicht erfunden:** Öffnungszeiten, Kundenstimmen, Preise, Rechtsform, USt-IdNr., zuständige Handwerkskammer, konkrete Fließtexte zu Böden/Treppen/Reparaturarbeiten (dort wurden branchenübliche, allgemein gehaltene Texte formuliert, da die Originaltexte dieser drei Unterseiten nicht vorlagen). Diese Stellen sind im Code sichtbar mit „Bitte ergänzen" bzw. als Bildplatzhalter markiert.

## Was vor dem Livegang noch fehlt

1. **Echte Fotos.** Es standen keine Bilddateien zur Verfügung, nur Screenshots im Chat. Alle Bildflächen sind bewusst als klar erkennbare Platzhalter (`<figure class="media-frame">`) mit Bildunterschrift angelegt, nicht mit erfundenen KI-Fotos gefüllt. Ein Foto einsetzen: Platzhalter-`<figure>` durch `<img src="..." alt="...">` ersetzen, das Seitenverhältnis steuert die CSS-Variable `--ar` (z. B. `style="--ar: 4/3;"`).
2. **Öffnungszeiten** auf der Kontaktseite ergänzen.
3. **Impressum:** Rechtsform, USt-IdNr., Registereintrag und zuständige Handwerkskammer eintragen; danach rechtlich prüfen lassen.
4. **Datenschutzerklärung:** Hosting-Anbieter eintragen, vor Veröffentlichung von fachkundiger Stelle prüfen lassen (siehe Hinweisbanner auf der Seite selbst).
5. **Möbelplaner:** Der bisherige interaktive Möbelplaner ist ein Drittanbieter-Tool und wurde nicht eingebettet (keine Zugangsdaten/Embed-Code vorhanden). Aktuell wird stattdessen zur Kontaktaufnahme aufgefordert. Soll das Tool wieder eingebunden werden, wird der Embed-Code des Anbieters benötigt.
6. **Google Fonts:** Die Schrift „Archivo" wird aktuell per Google-Fonts-CDN geladen (siehe `assets/css/style.css`, erste Zeile). Das ist die schnellste Lösung, überträgt beim Seitenaufruf aber die IP-Adresse der Besucher an Google. Datenschutzfreundlicher wäre ein lokales Hosting der Schriftdateien; das ist in der Datenschutzerklärung bereits als Prüfpunkt vermerkt.
7. **Kontaktformular:** Funktioniert ganz ohne Server: Beim Absenden öffnet sich das lokale E-Mail-Programm mit vorausgefüllter Nachricht an info@tischlerei-bruns-norden.de. Für eine zuverlässigere Zustellung (unabhängig vom E-Mail-Programm der Besucher) empfiehlt sich später ein echtes Formular-Backend (z. B. serverseitiges Skript des Hosters).
8. **Social-Media-Vorschaubild (og:image):** aktuell nicht gesetzt, da kein passendes Bild vorlag. Ein 1200×630-px-Bild ergänzen und in jeder Seite im `<head>` als `og:image` verlinken.

## Designentscheidungen

- **Marke erhalten, nicht neu erfunden:** Farben (Anthrazit `#2B2D31`, Orange `#F07D12`) und die Wortmarke „TISCHLEREI BRUNS" wurden 1:1 aus dem bestehenden Auftritt übernommen. Das bisherige Logo-Icon (zwei versetzte Quadrate) wurde als Vektorgrafik nachgebaut, da keine Logodatei vorlag.
- **Eigenes Bildmotiv statt Stockfotos:** Der Hero-Bereich zeigt eine grafische Zinkenverbindung (SVG, Anthrazit/Orange/Weiß) als Sinnbild für passgenaue Tischlerarbeit. Dasselbe Motiv taucht als schmale Trennlinie unter Header und Footer wieder auf und zieht sich so als wiedererkennbares Element durch die Seite.
- **Ein Motion-Moment:** Die Startseite hat einen bewussten Bewegungsmoment (Hero-Inhalte blenden beim Laden sanft ein), ansonsten bleibt die Seite ruhig; alle Animationen respektieren `prefers-reduced-motion`.
- **Keine eingebetteten Drittanbieter-Widgets ohne Interaktion:** Die Anschrift verlinkt erst auf Klick zu Google Maps (neuer Tab), statt eine Karte automatisch zu laden, um keine Daten ohne Nutzeraktion an Google zu übertragen.
- **System statt Icon-Bibliothek:** Auf Icons wurde bewusst verzichtet (kein Abhängigkeits-Overhead für eine kleine statische Seite); Struktur, Typografie und Farbe tragen die Hierarchie.

## Qualitätsdurchgang

Alle 8 Seiten wurden mit Playwright (Chromium) automatisiert in Desktop- (1440 px) und Mobil-Breite (390 px) geprüft: kein horizontales Scrollen, keine Konsolenfehler, mobiles Menü öffnet/schließt korrekt (inkl. Escape-Taste), Formularvalidierung und Betreff-Vorbelegung aus Leistungs-Links funktionieren. Dabei wurde ein Layoutfehler im Header (zu schmal auf Mobilgeräten) sowie ein zu langes, nicht umbrechendes Wort in der Datenschutzerklärung gefunden und behoben (siehe Commit-Historie).

## Genutzte Skills

Verwendet wurden `brandkit`, `design-taste-frontend`, `emil-design-eng`, `mobile-native`, `redesign-existing-projects` und `impeccable` (deren Qualitäts-Checkliste manuell angewendet wurde, da das zugehörige CLI-Tool für iterative App-Projekte mit PRODUCT.md/DESIGN.md ausgelegt ist und nicht für ein einmaliges, statisches Website-Projekt dieses Umfangs). Nicht verfügbar waren `prototype` und `review-animations`; anstelle mehrerer vollständiger Design-Varianten wurde eine begründete Designrichtung direkt umgesetzt. `imagegen-frontend-web` und `image-to-code` wurden bewusst nicht zur Bilderzeugung genutzt, um keine KI-generierten „Fotos" von Werkstatt, Fahrzeugen oder Projekten zu zeigen, die es real nicht gibt; stattdessen stehen klar gekennzeichnete Platzhalter bereit.
