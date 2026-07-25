# Push-Helper fuer die ModSyncX-Webseite.
# Nutzung: .\push.ps1 "Beschreibung der Aenderung" (Nachricht optional)

param(
    [string]$Message = "Update site"
)

$changes = git status --porcelain
if (-not $changes) {
    Write-Host "Keine Aenderungen zum Pushen gefunden." -ForegroundColor Yellow
    exit 0
}

Write-Host "Baue das Projekt zur Sicherheit einmal lokal (Fehler-Check) ..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build fehlgeschlagen - bitte Fehler zuerst beheben, bevor gepusht wird." -ForegroundColor Red
    exit 1
}

git add -A
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit fehlgeschlagen." -ForegroundColor Red
    exit 1
}

git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Push fehlgeschlagen." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Gepusht! GitHub Actions baut und deployt jetzt automatisch (dauert ca. 1 Minute)." -ForegroundColor Green
Write-Host "https://modsyncx.github.io/modsyncx-portfolio/"
