## Projekt nierelacyjne bazy danych

## Opis projektu

Projekt jest aplikacją backendowąh, która wykorzystuje **Node.js**, **JavaScript**, **MongoDB** oraz **CommonJS**. Jest to nierelacyjna baza danych, która przechowuje informacje o harmonogramie szkół tanecznych, w tym dane o szkołach, zajęciach tanecznych i trenerach. Aplikacja umożliwia również przechowywanie opinii użytkowników na temat zajęć tanecznych.

## Technologie

- **Node.js** - środowisko uruchomieniowe dla JavaScript
- **JavaScript** - język programowania
- **MongoDB** - nierelacyjna baza danych
- **Postman** - narzędzie do testowania API
- **CommonJS** - system modułów JavaScript

## Struktura Bazy Danych

Projekt składa się z trzech kolekcji oraz jednej tablicy:

1. **Szkoły taneczne** (`schools`)
   - Zawiera informacje o szkołach tanecznych.
   
2. **Zajęcia taneczne** (`classes`)
   - Zawiera informacje o poszczególnych zajęciach tanecznych, takie jak nazwa, godzina, lokalizacja i inne.
   
3. **Trenerzy** (`trainers`)
   - Zawiera dane o trenerach, którzy prowadzą zajęcia.

4. **Opinie** (`reviews`)
   - Tablica przechowująca opinie użytkowników na temat poszczególnych zajęć tanecznych.
   
### Relacje między kolekcjami:
- Kolekcje są połączone relacjami. Na przykład:
- każde zajęcie (`classes`) może mieć przypisanych kilku trenerów (`trainers`), opinie (`reviews`) oraz jedną szkołę tańca ('schools'),
- każda szkoła tańca ma przypisane zajęcia taneczne (`classes`) oraz trenerów (`trainers`),
- każdy trener należy do danej szkoły (`schools`) i udziela konkretne zajęcia (`classes`).

# Zabezpieczenia

## Funkcjonalności

- wszystkie routy zabezpieczone - zapewnia to bezpieczeństwo wrażliwych operacji za pomocą autoryzacji. Tylko użytkownicy, którzy są zalogowani, mogą dodawać, edytować lub usuwać dane.
 
# Uruchomienie aplikacji
- Uruchamianie aplikacji na swoim lokalnym serwerze za pomocą komendy: "node server.js".

# Testowanie API
- Można używać "Postman" do testowania API.

## Dostępne endpointy

### Kolekcja: Classes (Zajęcia Taneczne)

| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **POST**  | `/port/classes`                  | Dodawanie nowego zajęcia tanecznego do bazy danych.                                                  |
| **POST**  | `/port/classes/:classId/reviews` | Dodawanie opinii dotyczącej konkretnego zajęcia tanecznego.                                          |
| **GET**   | `/port/classes`                  | Pobranie wszystkich zajęć tanecznych we wszystkich szkołach tanecznych.                              |
| **GET**   | `/port/classes/:classId/reviews` | Pobranie opinii na temat konkretnego zajęcia tanecznego.                                             |
| **GET**   | `/port/classes/:classId`         | Pobranie szczegółowych informacji o konkretnym zajęciu tanecznym, w tym szkoły, trenera oraz opinii. |
| **PUT**   | `/port/classes/:classId`         | Zmiana wszystkich danych konkretnego zajęcia tanecznego.                                             |
| **PATCH** | `/port/classes/:classId`         | Zmiana jednego lub kilku (nie wszystkich) danych dotyczących konkretnego zajęcia tanecznego.         |
| **DELETE**| `/port/classes/:classId`         | Usunięcie konkretnego zajęcia tanecznego na podstawie ID.                                            |




  