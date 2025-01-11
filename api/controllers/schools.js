const mongoose = require("mongoose");

const School = require("../models/schools");

exports.schools_get_all = async (req, res) => {
    try {
        const schools = await School.aggregate([
            { 
                $project: { 
                    name: 1, 
                    city: 1, 
                    location: 1, 
                    description: 1, 
                    contact: 1 
                } 
            }
        ]);

        console.log("Znalezione szkoły tańca:", schools);
        res.status(200).json(schools);
    } catch (err) {
        console.error("Błąd zapytania do MongoDB:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.schools_get_by_id = (req, res, next) => {
    const id = req.params.schoolId; 

    School.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } }, 
        {
            $lookup: {
                from: 'trainers', 
                localField: 'trainer',
                foreignField: '_id',
                as: 'trainers'
            }
        },
        {
            $lookup: {
                from: 'classes', 
                localField: 'classes',
                foreignField: '_id',
                as: 'classes'
            }
        },
        {
            $project: {
                name: 1,
                city: 1,
                location: 1,
                description: 1,
                contact: 1,
                trainers: { name: 1 }, 
                classes: { name: 1 } 
            }
        }
    ])
    .then(result => {
        if (!result || result.length === 0) {
            return res.status(404).json({ wiadomość: "Nie znaleziono szkoły tańca o podanym ID." });
        }

        res.status(200).json({
            wiadomość: "Szczegóły szkoły tańca o numerze: " + id,
            dane: result[0] 
        });
    })
    .catch(err => {
        console.error("Błąd zapytania do MongoDB:", err);
        res.status(500).json({ error: err.message });
    });
};

exports.schools_add_new = (req, res, next) => {
    const newschool = new School({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        city: req.body.city,
        location: req.body.location,
        description: req.body.description,
        contact: req.body.contact,
        trainer: req.body.trainer,  
        classes: req.body.classes   
    });

    newschool.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Utworzono nową szkołę.",
                dane: result
            });
        })
        .catch(err => res.status(500).json({ wiadomość: "Wystąpił błąd podczas tworzenia szkoły.", błąd: err.message }));
};


exports.schools_update = (req, res, next) => {
    const id = req.params.schoolId;
  
    const updatedData = {
      name: req.body.name,
      city: req.body.city,
      location: req.body.location,
      description: req.body.description,
      contact: req.body.contact,
      trainer: req.body.trainer,
      classes: req.body.classes
    };
  
    School.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
      .then(async (updatedSchool) => {
        if (!updatedSchool) {
          return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID do aktualizacji." });
        }
  
        const populatedSchool = await School.findById(id)
          .populate('trainer', 'name') 
          .populate('classes', 'name'); 
  
        res.status(200).json({
          wiadomość: `Zaktualizowano dane szkoły: ${populatedSchool.name}`,
          dane: {
            name: populatedSchool.name,
            city: populatedSchool.city,
            location: populatedSchool.location,
            description: populatedSchool.description,
            contact: populatedSchool.contact,
            trainer: {
              name: populatedSchool.trainer.name,
            },
            classes: populatedSchool.classes
          },
        });
      })
      .catch(err => {
        console.error("Błąd podczas aktualizacji szkoły:", err);
        res.status(500).json({ wiadomość: "Wystąpił błąd podczas aktualizacji szkoły.", błąd: err.message });
      });
  };

  exports.schools_patch = (req, res, next) => {
    const id = req.params.schoolId;
  
    const patchData = req.body;
  
    School.findByIdAndUpdate(id, patchData, { new: true, runValidators: true })
      .then(async (updatedSchool) => {
        if (!updatedSchool) {
          return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID do aktualizacji." });
        }
  
        const populatedSchool = await School.findById(id)
          .populate('trainer', 'name') 
          .populate('classes', 'name'); 
  
        res.status(200).json({
          wiadomość: `Częściowo zaktualizowano dane szkoły: ${populatedSchool.name}`,
          dane: {
            name: populatedSchool.name,
            city: populatedSchool.city,
            location: populatedSchool.location,
            description: populatedSchool.description,
            contact: populatedSchool.contact,
            trainer: {
                name: populatedSchool.trainer.name,
            },
            classes: populatedSchool.classes
          },
        });
      })
      .catch(err => {
        console.error("Błąd podczas częściowej aktualizacji szkoły:", err);
        res.status(500).json({ wiadomość: "Wystąpił błąd podczas częściowej aktualizacji szkoły.", błąd: err.message });
      });
  };

  exports.schools_delete = (req, res, next) => {
    const id = req.params.schoolId;
  
    School.findById(id)
      .then((schoolToDelete) => {
        if (!schoolToDelete) {
          return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID do usunięcia." });
        }
  
        return School.findByIdAndDelete(id).then(() => {
          res.status(200).json({
            wiadomość: `Usunięto szkołę: ${schoolToDelete.name}`,
          });
        });
      })
      .catch((err) => {
        console.error("Błąd podczas usuwania szkoły:", err);
        res.status(500).json({ wiadomość: "Wystąpił błąd podczas usuwania szkoły.", błąd: err.message });
      });
  };

exports.schools_head = (req, res, next) => {
    const id = req.params.schoolId;

    School.findById(id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ wiadomość: "Nie znaleziono szkoły o podanym ID." });
            }

            res.status(200).set({
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(result).length,
            }).end();
        })
        .catch(err => {
            console.error("Błąd podczas obsługi żądania HEAD:", err);
            res.status(500).json({ wiadomość: "Wystąpił błąd podczas obsługi żądania HEAD.", błąd: err.message });
        });
};

exports.handleOptions = (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send();
};