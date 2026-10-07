import { signSchema, loginSchema } from "../schemas/authSchema.js";

export const checkAuth = (req, res, next) => {
  let result = null;
  if (Object.hasOwn(req.body, "name")) {
    const { name, username, password } = req.body;
    result = signSchema.safeParse({
      name: name,
      username: username,
      password: password,
    });
  } else {
    const { username, password } = req.body;
    result = loginSchema.safeParse({ username: username, password: password });
  }
  if (result.success) {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: result.error.issues[0].message,
    showBar: true,
  });
};
