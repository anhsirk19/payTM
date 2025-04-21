const { z } = require("zod");

const nameSchema = z.string().min(3, "username must be atleast 5 characters").max(20, "username must be atmost 20 characters");

const passwordSchema = z.string().min(8, "username must be atleast 8 characters").max(20, "username must be atmost 20 characters")
.regex(/\d/, "Password must contain at least one number");

const emailSchema = z.string().email();

module.exports = {
    nameSchema,
    passwordSchema,
    emailSchema
}