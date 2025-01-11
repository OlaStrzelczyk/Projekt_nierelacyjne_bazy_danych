const mongoose = require("mongoose");
const Class = require("../models/classes");
const User = require("../models/user");


//wyswietla zajecia bez opinii, szkol i trenerow

exports.classes_get_all = async (req, res) => {
    try {
        const classes = await Class.aggregate([
            { $project: { name: 1, level: 1, price: 1, date: 1, time: 1 } } // Wybieramy tylko potrzebne pola
        ]);

        res.status(200).json(classes);
    } catch (err) {
        console.error("Błąd zapytania do MongoDB:", err);
        res.status(500).json({ error: err.message });
    }
};

//dodaje nowe zajecia

exports.classes_add_new = (req, res) => {
    const newclass = new Class({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        level: req.body.level,
        school: req.body.school,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        trainer: req.body.trainer,
        reviews: [] // Inicjalizuj jako pustą tablicę
    });

    newclass.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Utworzono nowe zajęcia.",
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: "Wystąpił błąd podczas tworzenia zajęć.", błąd: err.message }));
};

//dodawanie opinii do konkretnych zajęć

exports.classes_add_review = async (req, res) => {
    const classId = req.params.classId;

    const newReview = {
        text: req.body.text,
        rating: req.body.rating,
        author: req.body.author, // ID autora recenzji
        date: new Date(), // Automatycznie ustawiamy aktualną datę
    };

    try {
        // Dodajemy nową recenzję do tablicy `reviews`
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { $push: { reviews: newReview } }, // Dodanie recenzji do tablicy
            { new: true, runValidators: true } // Zwracamy zaktualizowany dokument
        );

        if (!updatedClass) {
            return res.status(404).json({ message: "Nie znaleziono zajęć o podanym ID." });
        }

        res.status(200).json({
            message: "Dodano recenzję do zajęć.",
            data: updatedClass,
        });
    } catch (err) {
        console.error("Błąd podczas dodawania recenzji:", err);
        res.status(500).json({ message: "Wystąpił błąd podczas dodawania recenzji.", error: err.message });
    }
};

//wyswietla zajęcie konkretne z opiniami tylko

exports.classes_get_reviews = async (req, res) => {
    const id = req.params.classId;

    try {
        const result = await Class.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Dopasowanie zajęć po ID
            {
                $project: {
                    name: 1,
                    reviews: 1,
                },
            },
            {
                $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true }, // Rozwiń tablicę recenzji
            },
            {
                $lookup: {
                    from: "users", // Kolekcja użytkowników
                    localField: "reviews.author",
                    foreignField: "_id",
                    as: "authorDetails",
                },
            },
            {
                $unwind: { path: "$authorDetails", preserveNullAndEmptyArrays: true }, // Rozwiń szczegóły autora
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    reviews: {
                        $push: {
                            text: "$reviews.text",
                            rating: "$reviews.rating",
                            date: "$reviews.date",
                            authorEmail: "$authorDetails.email", // Dodaj e-mail autora
                        },
                    },
                },
            },
        ]);

        if (!result || result.length === 0) {
            return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID." });
        }

        res.status(200).json({
            wiadomość: `Opinie zajęć tanecznych: ${result[0].name}`,
            className: result[0].name,
            reviews: result[0].reviews,
        });
    } catch (err) {
        console.error("Błąd podczas pobierania opinii:", err);
        res.status(500).json({ wiadomość: "Błąd podczas pobierania opinii.", error: err.message });
    }
};

  //wyswietla konkretne zajęcia z opinią, szkola i trenerami

  exports.classes_get_by_id = async (req, res) => {
      const id = req.params.classId;
  
      try {
          const result = await Class.aggregate([
              { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Dopasowanie klasy po ID
              {
                  $lookup: {
                      from: "trainers", // Kolekcja użytkowników (trenerów)
                      localField: "trainer",
                      foreignField: "_id",
                      as: "trainer",
                  },
              },
              {
                  $lookup: {
                      from: "schools", // Kolekcja szkół
                      localField: "school",
                      foreignField: "_id",
                      as: "dance_school",
                  },
              },
              {
                  $lookup: {
                      from: "users", // Kolekcja użytkowników (autorów opinii)
                      localField: "reviews.author",
                      foreignField: "_id",
                      as: "review_author",
                  },
              },
              {
                  $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    level: { $first: "$level" },
                    price: { $first: "$price" },
                    date: { $first: "$date" },
                    time: { $first: "$time" },
                    trainer: { $first: "$trainer" }, // Zachowaj dane trenera
                    school: { $first: "$dance_school" },
                      reviews: {
                          $push: {
                              text: "$reviews.text",
                              rating: "$reviews.rating",
                              date: "$reviews.date",
                              author: {
                                  email: "$review_author.email"
                              },
                          },
                      },
                  },
              },
          ]);
  
          if (!result || result.length === 0) {
              return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID." });
          }
  
          res.status(200).json({
              wiadomość: "Szczegóły zajęć tanecznych",
              dane: result[0],
          });
      } catch (err) {
          console.error("Błąd podczas pobierania szczegółów zajęć:", err);
          res.status(500).json({ wiadomość: err.message });
      }
  };

exports.classes_update = (req, res) => {
    const id = req.params.classId;

    const updatedData = {
        name: req.body.name,
        price: req.body.price,
        level: req.body.level,
        school: req.body.school,
        date: req.body.date,
        time: req.body.time,
        trainer: req.body.trainer,  // Możesz przekazać tylko ID trenera, jeśli aktualizujesz trenera.
        reviews: req.body.reviews,  // Zakładając, że masz już dane o opiniach.
    };

    Class.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .populate('school', 'name')
        .populate('trainer', 'name')  // Wczytujemy dane trenera (name)
        .populate('reviews.author', 'email')  // Wczytujemy dane autora opinii (email)
        .then(updatedClass => {
            if (!updatedClass) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID do aktualizacji." });
            }
            res.status(200).json({
                wiadomość: "Zaktualizowano dane zajęć tanecznych: " + updatedClass.name,
                dane: {
                    name: updatedClass.name,
                    level: updatedClass.level,
                    school: updatedClass.school,
                    price: updatedClass.price,
                    date: updatedClass.date,
                    time: updatedClass.time,
                    trainer: updatedClass.trainer.name,  // Wyswietl nazwe trenera
                    reviews: updatedClass.reviews.map(review => ({
                        text: review.text,
                        rating: review.rating,
                        author: review.author.email,  // Wyswietl email autora opinii
                        date: review.date
                    }))
                },
            });
        })
        .catch(err => res.status(500).json({ wiadomość: err.message }));
};

exports.classes_patch = (req, res) => {
    const id = req.params.classId;
    const patchData = req.body;

    Class.findByIdAndUpdate(id, patchData, { new: true, runValidators: true })
        .populate('school', 'name')
        .populate('trainer', 'name')  // Populujemy dane trenera (name)
        .populate('reviews.author', 'email')  // Populujemy dane autora opinii (email)
        .then(updatedClass => {
            if (!updatedClass) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID do aktualizacji." });
            }
            res.status(200).json({
                wiadomość: "Częściowo zaktualizowano dane zajęć tanecznych: " + updatedClass.name,
                dane: {
                    name: updatedClass.name,  // Zwróć nazwę zajęć
                    level: updatedClass.level,
                    school: updatedClass.school,
                    price: updatedClass.price,
                    date: updatedClass.date,
                    time: updatedClass.time,
                    trainer: updatedClass.trainer.name,  // Zwróć nazwę trenera
                    reviews: updatedClass.reviews.map(review => ({
                        text: review.text,
                        rating: review.rating,
                        author: review.author.email,  // Zwróć email autora opinii
                        date: review.date
                    }))
                },
            });
        })
        .catch(err => res.status(500).json({ wiadomość: err.message }));
};

exports.classes_delete = (req, res) => {
    const id = req.params.classId;

    Class.findByIdAndDelete(id)
        .then(deletedClass => {
            if (!deletedClass) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID do usunięcia." });
            }
            // Zamiast ID, zwracamy nazwę zajęcia
            res.status(200).json({ wiadomość: "Usunięto zajęcia taneczne: " + deletedClass.name });
        })
        .catch(err => res.status(500).json({ wiadomość: err.message }));
};

exports.classes_head = (req, res) => {
    const id = req.params.classId;

    Class.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono zajęć o podanym ID." });
            }
            res.status(200).set({
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(result).length,
            }).end();
        })
        .catch(err => res.status(500).json({ wiadomość: err.message }));
};

exports.handleOptions = (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send();
};