// Configuration fo the fileFilter middleware to filter the files that are not images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers images sont autorisés !"));
  }
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userId = req.body.userId; // Assurez-vous que l'ID utilisateur est fourni dans le corps de la requête
    const dir = path.join(__dirname, "uploads", userId);

    // Créer le dossier de l'utilisateur s'il n'existe pas
    await fs.ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage, fileFilter });