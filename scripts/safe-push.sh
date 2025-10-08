#!/bin/bash

# Script para verificar que estamos en la rama main antes de hacer push
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Error: Solo se pueden hacer push a la rama main"
    echo "📍 Rama actual: $CURRENT_BRANCH"
    echo "💡 Cambia a la rama main con: git checkout main"
    exit 1
fi

echo "✅ Verificación exitosa: Push desde rama main"
echo "🚀 Procediendo con el push..."

# Hacer el push
git push origin main