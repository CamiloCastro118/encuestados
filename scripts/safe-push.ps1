# Script de PowerShell para verificar rama antes de push
$currentBranch = git branch --show-current

if ($currentBranch -ne "main") {
    Write-Host "❌ Error: Solo se pueden hacer push a la rama main" -ForegroundColor Red
    Write-Host "📍 Rama actual: $currentBranch" -ForegroundColor Yellow
    Write-Host "💡 Cambia a la rama main con: git checkout main" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Verificación exitosa: Push desde rama main" -ForegroundColor Green
Write-Host "🚀 Procediendo con el push..." -ForegroundColor Blue

# Hacer el push
git push origin main