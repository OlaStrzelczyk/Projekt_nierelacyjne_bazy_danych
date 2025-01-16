# Non-Relational Database Project

## Project Description

This project is a backend application built with **Node.js**, **JavaScript**, **MongoDB** and **CommonJS**. It is a non-relational database designed to store information about dance school schedules, including details about schools, dance classes, and trainers. The application also allows users to leave reviews for specific dance classes.

## Technologies

- **Node.js** - JavaScript runtime environment
- **JavaScript** - Programming language
- **MongoDB** - Non-relational database
- **Postman** -  API testing tool
- **CommonJS** - JavaScript module system

## Database Structure

The project consists of three collections and one array:

1. **Dance Schools** (`schools`)
   - Stores information about dance schools.
   
2. **Dance Classes** (`classes`)
   - Contains information about individual dance classes.
   
3. **Trenerzy** (`trainers`)
   - Holds data about trainers who conduct the classes.

4. **Opinie** (`reviews`)
   - An array for storing user reviews of specific dance classes.
   
## Relationships Between Collections
The collections are interconnected:
- Each class (classes) can have multiple assigned trainers (trainers), reviews (reviews), and one dance school (schools).
- Each dance school has assigned dance classes (classes) and trainers (trainers).
- Each trainer belongs to a specific dance school (schools) and conducts specific classes (classes).


## Security

- All routes are secured to ensure the safety of sensitive operations via authorization. Only logged-in users can add, edit, or delete data.
 
## Running the Application
- Start the application on your local server using the command: "node server.js".

## API Testing
- Use Postman for API testing.

# Available Endpoints

## Collection: Classes (Dance Classes)

| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **POST**  | `/port/classes`                  | Adds a new dance class to the database.                                                  |
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
| **POST**  | `/port/classes/:classId/reviews` | Adds review to the individual dance class.                                         |

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
| **GET**   | `/port/classes`                  | Shows all dance classes at all dance schools.                             |
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
| **GET**   | `/port/classes/:classId/reviews` | Shows all reviews of the specific dance class.                                             |
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
| **GET**   | `/port/classes/:classId`         | Shows detailed information about a specific dance class, including school, trainer and reviews. |

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
| **PUT**   | `/port/classes/:classId`         | Changing all data for a specific dance class.                                             |



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **PATCH** | `/port/classes/:classId`         | Zmiana jednego lub kilku (nie wszystkich) danych dotyczących konkretnego zajęcia tanecznego.         |




| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **DELETE**| `/port/classes/:classId`         | Removing a specific dance class based on ID.                                           |

### Expected response
```json
{
    "wiadomość": "Usunięto zajęcia taneczne: Zajęcia taneczne dla początkujących"
}
```



## Kolekcja: Schools (Szkoły taneczne)

| Metoda  | Route                         | Opis                                                                                  |
|---------|-------------------------------|---------------------------------------------------------------------------------------|
| **POST**  | `/port/schools`               | Adding a new dance school.                                                   |
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
| **GET**   | `/port/schools`               | Shows all dance schools.                                               |
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
| **GET**   | `/port/schools/:schoolId`     | Shows detailed information about a specific dance school, including dance classes at that school and trainers (employees).                      |
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
| **PUT**   | `/port/schools/:schoolId`     | 
Change all details of an existing school.                                  |

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **PATCH**   | `/port/schools/:schoolId`     | Changing one or more (not all) data about an existing school.                                        |

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| **DELETE**| `/port/schools/:schoolId`     | Removal of a dance school based on ID.                                           |
### Expected response
```json
{
    "wiadomość": "Usunięto szkołę: Siemanko"
}
```


## Kolekcja: Trainers (Trenerzy)

| Metoda  | Route                         | Opis                                                                                  |
|---------|-------------------------------|---------------------------------------------------------------------------------------|
| **POST**  | `/port/trainers`              | Adding a new dance trainer to the system.                                      |

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
| **GET**   | `/port/trainers`              | Download all dance trainers.                                               |
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
| **GET**   | `/port/trainers/:trainerId`   | Shows detailed information (which school he works at and what classes he gives) about a specific dance trainer.                    |
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
| **PUT**   | `/port/trainers/:trainerId`   | Change all details about an existing school.                    |

| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **PATCH**   | `/port/trainers/:trainerId`   | Changing one or more (not all) data about an existing school.                                            |



| Metoda  | Route                              | Opis                                                                                                 |
|---------|------------------------------------|------------------------------------------------------------------------------------------------------|
| **DELETE**| `/port/trainers/:trainerId`   | Removing a trainer based on ID.  

### Expected response
```json
{    "message": "Usunięto trenera: Jan Kowalski"    }
```


## Endpoint rejestrujący użytkownika

| Metoda | Route               | Opis                             |
|--------|---------------------|----------------------------------|
| POST   | `/port/users/signup` | Endpoint registering the user. |

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
| POST   | `/port/users/login`  | Endpoint logging the user    |

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


