import express from "express"
import { supabaseAdmin } from "../../config/supabaseAdmin.js"

const router = express.Router();

// sign up
router.post("/register", async(req, res) => {
    try {
        const { email, password, first_name, last_name, role } = req.body

        const { data, error } = await supabaseAdmin.auth.signUp({
            email,
            password
        })

        if (error) {
            return res.status(500).json({ message: error.message })
        }

        const user = data.user

        if ( !user?.id, !email, !first_name, !last_name, !role ) {
            return res.status(400).json({ message: "Need userId, first name, last name, and role" })
        }

        const { error: insertError } = await supabaseAdmin
            .from("users")
            .insert([
                {
                    id: user.id,
                    email,
                    first_name,
                    last_name,
                    role
                }
            ])

        if (insertError) {
            return res.status(500).json({ message: insertError.message })
        }

        res.status(200).json({ message: "User uploaded successfully." })

    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: "Internal server error" })
    }
})

// log in
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Need email and password" })
        }

        const { error } = await supabaseAdmin.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            console.error("Error: ", error.message)
            res.status(500).json({ message: "Error logging in" })
        }

        res.status(200).json({ message: "Logged in" })
    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({ error: "Internal server error"})
    }
})

export default router;

// logout
router.post("/logout", async (req, res) => {
    try {
        const { error } = await supabaseAdmin.auth.signOut();

        if ( error ) {
            console.error("Error: ", error.message)
            res.status(500).json({ message: "Error Logging out" })
        }

        res.status(200).json({ message: "Log out successful" })

    } catch (error) {
        console.error("Error: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})