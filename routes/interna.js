const { Router } = require("express");
const router = Router();
const { User, Precio } = require("../db");

//::::::IMPEDIR QUE SE SALTEN EL LOGIN::::
function checkLogin(req, res, next) {
  if (req.session.user == null) {
    req.flash(
      "errores",
      "Tienes que estar logeado para entrar a esta parte del sistema."
    );
    return res.redirect("/login");
  }
  res.locals.user = req.session.user;
  next();
}

//::::::ver los objetos para remate:::::::::::::::::::

router.get("/remate", [checkLogin], async (req, res) => {
  const remate = await User.findAll({
    include: [Precio],
  });

  let aviso = req.flash("aviso");
  let error = req.flash("error");

  res.render("remate", { remate, aviso, error });
});

//:::::::::::: ver resultados del remate
router.get("/resultado", [checkLogin], async (req, res) => {
  let aviso = req.flash("aviso");
  let error = req.flash("error");

  res.render("resultado", { aviso, error });
});

//::::::::::::enviar respuestas:::::::::

router.post("/guardar_remate", async (req, res) => {
  console.log("POST/play");
  console.log("req.body");

  const user = await User.findByPk(req.session.user.id);
  user.createPrecio({
    valor: req.body.valor,
    producto: req.body.producto,
  });
  res.redirect("/remate");
});

//:::::::::::::agregar pregunta
router.get("/new_question", [checkLogin], async (req, res) => {
  let aviso = req.flash("aviso");
  let error = req.flash("error");

  res.render("question", { aviso, error });
});

//::::::::GUARDAR la pregunta en base de datos::::::::::::
router.post("/guardar_pregunta", async (req, res) => {
  try {
    if (req.body.question == "") {
      throw new Error("Debe ingresar una pregunta");
    }
    if (req.body.correct_answer == "") {
      throw new Error("Deebe ingresar la respuesta correcta");
    }
    if (req.body.fake_answer1 == "") {
      throw new Error("Debe ingresar una respuesta falsa");
    }
    if (req.body.fake_answer2 == "") {
      throw new Error("Debe ingresar una respuesta falsa");
    }

    const new_question = await Question.create({
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      fake_answer1: req.body.fake_answer1,
      fake_answer2: req.body.fake_answer2,
    });
  } catch (error) {
    console.log(error.message);
    req.flash("error", error.message);
  }

  res.redirect("/");
});

//:::::::::::::::::::POST PARA PASAR DATOS

module.exports = router;
