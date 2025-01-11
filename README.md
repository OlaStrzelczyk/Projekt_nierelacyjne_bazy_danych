# Projekt nierelacyjne bazy danych

## Opis projektu

Projekt jest aplikacją backendową, która wykorzystuje **Node.js**, **JavaScript**, **MongoDB** oraz **CommonJS**. Jest to nierelacyjna baza danych, która przechowuje informacje o harmonogramie szkół tanecznych, w tym dane o szkołach, zajęciach tanecznych i trenerach. Aplikacja umożliwia również przechowywanie opinii użytkowników na temat zajęć tanecznych.

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
   
## Relacje między kolekcjami:
- Kolekcje są połączone relacjami. Na przykład:
- każde zajęcie (`classes`) może mieć przypisanych kilku trenerów (`trainers`), opinie (`reviews`) oraz jedną szkołę tańca ('schools'),
- każda szkoła tańca ma przypisane zajęcia taneczne (`classes`) oraz trenerów (`trainers`),
- każdy trener należy do danej szkoły (`schools`) i udziela konkretne zajęcia (`classes`).

## Zabezpieczenia

- wszystkie routy zabezpieczone - zapewnia to bezpieczeństwo wrażliwych operacji za pomocą autoryzacji. Tylko użytkownicy, którzy są zalogowani, mogą dodawać, edytować lub usuwać dane.
 
## Uruchomienie aplikacji
- Uruchamianie aplikacji na swoim lokalnym serwerze za pomocą komendy: "node server.js".

## Testowanie API
- Można używać "Postman" do testowania API.

# Dostępne Endpointy

## Kolekcja: Classes (Zajęcia Taneczne)

| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **POST**  | `/port/classes`                  | Dodawanie nowego zajęcia tanecznego do bazy danych.                                                  |
### Expected body
```json
{
  "name": "Updated Class Name",
  "level": "Intermediate",
  "price": 200,
  "date": "2025-02-15",
  "time": "14:00",
  "trainer": "67826de12d7d940449728eac"
}
```

### Expected response
```json
{
    "wiadomość": "Utworzono nowe zajęcia.",
    "dane": {
        "name": "Updated Class Name",
        "level": "Intermediate",
        "price": 200,
        "date": "2025-02-15",
        "time": "14:00",
        "trainer": "67826de12d7d940449728eac",
        "reviews": [],
        "_id": "6782da03d86b1d09173a9c4f",
        "__v": 0
    }
}
```




| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **POST**  | `/port/classes/:classId/reviews` | Dodawanie opinii dotyczącej konkretnego zajęcia tanecznego.                                          |

### Expected body
```json
{
  "text": "Kocham te zajęcia!",
  "rating": 5,
  "author": "677faba4a6c58c7b4b2e7224"
}
```

### Expected response
```json
{
    "message": "Dodano recenzję do zajęć.",
    "data": {
        "_id": "6782da03d86b1d09173a9c4f",
        "name": "Updated Class Name",
        "level": "Intermediate",
        "price": 200,
        "date": "2025-02-15",
        "time": "14:00",
        "trainer": "67826de12d7d940449728eac",
        "reviews": [
            {
                "text": "Kocham te zajęcia!",
                "rating": 5,
                "author": "677faba4a6c58c7b4b2e7224",
                "date": "2025-01-11T20:55:11.303Z",
                "_id": "6782daafd86b1d09173a9c52"
            }
        ],
        "__v": 0
    }
}
```



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **GET**   | `/port/classes`                  | Pobranie wszystkich zajęć tanecznych we wszystkich szkołach tanecznych.                              |
### Expected response
```json
[
    {
	"_id": "63b5f6a9e8f12345d678abcd",
	"name": "Taniec towarzyski",
	"level": "Zaawansowany",
	"price": 150,
	"date": "2025-01-15",
	"time": "18:00"
    },
    {
        "_id": "678272ef99701474e143feb4",
        "name": "Zajęcia taneczne dla początkujących",
        "level": "Początkujący",
        "price": 50,
        "date": "2025-02-01",
        "time": "18:00"
    }
]
```



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **GET**   | `/port/classes/:classId/reviews` | Pobranie opinii na temat konkretnego zajęcia tanecznego.                                             |
### Expected response
```json
{
    "wiadomość": "Opinie zajęć tanecznych: Hip-Hop",
    "className": "Hip-Hop",
    "reviews": [
        {
            "text": "Kocham te zajęcia!",
            "rating": 5,
            "date": "2025-01-11T20:55:11.303Z",
            "authorEmail": "Strzelczyyyk901@gmail.com"
        },
        {
            "text": "Super!",
            "rating": 5,
            "date": "2025-01-11T20:56:59.516Z",
            "authorEmail": "Strzelczyyyk901@gmail.com"
        }
    ]
}
```



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **GET**   | `/port/classes/:classId`         | Pobranie szczegółowych informacji o konkretnym zajęciu tanecznym, w tym szkoły, trenera oraz opinii. |
### Expected response
```json
{
    "wiadomość": "Szczegóły zajęć tanecznych",
    "dane": {
        "_id": "678272ef99701474e143feb4",
        "name": "Zajęcia taneczne dla początkujących",
        "level": "Początkujący",
        "price": 50,
        "date": "2025-02-01",
        "time": "18:00",
        "trainer": [
            {
                "_id": "67826de12d7d940449728eac",
                "name": "Jan Kowalski",
                "bio": "Experienced dance trainer with 10 years of teaching.",
                "experience": "10 years",
                "contact": "john.doe@example.com",
                "school": "6782726199701474e143feb1",
                "classes": "677fcd7615aee47737ad5d12",
                "__v": 0
            }
        ],
        "school": [
            {
                "_id": "6782726199701474e143feb1",
                "name": "Taniec z Pasją",
                "city": "Warszawa",
                "location": "ul. Piękna 15, Warszawa",
                "description": "Szkoła oferująca kursy tańca dla wszystkich grup wiekowych.",
                "contact": "kontakt@tanieczpasja.pl",
                "trainer": "67826de12d7d940449728eac",
                "classes": [
                    "678272ef99701474e143feb4"
                ],
                "__v": 0
            }
        ],
        "reviews": [
            {
                "text": [
                    "Świetne zajęcia!"
                ],
                "rating": [
                    5
                ],
                "date": [
                    "2025-01-11T15:47:24.568Z"
                ],
                "author": {
                    "email": [
                        "pepek@gmail.com"
                    ]
                }
            }
        ]
    }
}
```



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **PUT**   | `/port/classes/:classId`         | Zmiana wszystkich danych konkretnego zajęcia tanecznego.                                             |



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **PATCH** | `/port/classes/:classId`         | Zmiana jednego lub kilku (nie wszystkich) danych dotyczących konkretnego zajęcia tanecznego.         |




| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **DELETE**| `/port/classes/:classId`         | Usunięcie konkretnego zajęcia tanecznego na podstawie ID.                                            |

### Expected response
```json
{
    "wiadomość": "Usunięto zajęcia taneczne: Zajęcia taneczne dla początkujących"
}
```



## Kolekcja: Schools (Szkoły taneczne)

| Metoda  | Route                         | Opis                                                                                  |
|---------|-------------------------------|---------------------------------------------------------------------------------------|
| **POST**  | `/port/schools`               | Dodawanie nowej szkoły tanecznej.                                                      |
### Expected body
```json
{
    "name": "Siemanko",
    "city": "Gdańsk",
    "location": "Metropolia",
    "description": "Szkoła oferuje zajęcia na wszystkich poziomach zaawansowania.",
    "contact": "kontakt@siemanko.pl",
    "trainer": "67826de12d7d940449728eac",
    "classes": "6782da03d86b1d09173a9c4f"
}
```

### Expected response
```json
{
    "wiadomość": "Utworzono nową szkołę.",
    "dane": {
        "name": "Siemanko",
        "city": "Gdańsk",
        "location": "Metropolia",
        "description": "Szkoła oferuje zajęcia na wszystkich poziomach zaawansowania.",
        "contact": "kontakt@siemanko.pl",
        "trainer": "67826de12d7d940449728eac",
        "classes": [
            "6782da03d86b1d09173a9c4f"
        ],
        "_id": "6782dca1d86b1d09173a9c5c",
        "__v": 0
    }
}
```

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **GET**   | `/port/schools`               | Pobranie wszystkich szkół tanecznych.                                                 |
### Expected response
```json
[
    {
        "_id": "6782726199701474e143feb1",
        "name": "Taniec z Pasją",
        "city": "Warszawa",
        "location": "ul. Piękna 15, Warszawa",
        "description": "Szkoła oferująca kursy tańca dla wszystkich grup wiekowych.",
        "contact": "kontakt@tanieczpasja.pl"
    },
{
        "_id": "6782726199123456e143feb1",
        "name": "Siemanko",
        "city": "Gdańsk",
        "location": "Metropolia",
        "description": "Szkoła oferuje zajęcia na wszystkich poziomach zaawansowania.",
        "contact": "kontakt@siemanko.pl"
    }
]
```

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **GET**   | `/port/schools/:schoolId`     | Pobranie szczegółowych informacji o konkretnej szkole tanecznej, w tym zajęć tanecznych w tej szkole oraz trenerów (pracowników).                       |
### Expected response
```json
{
    "wiadomość": "Szczegóły szkoły tańca o numerze: 6782dca1d86b1d09173a9c5c",
    "dane": {
        "_id": "6782dca1d86b1d09173a9c5c",
        "name": "Siemanko",
        "city": "Gdańsk",
        "location": "Metropolia",
        "description": "Szkoła oferuje zajęcia na wszystkich poziomach zaawansowania.",
        "contact": "kontakt@siemanko.pl",
        "classes": [
            {
                "name": "Updated Class Name"
            }
        ],
        "trainers": [
            {
                "name": "Jan Kowalski"
            }
        ]
    }
}
```

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **PUT**   | `/port/schools/:schoolId`     | Zmiana wszystkich danych istniejącej szkoły.                                   |

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **PATCH**   | `/port/schools/:schoolId`     | Zmiana jednego lub kilku (nie wszystkich) danych dotyczących istniejącej szkoły.                                        |

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **DELETE**| `/port/schools/:schoolId`     | Usunięcie szkoły tanecznej na podstawie ID.                                            |
### Expected response
```json
{
    "wiadomość": "Usunięto szkołę: Siemanko"
}
```


## Kolekcja: Trainers (Trenerzy)

| Metoda  | Route                         | Opis                                                                                  |
|---------|-------------------------------|---------------------------------------------------------------------------------------|
| **POST**  | `/port/trainers`              | Dodawanie nowego trenera tanecznego do systemu.                                        |

### Expected body
```json
{
    "name": "Dariusz Klimkowski",
    "bio": "Twórca wielu projektów tanecznych.",
    "experience": "15 years",
    "contact":  "dariusz677@example.com",
    "school": "6782726199701474e143feb1",
    "classes": "6782da03d86b1d09173a9c4f"
}
```
### Expected response
```json
{
    "message": "Utworzono nowego trenera.",
    "data": {
        "name": "Dariusz Klimkowski",
        "bio": "Twórca wielu projektów tanecznych.",
        "experience": "15 years",
        "contact": "dariusz677@example.com",
        "school": "6782726199701474e143feb1",
        "classes": "6782da03d86b1d09173a9c4f",
        "_id": "6782deb0d86b1d09173a9c64",
        "__v": 0
    }
}
```



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **GET**   | `/port/trainers`              | Pobranie wszystkich trenerów tanecznych.                                               |
### Expected response
```json
[
    {
        "_id": "67826de12d7d940449728eac",
        "name": "Jan Kowalski",
        "bio": "Experienced dance trainer with 10 years of teaching.",
        "experience": "10 years",
        "contact": "john.doe@example.com"
    },
    {
        "_id": "51236de12d7d940449728eab",
        "name": "Dariusz Klimkowski",
        "bio": "Twórca wielu projektów tanecznych.",
        "experience": "15 years",
        "contact": "dariusz677@example.com"
    }
]
```



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **GET**   | `/port/trainers/:trainerId`   | Pobranie szczegółowych informacji (w jakiej szkole pracuje i jakich zajęć udziela) o konkretnym trenerze tanecznym.                      |
### Expected response
```json
{
    "message": "Szczegóły trenera",
    "data": {
        "_id": "67826de12d7d940449728eac",
        "name": "Jan Kowalski",
        "bio": "Experienced dance trainer with 10 years of teaching.",
        "experience": "10 years",
        "contact": "john.doe@example.com",
        "school": {
            "_id": "6782726199701474e143feb1",
            "name": "Taniec z Pasją",
            "contact": "kontakt@tanieczpasja.pl"
        },
        "classes": [
            {
                "_id": "6782da03d86b1d09173a9c4f",
                "name": "Updated Class Name",
                "level": "Intermediate",
                "price": 200,
                "date": "2025-02-15",
                "time": "14:00"
            }
        ]
    }
}
```


| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **PUT**   | `/port/trainers/:trainerId`   | Zmiana wszystkich danych dotyczących istniejącej szkoły.                    |

| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **PATCH**   | `/port/trainers/:trainerId`   | Zmiana jednego lub kilku (nie wszystkich) danych dotyczących istniejącej szkoły.                                            |



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **DELETE**| `/port/trainers/:trainerId`   | Usunięcie trenera na podstawie ID.  

### Expected response
```json
{    "message": "Usunięto trenera: Jan Kowalski"    }
```


## Endpoint rejestrujący użytkownika

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| POST   | `/port/users/signup` | Endpoint rejestrujący użytkownika |

### Expected body:
```json
{
	"name": "new_name", // string, required
	"surname": "new_surname", // string, required
	"email": "new_email", // string, required
	"password": "new_password" // string, required
}
```

## Endpoint logujący użytkownika

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| POST   | `/port/users/login`  | Endpoint logujący użytkownika    |

### Expected body
```json
{
	"name": "your_name", // string, required
	"surname": "your_surname", // string, required
	"email": "your_email", // string, required
	"password": "your_password" // string, required
}
```

# Autorzy:

- Aleksandra Strzelczyk
- Aleksandra Bluszcz


