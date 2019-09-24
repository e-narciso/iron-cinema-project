const express = require("express");
const router = express.Router();
const Director = require("../models/Director");
const Composer = require("../models/Composer");
const Movie = require("../models/Movie");
const Actor = require("../models/Actor")
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/composers", (req, res, next) => {
  Composer.find()
    .then(allTheComposers => {
      if (req.user) {
        allTheComposers.forEach(eachComposer => {
          if (req.user._id.equals(eachComposer.creator) || req.user.isAdmin){
            eachComposer.mine = true;
          }
        });
      }
      res.render("composer-views/index", { composer: allTheComposers });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/composers/details/:id", (req, res, next) => {
  let id = req.params.id;
  Composer.findById(id)
    .then(composerObject => {
      Movie.find({
        composer: id
      })
        .then(result => {
          console.log(result);
          res.render("composer-views/show", {
            composer: composerObject,
            filteredMovies: result
          });
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/composers/add-new", (req, res, next) => {
  if(!req.user){
    req.flash('error', "Please login to add a new composer")
    res.redirect('/login');
}
  res.render("composer-views/new");
});

router.post("/composers/creation", (req, res, next) => {
  let name = req.body.theName;
  let nominations = req.body.theNominations;
  let awards = req.body.theAwards;
  let otherProjects = req.body.theSideProjects;
  let image = req.body.theImage;

  Composer.create({
    name: name,
    otherProjects: otherProjects,
    nominations: nominations,
    awards: awards,
    image: image
  })
    .then(result => {
      res.redirect("/composers/details/" + result._id);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/composers/delete/:id", (req, res, next) => {
  let id = req.params.id;
  Composer.findByIdAndRemove(id)
    .then(result => {
      res.redirect("/composers");
    })
    .catch(err => {
      next(err);
    });
});

router.get("/composers/edit/:id", (req, res, next) => {

  let id = req.params.id;
  Composer.findById(id)
    .then(theComposer => {
      res.render("composer-views/edit", { composer: theComposer });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/composers/update/:id", (req, res, next) => {
  let id = req.params.id;
  Composer.findByIdAndUpdate(id, {
    name: req.body.theName,
    nominations: req.body.theNominations,
    awards: req.body.theAwards,
    quote: req.body.theQuote,
    image: req.body.theImage
  })
    .then(result => {
      res.redirect("/composers/details/" + id);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
