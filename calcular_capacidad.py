import csv
import json

datos = []

with open('datos.csv', encoding='utf-8') as archivo:
    lector = csv.DictReader(archivo)
    for fila in lector:
        try:
            datos.append({
                "pais": fila['Entity'],
                "año": int(fila['Year']),
                "valor": float(fila['Renewables (% equivalent primary energy)'])
            })
        except ValueError:
            continue

# Guardar como archivo JSON
with open('datos.json', 'w', encoding='utf-8') as salida:
    json.dump(datos, salida, ensure_ascii=False, indent=2)
